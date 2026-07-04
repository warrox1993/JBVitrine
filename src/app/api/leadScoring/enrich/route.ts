/**
 * Lead Enrichment API Route (Server-side)
 *
 * This API route handles all lead enrichment on the server-side,
 * protecting API keys from client-side exposure
 */

import { NextRequest, NextResponse } from "next/server";
import { enrichmentLimiter, getClientIdentifier } from "@/lib/rate-limit-redis";

// API keys are now server-side only (no NEXT_PUBLIC_ prefix)
const HUNTER_API_KEY = process.env.HUNTER_API_KEY;
const BRANDFETCH_API_KEY = process.env.BRANDFETCH_API_KEY;

/**
 * Validate email using Hunter.io
 */
async function validateEmail(email: string) {
  if (!HUNTER_API_KEY) {
    console.warn("⚠️ HUNTER_API_KEY not configured, skipping email validation");
    return null;
  }

  try {
    const response = await fetch(
      `https://api.hunter.io/v2/email-verifier?email=${encodeURIComponent(email)}&api_key=${HUNTER_API_KEY}`,
      { next: { revalidate: 86400 } }, // Cache for 24 hours
    );

    if (!response.ok) {
      console.error("Hunter.io API error:", response.statusText);
      return null;
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Email validation error:", error);
    return null;
  }
}

/**
 * Fetch company data using Hunter.io domain search
 */
async function fetchCompanyData(domain: string) {
  if (!HUNTER_API_KEY) {
    console.warn("⚠️ HUNTER_API_KEY not configured, skipping company lookup");
    return null;
  }

  try {
    const response = await fetch(
      `https://api.hunter.io/v2/domain-search?domain=${encodeURIComponent(domain)}&limit=1&api_key=${HUNTER_API_KEY}`,
      { next: { revalidate: 86400 } }, // Cache for 24 hours
    );

    if (!response.ok) {
      console.error("Hunter.io domain search error:", response.statusText);
      return null;
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Company data fetch error:", error);
    return null;
  }
}

/**
 * Fetch brand data using Brandfetch
 */
async function fetchBrandData(domain: string) {
  if (!BRANDFETCH_API_KEY) {
    console.warn("⚠️ BRANDFETCH_API_KEY not configured, skipping brand lookup");
    return null;
  }

  try {
    const response = await fetch(
      `https://api.brandfetch.io/v2/brands/${encodeURIComponent(domain)}`,
      {
        headers: {
          Authorization: `Bearer ${BRANDFETCH_API_KEY}`,
        },
        next: { revalidate: 604800 }, // Cache for 7 days
      },
    );

    if (!response.ok) {
      console.error("Brandfetch API error:", response.statusText);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Brand data fetch error:", error);
    return null;
  }
}

/**
 * Detect tech stack from website headers (Server-side only)
 * This runs on the server to avoid CSP violations
 */
async function detectTechStack(domain: string) {
  try {
    // Ensure domain is clean (no protocol)
    const cleanDomain = domain.replace(/^https?:\/\//, "").split("/")[0];

    const response = await fetch(`https://${cleanDomain}`, {
      method: "HEAD",
      redirect: "follow",
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });

    const headers = response.headers;
    const techs = {
      cms: [] as string[],
      analytics: [] as string[],
      ecommerce: [] as string[],
      hosting: [] as string[],
      cdn: [] as string[],
    };

    // Get relevant headers
    const server = headers.get("server")?.toLowerCase() || "";
    const xPoweredBy = headers.get("x-powered-by")?.toLowerCase() || "";
    const xFramework = headers.get("x-framework")?.toLowerCase() || "";
    const via = headers.get("via")?.toLowerCase() || "";
    const xGenerator = headers.get("x-generator")?.toLowerCase() || "";

    // CMS Detection
    if (xPoweredBy.includes("next.js") || xGenerator.includes("next.js")) {
      techs.cms.push("Next.js");
    }
    if (xFramework.includes("wordpress") || xGenerator.includes("wordpress")) {
      techs.cms.push("WordPress");
    }
    if (server.includes("wix")) techs.cms.push("Wix");
    if (server.includes("squarespace")) techs.cms.push("Squarespace");
    if (xPoweredBy.includes("express")) techs.cms.push("Express.js");
    if (xGenerator.includes("drupal")) techs.cms.push("Drupal");
    if (xGenerator.includes("joomla")) techs.cms.push("Joomla");

    // Hosting Detection
    if (xPoweredBy.includes("vercel") || server.includes("vercel")) {
      techs.hosting.push("Vercel");
    }
    if (server.includes("nginx")) techs.hosting.push("Nginx");
    if (server.includes("apache")) techs.hosting.push("Apache");
    if (xPoweredBy.includes("aws")) techs.hosting.push("AWS");
    if (server.includes("netlify")) techs.hosting.push("Netlify");
    if (server.includes("github")) techs.hosting.push("GitHub Pages");

    // CDN Detection
    if (server.includes("cloudflare") || via.includes("cloudflare")) {
      techs.cdn.push("Cloudflare");
    }
    if (server.includes("akamai")) techs.cdn.push("Akamai");
    if (server.includes("fastly")) techs.cdn.push("Fastly");
    if (via.includes("varnish")) techs.cdn.push("Varnish");

    // E-commerce Detection
    if (xPoweredBy.includes("shopify")) techs.ecommerce.push("Shopify");
    if (server.includes("woocommerce")) techs.ecommerce.push("WooCommerce");
    if (xGenerator.includes("magento")) techs.ecommerce.push("Magento");
    if (xPoweredBy.includes("prestashop")) techs.ecommerce.push("PrestaShop");

    return techs;
  } catch (error) {
    console.warn(
      "⚠️ Tech stack detection error (non-critical):",
      error instanceof Error ? error.message : "Unknown error",
    );
    return null;
  }
}

/**
 * POST /api/leadScoring/enrich
 * Enriches lead data with email validation, company info, and brand data
 */
export async function POST(request: NextRequest) {
  // ✅ Rate limiting with Redis (10 requests per minute) 
  const clientIdentifier = getClientIdentifier(request);
  const { success, limit, remaining, reset } = await enrichmentLimiter.limit(clientIdentifier);

  if (!success) {
    console.warn('⚠️ Enrichment rate limit exceeded:', {
      identifier: clientIdentifier,
      limit,
      reset: new Date(reset).toISOString(),
    });
    
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": new Date(reset).toISOString(),
          "Retry-After": Math.ceil((reset - Date.now()) / 1000).toString(),
        },
      },
    );
  }

  console.log('✅ Enrichment rate limit OK:', { remaining, limit });

  try {
    const body = await request.json();
    const { email, domain } = body;

    if (!email && !domain) {
      return NextResponse.json(
        { error: "Either email or domain is required" },
        { status: 400 },
      );
    }

    const enrichedData: {
      emailValidation?: any;
      companyData?: any;
      brandData?: any;
      techStack?: any;
    } = {};

    // Run enrichment tasks in parallel
    const results = await Promise.allSettled([
      email ? validateEmail(email) : Promise.resolve(null),
      domain ? fetchCompanyData(domain) : Promise.resolve(null),
      domain ? fetchBrandData(domain) : Promise.resolve(null),
      domain ? detectTechStack(domain) : Promise.resolve(null),
    ]);

    if (results[0].status === "fulfilled" && results[0].value) {
      enrichedData.emailValidation = results[0].value;
    }

    if (results[1].status === "fulfilled" && results[1].value) {
      enrichedData.companyData = results[1].value;
    }

    if (results[2].status === "fulfilled" && results[2].value) {
      enrichedData.brandData = results[2].value;
    }

    if (results[3].status === "fulfilled" && results[3].value) {
      enrichedData.techStack = results[3].value;
    }

    return NextResponse.json({
      success: true,
      data: enrichedData,
    });
  } catch (error) {
    console.error("Enrichment API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
