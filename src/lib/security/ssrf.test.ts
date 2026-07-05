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
