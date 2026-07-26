/**
 * Database Connection Module
 *
 * Centralizes database access using Neon Serverless Driver
 */

import { neon } from "@neondatabase/serverless";
import type { NeonQueryFunction } from "@neondatabase/serverless";

let _sql: NeonQueryFunction<false, false> | null = null;

function getSql(): NeonQueryFunction<false, false> {
  if (_sql) return _sql;

  const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL or POSTGRES_URL is not defined. Please add it to your environment variables.",
    );
  }
  _sql = neon(databaseUrl);
  return _sql;
}

/**
 * SQL query executor (tagged template) — la connexion est ouverte au 1er appel.
 */
export const sql = ((strings: TemplateStringsArray, ...values: unknown[]) =>
  getSql()(strings, ...values)) as NeonQueryFunction<false, false>;

/**
 * Type-safe query helpers
 */
export const db = {
  /**
   * Execute a raw SQL query
   */
  query: sql,

  /**
   * Leads table operations
   */
  leads: {
    /**
     * Create a new lead
     */
    async create(lead: {
      email: string;
      name: string;
      company?: string;
      phone?: string;
      score_total: number;
      score_grade: "HOT" | "WARM" | "COLD" | "SPAM";
      score_confidence: number;
      score_breakdown: Record<string, number>;
      enrichment_data?: Record<string, any>;
      enrichment_score?: number;
      confidence_level?: "high" | "medium" | "low";
      project_type?: string;
      quote_data: Record<string, any>;
      estimate: Record<string, any>;
      behavioral_data?: Record<string, any>;
      session_id?: string;
    }) {
      const result = await sql`
        INSERT INTO leads (
          email, name, company, phone,
          score_total, score_grade, score_confidence, score_breakdown,
          enrichment_data, enrichment_score, confidence_level,
          project_type, quote_data, estimate,
          behavioral_data, session_id
        ) VALUES (
          ${lead.email},
          ${lead.name},
          ${lead.company || null},
          ${lead.phone || null},
          ${lead.score_total},
          ${lead.score_grade},
          ${lead.score_confidence},
          ${JSON.stringify(lead.score_breakdown)},
          ${lead.enrichment_data ? JSON.stringify(lead.enrichment_data) : null},
          ${lead.enrichment_score || 0},
          ${lead.confidence_level || null},
          ${lead.project_type || null},
          ${JSON.stringify(lead.quote_data)},
          ${JSON.stringify(lead.estimate)},
          ${lead.behavioral_data ? JSON.stringify(lead.behavioral_data) : null},
          ${lead.session_id || null}
        )
        RETURNING *;
      `;

      return result[0];
    },

    /**
     * Find leads by email
     */
    async findByEmail(email: string) {
      const result = await sql`
        SELECT * FROM leads
        WHERE email = ${email}
        ORDER BY created_at DESC;
      `;

      return result;
    },

    /**
     * Get all leads with pagination
     */
    async getAll(options: { limit?: number; offset?: number } = {}) {
      const limit = options.limit || 50;
      const offset = options.offset || 0;

      const result = await sql`
        SELECT * FROM leads
        ORDER BY created_at DESC
        LIMIT ${limit}
        OFFSET ${offset};
      `;

      return result;
    },

    /**
     * Get leads by grade.
     *
     * Paginated like getAll: an unbounded variant returned the ENTIRE matching
     * set, which bypassed the caller's `limit <= 100` clamp and made
     * `?grade=HOT` a full-table dump (unbounded memory + bandwidth).
     */
    async getByGrade(
      grade: "HOT" | "WARM" | "COLD" | "SPAM",
      options: { limit?: number; offset?: number } = {},
    ) {
      const limit = options.limit || 50;
      const offset = options.offset || 0;

      const result = await sql`
        SELECT * FROM leads
        WHERE score_grade = ${grade}
        ORDER BY created_at DESC
        LIMIT ${limit}
        OFFSET ${offset};
      `;

      return result;
    },

    /**
     * Get hot leads (for priority follow-up)
     */
    async getHotLeads(options: { limit?: number } = {}) {
      const limit = options.limit || 50;

      const result = await sql`
        SELECT * FROM leads
        WHERE score_grade = 'HOT'
        ORDER BY created_at DESC
        LIMIT ${limit};
      `;

      return result;
    },

    /**
     * Delete leads older than `monthsToKeep`.
     *
     * GDPR (art. 5.1.e "storage limitation" / art. 17): the leads table holds
     * email, name, company, phone plus enrichment/behavioural JSONB, and nothing
     * in the schema or the cron config ever expired it — retention was unlimited
     * by default. Called by /api/admin/leads/cleanup.
     */
    async deleteOlderThan(monthsToKeep: number): Promise<number> {
      // Math.max(1, NaN) is NaN, not 1 — the clamp alone does NOT make this
      // safe. A non-finite value must fall back explicitly, because a zero or
      // negative interval turns `created_at < NOW() - INTERVAL * n` into a
      // condition every row satisfies: the whole table is deleted.
      const months = Number.isFinite(monthsToKeep)
        ? Math.max(1, Math.floor(monthsToKeep))
        : 1;

      const result = await sql`
        WITH deleted AS (
          DELETE FROM leads
          WHERE created_at < NOW() - (INTERVAL '1 month' * ${months})
          RETURNING id
        )
        SELECT COUNT(*)::int AS deleted_count FROM deleted;
      `;

      return Number(result[0]?.deleted_count ?? 0);
    },
  },

  /**
   * Sessions table operations
   */
  sessions: {
    /**
     * Create or update a session
     */
    async upsert(session: {
      session_id: string;
      started_at: Date;
      duration_ms?: number;
      visited_pages?: Array<any>;
      landing_page?: string;
      referrer?: string;
      utm_source?: string;
      utm_medium?: string;
      utm_campaign?: string;
      device?: "mobile" | "tablet" | "desktop";
      browser?: string;
      os?: string;
      wizard_started?: boolean;
      wizard_step?: number;
      wizard_back_clicks?: number;
      info_bubbles_opened?: string[];
      engagement_score?: number;
      intent_score?: number;
    }) {
      const result = await sql`
        INSERT INTO sessions (
          session_id, started_at, duration_ms, visited_pages,
          landing_page, referrer,
          utm_source, utm_medium, utm_campaign,
          device, browser, os,
          wizard_started, wizard_step, wizard_back_clicks,
          info_bubbles_opened, engagement_score, intent_score
        ) VALUES (
          ${session.session_id},
          ${session.started_at.toISOString()},
          ${session.duration_ms || 0},
          ${session.visited_pages ? JSON.stringify(session.visited_pages) : "[]"},
          ${session.landing_page || null},
          ${session.referrer || null},
          ${session.utm_source || null},
          ${session.utm_medium || null},
          ${session.utm_campaign || null},
          ${session.device || null},
          ${session.browser || null},
          ${session.os || null},
          ${session.wizard_started || false},
          ${session.wizard_step || 0},
          ${session.wizard_back_clicks || 0},
          ${session.info_bubbles_opened || []},
          ${session.engagement_score || 0},
          ${session.intent_score || 0}
        )
        ON CONFLICT (session_id)
        DO UPDATE SET
          duration_ms = EXCLUDED.duration_ms,
          visited_pages = EXCLUDED.visited_pages,
          wizard_started = EXCLUDED.wizard_started,
          wizard_step = EXCLUDED.wizard_step,
          wizard_back_clicks = EXCLUDED.wizard_back_clicks,
          info_bubbles_opened = EXCLUDED.info_bubbles_opened,
          engagement_score = EXCLUDED.engagement_score,
          intent_score = EXCLUDED.intent_score,
          updated_at = NOW()
        RETURNING *;
      `;

      return result[0];
    },

    /**
     * Find session by ID
     */
    async findById(sessionId: string) {
      const result = await sql`
        SELECT * FROM sessions
        WHERE session_id = ${sessionId}
        LIMIT 1;
      `;

      return result[0];
    },

    /**
     * Delete sessions older than `monthsToKeep`.
     *
     * Sessions store navigation history, referrer, UTM and device fingerprint
     * data. The events table cascades on session_id (see db/schema.sql), so this
     * also removes the associated behavioural events.
     */
    async deleteOlderThan(monthsToKeep: number): Promise<number> {
      // Math.max(1, NaN) is NaN, not 1 — the clamp alone does NOT make this
      // safe. A non-finite value must fall back explicitly, because a zero or
      // negative interval turns `created_at < NOW() - INTERVAL * n` into a
      // condition every row satisfies: the whole table is deleted.
      const months = Number.isFinite(monthsToKeep)
        ? Math.max(1, Math.floor(monthsToKeep))
        : 1;

      const result = await sql`
        WITH deleted AS (
          DELETE FROM sessions
          WHERE created_at < NOW() - (INTERVAL '1 month' * ${months})
          RETURNING id
        )
        SELECT COUNT(*)::int AS deleted_count FROM deleted;
      `;

      return Number(result[0]?.deleted_count ?? 0);
    },
  },

  /**
   * Events table operations
   */
  events: {
    /**
     * Create an event
     */
    async create(event: {
      session_id: string;
      type: "click" | "scroll" | "hover" | "form_focus";
      element: string;
      timestamp: number;
    }) {
      const result = await sql`
        INSERT INTO events (session_id, type, element, timestamp)
        VALUES (
          ${event.session_id},
          ${event.type},
          ${event.element},
          ${event.timestamp}
        )
        RETURNING *;
      `;

      return result[0];
    },

    /**
     * Get events for a session
     */
    async getBySessionId(sessionId: string) {
      const result = await sql`
        SELECT * FROM events
        WHERE session_id = ${sessionId}
        ORDER BY timestamp ASC;
      `;

      return result;
    },

    /**
     * Delete events older than `monthsToKeep`.
     *
     * db/schema.sql defines a cleanup_old_events() function, but nothing in the
     * repo ever called it (no cron, no script), so behavioural events also
     * accumulated indefinitely.
     */
    async deleteOlderThan(monthsToKeep: number): Promise<number> {
      // Math.max(1, NaN) is NaN, not 1 — the clamp alone does NOT make this
      // safe. A non-finite value must fall back explicitly, because a zero or
      // negative interval turns `created_at < NOW() - INTERVAL * n` into a
      // condition every row satisfies: the whole table is deleted.
      const months = Number.isFinite(monthsToKeep)
        ? Math.max(1, Math.floor(monthsToKeep))
        : 1;

      const result = await sql`
        WITH deleted AS (
          DELETE FROM events
          WHERE created_at < NOW() - (INTERVAL '1 month' * ${months})
          RETURNING id
        )
        SELECT COUNT(*)::int AS deleted_count FROM deleted;
      `;

      return Number(result[0]?.deleted_count ?? 0);
    },
  },

  /**
   * Quotes table operations (for backward compatibility)
   */
  quotes: {
    /**
     * Create a quote
     */
    async create(quote: {
      email: string;
      name: string;
      company?: string;
      phone?: string;
      project_type?: string;
      estimate: Record<string, any>;
      quote_data: Record<string, any>;
      lead_score?: number;
      utm_source?: string;
      utm_medium?: string;
      utm_campaign?: string;
      form_start_time?: number;
      submission_timestamp?: number;
    }) {
      const result = await sql`
        INSERT INTO quotes (
          email, name, company, phone,
          project_type, estimate, quote_data, lead_score,
          utm_source, utm_medium, utm_campaign,
          form_start_time, submission_timestamp
        ) VALUES (
          ${quote.email},
          ${quote.name},
          ${quote.company || null},
          ${quote.phone || null},
          ${quote.project_type || null},
          ${JSON.stringify(quote.estimate)},
          ${JSON.stringify(quote.quote_data)},
          ${quote.lead_score || null},
          ${quote.utm_source || null},
          ${quote.utm_medium || null},
          ${quote.utm_campaign || null},
          ${quote.form_start_time || null},
          ${quote.submission_timestamp || null}
        )
        RETURNING *;
      `;

      return result[0];
    },

    /**
     * Delete quotes older than `monthsToKeep`.
     *
     * GDPR: this table carries the same direct identifiers as `leads` (email,
     * name, company, phone) plus the full quote payload. It was left out of the
     * first retention job, so it kept its data indefinitely while the rest of
     * the system reported compliance.
     */
    async deleteOlderThan(monthsToKeep: number): Promise<number> {
      const months = Number.isFinite(monthsToKeep)
        ? Math.max(1, Math.floor(monthsToKeep))
        : 1;

      const result = await sql`
        WITH deleted AS (
          DELETE FROM quotes
          WHERE created_at < NOW() - (INTERVAL '1 month' * ${months})
          RETURNING id
        )
        SELECT COUNT(*)::int AS deleted_count FROM deleted;
      `;

      return Number(result[0]?.deleted_count ?? 0);
    },
  },

  /**
   * Retention helpers (read-only counterpart of the deleteOlderThan methods).
   */
  retention: {
    /**
     * Count what a purge WOULD delete, without deleting anything.
     *
     * Backs the dry-run mode of /api/admin/leads/cleanup: the deletes are
     * irreversible, so the operator must be able to see the blast radius first.
     */
    async countOlderThan(windows: {
      leads: number;
      sessions: number;
      events: number;
    }): Promise<{
      events: number;
      sessions: number;
      leads: number;
      quotes: number;
    }> {
      const clamp = (n: number) =>
        Number.isFinite(n) ? Math.max(1, Math.floor(n)) : 1;
      const [ev, se, le, qu] = [
        clamp(windows.events),
        clamp(windows.sessions),
        clamp(windows.leads),
        clamp(windows.leads),
      ];

      const [events, sessions, leads, quotes] = await Promise.all([
        sql`SELECT COUNT(*)::int AS c FROM events   WHERE created_at < NOW() - (INTERVAL '1 month' * ${ev})`,
        sql`SELECT COUNT(*)::int AS c FROM sessions WHERE created_at < NOW() - (INTERVAL '1 month' * ${se})`,
        sql`SELECT COUNT(*)::int AS c FROM leads    WHERE created_at < NOW() - (INTERVAL '1 month' * ${le})`,
        sql`SELECT COUNT(*)::int AS c FROM quotes   WHERE created_at < NOW() - (INTERVAL '1 month' * ${qu})`,
      ]);

      return {
        events: Number(events[0]?.c ?? 0),
        sessions: Number(sessions[0]?.c ?? 0),
        leads: Number(leads[0]?.c ?? 0),
        quotes: Number(quotes[0]?.c ?? 0),
      };
    },
  },

  /**
   * Analytics queries
   */
  analytics: {
    /**
     * Get leads by grade
     */
    async getLeadsByGrade() {
      const result = await sql`SELECT * FROM leads_by_grade;`;
      return result;
    },

    /**
     * Get leads by project type
     */
    async getLeadsByProjectType() {
      const result = await sql`SELECT * FROM leads_by_project_type;`;
      return result;
    },

    /**
     * Get daily lead stats
     */
    async getDailyLeadStats(days: number = 30) {
      const result = await sql`
        SELECT * FROM daily_lead_stats
        LIMIT ${days};
      `;
      return result;
    },
  },
};

export default db;
