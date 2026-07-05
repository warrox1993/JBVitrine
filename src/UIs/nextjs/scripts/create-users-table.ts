/**
 * Create users table for NextAuth.js authentication
 */

import { config } from "dotenv";
import { resolve } from "path";

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), ".env.local") });

import { neon } from "@neondatabase/serverless";
import * as bcrypt from "bcryptjs";
import { randomBytes } from "crypto";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const sql = neon(process.env.DATABASE_URL);

async function createUsersTable() {
  console.log("🚀 Creating users table...");

  try {
    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255),
        password_hash TEXT NOT NULL,
        role VARCHAR(50) DEFAULT 'viewer' CHECK (role IN ('admin', 'sales', 'viewer')),
        is_active BOOLEAN DEFAULT true,
        last_login TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    console.log("✅ Users table created");

    // Create index on email for faster lookups
    await sql`
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)
    `;

    console.log("✅ Index on email created");

    // Create trigger for updated_at
    await sql`
      CREATE OR REPLACE FUNCTION update_users_updated_at()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `;

    await sql`
      DROP TRIGGER IF EXISTS update_users_updated_at ON users;
    `;

    await sql`
      CREATE TRIGGER update_users_updated_at
      BEFORE UPDATE ON users
      FOR EACH ROW
      EXECUTE FUNCTION update_users_updated_at();
    `;

    console.log("✅ Trigger for updated_at created");

    // Create default admin user with a strong, random password.
    // Prefer ADMIN_INITIAL_PASSWORD if provided (e.g. for reproducible/CI seeding),
    // otherwise generate a fresh random password for this run.
    const generatedPassword = randomBytes(24).toString("base64url");
    const usedGeneratedPassword = !process.env.ADMIN_INITIAL_PASSWORD;
    const plainPassword =
      process.env.ADMIN_INITIAL_PASSWORD || generatedPassword;
    const passwordHash = await bcrypt.hash(plainPassword, 12);

    const existingUsers = await sql`
      SELECT email FROM users WHERE email = 'contact.smidjan@outlook.com'
    `;

    if (existingUsers.length === 0) {
      await sql`
        INSERT INTO users (email, name, password_hash, role)
        VALUES ('contact.smidjan@outlook.com', 'Admin', ${passwordHash}, 'admin')
      `;

      console.log("✅ Default admin user created");
      console.log("");
      console.log("📧 Email: contact.smidjan@outlook.com");
      if (usedGeneratedPassword) {
        console.log(`🔑 Password (generated, shown once): ${plainPassword}`);
        console.log(
          "⚠️  Record this password now — it will not be shown again. Change it after first login.",
        );
      } else {
        console.log(
          "🔑 Password: set from ADMIN_INITIAL_PASSWORD env var (not printed).",
        );
      }
    } else {
      console.log("ℹ️  Admin user already exists, skipping...");
    }

    console.log("");
    console.log("✅ Users table setup complete!");
  } catch (error) {
    console.error("❌ Error creating users table:", error);
    throw error;
  }
}

createUsersTable()
  .then(() => {
    console.log("✅ Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Failed:", error);
    process.exit(1);
  });
