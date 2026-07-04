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
