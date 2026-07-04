# Security Implementation Guide

This document describes the comprehensive security measures implemented for the Smidjan contact form and API endpoints.

## Overview

The contact form implements a **defense-in-depth** security strategy with multiple layers of protection:

1. **Rate Limiting** - Prevents abuse and DDoS attacks
2. **CSRF Protection** - Prevents cross-site request forgery
3. **reCAPTCHA v3** - Anti-bot protection
4. **Input Validation** - XSS and injection prevention
5. **Security Logging** - Attack detection and monitoring
6. **Content Security Policy** - Browser-level protection
7. **IP Blocking** - Automatic blocking of malicious IPs

---

## 1. Rate Limiting (Redis-based)

**Location:** `src/lib/redis.ts`

### Configuration
- **Limit:** 3 requests per 10 minutes per IP
- **Storage:** Upstash Redis (production) or in-memory (development)
- **Reset:** Automatic expiration after time window

### Features
- Multi-instance support (shared Redis state)
- Automatic cleanup via Redis TTL
- Returns remaining attempts and reset time
- Graceful fallback to in-memory if Redis unavailable

### Environment Variables
```env
UPSTASH_REDIS_REST_URL=https://your-redis-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token-here
```

### Response on Rate Limit Exceeded
```json
{
  "error": "Trop de requêtes. Veuillez réessayer dans 10 minutes.",
  "resetTime": 1234567890
}
```
**HTTP Status:** 429 Too Many Requests

---

## 2. CSRF Protection

**Location:** `src/lib/csrf.ts`

### How It Works
1. Client fetches CSRF token from `/api/csrf/token`
2. Token is stored in Redis with SHA256 hash
3. Client includes token in form submission
4. Server validates and deletes token (one-time use)

### Token Properties
- **Generation:** 32 bytes random (64 hex characters)
- **Storage:** SHA256 hashed in Redis
- **Expiration:** 1 hour
- **Usage:** One-time use (deleted after validation)

### Integration
```typescript
// Frontend
const response = await fetch('/api/csrf/token');
const { token } = await response.json();

// Include in form submission
await fetch('/api/contact/direct', {
  method: 'POST',
  body: JSON.stringify({ ...formData, csrfToken: token })
});
```

### Response on CSRF Failure
```json
{
  "error": "Token de sécurité invalide. Rechargez la page."
}
```
**HTTP Status:** 403 Forbidden

---

## 3. reCAPTCHA v3 Integration

**Location:** `src/components/contact/SimpleContactForm/SimpleContactForm.tsx`

### Configuration
- **Version:** reCAPTCHA v3 (invisible, score-based)
- **Action:** `contact_form`
- **Score Threshold:** 0.5 (configurable in API route)

### Environment Variables
```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-site-key-here
RECAPTCHA_SECRET_KEY=your-secret-key-here
```

### How It Works
1. Script loaded dynamically on form mount
2. Token generated on form submission
3. Token sent with form data
4. Server verifies with Google reCAPTCHA API
5. Blocks if score < 0.5 or verification fails

### API Verification
```typescript
// Server-side verification
const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
  method: 'POST',
  body: new URLSearchParams({
    secret: process.env.RECAPTCHA_SECRET_KEY,
    response: token,
    remoteip: clientIp,
  }),
});

const data = await response.json();
// data.success: boolean
// data.score: 0.0 to 1.0 (higher = more human-like)
```

### Response on Failure
```json
{
  "error": "Vérification anti-bot échouée. Veuillez réessayer."
}
```
**HTTP Status:** 403 Forbidden

---

## 4. Input Validation & Sanitization

**Location:** `src/app/api/contact/direct/route.ts`

### Frontend Validation
- **Email:** Strict regex + length limit (254 chars)
- **Name:** Min 2 chars, max 100 chars, XSS pattern detection
- **Company:** Max 100 chars, XSS pattern detection
- **Phone:** International validation via `libphonenumber-js`
- **Message:** Min 10 chars, max 5000 chars

### Backend Validation (Duplicate Defense)
All frontend validations are duplicated on the backend, plus:

1. **Whitelist Validation**
   - Request types limited to predefined list
   - Prevents injection of invalid types

2. **XSS Pattern Detection**
   ```typescript
   const xssPattern = /<script|javascript:|on\w+=/i;
   ```

3. **HTML Sanitization**
   ```typescript
   function sanitizeHtml(text: string): string {
     return text
       .replace(/&/g, '&amp;')
       .replace(/</g, '&lt;')
       .replace(/>/g, '&gt;')
       .replace(/"/g, '&quot;')
       .replace(/'/g, '&#x27;')
       .replace(/\//g, '&#x2F;');
   }
   ```

### Validation Errors
All validation errors are logged as security events for monitoring.

---

## 5. Security Event Logging

**Location:** `src/lib/security-logger.ts`

### Event Types
```typescript
enum SecurityEventType {
  RATE_LIMIT_EXCEEDED   // Too many requests
  XSS_ATTEMPT           // XSS pattern detected
  INVALID_INPUT         // Invalid data format
  INVALID_CSRF          // CSRF token validation failed
  SUSPICIOUS_PATTERN    // Unusual behavior detected
  CAPTCHA_FAILED        // reCAPTCHA verification failed
}
```

### Storage
- **Redis Key:** `security_log:{type}:{timestamp}`
- **Retention:** 7 days (automatic expiration)
- **Counters:** Per event type and per IP
- **IP Tracking:** 24-hour rolling window

### IP Blocking
Automatic blocking when IP exceeds 20 violations in 24 hours:

```typescript
export async function isIpBlocked(ip: string): Promise<boolean> {
  const violations = await redis.get(`security_ip:${ip}`);
  return Number(violations) > 20;
}
```

### Monitoring Endpoint
**Endpoint:** `/api/admin/security-stats`

**Response:**
```json
{
  "stats": {
    "rateLimitViolations": 123,
    "xssAttempts": 5,
    "invalidInputs": 45,
    "csrfViolations": 2,
    "suspiciousPatterns": 8,
    "captchaFailures": 67
  },
  "summary": {
    "totalViolations": 250,
    "criticalEvents": 7,
    "rateLimitEvents": 123,
    "botAttempts": 67
  },
  "timestamp": 1234567890
}
```

**TODO:** Add admin authentication to this endpoint

---

## 6. Content Security Policy (CSP)

**Location:** `next.config.ts`

### Key Policies

```typescript
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.google.com https://www.gstatic.com https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' https: data: blob:",
  "connect-src 'self' https://www.google.com https://www.gstatic.com https://vitals.vercel-insights.com",
  "frame-src https://www.google.com https://recaptcha.google.com https://www.recaptcha.net",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests"
].join("; ");
```

### Additional Security Headers

```typescript
{
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  "X-XSS-Protection": "1; mode=block"
}
```

---

## 7. Phone Number Validation

**Library:** `react-phone-number-input` + `libphonenumber-js`

### Features
- International format support
- Country code selection with flags
- Real-time validation
- Prevents invalid phone numbers

### Usage
```typescript
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';

// Validation
if (formData.phone && !isValidPhoneNumber(formData.phone)) {
  errors.phone = 'Numéro de téléphone invalide';
}
```

---

## 8. Company Verification (CBE API)

**Location:** `src/lib/cbeapi.ts`, `/api/company/verify`

### Purpose
Verifies Belgian company registration numbers (BCE/KBO) to:
- Prevent fraud (fake companies)
- Validate business contacts
- Enrich lead data
- Filter inactive companies

### Environment Variable
```env
CBEAPI_SECRET=***MASKED_FOR_SECURITY***
```
**IMPORTANT:** This is a server-side secret and must NEVER be exposed to the client.

### BCE Number Format
- **Length:** 10 digits
- **Format:** `0XXX.XXX.XXX` or `1XXX.XXX.XXX`
- **Validation:** Modulo 97 checksum algorithm

### API Endpoint
**POST** `/api/company/verify`

**Request:**
```json
{
  "bceNumber": "0123.456.749"
}
```

**Response (Success):**
```json
{
  "valid": true,
  "exists": true,
  "active": true,
  "formatted": "0123456749",
  "company": {
    "name": "Example SPRL",
    "status": "active",
    "address": {
      "street": "Rue Example",
      "number": "123",
      "zipCode": "1000",
      "municipality": "Brussels"
    }
  }
}
```

**Response (Invalid Format):**
```json
{
  "valid": false,
  "error": "Invalid BCE number format (must be 10 digits)"
}
```

**Response (Not Found):**
```json
{
  "valid": true,
  "exists": false,
  "error": "Company not found in CBE database"
}
```

### Rate Limiting
- **Limit:** 10 requests per 5 minutes per IP
- **Purpose:** Prevent API abuse while allowing legitimate verification

### Security Features
1. **Format Validation:** Client-side BCE format check before API call
2. **Checksum Validation:** Modulo 97 algorithm validates number integrity
3. **API Verification:** Server-side verification with Belgian government database
4. **Suspicious Pattern Logging:** Logs inactive or non-existent company submissions
5. **Rate Limiting:** Prevents API abuse

### Usage in Contact Form
```typescript
// Optional company verification
const verifyCompany = async (bceNumber: string) => {
  const response = await fetch('/api/company/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ bceNumber }),
  });

  const result = await response.json();

  if (!result.valid) {
    setError('Numéro BCE invalide');
  } else if (!result.exists) {
    setError('Entreprise non trouvée dans la base de données BCE');
  } else if (!result.active) {
    setWarning('Cette entreprise est inactive');
  } else {
    // Auto-fill company name and address
    setCompanyName(result.company.name);
    setCompanyAddress(result.company.address);
  }
};
```

### Security Logging
The following events are logged:
- **Suspicious Pattern:** Inactive company BCE numbers
- **Rate Limit Exceeded:** Too many verification requests
- **Invalid Format:** Malformed BCE numbers (potential probing)

---

## Attack Detection & Response

### Automatic IP Blocking
When an IP accumulates >20 security violations in 24 hours:

1. IP is automatically blocked
2. All requests return 403 Forbidden
3. Security event is logged
4. Counter resets after 24 hours

### Manual Monitoring
Check security stats regularly:
```bash
curl https://smidjan.be/api/admin/security-stats
```

Watch for:
- **High XSS attempts** - Possible targeted attack
- **High CAPTCHA failures** - Bot activity
- **High rate limit violations** - DDoS attempt
- **Spikes in specific IPs** - Coordinated attack

### Response Actions
1. **Minor incidents** - Automatic rate limiting handles
2. **Moderate attacks** - IP auto-blocked after 20 violations
3. **Severe attacks** - Manually block IP ranges in Vercel/Cloudflare
4. **DDoS** - Enable Cloudflare DDoS protection

---

## Setup Instructions

### 1. Install Dependencies
```bash
npm install @upstash/redis react-phone-number-input libphonenumber-js
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local` and fill in:

```env
# Redis (Upstash)
UPSTASH_REDIS_REST_URL=https://your-db.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token

# reCAPTCHA v3
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lc...
RECAPTCHA_SECRET_KEY=6Lc...

# Email (Resend)
RESEND_API_KEY=re_...
```

### 3. Configure reCAPTCHA
1. Go to https://www.google.com/recaptcha/admin
2. Create new site (reCAPTCHA v3)
3. Add domains: `smidjan.be`, `localhost`
4. Copy site key and secret key

### 4. Configure Redis
1. Go to https://console.upstash.com
2. Create new database
3. Copy REST URL and token

### 5. Test Security
```bash
# Test rate limiting
for i in {1..5}; do curl -X POST http://localhost:3000/api/contact/direct; done

# Test CSRF protection
curl -X POST http://localhost:3000/api/contact/direct \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","name":"Test","message":"Test"}'

# Check security stats
curl http://localhost:3000/api/admin/security-stats
```

---

## Security Checklist

- [x] Rate limiting with Redis
- [x] CSRF token protection
- [x] reCAPTCHA v3 integration
- [x] Input validation (frontend + backend)
- [x] XSS prevention (sanitization)
- [x] Security event logging
- [x] IP-based blocking
- [x] Content Security Policy
- [x] HTTPS enforcement
- [x] Security headers
- [x] Phone number validation
- [x] Company verification (CBE API)
- [x] BCE number checksum validation
- [ ] Admin authentication for stats endpoint
- [ ] Email alerts for critical events
- [ ] Automated IP blocklist updates
- [ ] CBE API endpoint URL verification (update with actual endpoint)

---

## Monitoring Best Practices

### Daily Checks
- Review security stats dashboard
- Check for unusual IP patterns
- Monitor rate limit violations

### Weekly Tasks
- Review security logs for patterns
- Update blocklist if needed
- Test reCAPTCHA is working

### Monthly Tasks
- Rotate CSRF token secrets
- Review and update CSP policies
- Audit security event trends

---

## Incident Response

### If Under Attack

1. **Immediate Actions**
   ```bash
   # Check current stats
   curl /api/admin/security-stats

   # Identify attacking IPs from logs
   # Block via Vercel/Cloudflare if needed
   ```

2. **Temporary Measures**
   - Reduce rate limit (change `limit: 3` to `limit: 1`)
   - Increase reCAPTCHA threshold (change `0.5` to `0.7`)
   - Enable Cloudflare "Under Attack" mode

3. **Post-Incident**
   - Review logs to understand attack vector
   - Update security measures if needed
   - Document incident and response

---

## License & Support

For security issues, contact: contact.smidjan@outlook.com

**Do not** publicly disclose security vulnerabilities.
