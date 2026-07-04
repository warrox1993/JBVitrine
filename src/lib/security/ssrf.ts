import { lookup } from "node:dns/promises";

/**
 * Retourne true si l'IP est privée, loopback, link-local ou réservée.
 * Bloque notamment 169.254.169.254 (metadata cloud).
 */
export function isBlockedIp(ip: string): boolean {
  // Strip brackets and IPv6 zone id (e.g. "[fe80::1%eth0]") before matching.
  const normalized = ip
    .trim()
    .toLowerCase()
    .replace(/^\[/, "")
    .replace(/\]$/, "")
    .replace(/%.*$/, "");

  // IPv4-mapped IPv6 (::ffff:1.2.3.4) → evaluate the embedded IPv4.
  if (normalized.startsWith("::ffff:") && normalized.includes(".")) {
    return isBlockedIp(normalized.replace("::ffff:", ""));
  }

  // IPv6 literal (contains a colon and no dotted IPv4 tail handled above).
  if (normalized.includes(":")) {
    return isBlockedIpv6(normalized);
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
 * IPv6 blocking. Blocks loopback, unspecified, unique-local (fc00::/7),
 * link-local (fe80::/10) and multicast (ff00::/8). Global unicast IPv6
 * (e.g. 2000::/3) is treated as PUBLIC and allowed — the previous code
 * blocked every IPv6 address, breaking legitimate IPv6-only public hosts.
 */
function isBlockedIpv6(addr: string): boolean {
  if (addr === "::1" || addr === "::") return true; // loopback / unspecified

  const groups = addr.split(":");
  const hextets = groups.filter((g) => g !== "");

  // Fully-expanded loopback (0:0:0:0:0:0:0:1) / unspecified (all-zero).
  const allZeroExceptLast =
    hextets.length > 0 &&
    hextets.slice(0, -1).every((g) => parseInt(g, 16) === 0);
  const lastHextet = hextets.length ? parseInt(hextets[hextets.length - 1], 16) : 0;
  if (allZeroExceptLast && (lastHextet === 0 || lastHextet === 1)) {
    return true;
  }

  const first = groups.find((g) => g !== "") ?? "";
  if (/^f[cd]/.test(first)) return true; // fc00::/7 unique-local
  if (/^fe[89ab]/.test(first)) return true; // fe80::/10 link-local
  if (/^ff/.test(first)) return true; // ff00::/8 multicast

  // Everything else → global unicast public IPv6, allowed.
  return false;
}

/**
 * Lève une erreur si le host n'est pas un FQDN public résolvant vers une IP publique.
 */
export async function assertPublicHost(host: string): Promise<void> {
  const trimmed = host.trim();

  // IPv6 literal host (possibly bracketed): no DNS, validate the literal.
  // Previously the FQDN regex below rejected ALL IPv6 literals outright.
  const isIpv6Literal =
    trimmed.includes(":") || /^\[[0-9a-f:%]+\]$/i.test(trimmed);
  if (isIpv6Literal) {
    if (isBlockedIp(trimmed)) {
      throw new Error("SSRF blocked: IP literal");
    }
    return; // public IPv6 literal → allowed
  }

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
