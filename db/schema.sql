-- ============================================================================
-- LEAD SCORING DATABASE SCHEMA
-- Neon PostgreSQL Database for Smidjan.be
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- TABLE: leads
-- Stocke les leads capturés avec leur scoring complet
-- ============================================================================
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Contact Information
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  phone VARCHAR(50),

  -- Lead Score
  score_total INTEGER NOT NULL CHECK (score_total >= 0 AND score_total <= 100),
  score_grade VARCHAR(10) NOT NULL CHECK (score_grade IN ('HOT', 'WARM', 'COLD', 'SPAM')),
  score_confidence INTEGER NOT NULL CHECK (score_confidence >= 0 AND score_confidence <= 100),
  score_breakdown JSONB NOT NULL, -- {project, engagement, completion, enrichment, behavioral}

  -- Enrichment Data
  enrichment_data JSONB, -- Clearbit, Hunter.io, LinkedIn, etc.
  enrichment_score INTEGER DEFAULT 0,
  confidence_level VARCHAR(10) CHECK (confidence_level IN ('high', 'medium', 'low')),

  -- Quote Data
  project_type VARCHAR(50),
  quote_data JSONB NOT NULL, -- Full quote configuration
  estimate JSONB NOT NULL, -- Pricing estimate

  -- Behavioral Data
  behavioral_data JSONB, -- Session summary
  session_id VARCHAR(100),

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for fast queries
-- Note: Unique constraint per day handled in application logic
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_score_grade ON leads(score_grade);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_project_type ON leads(project_type);
CREATE INDEX IF NOT EXISTS idx_leads_score_total ON leads(score_total DESC);

-- ============================================================================
-- TABLE: sessions
-- Stocke les sessions comportementales des visiteurs
-- ============================================================================
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id VARCHAR(100) UNIQUE NOT NULL,

  -- Session Metadata
  started_at TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_ms INTEGER DEFAULT 0,

  -- Navigation
  visited_pages JSONB NOT NULL DEFAULT '[]', -- Array of {path, title, timeSpent, scrollDepth}
  landing_page VARCHAR(500),
  referrer VARCHAR(500),

  -- UTM Parameters
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),

  -- Device Info
  device VARCHAR(20) CHECK (device IN ('mobile', 'tablet', 'desktop')),
  browser VARCHAR(50),
  os VARCHAR(50),

  -- Wizard Tracking
  wizard_started BOOLEAN DEFAULT FALSE,
  wizard_step INTEGER DEFAULT 0,
  wizard_back_clicks INTEGER DEFAULT 0,
  info_bubbles_opened TEXT[] DEFAULT '{}',

  -- Calculated Scores
  engagement_score INTEGER DEFAULT 0 CHECK (engagement_score >= 0 AND engagement_score <= 100),
  intent_score INTEGER DEFAULT 0 CHECK (intent_score >= 0 AND intent_score <= 100),

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for fast queries
CREATE INDEX IF NOT EXISTS idx_sessions_session_id ON sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_sessions_created_at ON sessions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sessions_engagement_score ON sessions(engagement_score DESC);
CREATE INDEX IF NOT EXISTS idx_sessions_intent_score ON sessions(intent_score DESC);

-- ============================================================================
-- TABLE: events
-- Stocke les événements de tracking détaillés
-- ============================================================================
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id VARCHAR(100) NOT NULL,

  -- Event Data
  type VARCHAR(20) NOT NULL CHECK (type IN ('click', 'scroll', 'hover', 'form_focus')),
  element VARCHAR(255) NOT NULL,
  timestamp BIGINT NOT NULL,

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Foreign Key (soft, for cleanup purposes)
  CONSTRAINT fk_session FOREIGN KEY (session_id) REFERENCES sessions(session_id) ON DELETE CASCADE
);

-- Index for fast queries
CREATE INDEX IF NOT EXISTS idx_events_session_id ON events(session_id);
CREATE INDEX IF NOT EXISTS idx_events_type ON events(type);
CREATE INDEX IF NOT EXISTS idx_events_created_at ON events(created_at DESC);

-- ============================================================================
-- TABLE: quotes (existing quotes from old system - for compatibility)
-- ============================================================================
CREATE TABLE IF NOT EXISTS quotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Contact Info
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  phone VARCHAR(50),

  -- Quote Data
  project_type VARCHAR(50),
  estimate JSONB NOT NULL,
  quote_data JSONB NOT NULL,

  -- Old Lead Score (for backward compatibility)
  lead_score INTEGER,

  -- UTM
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  form_start_time BIGINT,
  submission_timestamp BIGINT
);

CREATE INDEX IF NOT EXISTS idx_quotes_email ON quotes(email);
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quotes(created_at DESC);

-- ============================================================================
-- FUNCTIONS: Auto-update timestamps
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for auto-updating updated_at
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sessions_updated_at BEFORE UPDATE ON sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ANALYTICS VIEWS (for easy querying)
-- ============================================================================

-- View: Leads by Grade
CREATE OR REPLACE VIEW leads_by_grade AS
SELECT
  score_grade,
  COUNT(*) as count,
  AVG(score_total) as avg_score,
  AVG(score_confidence) as avg_confidence
FROM leads
GROUP BY score_grade;

-- View: Leads by Project Type
CREATE OR REPLACE VIEW leads_by_project_type AS
SELECT
  project_type,
  score_grade,
  COUNT(*) as count,
  AVG(score_total) as avg_score
FROM leads
GROUP BY project_type, score_grade
ORDER BY project_type, score_grade;

-- View: Daily Lead Stats
CREATE OR REPLACE VIEW daily_lead_stats AS
SELECT
  DATE(created_at) as date,
  COUNT(*) as total_leads,
  COUNT(*) FILTER (WHERE score_grade = 'HOT') as hot_leads,
  COUNT(*) FILTER (WHERE score_grade = 'WARM') as warm_leads,
  COUNT(*) FILTER (WHERE score_grade = 'COLD') as cold_leads,
  AVG(score_total) as avg_score
FROM leads
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- ============================================================================
-- CLEANUP FUNCTION (for archiving old data)
-- ============================================================================
CREATE OR REPLACE FUNCTION cleanup_old_events(months_to_keep INTEGER DEFAULT 3)
RETURNS TABLE(deleted_count BIGINT) AS $$
BEGIN
  RETURN QUERY
  WITH deleted AS (
    DELETE FROM events
    WHERE created_at < NOW() - INTERVAL '1 month' * months_to_keep
    RETURNING *
  )
  SELECT COUNT(*) FROM deleted;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- SEED DATA (for testing)
-- ============================================================================
-- Uncomment to insert test data
/*
INSERT INTO leads (email, name, company, score_total, score_grade, score_confidence, score_breakdown, quote_data, estimate, project_type)
VALUES
  ('test@example.com', 'Jean Test', 'Test Corp', 85, 'HOT', 92,
   '{"project": 27, "engagement": 22, "completion": 18, "enrichment": 10, "behavioral": 8}'::jsonb,
   '{"projectType": "ecommerce", "features": []}'::jsonb,
   '{"min": 8000, "max": 12000}'::jsonb,
   'ecommerce');
*/

-- ============================================================================
-- SUMMARY
-- ============================================================================
-- Tables créées:
--   1. leads       - Leads avec scoring complet
--   2. sessions    - Sessions comportementales
--   3. events      - Événements de tracking détaillés
--   4. quotes      - Ancien système (compatibilité)
--
-- Index créés pour performance optimale
-- Views analytiques pour reporting facile
-- Function de cleanup pour archivage
-- ============================================================================
