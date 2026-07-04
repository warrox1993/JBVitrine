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
