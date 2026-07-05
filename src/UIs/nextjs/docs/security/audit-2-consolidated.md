# Audit sécurité approfondi #2 — Findings consolidés (Smidjan / Next.js 16)

Source : 5 auditeurs Opus (AuthZ/IDOR · Injection/XSS/SSRF · Secrets/CSP/Crypto · DoS/Abus/Client · Deps/Next.js). Dédoublonné. Branche `refonte-securite-build`. Base : commit `2f4c19c`.

Légende : 🔴 Critique · 🟠 Élevé · 🟡 Moyen · 🔵 Faible · ⚪ Info/durcissement.

---

## ⚠️ ACTIONS UTILISATEUR (hors code — je ne peux pas les faire)

- **U1 🔴 Compte admin `admin123`** — `scripts/create-users-table.ts` seed un `role=admin` avec pwd `admin123`. **Réinitialiser ce compte en base** (ou me demander un reset sécurisé). Je corrige le script (V-W1).
- **U2 🔴 Rotation des secrets** — `.env.local` (tiré de Vercel) contient les vraies clés ; passées par l'outillage → **roter toutes** (Neon, NextAuth, Resend, Hunter, Brandfetch, CBE, Upstash, Google) dans Vercel + consoles.
- **U3 🟠 Vercel env manquants** — ajouter `CRON_SECRET` (sinon digest 503) et `ADMIN_SECRET` (Production).
- **U4 🔵 Restreindre la clé Google Maps** par referrer `*.smidjan.be` (console Google).

---

## WORK-PACKAGES (corrections code)

### V-W1 🔴 Server Actions blog sans authz  [A1 · Aud3 F2 · Aud5 F1]
`src/lib/blogActions.ts` — `createArticle:85`, `updateArticle:112`, `deleteArticle:154` : AUCUN `requireAuth`. Invoquées directement côté client (`DeleteArticleButton.tsx`, `DeleteButton.tsx`, `ArticleEditor.tsx`) → endpoint POST `Next-Action` invocable vers route publique = mutation non authentifiée.
**Fix** : `await requireAuth("sales")` en tête de create/update/delete. Idéalement séparer lectures (getAllArticles/getArticleBySlug) des mutations dans 2 modules.
**+ Script** : `scripts/create-users-table.ts:73,88` → pwd aléatoire (`randomBytes`), bcrypt cost 12, retirer `console.log` du mot de passe.

### V-W2 🔴 Chaîne `/api/leadScoring/*` non authentifiée  [A4 · Aud4 F1 · Aud5 F2/F3/F6/F9]
Routes POST `leads`, `events`, `session`, `enrich` : ni auth, ni CSRF, ni reCAPTCHA, ni validation. Conséquences : email/Slack/Discord bomb (grade `HOT` client → `notifyNewLead`), pollution DB, score/grade falsifiés (scoring 100% client), burn quota Hunter/Brandfetch (enrich), boucle DB non bornée (events), blobs non bornés (session).
**Fix** :
- `leads` POST : `validateContentType` + `validateCSRF` + `validateRecaptcha("lead_capture")` + validation stricte (whitelist `grade ∈ {HOT,WARM,COLD,SPAM}`, `validateEmail/validateName`, bornes) ; **recalculer le score côté serveur** (ne pas faire confiance au `score` client) ; throttle notifications.
- `events` : borner `events.length ≤ 50`, insert par lot, CSRF/contentType.
- `session` : limite de taille + schéma, CSRF, id de session lié à un cookie signé serveur (cf. V-W7).
- `enrich` : reCAPTCHA + CSRF, limite ↓ (5/min), quota journalier global Hunter/Brandfetch.
- Limite de taille de payload sur toutes ces routes (`Content-Length`/tailles).

### V-W3 🔴 Upgrade Next.js  [Aud3 F1]
`next@16.1.1` → cluster CVE runtime (bypass middleware, SSRF WebSocket CVSS 8.6, DoS RSC, XSS nonce).
**Fix** : `npm i next@^16.2.6 eslint-config-next@^16.2.6` ; `npm update preact` (≥10.27.3) ; `npm audit fix` (devDeps) ; retirer `@fortawesome/fontawesome-free` (0 import). Vérifier `npm run build` + `npm run lint`.

### V-W4 🟠 Encodage de sortie — emails + exports + JSON-LD  [Aud4 F2/F4/F5 · Aud5 F7/F10 · A4]
`sanitizeString` n'encode PAS le HTML. Champs lead/contact/quote interpolés bruts dans :
- Emails HTML : `lib/notifications/index.ts:251-267`, `api/admin/leads/digest/route.ts:197-234`, `api/quote/email-templates.ts:177-340`, `api/contact/email-templates.ts:186-247`, `api/contact/direct/route.ts:309-329`.
- Slack/Discord : `lib/notifications/index.ts:53,139,144`.
- Exports : `api/admin/leads/export/csv/route.ts:54-66` (préfixe formule `= + - @ \t \r` manquant), `export/excel/route.ts:57-80` (escapeXML seulement sur name/company).
- JSON-LD : `app/(site)/blog/[slug]/page.tsx:819,852` — `JSON.stringify` n'échappe pas `<` → breakout `</script>`.
- Markdown : `lib/markdown.ts:41,74` — `title`/`language` non échappés (backstop DOMPurify, défense en profondeur).
**Fix** : helper `escapeHtml()` partagé, appliqué à TOUTES les valeurs dynamiques des templates HTML ; `escapeCsvCell()` (préfixe apostrophe) pour le CSV ; `escapeXML` sur TOUS les champs Excel ; JSON-LD via `JSON.stringify(x).replace(/</g,'\\u003c')` ; échapper title/language dans le renderer markdown ; texte brut assaini pour Slack/Discord.

### V-W5 🟠 CSP à nonces + en-têtes  [Sec F2 · Aud3 F3 · Aud4 F3 · Aud5 F17]
`next.config.ts` : `script-src 'unsafe-inline' 'unsafe-eval'` en prod → défense XSS annulée.
**Fix** : générer un nonce par requête dans `middleware.ts`, propager, écrire `script-src 'self' 'nonce-{N}' 'strict-dynamic' https://www.google.com https://www.gstatic.com https://maps.googleapis.com https://va.vercel-scripts.com` ; retirer `'unsafe-inline'` + `'unsafe-eval'` (garder `'unsafe-inline'` conditionnel au dev) ; `vercel.live` hors prod. Retirer `X-XSS-Protection`. `img-src` : remplacer `https:` par whitelist. Évaluer `dangerouslyAllowSVG:false`.
**⚠️ Risque** : peut casser des scripts inline (JSON-LD, analytics, Maps, reCAPTCHA) → vérifier en dev server + preview avant prod. À faire APRÈS V-W3 (upgrade corrige le bug de nonce Next).

### V-W6 🟠 Rate-limiting & auth robustes  [A2/A3/A5/A8 · Aud5 F4/F5]
- `lib/rate-limit-redis.ts:103` + dupes locaux (`contact/direct`, `company/verify`, `csrf/token`) : clé = `x-forwarded-for[0]` spoofable → utiliser l'IP de confiance plateforme (dernier hop), pas le segment gauche ; ne pas retomber sur un fingerprint client.
- `lib/auth/index.ts:45-60` : login **fail-closed** si Redis KO (ne pas avaler l'erreur). `csrf/token` : ne pas fail-open.
- `lib/auth/index.ts:117-135,172` : revalider `is_active`/rôle (relire DB dans callback `jwt` périodiquement + `if(!user.isActive) throw` dans `requireAuth`) ; réduire `maxAge` (1-2 h).
- `lib/auth/index.ts:70-92` : dummy `bcrypt.compare` si user inexistant (anti-timing enumeration).
- `lib/api/middleware.ts:50` : bypass localhost par égalité exacte + `NODE_ENV!=="production"` uniquement.

### V-W7 🟡 IDOR/BOLA session + hardening admin/company  [A6/A7/A10 · Aud5 F8/F11/F14]
- `session/events` : lier `sessionId` à un cookie signé serveur (ne pas accepter un id libre) → recoupe V-W2.
- `api/admin/blog/*` : ajouter `validateCSRF` explicite (défense en profondeur, pas que SameSite).
- `api/company/verify` : `validateCSRF` + reCAPTCHA + limite stricte.
- `api/admin/reset-rate-limit` : corriger les préfixes périmés (`smidjan_v4_quote`…), `redis.keys()`→`SCAN`, valider le format IP (pas de `*`).
- Pages `(admin)/settings` & `(admin)/auditlogs` (répondent à `/settings`,`/auditlogs`, hors matcher middleware) : déplacer sous `/admin/` ou élargir le matcher.

### V-W8 🟡 SSRF durcissement  [Aud4 F6 · Aud2 backlog]
`lib/security/ssrf.ts` + `enrich/route.ts:115-121` : TOCTOU DNS-rebinding (lookup ≠ fetch resolve). Résoudre une fois, se connecter à l'IP vérifiée (pin), rejeter multi-A mixtes ; corriger sur-blocage IPv6 (fonctionnel).

### V-W9 🟡 Config anti-bot & seuils  [Sec F5/F6 · Aud5 F12]
`SKIP_RECAPTCHA` : garde en dur `NODE_ENV!=="production"`. `recaptcha.ts:124` seuil 0.3 → 0.5. Doublon `RECAPTCHA_SECRET` (== `RECAPTCHA_ENTERPRISE_API_KEY`) : nettoyer.

### V-W10 🔵 Fuite d'info & logging  [Sec F4/F7 · A11 · Aud5 F17]
`removeConsole` garde `warn/error` en prod. Redaction PII : `contact/route.ts:269,288`, `quote/route.ts:240,258` (email+IP en clair), `recaptcha.ts:90` (dump réponse reCAPTCHA complète), `auth/index.ts:71-101` (emails de login). → masquer/hacher emails/IP, retirer le dump reCAPTCHA (ne garder qu'un score agrégé), retirer emails des logs auth.

### V-W11 🔵 Divers  [Aud4 F7 · Aud5 F15/F16 · Sec F9/F12]
- Open redirect : `app/(admin)/admin/login/page.tsx:17,43` → n'accepter que `callbackUrl` interne (`startsWith('/')` && !`'//'`).
- `GET /api/leadScoring/leads` : clamp `limit/offset` (`Math.min(Math.max(1,n||50),100)`, rejeter NaN).
- `Nav.tsx:43` : retirer la lecture `access_token` en `localStorage`.
- Supprimer code mort `src/environments/*` (placeholders ClassifiedAds).

---

## Confirmés SAINS (ne pas régresser)
Pas de SQLi (tagged templates Neon), pas d'injection commande/désérialisation/prototype-pollution, DOMPurify markdown OK, guard SSRF branché sur enrich OK, pas de fuite secret→client (seuls `NEXT_PUBLIC_*` publics), CVE-2025-29927 non applicable (16.1.1 patché), en-têtes HSTS/anti-clickjacking/nosniff OK, bcrypt.compare constant-time, reCAPTCHA fail-closed sur clés absentes, `.env.local` non commité.
