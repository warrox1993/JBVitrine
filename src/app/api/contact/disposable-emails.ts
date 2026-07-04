/**
 * Disposable/Temporary Email Domains Blocklist
 * Updated list of known temporary email services
 */

export const DISPOSABLE_EMAIL_DOMAINS = [
  // Popular temporary email services
  "10minutemail.com",
  "guerrillamail.com",
  "mailinator.com",
  "maildrop.cc",
  "temp-mail.org",
  "throwaway.email",
  "yopmail.com",
  "fakeinbox.com",
  "trashmail.com",
  "tempmail.com",
  "getnada.com",
  "emailondeck.com",
  "spamgourmet.com",
  "mintemail.com",
  "dispostable.com",
  "sharklasers.com",
  "guerrillamailblock.com",
  "pokemail.net",
  "spam4.me",
  "mailnesia.com",
  "mytrashmail.com",
  "mohmal.com",
  "throwawaymail.com",
  "tempinbox.com",
  "emailsensei.com",
  "anonymousemail.me",
  "fakemail.net",
  "tmpmail.org",
  "dropmail.me",
  "tempmail.io",
  "10mail.org",
  "33mail.com",
  "anonbox.net",
  "bugmenot.com",
  "deadaddress.com",
  "emailtemporanea.com",
  "fakemail.fr",
  "filzmail.com",
  "getairmail.com",
  "inbox.si",
  "jetable.org",
  "mailcatch.com",
  "mailforspam.com",
  "mailin8r.com",
  "mailmoat.com",
  "mailnull.com",
  "meltmail.com",
  "nospam.ze.tc",
  "receiveee.com",
  "spambox.us",
  "tempemail.com",
  "tempr.email",
  "trashmailer.com",
  "wegwerfmail.de",
  "wegwerfemail.de",
  "zoemail.com",
];

/**
 * Check if email domain is from a disposable email service
 * @param email - Email address to check
 * @returns true if disposable, false otherwise
 */
export function isDisposableEmail(email: string): boolean {
  if (!email || typeof email !== "string") return false;

  const domain = email.toLowerCase().split("@")[1];
  if (!domain) return false;

  return DISPOSABLE_EMAIL_DOMAINS.some(
    (disposable) => domain === disposable || domain.endsWith(`.${disposable}`),
  );
}

/**
 * Check for suspicious email patterns
 * @param email - Email address to check
 * @returns true if suspicious, false otherwise
 */
export function hasSuspiciousEmailPattern(email: string): boolean {
  if (!email || typeof email !== "string") return false;

  const suspiciousPatterns = [
    /^test\d*@/i, // test@, test1@, test123@
    /^spam\d*@/i, // spam@, spam1@
    /^fake\d*@/i, // fake@, fake123@
    /^temp\d*@/i, // temp@, temp1@
    /^no-?reply@/i, // noreply@, no-reply@
    /^admin\d*@/i, // admin@, admin1@
    /^\d{10,}@/i, // Long sequences of numbers
    /^[a-z]{20,}@/i, // Very long random strings
    /^[a-z]{1,3}\d{5,}@/i, // Short letters + many numbers (abc12345@)
  ];

  return suspiciousPatterns.some((pattern) => pattern.test(email));
}
