/**
 * Database Connection Test
 *
 * Test the connection to Neon and insert a sample lead
 *
 * Usage:
 *   npx tsx scripts/test-db.ts
 */

import dotenv from "dotenv";
import { neon } from "@neondatabase/serverless";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

async function testDatabase() {
  console.log("🧪 Testing Neon database connection...\n");

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("❌ DATABASE_URL not found");
    process.exit(1);
  }

  try {
    const sql = neon(databaseUrl);

    // Test 1: Simple query
    console.log("Test 1: Simple query...");
    const result =
      await sql`SELECT NOW() as current_time, version() as pg_version`;
    console.log("✅ Connection successful!");
    console.log(`   Current time: ${result[0].current_time}`);
    console.log(
      `   PostgreSQL: ${result[0].pg_version.split(" ")[0]} ${result[0].pg_version.split(" ")[1]}\n`,
    );

    // Test 2: Check if tables exist
    console.log("Test 2: Checking tables...");
    const tables = await sql`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `;

    if (tables.length === 0) {
      console.log("⚠️  No tables found. Run: npx tsx scripts/init-db.ts\n");
      return;
    }

    console.log(`✅ Found ${tables.length} tables:`);
    tables.forEach((table: any) => console.log(`   - ${table.table_name}`));
    console.log("");

    // Test 3: Insert test lead
    console.log("Test 3: Inserting test lead...");
    const testLead = await sql`
      INSERT INTO leads (
        email, name, company, phone,
        score_total, score_grade, score_confidence,
        score_breakdown, quote_data, estimate, project_type
      ) VALUES (
        'contact.smidjan@outlook.com',
        'Test User',
        'Smidjan Test',
        '+32 123 456 789',
        85,
        'HOT',
        92,
        '{"project": 27, "engagement": 22, "completion": 18, "enrichment": 10, "behavioral": 8}'::jsonb,
        '{"projectType": "ecommerce", "features": ["payment", "inventory"]}'::jsonb,
        '{"min": 8000, "max": 12000, "timeline": "8-12 semaines"}'::jsonb,
        'ecommerce'
      )
      RETURNING id, email, score_grade, score_total;
    `;

    console.log("✅ Test lead created/updated:");
    console.log(`   ID: ${testLead[0].id}`);
    console.log(`   Email: ${testLead[0].email}`);
    console.log(
      `   Grade: ${testLead[0].score_grade} (${testLead[0].score_total}/100)\n`,
    );

    // Test 4: Query leads
    console.log("Test 4: Querying leads...");
    const leads = await sql`
      SELECT
        id, email, name, company,
        score_grade, score_total, score_confidence,
        project_type, created_at
      FROM leads
      ORDER BY created_at DESC
      LIMIT 5;
    `;

    console.log(`✅ Found ${leads.length} leads:`);
    leads.forEach((lead: any, index: number) => {
      console.log(`   ${index + 1}. ${lead.name} (${lead.email})`);
      console.log(
        `      Grade: ${lead.score_grade} | Score: ${lead.score_total}/100 | Project: ${lead.project_type}`,
      );
    });
    console.log("");

    // Test 5: Analytics view
    console.log("Test 5: Testing analytics view...");
    const stats = await sql`SELECT * FROM leads_by_grade;`;

    if (stats.length > 0) {
      console.log("✅ Leads by grade:");
      stats.forEach((stat: any) => {
        console.log(
          `   ${stat.score_grade}: ${stat.count} leads (avg score: ${Math.round(stat.avg_score)})`,
        );
      });
    } else {
      console.log("ℹ️  No leads yet in the database");
    }

    console.log("\n✅ All tests passed! Database is ready to use.\n");
  } catch (error) {
    console.error("❌ Test failed:", error);
    process.exit(1);
  }
}

testDatabase();
