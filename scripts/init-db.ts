/**
 * Database Initialization Script
 *
 * Execute the schema.sql file to create all tables, indexes, and views
 *
 * Usage:
 *   npx tsx scripts/init-db.ts
 */

import dotenv from "dotenv";
import { Client } from "pg";
import fs from "fs";
import path from "path";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

async function initDatabase() {
  console.log("🚀 Initializing Neon database...\n");

  // Check if DATABASE_URL is set
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("❌ ERROR: DATABASE_URL not found in environment variables");
    console.error("   Please add it to .env.local or .env.development.local\n");
    process.exit(1);
  }

  const client = new Client({ connectionString: databaseUrl });

  try {
    await client.connect();
    console.log("✅ Connected to Neon database\n");

    // Read schema.sql
    const schemaPath = path.join(process.cwd(), "db", "schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf-8");

    console.log("📄 Executing schema.sql...\n");

    // Execute the entire schema as a single query
    // The pg client handles multi-statement SQL properly
    await client.query(schema);

    console.log("✅ Schema executed successfully!\n");

    // Verify tables were created
    console.log("🔍 Verifying tables...\n");

    const tablesResult = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);

    console.log("📊 Tables created:");
    tablesResult.rows.forEach((table: any) => {
      console.log(`   - ${table.table_name}`);
    });

    console.log("\n✅ Database initialization complete!\n");
    console.log("🎯 Next steps:");
    console.log("   1. Visit Neon Console SQL Editor to verify");
    console.log("   2. Test the connection with: npx tsx scripts/test-db.ts");
    console.log("   3. Start using the lead scoring system!\n");
  } catch (error) {
    console.error("❌ Error initializing database:", error);
    console.error("\nTroubleshooting:");
    console.error("   1. Check that DATABASE_URL is correct");
    console.error("   2. Ensure you have access to the Neon database");
    console.error(
      "   3. Try running the schema.sql manually in Neon Console\n",
    );
    process.exit(1);
  } finally {
    await client.end();
  }
}

// Run the initialization
initDatabase();
