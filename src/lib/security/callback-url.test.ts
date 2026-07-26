import { test } from "node:test";
import assert from "node:assert/strict";
import { sanitizeCallbackUrl, CALLBACK_FALLBACK } from "./callback-url";

/** A real single backslash, built explicitly so no escaping layer can hide it. */
const BS = String.fromCharCode(92);

test("laisse passer les chemins admin légitimes", () => {
  assert.equal(sanitizeCallbackUrl("/admin/leads"), "/admin/leads");
  assert.equal(sanitizeCallbackUrl("/admin"), "/admin");
  assert.equal(
    sanitizeCallbackUrl("/admin/settings?tab=security"),
    "/admin/settings?tab=security",
  );
  assert.equal(sanitizeCallbackUrl("/admin/leads#recent"), "/admin/leads#recent");
});

test("rejette l'open redirect par backslash (le bug corrigé)", () => {
  // "/\evil.com" : le parser WHATWG normalise "\" en "/", donc l'ancien filtre
  // par préfixe le laissait passer et la navigation partait vers evil.com.
  assert.equal(sanitizeCallbackUrl("/" + BS + "evil.com"), CALLBACK_FALLBACK);
  assert.equal(sanitizeCallbackUrl(BS + BS + "evil.com"), CALLBACK_FALLBACK);
  assert.equal(sanitizeCallbackUrl("/" + BS + "/evil.com"), CALLBACK_FALLBACK);
});

test("rejette le protocol-relative et les URL absolues", () => {
  assert.equal(sanitizeCallbackUrl("//evil.com"), CALLBACK_FALLBACK);
  assert.equal(sanitizeCallbackUrl("////evil.com"), CALLBACK_FALLBACK);
  assert.equal(sanitizeCallbackUrl("https://evil.com"), CALLBACK_FALLBACK);
  assert.equal(sanitizeCallbackUrl("https:evil.com"), CALLBACK_FALLBACK);
  assert.equal(sanitizeCallbackUrl("http://evil.com/admin/leads"), CALLBACK_FALLBACK);
});

test("rejette les schémas non http et les chemins hors /admin", () => {
  assert.equal(sanitizeCallbackUrl("javascript:alert(1)"), CALLBACK_FALLBACK);
  assert.equal(sanitizeCallbackUrl("data:text/html,<script>1</script>"), CALLBACK_FALLBACK);
  assert.equal(sanitizeCallbackUrl("/blog"), CALLBACK_FALLBACK);
  assert.equal(sanitizeCallbackUrl("/administrateur"), CALLBACK_FALLBACK);
  assert.equal(sanitizeCallbackUrl("/admin/../../evil"), CALLBACK_FALLBACK);
});

test("retombe sur le défaut si absent ou vide", () => {
  assert.equal(sanitizeCallbackUrl(null), CALLBACK_FALLBACK);
  assert.equal(sanitizeCallbackUrl(""), CALLBACK_FALLBACK);
});

test("aucune sortie ne résout hors du domaine", () => {
  const payloads = [
    "/" + BS + "evil.com",
    "//evil.com",
    "https://evil.com",
    "/admin/leads",
    "/blog",
    null,
  ];
  for (const p of payloads) {
    const resolved = new URL(sanitizeCallbackUrl(p), "https://smidjan.be");
    assert.equal(resolved.origin, "https://smidjan.be", `payload: ${p}`);
  }
});
