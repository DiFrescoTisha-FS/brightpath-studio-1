const GA_MEASUREMENT_ID = 'G-P8N6CYZX9Q';
const GA_SCRIPT_ID = 'ga4-script';
// Only the live site reports to Analytics, so local development and Netlify
// deploy previews never add test traffic to the real reports.
const ANALYTICS_HOSTNAMES = ['brightpathwebstudio.org', 'www.brightpathwebstudio.org'];
// Server-side region check (netlify/functions/analytics-region.js). Analytics
// loads only when it answers { analytics: true }; anything else — a
// restricted or unknown region, an error, a timeout — means it never loads.
const ANALYTICS_REGION_URL = '/api/analytics-region';
const REGION_CHECK_TIMEOUT_MS = 3000;
// The only query parameters page addresses may carry into Analytics. Anything
// else is dropped, so form fields that ever end up in a URL never reach it.
const ALLOWED_QUERY_PARAMS = new Set(['project', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']);
// Device time-zone check, run on the device before anything else (nothing is
// sent or stored). Analytics continues only for a recognised U.S. zone: the
// IANA zones for the United States, plus the legacy aliases browsers can
// still report. Everything else — other countries, UTC, an unavailable or
// unrecognised value — stops here. It's a second signal alongside the IP
// country: it catches, for example, a European visitor on a U.S. VPN.
const US_TIME_ZONES = new Set([
  'America/New_York', 'America/Detroit', 'America/Kentucky/Louisville', 'America/Kentucky/Monticello',
  'America/Indiana/Indianapolis', 'America/Indiana/Vincennes', 'America/Indiana/Winamac',
  'America/Indiana/Marengo', 'America/Indiana/Petersburg', 'America/Indiana/Vevay',
  'America/Chicago', 'America/Indiana/Tell_City', 'America/Indiana/Knox', 'America/Menominee',
  'America/North_Dakota/Center', 'America/North_Dakota/New_Salem', 'America/North_Dakota/Beulah',
  'America/Denver', 'America/Boise', 'America/Phoenix', 'America/Los_Angeles',
  'America/Anchorage', 'America/Juneau', 'America/Sitka', 'America/Metlakatla', 'America/Yakutat',
  'America/Nome', 'America/Adak', 'Pacific/Honolulu',
  // Legacy aliases
  'America/Indianapolis', 'America/Fort_Wayne', 'America/Louisville', 'America/Knox_IN',
  'America/Atka', 'America/Shiprock', 'Navajo', 'US/Eastern', 'US/Central', 'US/Mountain',
  'US/Pacific', 'US/Alaska', 'US/Hawaii', 'US/Arizona', 'US/Aleutian', 'US/East-Indiana',
  'US/Indiana-Starke', 'US/Michigan', 'EST5EDT', 'CST6CDT', 'MST7MDT', 'PST8PDT',
]);

type GtagCommand = 'js' | 'config' | 'event' | 'consent';
type GtagParams = Record<string, string | number | boolean | string[] | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: GtagCommand, target: string | Date, params?: GtagParams) => void;
    __analyticsLoaded?: boolean;
  }
}

let analyticsLoadPromise: Promise<void> | null = null;
let regionDecision: Promise<boolean> | null = null;

function isBrowser() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

/** A page address with only allowlisted query parameters and no fragment. */
export function analyticsSafeUrl(href: string = isBrowser() ? window.location.href : ''): string {
  try {
    const url = new URL(href, isBrowser() ? window.location.origin : 'https://brightpathwebstudio.org');
    for (const key of [...url.searchParams.keys()]) {
      if (!ALLOWED_QUERY_PARAMS.has(key)) url.searchParams.delete(key);
    }
    url.hash = '';
    return url.toString();
  } catch {
    return '';
  }
}

function analyticsSafePath(href?: string): string {
  const safe = analyticsSafeUrl(href);
  if (!safe) return '/';
  const url = new URL(safe);
  return `${url.pathname}${url.search}`;
}

function deviceTimeZoneIsUS(): boolean {
  try {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return typeof zone === 'string' && US_TIME_ZONES.has(zone);
  } catch {
    return false;
  }
}

function analyticsAllowedForRegion(): Promise<boolean> {
  regionDecision ??= (async () => {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), REGION_CHECK_TIMEOUT_MS);
    try {
      const response = await fetch(ANALYTICS_REGION_URL, {
        cache: 'no-store',
        credentials: 'omit',
        signal: controller.signal,
      });
      if (!response.ok) return false;
      const result = await response.json();
      return result?.analytics === true;
    } catch {
      return false;
    } finally {
      window.clearTimeout(timer);
    }
  })();
  return regionDecision;
}

export function loadAnalytics(): Promise<void> {
  if (!isBrowser() || !ANALYTICS_HOSTNAMES.includes(window.location.hostname)) {
    return Promise.resolve();
  }

  if (window.__analyticsLoaded) {
    return Promise.resolve();
  }

  if (analyticsLoadPromise) {
    return analyticsLoadPromise;
  }

  // The time zone is checked first, on the device, so a non-U.S. zone never
  // even triggers the region request.
  const allowed = deviceTimeZoneIsUS() ? analyticsAllowedForRegion() : Promise.resolve(false);
  analyticsLoadPromise = allowed
    .then((ok) => (ok ? injectAnalytics() : undefined))
    .finally(() => {
      analyticsLoadPromise = null;
    });

  return analyticsLoadPromise;
}

function injectAnalytics(): Promise<void> {
  window.dataLayer = window.dataLayer || [];
  // gtag.js only processes dataLayer entries that are the function's own
  // `arguments` object. A rest-parameter array looks identical but is
  // silently ignored — that broke all tracking from March to October 2026.
  window.gtag = window.gtag || function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };

  // Consent defaults, queued before the script so they apply to every hit.
  // Advertising storage is never allowed. Analytics storage is denied
  // everywhere except where Google's own location check also says US — a
  // second safeguard behind the server-side region check above.
  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
  });
  window.gtag('consent', 'default', {
    analytics_storage: 'granted',
    region: ['US'],
  });

  return new Promise<void>((resolve) => {
    const finishInit = () => {
      if (window.__analyticsLoaded) {
        resolve();
        return;
      }

      window.gtag?.('js', new Date());
      window.gtag?.('config', GA_MEASUREMENT_ID, {
        page_location: analyticsSafeUrl(),
        page_path: analyticsSafePath(),
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
      });
      window.__analyticsLoaded = true;
      resolve();
    };

    const existingScript = document.getElementById(GA_SCRIPT_ID) as HTMLScriptElement | null;

    if (existingScript) {
      if (existingScript.dataset.loaded === 'true') {
        finishInit();
        return;
      }

      existingScript.addEventListener('load', () => {
        existingScript.dataset.loaded = 'true';
        finishInit();
      }, { once: true });
      existingScript.addEventListener('error', () => resolve(), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.id = GA_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.addEventListener('load', () => {
      script.dataset.loaded = 'true';
      finishInit();
    }, { once: true });
    script.addEventListener('error', () => resolve(), { once: true });
    document.head.appendChild(script);
  });
}

export function trackEvent(eventName: string, params?: GtagParams) {
  if (!isBrowser() || !window.__analyticsLoaded || !window.gtag) {
    return;
  }

  window.gtag('event', eventName, params);
}

export function trackPageView(pagePath: string) {
  trackEvent('page_view', {
    page_path: analyticsSafePath(pagePath),
    page_location: isBrowser() ? analyticsSafeUrl() : undefined,
    page_title: isBrowser() ? document.title : undefined,
  });
}

export function trackPortfolioClick(
  eventName: string,
  linkText: string,
  linkUrl: string,
  projectName: string
) {
  trackEvent(eventName, {
    link_text: linkText,
    link_url: linkUrl,
    project_name: projectName,
    page_location: isBrowser() ? analyticsSafeUrl() : undefined,
    page_title: isBrowser() ? document.title : undefined,
  });
}
