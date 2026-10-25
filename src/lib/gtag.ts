export const COOKIE_CONSENT_KEY = "portfolio_cookie_consent";
export const COOKIE_CONSENT_DATE_KEY = "portfolio_cookie_consent_date";
export const OPEN_COOKIE_BANNER_EVENT = "portfolio:open-cookie-banner";
export const CONSENT_CHANGE_EVENT = "portfolio:cookie-consent-change";

export type ConsentStatus = "granted" | "denied";

export const GA_TRACKING_ID = (process.env.NEXT_PUBLIC_GA_ID ?? "").trim();

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Retrieve current cookie consent status from localStorage.
 * Returns null if the user hasn't made a choice yet.
 */
export function getStoredConsent(): ConsentStatus | null {
  if (typeof window === "undefined") return null;
  try {
    const value = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (value === "granted" || value === "denied") {
      return value;
    }
  } catch {
    // LocalStorage may be blocked or restricted
  }
  return null;
}

/**
 * Purge Google Analytics tracking cookies from document.cookie when consent is denied or revoked.
 */
export function removeGACookies(): void {
  if (typeof document === "undefined" || typeof window === "undefined") return;
  try {
    const cookies = document.cookie.split(";");
    const host = window.location.hostname;
    const domainParts = host.split(".");
    const domains = [
      host,
      "." + host,
      ...(domainParts.length > 1 ? ["." + domainParts.slice(-2).join(".")] : []),
    ];

    for (const cookie of cookies) {
      const eqPos = cookie.indexOf("=");
      const name = (eqPos > -1 ? cookie.substring(0, eqPos) : cookie).trim();
      if (name.startsWith("_ga")) {
        for (const domain of domains) {
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`;
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        }
      }
    }
  } catch {
    // Silently ignore cookie deletion errors
  }
}

/**
 * Update Google Consent Mode v2 state via gtag('consent', 'update', ...).
 */
export function updateGtagConsent(status: ConsentStatus): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("consent", "update", {
    analytics_storage: status,
  });
}

/**
 * Persist consent choice in localStorage, update Google tag consent, and broadcast an event.
 */
export function setStoredConsent(status: ConsentStatus): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, status);
    localStorage.setItem(COOKIE_CONSENT_DATE_KEY, new Date().toISOString());
  } catch {
    // Storage access might fail in strict privacy modes
  }

  // Update consent mode
  updateGtagConsent(status);

  // If denied, purge any analytics cookies that may have been created
  if (status === "denied") {
    removeGACookies();
  }

  // Broadcast event to notify components
  window.dispatchEvent(
    new CustomEvent(CONSENT_CHANGE_EVENT, { detail: { consent: status } })
  );
}

/**
 * Trigger opening of the cookie preferences banner from anywhere (e.g. footer).
 */
export function openCookieBanner(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_COOKIE_BANNER_EVENT));
}

/**
 * Track a custom Google Analytics event.
 */
export function sendGAEvent(
  action: string,
  params?: Record<string, unknown>
): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", action, params);
}
