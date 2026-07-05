# Socle Smidjan — Sécurité & Build — Plan d'implémentation

> **Pour les workers agentiques :** SOUS-SKILL REQUISE — utiliser `superpowers:subagent-driven-development` (recommandé) ou `superpowers:executing-plans` pour exécuter ce plan tâche par tâche. Les étapes utilisent la syntaxe checkbox (`- [ ]`) pour le suivi.

**Goal :** Colmater les failles de sécurité exploitables et rendre le site à nouveau *buildable* et déployable de façon reproductible, sans toucher au design ni au comportement fonctionnel légitime.

**Architecture :** Site vitrine Next.js 16 (App Router) dans `src/UIs/nextjs`, déployé sur Vercel (Neon Postgres + Upstash Redis). Les correctifs suivent les patterns déjà présents dans le code (`requireAuth()` existe dans `lib/auth`, lazy-init modèle dans `lib/redis.ts`). On ajoute des helpers de sécurité isolés et testables, puis on les branche dans les routes.

**Tech Stack :** Next 16.1.1, React 19, TypeScript 5, `@neondatabase/serverless`, `@upstash/ratelimit`, next-auth 4, `marked` 17, `isomorphic-dompurify` (nouvelle dép), tests via `tsx --test` (aucun framework de test à installer, `tsx` est déjà en devDep).

## Global Constraints

- Répertoire de travail : `src/UIs/nextjs` (toutes les commandes s'exécutent depuis là).
- **Rate limiting = 3 envois/heure max** sur contact/quote — NE JAMAIS changer (`lib/rate-limit-redis.ts`).
- Ne jamais qualifier le code en prod d'« ancienne version » — s'il casse en prod, c'est un bug de code.
- Aucun changement visuel ni de copy dans ce plan (réservé au plan design P2).
- Le POST public de capture de leads (`/api/leadScoring/leads`, `/api/quote`, `/api/contact`) reste public mais rate-limité — ne pas le fermer par auth.
- Commits fréquents, un par tâche, message en français préfixé `fix(security):` ou `fix(build):`.
- Vérifier après chaque tâche : `npx tsc --noEmit` passe sans nouvelle erreur.

---

## ⚡ Pré-requis — Hotfix C1 immédiat (le site est EN LIGNE)

La faille C1 (fuite de leads sans auth) est **activement exploitable en production**. La Tâche 1 ci-dessous EST ce hotfix : la traiter et la déployer en premier, avant le reste du plan. Ne pas attendre la fin du plan pour la mettre en prod.

---

## File Structure

- `src/app/api/leadScoring/leads/route.ts` — *modif* : guard authz sur `GET` (C1).
- `src/app/api/admin/leads/digest/route.ts` — *modif* : durcir le secret cron (C2).
- `src/lib/security/ssrf.ts` — *création* : détection d'hôte interdit (SSRF).
- `src/lib/security/ssrf.test.ts` — *création* : tests unitaires du contrôle d'IP.
- `src/app/api/leadScoring/enrich/route.ts` — *modif* : brancher le guard SSRF (E3).
- `src/lib/security/origin.ts` — *création* : validation stricte same-origin.
- `src/lib/security/origin.test.ts` — *création* : tests unitaires origin.
- `src/lib/api/middleware.ts` — *modif* : utiliser la validation stricte (E2).
- `src/lib/markdown.ts` — *modif* : sanitisation DOMPurify + schémas d'URL sûrs (E1).
- `src/lib/auth/guard.ts` — *création* : helper `guardRoute()` (401/403) réutilisable (défense en profondeur).
- Routes `src/app/api/admin/**/route.ts` + `src/app/(admin)/layout.tsx` — *modif* : appliquer `guardRoute()` (défense en profondeur).
- `src/lib/db/index.ts` — *modif* : lazy-init de la connexion (build).
- `src/lib/auth/index.ts` — *modif* : lazy-init de `sql` (build).
- `.env.example` — *création* : documentation des variables.
- `.gitignore` — *modif* : autoriser `.env.example`.
- `src/lib/csrf.ts` — *modif* : découpler le token CSRF de l'IP (bug 429 mobile).
- `package.json` — *modif* : script `postbuild` sitemap.

---

## Task 1 : C1 — Authentifier `GET /api/leadScoring/leads`

**Files:**
- Modify: `src/app/api/leadScoring/leads/route.ts:179-201`

**Interfaces:**
- Consumes: `requireAuth(role: string): Promise<User>` depuis `@/lib/auth` (lève `Error` avec message commençant par `"Unauthorized"` ou `"Forbidden"`).
- Produces: aucune nouvelle interface.

- [ ] **Step 1 : Ajouter l'import `requireAuth`**

Dans l'entête du fichier, après l'import de `db`, ajouter :

```ts
import { requireAuth } from "@/lib/auth";
```

- [ ] **Step 2 : Insérer le guard authz en tête du `GET`**

Dans `export async function GET(request: NextRequest) {`, juste après l'ouverture du `try {` (avant le rate limiting existant), insérer :

```ts
    // 🔒 C1 : cet endpoint expose des données personnelles (PII) — réservé au staff
    try {
      await requireAuth("sales");
    } catch (authError) {
      const message = (authError as Error).message || "Unauthorized";
      const status = message.startsWith("Forbidden") ? 403 : 401;
      return NextResponse.json({ error: message }, { status });
    }
```

- [ ] **Step 3 : Vérifier la compilation**

Run : `npx tsc --noEmit`
Expected : aucune erreur nouvelle sur ce fichier.

- [ ] **Step 4 : Vérifier le comportement (dev server requis)**

Run : `curl -s -o /dev/null -w "%{http_code}\n" "http://localhost:3000/api/leadScoring/leads?limit=5"`
Expected : `401` (au lieu de `200` + données). Le `POST` de capture reste inchangé.

- [ ] **Step 5 : Commit**

```bash
git add src/app/api/leadScoring/leads/route.ts
git commit -m "fix(security): C1 - exige une auth sur GET /leadScoring/leads (fuite PII)"
```

---

## Task 2 : C2 — Durcir le secret du cron « digest »

**Files:**
- Modify: `src/app/api/admin/leads/digest/route.ts:16-22`

**Interfaces:**
- Consumes: `process.env.CRON_SECRET`.
- Produces: aucune.

- [ ] **Step 1 : Ajouter l'import `timingSafeEqual`**

En tête du fichier, après les imports existants :

```ts
import { timingSafeEqual } from "crypto";
```

- [ ] **Step 2 : Remplacer la vérification du secret**

Remplacer le bloc actuel :

```ts
    // Verify authorization (simple token-based auth for cron jobs)
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET || "your-secure-cron-secret";

    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
```

par :

```ts
    // 🔒 C2 : aucun fallback en dur — refuser si le secret n'est pas configuré
    const cronSecret = process.env.CRON_SECRET;
    if (!cronSecret) {
      console.error("CRON_SECRET manquant : endpoint digest désactivé");
      return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
    }

    const authHeader = request.headers.get("authorization") || "";
    const expected = `Bearer ${cronSecret}`;
    const provided = Buffer.from(authHeader);
    const reference = Buffer.from(expected);
    const authorized =
      provided.length === reference.length &&
      timingSafeEqual(provided, reference);

    if (!authorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
```

- [ ] **Step 3 : Vérifier la compilation**

Run : `npx tsc --noEmit`
Expected : aucune erreur nouvelle.

- [ ] **Step 4 : Commit**

```bash
git add src/app/api/admin/leads/digest/route.ts
git commit -m "fix(security): C2 - supprime le secret cron en dur + comparaison timing-safe"
```

---

## Task 3 : E3 — Anti-SSRF sur l'enrichissement

**Files:**
- Create: `src/lib/security/ssrf.ts`
- Create: `src/lib/security/ssrf.test.ts`
- Modify: `src/app/api/leadScoring/enrich/route.ts:108-117`

**Interfaces:**
- Produces: `isBlockedIp(ip: string): boolean` — `true` si l'IP est privée/loopback/link-local/réservée. `assertPublicHost(host: string): Promise<void>` — lève `Error("SSRF blocked")` si le host résout vers une IP interdite ou n'est pas un FQDN public.

- [ ] **Step 1 : Écrire le test qui échoue**

Créer `src/lib/security/ssrf.test.ts` :

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { isBlockedIp } from "./ssrf";

test("bloque loopback et IP privées", () => {
  assert.equal(isBlockedIp("127.0.0.1"), true);
  assert.equal(isBlockedIp("10.1.2.3"), true);
  assert.equal(isBlockedIp("192.168.0.1"), true);
  assert.equal(isBlockedIp("172.16.5.4"), true);
  assert.equal(isBlockedIp("169.254.169.254"), true); // metadata cloud
  assert.equal(isBlockedIp("::1"), true);
});

test("autorise les IP publiques", () => {
  assert.equal(isBlockedIp("8.8.8.8"), false);
  assert.equal(isBlockedIp("1.1.1.1"), false);
});
```

- [ ] **Step 2 : Lancer le test pour vérifier qu'il échoue**

Run : `npx tsx --test src/lib/security/ssrf.test.ts`
Expected : FAIL (`Cannot find module './ssrf'`).

- [ ] **Step 3 : Écrire l'implémentation minimale**

Créer `src/lib/security/ssrf.ts` :

```ts
import { lookup } from "node:dns/promises";

/**
 * Retourne true si l'IP est privée, loopback, link-local ou réservée.
 * Bloque notamment 169.254.169.254 (metadata cloud).
 */
export function isBlockedIp(ip: string): boolean {
  const normalized = ip.trim().toLowerCase();

  // IPv6 loopback / unique-local / link-local
  if (normalized === "::1" || normalized === "::") return true;
  if (normalized.startsWith("fc") || normalized.startsWith("fd")) return true; // fc00::/7
  if (normalized.startsWith("fe80")) return true; // link-local
  if (normalized.startsWith("::ffff:")) {
    return isBlockedIp(normalized.replace("::ffff:", ""));
  }

  const parts = normalized.split(".");
  if (parts.length !== 4) return true; // format inattendu → on bloque par prudence
  const [a, b] = parts.map((p) => parseInt(p, 10));
  if (parts.some((p) => Number.isNaN(parseInt(p, 10)))) return true;

  if (a === 10) return true; // 10.0.0.0/8
  if (a === 127) return true; // loopback
  if (a === 0) return true; // 0.0.0.0/8
  if (a === 169 && b === 254) return true; // link-local + metadata
  if (a === 172 && b >= 16 && b <= 31) return true; // 172.16.0.0/12
  if (a === 192 && b === 168) return true; // 192.168.0.0/16
  if (a === 100 && b >= 64 && b <= 127) return true; // CGNAT 100.64.0.0/10
  if (a >= 224) return true; // multicast + réservé
  return false;
}

/**
 * Lève une erreur si le host n'est pas un FQDN public résolvant vers une IP publique.
 */
export async function assertPublicHost(host: string): Promise<void> {
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(host)) {
    throw new Error("SSRF blocked: invalid host");
  }
  if (isBlockedIp(host)) {
    throw new Error("SSRF blocked: IP literal"); // host est une IP interdite
  }
  const { address } = await lookup(host);
  if (isBlockedIp(address)) {
    throw new Error("SSRF blocked: resolves to private range");
  }
}
```

- [ ] **Step 4 : Lancer le test pour vérifier qu'il passe**

Run : `npx tsx --test src/lib/security/ssrf.test.ts`
Expected : PASS (2 tests).

- [ ] **Step 5 : Brancher le guard dans `detectTechStack`**

Dans `src/app/api/leadScoring/enrich/route.ts`, ajouter en tête l'import :

```ts
import { assertPublicHost } from "@/lib/security/ssrf";
```

Puis remplacer le bloc :

```ts
    // Ensure domain is clean (no protocol)
    const cleanDomain = domain.replace(/^https?:\/\//, "").split("/")[0];

    const response = await fetch(`https://${cleanDomain}`, {
      method: "HEAD",
      redirect: "follow",
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });
```

par :

```ts
    // Ensure domain is clean (no protocol)
    const cleanDomain = domain.replace(/^https?:\/\//, "").split("/")[0];

    // 🔒 E3 : empêcher les rebonds SSRF vers des IP internes / metadata cloud
    await assertPublicHost(cleanDomain);

    const response = await fetch(`https://${cleanDomain}`, {
      method: "HEAD",
      redirect: "error", // ne pas suivre les redirections vers des cibles internes
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });
```

- [ ] **Step 6 : Vérifier la compilation**

Run : `npx tsc --noEmit`
Expected : aucune erreur nouvelle.

- [ ] **Step 7 : Commit**

```bash
git add src/lib/security/ssrf.ts src/lib/security/ssrf.test.ts src/app/api/leadScoring/enrich/route.ts
git commit -m "fix(security): E3 - guard anti-SSRF sur l'enrichissement de leads"
```

---

## Task 4 : E2 — Validation stricte de l'origine (CSRF)

**Files:**
- Create: `src/lib/security/origin.ts`
- Create: `src/lib/security/origin.test.ts`
- Modify: `src/lib/api/middleware.ts:44-75`

**Interfaces:**
- Produces: `isSameOrigin(origin: string | null, referer: string | null, host: string | null): boolean` — `true` uniquement si le host de `origin` (ou à défaut `referer`) est **exactement égal** au `host` de la requête.

- [ ] **Step 1 : Écrire le test qui échoue**

Créer `src/lib/security/origin.test.ts` :

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { isSameOrigin } from "./origin";

test("accepte une origine identique", () => {
  assert.equal(isSameOrigin("https://smidjan.be", null, "smidjan.be"), true);
});

test("rejette une origine qui contient l'hôte en sous-chaîne", () => {
  assert.equal(isSameOrigin("https://smidjan.be.evil.com", null, "smidjan.be"), false);
  assert.equal(isSameOrigin("https://evil.com/?x=smidjan.be", null, "smidjan.be"), false);
});

test("retombe sur le referer si origin absent", () => {
  assert.equal(isSameOrigin(null, "https://smidjan.be/contact", "smidjan.be"), true);
  assert.equal(isSameOrigin(null, "https://evil.com/contact", "smidjan.be"), false);
});

test("rejette si tout est absent", () => {
  assert.equal(isSameOrigin(null, null, "smidjan.be"), false);
});
```

- [ ] **Step 2 : Lancer le test pour vérifier qu'il échoue**

Run : `npx tsx --test src/lib/security/origin.test.ts`
Expected : FAIL (`Cannot find module './origin'`).

- [ ] **Step 3 : Écrire l'implémentation minimale**

Créer `src/lib/security/origin.ts` :

```ts
/** Extrait le host (avec port) d'une URL, ou null si invalide. */
function hostOf(url: string | null): string | null {
  if (!url) return null;
  try {
    return new URL(url).host;
  } catch {
    return null;
  }
}

/**
 * Validation same-origin stricte : le host de `origin` (ou `referer` en repli)
 * doit être STRICTEMENT égal au host de la requête. Pas de sous-chaîne.
 */
export function isSameOrigin(
  origin: string | null,
  referer: string | null,
  host: string | null,
): boolean {
  if (!host) return false;
  const source = hostOf(origin) ?? hostOf(referer);
  return source !== null && source === host;
}
```

- [ ] **Step 4 : Lancer le test pour vérifier qu'il passe**

Run : `npx tsx --test src/lib/security/origin.test.ts`
Expected : PASS (4 tests).

- [ ] **Step 5 : Brancher dans le middleware API**

Dans `src/lib/api/middleware.ts`, ajouter l'import en tête :

```ts
import { isSameOrigin } from "@/lib/security/origin";
```

Puis, dans `validateCSRF`, remplacer :

```ts
  const isLocalhost =
    host?.includes("localhost") || host?.includes("127.0.0.1");
  const isValidOrigin =
    isLocalhost ||
    origin?.includes(host || "") ||
    referer?.includes(host || "");
```

par :

```ts
  const isLocalhost =
    host?.includes("localhost") || host?.includes("127.0.0.1");
  const isValidOrigin = isLocalhost || isSameOrigin(origin, referer, host);
```

- [ ] **Step 6 : Vérifier la compilation**

Run : `npx tsc --noEmit`
Expected : aucune erreur nouvelle.

- [ ] **Step 7 : Commit**

```bash
git add src/lib/security/origin.ts src/lib/security/origin.test.ts src/lib/api/middleware.ts
git commit -m "fix(security): E2 - validation same-origin stricte (fin du match par sous-chaine)"
```

---

## Task 5 : E1 — Sanitiser le HTML du blog

**Files:**
- Modify: `src/lib/markdown.ts:69-90`
- Modify: `package.json` (ajout dépendance)

**Interfaces:**
- Consumes: `isomorphic-dompurify` (`import DOMPurify from "isomorphic-dompurify"`).
- Produces: `markdownToHtml` retourne désormais du HTML assaini.

- [ ] **Step 1 : Installer la dépendance de sanitisation**

Run : `npm install isomorphic-dompurify`
Expected : ajout dans `dependencies`, exit 0.

- [ ] **Step 2 : Sécuriser le renderer de liens**

Dans `src/lib/markdown.ts`, remplacer la méthode `link` du renderer :

```ts
  link({ href, title, text }: Tokens.Link) {
    const titleAttr = title ? ` title="${title}"` : "";
    return `<a href="${href}"${titleAttr}>${text}</a>`;
  },
```

par :

```ts
  link({ href, title, text }: Tokens.Link) {
    // 🔒 E1 : n'autoriser que les schémas d'URL sûrs
    const safe = /^(https?:|mailto:|\/|#)/i.test(href ?? "");
    const finalHref = safe ? href : "#";
    const titleAttr = title ? ` title="${title}"` : "";
    return `<a href="${finalHref}"${titleAttr} rel="noopener noreferrer">${text}</a>`;
  },
```

- [ ] **Step 3 : Assainir la sortie de `markdownToHtml`**

Ajouter l'import en tête du fichier :

```ts
import DOMPurify from "isomorphic-dompurify";
```

Puis remplacer le corps de `markdownToHtml` :

```ts
  try {
    const html = marked.parse(markdown);
    return typeof html === "string" ? html : "";
  } catch (error) {
    console.error("Error parsing markdown:", error);
    return markdown;
  }
```

par :

```ts
  try {
    const html = marked.parse(markdown);
    const raw = typeof html === "string" ? html : "";
    // 🔒 E1 : neutraliser tout HTML dangereux (script, onerror, javascript:, …)
    return DOMPurify.sanitize(raw, {
      ADD_ATTR: ["id", "target", "rel"],
      FORBID_TAGS: ["style", "iframe", "form", "input"],
    });
  } catch (error) {
    console.error("Error parsing markdown:", error);
    return "";
  }
```

- [ ] **Step 4 : Vérifier la compilation et le build**

Run : `npx tsc --noEmit && npm run build`
Expected : build OK (une fois les tâches build P1 faites ; sinon vérifier au moins `tsc`). Le contenu du blog s'affiche toujours (titres avec ancres `{#id}` préservés grâce à `ADD_ATTR: ["id"]`).

- [ ] **Step 5 : Commit**

```bash
git add src/lib/markdown.ts package.json package-lock.json
git commit -m "fix(security): E1 - sanitise le HTML du blog (DOMPurify) + schemas d'URL surs"
```

---

## Task 6 : Défense en profondeur — authz dans chaque route admin

**Files:**
- Create: `src/lib/auth/guard.ts`
- Modify: `src/app/api/admin/leads/export/csv/route.ts`, `src/app/api/admin/leads/export/excel/route.ts`, `src/app/api/admin/security-stats/route.ts`, `src/app/api/admin/reset-rate-limit/route.ts`, `src/app/api/admin/blog/route.ts` (chaque handler exporté)
- Modify: `src/app/(admin)/layout.tsx`

**Interfaces:**
- Consumes: `requireAuth(role)` depuis `@/lib/auth`.
- Produces: `guardRoute(role?: string): Promise<NextResponse | null>` — retourne une `NextResponse` d'erreur (401/403) à renvoyer immédiatement, ou `null` si autorisé.

- [ ] **Step 1 : Créer le helper `guardRoute`**

Créer `src/lib/auth/guard.ts` :

```ts
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";

/**
 * Garde d'authz réutilisable pour les route handlers.
 * Retourne une réponse d'erreur à renvoyer, ou null si l'accès est autorisé.
 */
export async function guardRoute(
  role: string = "viewer",
): Promise<NextResponse | null> {
  try {
    await requireAuth(role);
    return null;
  } catch (error) {
    const message = (error as Error).message || "Unauthorized";
    const status = message.startsWith("Forbidden") ? 403 : 401;
    return NextResponse.json({ error: message }, { status });
  }
}
```

- [ ] **Step 2 : Appliquer le guard dans chaque route admin**

Pour CHACUN des fichiers listés ci-dessus, ajouter l'import :

```ts
import { guardRoute } from "@/lib/auth/guard";
```

et, en toute première instruction de chaque handler exporté (`GET`/`POST`/`DELETE`…), insérer :

```ts
  const denied = await guardRoute("sales");
  if (denied) return denied;
```

(Pour `reset-rate-limit`, utiliser `guardRoute("admin")`.)

- [ ] **Step 3 : Rediriger dans le layout admin**

Dans `src/app/(admin)/layout.tsx`, là où la session est récupérée, ajouter la redirection si non authentifié. Ajouter l'import :

```ts
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
```

et, en tête du composant layout (avant le `return`) :

```ts
  const user = await getCurrentUser();
  if (!user) {
    redirect("/admin/login");
  }
```

- [ ] **Step 4 : Vérifier la compilation**

Run : `npx tsc --noEmit`
Expected : aucune erreur nouvelle. (Rendre le composant layout `async` s'il ne l'est pas déjà.)

- [ ] **Step 5 : Commit**

```bash
git add src/lib/auth/guard.ts "src/app/api/admin" "src/app/(admin)/layout.tsx"
git commit -m "fix(security): defense en profondeur - authz dans chaque route admin + layout"
```

---

## Task 7 : Build — Lazy-init de la connexion DB

**Files:**
- Modify: `src/lib/db/index.ts:7-29`

**Interfaces:**
- Produces: `sql` (tagged-template) et `db` inchangés côté appelants, mais la connexion Neon n'est instanciée qu'au premier appel (plus de `throw` à l'import).

- [ ] **Step 1 : Remplacer l'init top-level par un singleton lazy**

Dans `src/lib/db/index.ts`, remplacer les lignes 9 à 29 (du commentaire `// Use DATABASE_URL...` jusqu'à `export const sql = neon(databaseUrl);`) par :

```ts
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
```

- [ ] **Step 2 : Vérifier la compilation**

Run : `npx tsc --noEmit`
Expected : aucune erreur nouvelle. `db.query = sql` et tous les `sql\`...\`` internes continuent de fonctionner.

- [ ] **Step 3 : Commit**

```bash
git add src/lib/db/index.ts
git commit -m "fix(build): lazy-init de la connexion Neon (deblocage du build)"
```

---

## Task 8 : Build — Lazy-init de `sql` dans l'auth + vérification du build

**Files:**
- Modify: `src/lib/auth/index.ts:14` et les 4 usages de `sql` dans ce fichier

**Interfaces:**
- Consumes: `getSql()` local.
- Produces: build de production qui aboutit.

- [ ] **Step 1 : Remplacer l'instanciation top-level**

Dans `src/lib/auth/index.ts`, remplacer :

```ts
const sql = neon(process.env.DATABASE_URL!);
```

par :

```ts
let _sql: ReturnType<typeof neon> | null = null;
function getSql() {
  if (_sql) return _sql;
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) throw new Error("DATABASE_URL is not defined");
  _sql = neon(url);
  return _sql;
}
```

- [ ] **Step 2 : Adapter les usages**

Dans ce fichier, remplacer les 4 occurrences de `` sql` `` (les requêtes SELECT users, UPDATE last_login) : préfixer chaque `` await sql`...` `` par `` await getSql()`...` ``. Concrètement, remplacer `await sql\`` par `await getSql()\`` aux lignes des requêtes (SELECT users, UPDATE users).

- [ ] **Step 3 : Vérifier le build complet SANS variables d'env**

Run : `unset DATABASE_URL POSTGRES_URL && npm run build`
Expected : **build réussi** (plus d'erreur « DATABASE_URL is not defined » à la collecte de page data). C'est la validation clé du déblocage.

- [ ] **Step 4 : Commit**

```bash
git add src/lib/auth/index.ts
git commit -m "fix(build): lazy-init de sql dans l'auth - le build de prod aboutit"
```

---

## Task 9 : Reproductibilité — `.env.example` + `.gitignore`

**Files:**
- Create: `.env.example`
- Modify: `.gitignore:34`

**Interfaces:** aucune.

- [ ] **Step 1 : Créer `.env.example`**

Créer `.env.example` :

```bash
# ─── Base de données (Neon Postgres) ──────────────────────────────
DATABASE_URL=postgres://user:password@host/db?sslmode=require
# POSTGRES_URL=            # fallback Vercel/Neon (optionnel)

# ─── Redis (Upstash) — rate limiting, CSRF, cache ─────────────────
UPSTASH_REDIS_REST_URL=https://xxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=

# ─── Authentification (NextAuth) ──────────────────────────────────
NEXTAUTH_SECRET=            # openssl rand -base64 32
NEXTAUTH_URL=https://smidjan.be
ADMIN_SECRET=              # protège /api/admin/reset-rate-limit
CRON_SECRET=               # protège /api/admin/leads/digest (obligatoire)

# ─── reCAPTCHA Enterprise (Google) ────────────────────────────────
NEXT_PUBLIC_RECAPTCHA_SITE_ID=
RECAPTCHA_PROJECT_ID=
RECAPTCHA_ENTERPRISE_API_KEY=
SKIP_RECAPTCHA=false       # ne JAMAIS mettre true en prod

# ─── Email transactionnel (Resend) ────────────────────────────────
RESEND_API_KEY=

# ─── Enrichissement de leads (optionnel) ──────────────────────────
HUNTER_API_KEY=
BRANDFETCH_API_KEY=
OPENAI_API_KEY=
CBEAPI_SECRET=

# ─── Notifications (optionnel) ────────────────────────────────────
SLACK_WEBHOOK_URL=
DISCORD_WEBHOOK_URL=

# ─── Divers ───────────────────────────────────────────────────────
NEXT_PUBLIC_BASE_URL=https://smidjan.be
SITE_URL=https://smidjan.be   # utilisé par next-sitemap
```

- [ ] **Step 2 : Autoriser le commit de `.env.example`**

Dans `.gitignore`, sous la ligne `.env*` (ligne 34), ajouter :

```
!.env.example
```

- [ ] **Step 3 : Vérifier que le fichier n'est plus ignoré**

Run : `git check-ignore -v .env.example; echo "exit=$?"`
Expected : `exit=1` (le fichier n'est PAS ignoré).

- [ ] **Step 4 : Commit**

```bash
git add .env.example .gitignore
git commit -m "fix(build): documente les ~24 variables d'env (.env.example) + gitignore"
```

---

## Task 10 : Bug 429 — découpler le token CSRF de l'IP

**Files:**
- Read first: `src/app/api/csrf/token/route.ts` (comprendre le flux d'émission)
- Modify: `src/lib/csrf.ts:15-74`

**Interfaces:**
- Produces: `storeCsrfToken(token, ip?)` et `validateCsrfToken(token, ip?)` gardent la même signature (le param `ip` devient inutilisé), mais la clé Redis ne dépend plus de l'IP → le token émis reste valide même si l'IP du client change (mobile).

- [ ] **Step 1 : Lire la route d'émission pour confirmer le flux**

Read : `src/app/api/csrf/token/route.ts`
Objectif : confirmer que la route appelle `generateCsrfToken()` + `storeCsrfToken()` et renvoie le token. Noter si un 429 provient du `csrfLimiter` (auquel cas augmenter/retirer ce limiter sur cette route de lecture).

- [ ] **Step 2 : Retirer l'IP de la clé de stockage**

Dans `src/lib/csrf.ts`, remplacer le corps de `storeCsrfToken` :

```ts
  const hashedToken = hashToken(token);
  const key = `csrf:${ip}:${hashedToken}`;
```

par :

```ts
  // Bug 429/mobile : la clé ne doit PAS dépendre de l'IP (elle change sur mobile)
  const hashedToken = hashToken(token);
  const key = `csrf:${hashedToken}`;
```

- [ ] **Step 3 : Retirer l'IP de la clé de validation**

Dans `validateCsrfToken`, remplacer :

```ts
  const hashedToken = hashToken(token);
  const key = `csrf:${ip}:${hashedToken}`;
```

par :

```ts
  const hashedToken = hashToken(token);
  const key = `csrf:${hashedToken}`;
```

Et pour le fallback in-memory, remplacer les deux `` const memKey = `${ip}:${hashedToken}`; `` par `` const memKey = hashedToken; ``.

- [ ] **Step 4 : Supprimer le `setInterval` inopérant en serverless**

Supprimer le bloc `setInterval(...)` (lignes ~64-74) — inutile en serverless (chaque invocation a sa propre mémoire ; Redis gère l'expiration via `setex`).

- [ ] **Step 5 : Vérifier la compilation**

Run : `npx tsc --noEmit`
Expected : aucune erreur nouvelle.

- [ ] **Step 6 : Vérifier le flux CSRF (dev server + Redis configuré)**

Run : `curl -s -c cookies.txt http://localhost:3000/api/csrf/token` puis réutiliser le token dans un POST contact avec un `Origin` valide.
Expected : le token est accepté une fois (200), rejeté à la 2ᵉ utilisation (one-time). Plus de 429 sur simple lecture du token.

- [ ] **Step 7 : Commit**

```bash
git add src/lib/csrf.ts
git commit -m "fix(security): bug 429 - token CSRF decouple de l'IP (mobile) + nettoyage serverless"
```

---

## Task 11 : SEO build — restaurer la génération du sitemap

**Files:**
- Modify: `package.json` (section `scripts`)

**Interfaces:** aucune. `next-sitemap` est déjà installé et configuré (`next-sitemap.config.js`).

- [ ] **Step 1 : Ajouter le script `postbuild`**

Dans `package.json`, dans `"scripts"`, ajouter après la ligne `"build": "next build",` :

```json
    "postbuild": "next-sitemap",
```

- [ ] **Step 2 : Vérifier la génération**

Run : `npm run build`
Expected : après le build, `next-sitemap` s'exécute et (re)génère `public/sitemap.xml` / `public/robots.txt`. Vérifier : `ls -la public/sitemap*.xml`.

- [ ] **Step 3 : Commit**

```bash
git add package.json public/sitemap*.xml public/robots.txt
git commit -m "fix(build): restaure la generation du sitemap au postbuild"
```

---

## Self-Review

**Couverture du périmètre (P0 + P1 de l'audit) :**
- C1 fuite PII → Task 1 ✅
- C2 secret cron → Task 2 ✅
- E1 XSS blog → Task 5 ✅ (durcissement CSP `unsafe-inline`/`unsafe-eval` volontairement EXCLU : risque de casse en prod live — à traiter dans un plan dédié avec migration par nonces)
- E2 CSRF sous-chaîne → Task 4 ✅
- E3 SSRF → Task 3 ✅
- Défense en profondeur admin → Task 6 ✅
- Build cassé (DB/Redis à l'import) → Tasks 7-8 ✅ (`rate-limit-redis` ne `throw` pas à l'import — il ne bloque pas le build ; sa conversion fail-closed/lazy relève d'un suivi sécurité M1, hors périmètre build)
- `.env.example` → Task 9 ✅
- Bug 429 CSRF → Task 10 ✅
- Sitemap → Task 11 ✅

**Hors périmètre de ce plan (à planifier ensuite) :** durcissement CSP par nonces, rate-limit fail-closed (M1), injection CSV/XML des exports (M2), suppression du code mort `src/core/**`, nettoyage des dépendances inutilisées, et toute la **refonte design P2** (direction artistique, contraste AA, bug responsive des grilles, thème anti-FOUC), SEO local (schémas LocalBusiness), conformité RGPD.

**Placeholders :** aucun — chaque étape contient le code réel et une commande de vérification.

**Cohérence des types :** `requireAuth`/`getCurrentUser` (signatures existantes de `lib/auth`), `guardRoute`, `isBlockedIp`/`assertPublicHost`, `isSameOrigin` sont définis avant usage et référencés de façon cohérente.

---

## Ordre d'exécution recommandé

1. **Déployer d'abord** Task 1 (C1) + Task 2 (C2) — le site est en ligne, ces failles sont exploitables maintenant.
2. Puis Tasks 7-8 (débloquer le build) pour pouvoir redéployer sereinement.
3. Puis Tasks 3, 4, 5, 6, 10 (reste sécurité) et 9, 11 (reproductibilité/SEO build).
