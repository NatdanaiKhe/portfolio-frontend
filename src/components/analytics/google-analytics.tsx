import Script from "next/script";
import { GA_TRACKING_ID, COOKIE_CONSENT_KEY } from "@/lib/gtag";

export function GoogleAnalytics() {
  if (!GA_TRACKING_ID) {
    return null;
  }

  // Pre-seed Google Consent Mode v2 inline script before gtag.js loads.
  const consentScript = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}

    var initialConsent = 'denied';
    try {
      var stored = localStorage.getItem('${COOKIE_CONSENT_KEY}');
      if (stored === 'granted') {
        initialConsent = 'granted';
      }
    } catch(e) {}

    gtag('consent', 'default', {
      'analytics_storage': initialConsent,
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'wait_for_update': 500
    });
  `;

  return (
    <>
      <script
        id="google-consent-mode-init"
        dangerouslySetInnerHTML={{ __html: consentScript }}
      />
      <Script
        id="google-analytics-gtag"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
            });
          `,
        }}
      />
    </>
  );
}
