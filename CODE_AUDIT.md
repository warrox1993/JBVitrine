# CODE_AUDIT.md — audit code approfondi (bugs / dead code / doublons / sécurité)

> Audit **lecture seule** (subagent-driven / Superpowers) du 2026-07-07. 6 agents "find" par zone + vérification adversariale des findings bug/sécurité high/critical (défaut = faux positif sauf preuve). **Aucune correction n'est appliquée** — validation attendue avant tout fix.

**Total candidats : 38** (bug: 14, security: 6, dead-code: 16, duplication: 2). Vérifiés : 2 · confirmés faux positifs écartés : 0.

## Synthèse priorisée (findings retenus)

| Sévérité | Dim | Fichier:ligne | Titre |
|---|---|---|---|
| 🟠 HIGH | security | `src/app/api/contact/direct/route.ts:24` | contact/direct trusts spoofable X-Forwarded-For for rate-limit key, IP-block enforcement, and security-event attribution |
| 🟠 HIGH | bug | `src/app/api/admin/leads/digest/route.ts:14` | Daily lead-digest cron never runs: route only accepts POST but Vercel Cron sends GET |
| 🟡 MEDIUM | bug | `src/components/features/contact/QuoteWizard/steps/Step5Contact.tsx:294` | Timeline selected on Step5 is silently discarded (data loss) |
| 🟡 MEDIUM | bug | `src/lib/blogActions.ts:103` | Blog CRUD writes to the read-only serverless filesystem (broken in prod) |
| 🟡 MEDIUM | bug | `src/lib/blogActions.ts:75` | getAllArticles swallows read/parse errors to [], letting createArticle wipe the whole blog file |
| 🟡 MEDIUM | security | `src/app/api/leadScoring/enrich/route.ts:268` | Enrichment endpoint allows third-party paid-API quota / cost exhaustion (100/min, reCAPTCHA effectively off, Origin-CSRF bypassable by non-browser clients) |
| 🟡 MEDIUM | security | `src/app/api/leadScoring/leads/route.ts:130` | Unauthenticated leadScoring/leads POST can be forced to fire HOT-lead notifications (email/Slack/Discord) by a scripted attacker |
| 🟡 MEDIUM | security | `src/app/api/admin/reset-rate-limit/route.ts:53` | ADMIN_SECRET secondary gate fails open when the env var is unset |
| 🟡 MEDIUM | bug | `src/lib/security/ssrf.ts:92` | assertPublicHost blocks every real domain (isBlockedIp called on a hostname) |
| 🟡 MEDIUM | bug | `src/app/api/contact/direct/route.ts:55` | /api/contact/direct uses the weak 20/hour limiter instead of the 3/hour anti-spam policy |
| 🟡 MEDIUM | dead-code | `src/lib/recommendations/engine.ts:45` | Entire recommendations module is dead (~1500 lines) |
| 🟡 MEDIUM | duplication | `src/app/api/quote/email-templates.ts:7` | Email HTML skeleton copy-pasted across two route files while the intended shared abstraction sits dead |
| 🟡 MEDIUM | dead-code | `src/components/Pagination/Pagination.tsx:1` | Dead Pagination component keeps two unused deps (bootstrap, react-bootstrap) in the tree |
| 🔵 LOW | bug | `src/components/features/contact/QuoteWizard/steps/Step5Contact.tsx:204` | Client rate-limit slot consumed on validation failure, locking out legit users |
| 🔵 LOW | security | `src/components/features/contact/QuoteWizard/FeatureTooltip.tsx:155` | parseMarkdown feeds unescaped HTML into dangerouslySetInnerHTML |
| 🔵 LOW | dead-code | `src/components/features/contact/QuoteWizard/steps/Step2Features.tsx:23` | Orphaned wizard step component (replaced by StepCategorySelection) |
| 🔵 LOW | dead-code | `src/components/features/contact/QuoteWizard/LeadScoreIndicator.tsx:1` | Orphaned LeadScoreIndicator component |
| 🔵 LOW | dead-code | `src/components/features/contact/Accordion.tsx:1` | Orphaned Accordion and admin DeleteButton components |
| 🔵 LOW | dead-code | `src/components/ui/Card.tsx:1` | Unused UI primitives (Card, Input, Textarea, Select, Label, Stack, SectionWithBackground, Pagination) |
| 🔵 LOW | dead-code | `src/lib/email/templates.ts:1` | Entire email/templates.ts and email/styles.ts are unused (~493 lines), incl. a weaker duplicate escapeHtml |
| 🔵 LOW | bug | `src/lib/blogActions.ts:39` | notifyGoogleSearchConsole pings a Google endpoint that was removed in 2023 |
| 🔵 LOW | bug | `src/lib/notifications/index.ts:157` | getLeadColor cast masks a missing SPAM key -> Discord notify would throw for non-HOT/WARM grades |
| 🔵 LOW | bug | `src/lib/cbeapi.ts:112` | verifyCompanyWithCBE calls a placeholder CBE endpoint that does not exist |
| 🔵 LOW | bug | `src/app/api/leadScoring/events/route.ts:97` | Event batch elements are inserted with no per-field validation |
| 🔵 LOW | bug | `src/app/api/quote/route.ts:386` | Quote team-notification failure returns 500 after the quote is already persisted and confirmation email sent, causing duplicate submissions |
| 🔵 LOW | dead-code | `src/lib/rate-limit-redis.ts:156` | Unused duplicate checkRateLimit helper (name collides with the one actually used) |
| 🔵 LOW | security | `src/app/api/admin/reset-rate-limit/route.ts:53` | Non-constant-time comparison of ADMIN_SECRET |
| 🔵 LOW | bug | `src/lib/csrf.ts:33` | CSRF token is global/one-time-use, not bound to session or IP; ip param is dead |
| 🔵 LOW | dead-code | `src/lib/validation/index.ts:90` | validateCompany / validateMessage / isValidContentType are never imported; validateCompany also crashes on undefined |
| 🔵 LOW | bug | `src/lib/markdown.ts:103` | sanitize-html keeps a[target] without forcing rel=noopener and allows data: img URIs |
| 🔵 LOW | dead-code | `src/components/icons/AboutIcon.tsx:1` | 15 of 21 hand-rolled icon components are unused |
| 🔵 LOW | dead-code | `src/components/features/contact/QuoteWizard/steps/Step2Features.tsx:1` | Orphaned wizard steps after refactor to category flow |
| 🔵 LOW | dead-code | `src/lib/email/templates.ts:11` | Dead shared email-template pair (templates.ts + styles.ts) |
| 🔵 LOW | dead-code | `src/hooks/useIntersectionObserver.ts:10` | Three unused custom hooks |
| 🔵 LOW | dead-code | `src/components/features/contact/ContactModeSelector/ContactModeSelector.tsx:15` | Dead ContactModeSelector component + barrel |
| 🔵 LOW | dead-code | `src/components/features/blog/blogSidebar.items.tsx:5` | Dead blogSidebar.items.tsx (cascades two icons to dead) |
| 🔵 LOW | dead-code | `src/components/ui/Input.tsx:4` | Unused UI primitives and stray dead components |
| 🔵 LOW | duplication | `src/lib/pricing/leadScoring.ts:295` | Two lead-scoring engines both invoked by QuoteWizard, with colliding export names |

---

## Détail

### 🟠 HIGH · security · contact/direct trusts spoofable X-Forwarded-For for rate-limit key, IP-block enforcement, and security-event attribution
`src/app/api/contact/direct/route.ts:24` (zone: api-public)

getClientIp() (lines 24-28) returns `forwarded?.split(",")[0] || real` — it prioritizes the fully client-controlled left-most X-Forwarded-For entry, the exact spoofable pattern the team already hardened away in getClientIdentifier (lib/rate-limit-redis.ts:96-145, which uses trusted x-real-ip). This clientIp (line 33) is used as: (1) the rate-limit key for checkRateLimit(clientIp,...,'contact_direct') (line 55), (2) the isIpBlocked() lookup (line 37), and (3) the `ip` field on every logSecurityEvent call, which increments Redis `security_ip:<ip>` (security-logger.ts:41). isIpBlocked() returns true once that counter exceeds 20 (security-logger.ts:114-120). Two concrete exploits: (a) Rate-limit / anti-abuse bypass — an attacker rotates X-Forwarded-For per request to get a fresh bucket each time. (b) Victim IP-block poisoning (persistent DoS) — the attacker sets `X-Forwarded-For: <victimIP>` and sends ~21 requests that fail the CSRF check (line 93) or the rate limit (line 60); each failure logs a security event attributed to the victim's IP, pushing `security_ip:<victimIP>` past 20, so isIpBlocked() then returns 403 for that legitimate user for 24h. Note the CSRF-failure and rate-limit-exceeded logging both fire BEFORE any reCAPTCHA check, so poisoning requires no reCAPTCHA token. Fix: derive the IP from getClientIdentifier (trusted x-real-ip) as the other public routes do.

### 🟠 HIGH · bug · Daily lead-digest cron never runs: route only accepts POST but Vercel Cron sends GET
`src/app/api/admin/leads/digest/route.ts:14` (zone: api-admin-auth)

vercel.json declares a cron on "/api/admin/leads/digest" (schedule "0 9 * * *"). Vercel Cron Jobs invoke the target path with a GET request (adding an Authorization: Bearer <CRON_SECRET> header). The route handler only exports POST (src/app/api/admin/leads/digest/route.ts:14) — there is no GET export. Result: every scheduled invocation hits the path with GET, no handler matches, and Next.js returns 405 Method Not Allowed. The daily lead digest email is therefore never sent in production. The middleware correctly whitelists this exact path for auth (middleware.ts:132), and the CRON_SECRET check in the handler is correct — but it is unreachable via the actual cron trigger. Failure scenario: cron fires at 09:00 -> GET /api/admin/leads/digest -> 405 -> no digest email ever delivered; the feature has been silently dead since the route was authored as POST-only.

### 🟡 MEDIUM · bug · Timeline selected on Step5 is silently discarded (data loss)
`src/components/features/contact/QuoteWizard/steps/Step5Contact.tsx:294` (zone: components-hooks)

When a user reaches the final contact step without having picked a timeline earlier, the wizard renders the timeline chooser (line 416, `!quoteData.timeline`). Selecting an option only calls `handleTimelineChange` (line 294-296) which sets local `selectedTimeline` state (line 52-53) used purely for button highlighting. The value is NEVER written back to `quoteData.timeline` and is NOT added to the `contactInfo` object built in handleSubmit (line 262-271, which has no `timeline` field), and there is no parent callback to update quoteData. Failure scenario: a lead fills the whole quote, explicitly picks 'ASAP' as their timeline on the last step, submits successfully, and the timeline is dropped — the estimate/lead payload sent to /api/quote and /api/leadScoring/leads always carries `timeline: null`, so pricing and sales prioritization lose a field the UI actively collected.

### 🟡 MEDIUM · bug · Blog CRUD writes to the read-only serverless filesystem (broken in prod)
`src/lib/blogActions.ts:103` (zone: lib-data)

createArticle/updateArticle/deleteArticle persist by fs.writeFile to BLOG_DATA_PATH = process.cwd()/src/data/blogArticles.json (lines 103, 140, 172). On Vercel (per project memory, deploys are git-push to Vercel) the function filesystem is read-only except /tmp, so process.cwd() writes throw EROFS. Failure scenario: an authenticated 'sales' user submits a new/edited article in production -> fs.writeFile rejects -> caught at line 110/150/179 -> user always gets the generic 'Erreur lors de la création/mise à jour de l'article' and no change is saved. Even if a write somehow succeeded, each serverless instance holds its own ephemeral copy, so it would never propagate or survive a redeploy. The blog admin is non-functional in prod; articles can only be changed via committed JSON.

### 🟡 MEDIUM · bug · getAllArticles swallows read/parse errors to [], letting createArticle wipe the whole blog file
`src/lib/blogActions.ts:75` (zone: lib-data)

getAllArticles() catches any fs.readFile or JSON.parse failure and returns [] (lines 75-78). createArticle() then does `articles = await getAllArticles(); articles.push(article); writeFile({articles})` (lines 93-103). Failure scenario: if blogArticles.json is transiently unreadable or ever contains a parse error (e.g. a partially-written file, encoding issue, or a concurrent write), getAllArticles returns [] instead of throwing; createArticle happily writes a file containing ONLY the one new article, silently destroying all ~existing articles (238 KB of content). The same read-modify-write full-file pattern also has no locking, so two concurrent create/update/delete calls race and the last writer clobbers the other's change (lost update).

### 🟡 MEDIUM · security · Enrichment endpoint allows third-party paid-API quota / cost exhaustion (100/min, reCAPTCHA effectively off, Origin-CSRF bypassable by non-browser clients)
`src/app/api/leadScoring/enrich/route.ts:268` (zone: api-public)

enrichmentLimiter is 100 requests/min per IP (lib/rate-limit-redis.ts:64-69); the in-file NOTE at lines 263-265 acknowledges it should be lowered to ~5/min but it is not. reCAPTCHA is only checked `if (recaptchaToken)` (lines 305-312) and the current client sends none, so it is skipped. The only remaining gate is validateCSRF (Origin/Referer, line 294), which stops browser cross-site abuse but NOT a scripted attacker who simply sends `Origin: https://smidjan.be` via curl. Each accepted request fans out to Hunter.io email-verifier + Hunter.io domain-search + Brandfetch (validateEmail/fetchCompanyData/fetchBrandData, lines 340-345) — up to 3 metered/paid third-party calls plus an outbound HEAD. A single spoofed-Origin client can therefore drive ~100*3 = 300 paid API calls per minute per IP, exhausting Hunter/Brandfetch quota and running up billing (financial DoS). Gate with mandatory reCAPTCHA and/or drop the limiter to the documented ~5/min.

### 🟡 MEDIUM · security · Unauthenticated leadScoring/leads POST can be forced to fire HOT-lead notifications (email/Slack/Discord) by a scripted attacker
`src/app/api/leadScoring/leads/route.ts:130` (zone: api-public)

The POST handler is unauthenticated; reCAPTCHA is only verified `if (recaptchaToken)` (lines 130-137) and the client sends none, leaving Origin-based validateCSRF (line 113) as the sole gate — which a non-browser attacker bypasses by setting the Origin header. score.total is clamped to [0,100] (clampScore, line 190) but is fully client-supplied, so an attacker submits score.total=100, which server-side gradeFromScore() maps to grade 'HOT' (line 192), and the handler then dynamically imports and calls notifyNewLead() for every HOT/WARM lead (lines 262-284) — dispatching email + Slack + Discord notifications. Bounded only by leadScoringLimiter at 100/min per IP (lib/rate-limit-redis.ts:86-91), an attacker (spoofing Origin, optionally rotating the trusted IP) can flood the team with up to ~100 notification bursts/min and pollute the leads table with forged HOT rows. Make reCAPTCHA mandatory here or throttle notification dispatch.

### 🟡 MEDIUM · security · ADMIN_SECRET secondary gate fails open when the env var is unset
`src/app/api/admin/reset-rate-limit/route.ts:53` (zone: api-admin-auth)

The route guards with guardRoute("admin") and then adds a second factor: `if (secret !== process.env.ADMIN_SECRET) return 401`. If ADMIN_SECRET is not configured in the environment, process.env.ADMIN_SECRET is undefined; a request body that omits `secret` also yields `undefined`, so `undefined !== undefined` is false and the check is a no-op — the intended secret gate silently disappears. This is the opposite of the fail-CLOSED pattern used by the sibling digest endpoint (digest/route.ts:18-21 returns 503 when CRON_SECRET is missing). Failure scenario: ADMIN_SECRET is never provisioned (or gets dropped in a deploy); any authenticated admin session can then flush arbitrary IPs' rate-limit keys with `{"ipToReset":"x.x.x.x"}` and no secret at all, removing the second control the code intends to require. Impact is bounded because admin auth is still required, but the second factor is defeated by misconfiguration rather than enforced.

### 🟡 MEDIUM · bug · assertPublicHost blocks every real domain (isBlockedIp called on a hostname)
`src/lib/security/ssrf.ts:92` (zone: lib-security)

assertPublicHost() calls isBlockedIp(host) at line 92 with the raw FQDN. isBlockedIp treats any string without exactly 4 dotted octets as blocked (line 27: `if (parts.length !== 4) return true`). Verified: isBlockedIp('example.com'), isBlockedIp('sub.example.co.uk'), isBlockedIp('a.b.c.d') all return true. So assertPublicHost throws 'SSRF blocked: IP literal' for EVERY normal hostname before the DNS lookup at line 95 is ever reached. Its only caller, detectTechStack() in src/app/api/leadScoring/enrich/route.ts:177, wraps this in try/catch and returns null, so tech-stack detection is entirely dead — it never fetches any site. Fails closed (no SSRF hole; the undici pinnedDispatcher would re-check anyway), but the domain code path is broken. The intent (block only when host is literally a private IP) needs an is-this-an-IP guard before calling isBlockedIp.

### 🟡 MEDIUM · bug · /api/contact/direct uses the weak 20/hour limiter instead of the 3/hour anti-spam policy
`src/app/api/contact/direct/route.ts:55` (zone: lib-security)

There are two parallel rate-limit systems: the Upstash sliding-window limiters in src/lib/rate-limit-redis.ts (contactLimiter = 3/hour, used by /api/contact and /api/quote) and the fixed-window checkRateLimit in src/lib/redis.ts (default limit 20/hour in prod, src/lib/redis.ts:26). /api/contact/direct calls checkRateLimit(clientIp, undefined, 'contact_direct') with config undefined, so it silently inherits the 20/hour default — ~6-7x more permissive than the intended 3/hour anti-spam limit applied to the other contact/quote endpoints. An attacker can send ~20 direct-contact submissions per hour per IP. (Not flagging the 3/hour value itself — flagging that this endpoint bypasses it.) The two duplicate checkRateLimit functions + duplicate Redis client init (redis.ts vs rate-limit-redis.ts) are the root cause of the inconsistency.

### 🟡 MEDIUM · dead-code · Entire recommendations module is dead (~1500 lines)
`src/lib/recommendations/engine.ts:45` (zone: deadcode-dup-global)

The whole src/lib/recommendations/ tree — engine.ts (527 lines), rules.ts (924 lines), index.ts (49 lines) — is never imported anywhere. Grepped every public export repo-wide (createRecommendationEngine, RecommendationEngine, groupRecommendationsByPriority, getCriticalRecommendations, ALL_RULES, legalRules/technicalRules/bestPracticeRules/consistencyRules, bundles, etc.); the only hits are inside the module itself. The 'product-recommendations' matches in src/lib/pricing are unrelated feature ids. 1500 lines of untested, unreachable business logic that reads as live code — pure maintenance/confusion tax and audit noise. Delete the directory.

### 🟡 MEDIUM · duplication · Email HTML skeleton copy-pasted across two route files while the intended shared abstraction sits dead
`src/app/api/quote/email-templates.ts:7` (zone: deadcode-dup-global)

src/app/api/contact/email-templates.ts (316 lines) and src/app/api/quote/email-templates.ts (371 lines) each inline the full Smidjan email skeleton (identical <!DOCTYPE> boilerplate, linear-gradient(135deg,#ff6a00,#ffc43a) header, footer with contact@smidjan.be, per-field table rows). Meanwhile src/lib/email/templates.ts (createContactConfirmationEmail/createAdminNotificationEmail/createQuoteConfirmationEmail) + src/lib/email/styles.ts (EMAIL_STYLES) were clearly built to be the shared layout but are imported by nothing — the abstraction exists yet both routes duplicate it. Side effect of the copy-paste: quote/email-templates.ts never imports escapeHtml (contact's does), so the two branches escape user input inconsistently. Consolidate onto one templating module and delete the dead lib/email pair.

### 🟡 MEDIUM · dead-code · Dead Pagination component keeps two unused deps (bootstrap, react-bootstrap) in the tree
`src/components/Pagination/Pagination.tsx:1` (zone: deadcode-dup-global)

src/components/Pagination/Pagination.tsx is never imported (grep of 'Pagination' and 'components/Pagination' repo-wide finds only self-references). It is the ONLY importer of react-bootstrap, which is the only reason the bootstrap package is present (no bootstrap CSS is imported anywhere in src). Both 'bootstrap' and 'react-bootstrap' in package.json are therefore unused production dependencies — dead supply-chain surface and bundle weight. Remove the file and both deps.

### 🔵 LOW · bug · Client rate-limit slot consumed on validation failure, locking out legit users
`src/components/features/contact/QuoteWizard/steps/Step5Contact.tsx:204` (zone: components-hooks)

In handleSubmit the localStorage rate-limit counter is incremented (recentSubmissions.push(now) + setItem, lines 204-205) BEFORE `validateForm()` runs (line 211) and before reCAPTCHA. Every attempt that clears the honeypot/timing gates but fails validation (e.g. forgot the consent checkbox, invalid email) still burns one of the 20/hour slots. Failure scenario: a user who mistypes their email or forgets consent 20 times in an hour hits `step5.globalRateLimit` and is blocked from submitting a valid quote for the rest of the hour, even though no submission ever reached the server. The counter should only be recorded after a successful (or at least valid) submission.

### 🔵 LOW · security · parseMarkdown feeds unescaped HTML into dangerouslySetInnerHTML
`src/components/features/contact/QuoteWizard/FeatureTooltip.tsx:155` (zone: components-hooks)

parseMarkdown (line 14-18) only converts `**bold**` and newlines and does NOT HTML-escape the input, then the result is injected via dangerouslySetInnerHTML (line 155). Currently the only caller passes `feature.explanation` from the static pricing/features config (StepCategorySelection.tsx:135), so it is not exploitable today. It is a latent XSS sink: if that content ever becomes CMS/DB/i18n-editor sourced, any `<img onerror=...>` in an explanation string executes. Escape the text before applying the bold/newline transforms.

### 🔵 LOW · dead-code · Orphaned wizard step component (replaced by StepCategorySelection)
`src/components/features/contact/QuoteWizard/steps/Step2Features.tsx:23` (zone: components-hooks)

Step2Features and its sibling Step3DesignSEO (src/components/features/contact/QuoteWizard/steps/Step3DesignSEO.tsx:20) are never imported anywhere — QuoteWizard.tsx now imports StepCategorySelection instead (lines 20-24). Confirmed 0 external references via repo-wide grep. Both files (plus their .module.css) are dead code left over from the wizard refactor and should be removed to avoid confusion during future edits.

### 🔵 LOW · dead-code · Orphaned LeadScoreIndicator component
`src/components/features/contact/QuoteWizard/LeadScoreIndicator.tsx:1` (zone: components-hooks)

LeadScoreIndicator is not imported by any file (0 external references confirmed by grep). It is a standalone component with its own CSS module that is never rendered. Dead code.

### 🔵 LOW · dead-code · Orphaned Accordion and admin DeleteButton components
`src/components/features/contact/Accordion.tsx:1` (zone: components-hooks)

components/features/contact/Accordion.tsx and components/features/admin/DeleteButton.tsx are each imported nowhere (0 external references). Note DeleteButton is distinct from the actually-used DeleteArticleButton.tsx / features/admin no-op — verify before deleting. Both are dead code carrying their own CSS modules.

### 🔵 LOW · dead-code · Unused UI primitives (Card, Input, Textarea, Select, Label, Stack, SectionWithBackground, Pagination)
`src/components/ui/Card.tsx:1` (zone: components-hooks)

Repo-wide grep shows 0 imports for the UI primitives components/ui/Card.tsx, ui/Input.tsx, ui/Textarea.tsx, ui/Select.tsx, ui/Label.tsx, ui/Stack.tsx, plus components/ui/SectionWithBackground/SectionWithBackground.tsx and components/Pagination/Pagination.tsx. Forms use raw <input>/<textarea>/<select> (see ContactForm.tsx, Step5Contact.tsx) rather than these primitives, so the design-system wrappers are orphaned. Note two parallel breadcrumb implementations also coexist (components/Breadcrumb vs components/ui/Breadcrumbs), both live but duplicative.

### 🔵 LOW · dead-code · Entire email/templates.ts and email/styles.ts are unused (~493 lines), incl. a weaker duplicate escapeHtml
`src/lib/email/templates.ts:1` (zone: lib-data)

createEmailTemplate/createContactConfirmationEmail/createAdminNotificationEmail/createQuoteConfirmationEmail (templates.ts) and EMAIL_STYLES (styles.ts) have zero importers — every live email route uses its own template files under src/app/api/*/email-templates.ts and the canonical escapeHtml from @/lib/security/escape. templates.ts also ships its own escapeHtml/nl2br (lines 245-261) and interpolates message/firstName/subject WITHOUT escaping (e.g. line 104, 157-165); it is harmless only because nothing calls it. Failure scenario: a future dev imports these 'ready-made' helpers, reintroducing HTML/attribute injection into admin emails. Delete both files or route callers through the sanitized route templates.

### 🔵 LOW · bug · notifyGoogleSearchConsole pings a Google endpoint that was removed in 2023
`src/lib/blogActions.ts:39` (zone: lib-data)

notifyGoogleSearchConsole() GETs https://www.google.com/ping?sitemap=... on every article create/update/delete (lines 36-52). Google deprecated and removed the sitemap-ping endpoint in June 2023; it now returns 404, so response.ok is false and the code just logs '⚠️ Échec notification Google' every time. Failure scenario: dead/ineffective outbound request adds latency and noise to every (already-failing, see above) blog mutation and never actually notifies Search Console. It should be removed or replaced with the Search Console API / IndexNow.

### 🔵 LOW · bug · getLeadColor cast masks a missing SPAM key -> Discord notify would throw for non-HOT/WARM grades
`src/lib/notifications/index.ts:157` (zone: lib-data)

getLeadColor (constants/colors.ts:72) only maps HOT/WARM/COLD; LEAD_COLORS has no SPAM entry. sendSlackNotification (line 66) and sendDiscordNotification (line 157) cast lead.grade as 'HOT'|'WARM'|'COLD' to satisfy the type, but the grade can be 'SPAM'. For Discord, getLeadColor('SPAM') returns undefined and line 158 does `parseInt(hexColor.replace('#',''),16)` -> TypeError 'Cannot read properties of undefined (reading replace)'. Currently unreachable because notifyNewLead is only invoked for server-recomputed HOT/WARM (leadScoring/leads/route.ts:262), so it is a latent defect, not live. Failure scenario: any future direct call of these exports with a COLD/SPAM lead (or adding COLD/SPAM to the notify gate) crashes the Discord path. Give getLeadColor a SPAM color and a safe fallback instead of casting.

### 🔵 LOW · bug · verifyCompanyWithCBE calls a placeholder CBE endpoint that does not exist
`src/lib/cbeapi.ts:112` (zone: lib-data)

verifyCompanyWithCBE fetches https://kbopub.economie.fgov.be/kbopub/api/v1/enterprises/{number} (line 111-119), which the inline comment admits is a guessed placeholder ('The actual CBE API endpoint may differ'). kbopub exposes an HTML search form, not this JSON REST API. Failure scenario: if CBEAPI_SECRET is configured, every /api/company/verify call for a format-valid, real company hits a non-existent path; a 404 is interpreted as 'company doesn't exist' (lines 122-127), so legitimate BCE numbers are reported exists:false, and any other status throws -> valid:false. The feature is currently inert only because CBEAPI_SECRET is presumably unset (returns 'API not configured'). No SSRF risk (input is constrained to 10 digits by formatBCENumber), but the integration is functionally wrong.

### 🔵 LOW · bug · Event batch elements are inserted with no per-field validation
`src/app/api/leadScoring/events/route.ts:97` (zone: api-public)

After validating only that `events` is an array and length <= 500 (lines 62-83), the loop at lines 97-110 passes event.type / event.element / event.timestamp straight into db.events.create() with no runtime checks. db.events.create's TypeScript signature types `type` as an enum ('click'|'scroll'|'hover'|'form_focus') and timestamp as number, but nothing enforces that at runtime, so arbitrary strings/objects reach the INSERT. Queries are parameterized (no SQL injection), but malformed rows either persist as garbage or throw per-event (swallowed at line 106, silently lowering savedCount and returning success:true). Validate each event's shape/enum before insert.

### 🔵 LOW · bug · Quote team-notification failure returns 500 after the quote is already persisted and confirmation email sent, causing duplicate submissions
`src/app/api/quote/route.ts:386` (zone: api-public)

The quote is written to the DB (lines 336-350) and the user confirmation email is sent (line 378, non-throwing) BEFORE sendQuoteNotificationToTeam is awaited (line 386). That function deliberately re-throws on any Resend error (line 518), which propagates to the outer catch and returns a 500 'Erreur serveur. Veuillez réessayer.' (lines 411-417). A transient team-email hiccup therefore shows the user a failure even though their quote was captured; the user retries and a duplicate quote row + duplicate confirmation email are produced. Decouple team-notification failure from the request outcome (log/queue it) instead of failing the already-completed submission.

### 🔵 LOW · dead-code · Unused duplicate checkRateLimit helper (name collides with the one actually used)
`src/lib/rate-limit-redis.ts:156` (zone: api-public)

rate-limit-redis.ts exports a checkRateLimit(limiter, request) helper (lines 156-201) that is never imported anywhere — every `import { checkRateLimit } from ...` in the public routes (contact/direct/route.ts:3, company/verify/route.ts:3) resolves to a DIFFERENT function of the same name in lib/redis.ts. The public routes that do rate-limit via this module call `limiter.limit()` directly instead. This is dead code whose identical name to the live lib/redis.ts helper invites confusion (and note the dead copy 'fails open' on Redis error, line 199, unlike the callers). Remove it.

### 🔵 LOW · security · Non-constant-time comparison of ADMIN_SECRET
`src/app/api/admin/reset-rate-limit/route.ts:53` (zone: api-admin-auth)

The ADMIN_SECRET comparison uses plain string inequality `secret !== process.env.ADMIN_SECRET`, which short-circuits character-by-character and is not timing-safe. The digest endpoint deliberately uses crypto.timingSafeEqual for the analogous CRON_SECRET check (digest/route.ts:25-29), so this route is inconsistent with the codebase's own standard. Failure scenario: an already-authenticated lower-effort attacker (or a compromised sales session probing role escalation) could in principle use response-timing to recover ADMIN_SECRET byte-by-byte. Severity is low because reaching this line already requires an admin session (guardRoute("admin")), and network jitter makes remote timing attacks impractical, but the fix (timingSafeEqual on equal-length buffers) is trivial and matches the digest handler.

### 🔵 LOW · bug · CSRF token is global/one-time-use, not bound to session or IP; ip param is dead
`src/lib/csrf.ts:33` (zone: lib-security)

storeCsrfToken (line 15) and validateCsrfToken (line 32) key tokens solely on hashToken(token) (key `csrf:<hash>`); the `ip` parameter is accepted but never used (comment at line 16 documents this). The token is therefore not bound to any cookie/session/user — any client can GET /api/csrf/token and reuse the returned token, so the CSRF token by itself provides no CSRF protection; the actual protection is the Origin/Referer check in src/lib/api/middleware.ts (validateCSRF). For the current unauthenticated public forms this is acceptable, but the token adds a false sense of protection and the one-time-use del (line 45) can also cause spurious 'invalid CSRF' failures on double-submit/retries. Recommend binding the token to a cookie/session or dropping it in favor of the origin check.

### 🔵 LOW · dead-code · validateCompany / validateMessage / isValidContentType are never imported; validateCompany also crashes on undefined
`src/lib/validation/index.ts:90` (zone: lib-security)

Grep across the repo shows validateCompany (line 90), validateMessage (line 108) and isValidContentType (line 54) are never imported anywhere — only validateEmail, validatePhone, validateName and sanitizeString are used. The contact/quote routes therefore never enforce message min/max length or company length/charset via these helpers, so length/charset limits meant to live in this 'single source of truth' are not actually applied. Separately, validateCompany dereferences company.length at line 91 without a null/undefined guard, so if it were ever called with an optional/undefined company it throws a TypeError (500) instead of returning a validation message.

### 🔵 LOW · bug · sanitize-html keeps a[target] without forcing rel=noopener and allows data: img URIs
`src/lib/markdown.ts:103` (zone: lib-security)

The new sanitize-html config is otherwise sound — no script/style/iframe/form/on* handlers survive and js: URLs are blocked by allowedSchemes, so I found no XSS bypass. Two residual weaknesses: (1) allowedAttributes.a includes 'target' (line 103) and marked passes raw inline HTML through, so authored markdown containing `<a href=https://evil target=_blank>` is kept with target but no rel=noopener/noreferrer is forced, enabling reverse-tabnabbing (window.opener). (2) img allows the data: scheme (allowedSchemesByTag.img, line 112), permitting arbitrary data: image payloads. Impact is low because markdownToHtml is only fed admin-authored blog content (src/app/[locale]/(site)/blog/[slug]/page.tsx:260), not end-user input. Consider enforcing rel on target=_blank and dropping data: from img.

### 🔵 LOW · dead-code · 15 of 21 hand-rolled icon components are unused
`src/components/icons/AboutIcon.tsx:1` (zone: deadcode-dup-global)

Only 6 icons are imported anywhere (MenuIcon, CloseIcon, SunIcon, MoonIcon via Navigation/ThemeToggle, plus BookOpenIcon/GridIcon which are only used by the also-dead blogSidebar.items.tsx). The other 15 are never referenced (grep of each export name outside its own file returns 0): AboutIcon, ShieldCheckIcon, ArrowRightIcon, HelpCircleIcon, MessageSquareIcon, MailIcon, CheckIcon, ProcessIcon, SparklesIcon, UsersIcon, HomeIcon, CompassIcon, TargetIcon, ServicesIcon, WorkflowIcon. They also duplicate the icon set already provided by src/components/ui/Icon/Icon.tsx and lucide-react. Dead files.

### 🔵 LOW · dead-code · Orphaned wizard steps after refactor to category flow
`src/components/features/contact/QuoteWizard/steps/Step2Features.tsx:1` (zone: deadcode-dup-global)

QuoteWizard.tsx imports only Step1ProjectType, StepCodeOwnership, StepCategorySelection, Step4Summary, Step5Contact (lines 20-24). Step2Features.tsx and Step3DesignSEO.tsx are never imported (grep repo-wide finds only their own files). They are leftovers from the pre-category fixed-step wizard. Dead files.

### 🔵 LOW · dead-code · Dead shared email-template pair (templates.ts + styles.ts)
`src/lib/email/templates.ts:11` (zone: deadcode-dup-global)

src/lib/email/templates.ts (261 lines) and src/lib/email/styles.ts (232 lines) are never imported by any route (routes import only @/lib/email/resend-client). templates.ts imports styles.ts internally, but nothing imports templates.ts. Confirmed each export unused repo-wide: createEmailTemplate, createContactConfirmationEmail, createAdminNotificationEmail, createQuoteConfirmationEmail, escapeHtml/nl2br (templates.ts), EMAIL_STYLES/combineStyles (styles.ts). Note templates.ts also re-defines escapeHtml, duplicating src/lib/security/escape.ts. Dead files (see also the email-duplication finding).

### 🔵 LOW · dead-code · Three unused custom hooks
`src/hooks/useIntersectionObserver.ts:10` (zone: deadcode-dup-global)

useIntersectionObserver (src/hooks/useIntersectionObserver.ts:10), useMagneticButton (src/hooks/useMagneticButton.ts:9), and useScrollSpy (src/hooks/useScrollSpy.ts:5) are never imported — grep of each name outside its own file returns 0. Dead files.

### 🔵 LOW · dead-code · Dead ContactModeSelector component + barrel
`src/components/features/contact/ContactModeSelector/ContactModeSelector.tsx:15` (zone: deadcode-dup-global)

ContactModeSelector (component, its index.ts barrel, and ContactModeSelector.module.css) is only self-referenced; no page or form imports it. Grep of 'ContactModeSelector' shows only the three files inside its own directory. Dead directory.

### 🔵 LOW · dead-code · Dead blogSidebar.items.tsx (cascades two icons to dead)
`src/components/features/blog/blogSidebar.items.tsx:5` (zone: deadcode-dup-global)

Exports blogSidebarItems and blogArticleSidebarItems (line 5 and 10); neither is imported anywhere. It is also the sole importer of BookOpenIcon and GridIcon, so removing it makes those two icons dead as well. Dead file.

### 🔵 LOW · dead-code · Unused UI primitives and stray dead components
`src/components/ui/Input.tsx:4` (zone: deadcode-dup-global)

Several components are exported but never imported repo-wide (each verified by grepping the export name outside its own file): src/components/ui/Input.tsx:4 (Input), src/components/ui/Textarea.tsx:6 (Textarea), src/components/ui/SectionWithBackground/SectionWithBackground.tsx:15, src/components/features/contact/Accordion.tsx:16, src/components/features/contact/QuoteWizard/LeadScoreIndicator.tsx:15, src/components/features/admin/DeleteButton.tsx:13 (superseded by the actually-used DeleteArticleButton.tsx), and src/app/PreloadRemover.tsx:5 (default export, not referenced in either layout). Dead files.

### 🔵 LOW · duplication · Two lead-scoring engines both invoked by QuoteWizard, with colliding export names
`src/lib/pricing/leadScoring.ts:295` (zone: deadcode-dup-global)

QuoteWizard computes a lead score two independent ways: directly via calculateLeadScore from src/lib/pricing/leadScoring.ts (imported QuoteWizard.tsx:15) and via the behavioral RealTimeLeadScorer from src/lib/leadScoring/realTimeScorer.ts (through useLeadScoring, QuoteWizard.tsx:89). Both modules even export a function named getRecommendedAction (pricing/leadScoring.ts:295 returns a string; realTimeScorer.ts:451 returns an object) — same concept, divergent shapes and thresholds. This parallel scoring logic risks the two paths disagreeing on lead quality; consolidate to a single scoring source of truth.

