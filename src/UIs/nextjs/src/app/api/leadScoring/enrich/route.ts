/**
 * Lead Enrichment API Route (Server-side)
 *
 * This API route handles all lead enrichment on the server-side,
 * protecting API keys from client-side exposure
 */

import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIP } from "@/app/api/contact/ratelimit";

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
 * POST /api/leadScoring/enrich
 * Enriches lead data with email validation, company info, and brand data
 */
export async function POST(request: NextRequest) {
  // Rate limiting (10 requests per minute)
  const ip = getClientIP(request);
  const isAllowed = checkRateLimit(ip, 10, 60000);

  if (!isAllowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": "60",
        },
      },
    );
  }

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
    } = {};

    // Run enrichment tasks in parallel
    const results = await Promise.allSettled([
      email ? validateEmail(email) : Promise.resolve(null),
      domain ? fetchCompanyData(domain) : Promise.resolve(null),
      domain ? fetchBrandData(domain) : Promise.resolve(null),
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
