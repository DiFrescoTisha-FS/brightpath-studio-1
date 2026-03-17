const GA_MEASUREMENT_ID = 'G-P8N6CYZX9Q';
const GA_SCRIPT_ID = 'ga4-script';

type GtagCommand = 'js' | 'config' | 'event';
type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: GtagCommand, target: string | Date, params?: GtagParams) => void;
    __analyticsLoaded?: boolean;
  }
}

let analyticsLoadPromise: Promise<void> | null = null;

function isBrowser() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

export function loadAnalytics(): Promise<void> {
  if (!isBrowser()) {
    return Promise.resolve();
  }

  if (window.__analyticsLoaded) {
    return Promise.resolve();
  }

  if (analyticsLoadPromise) {
    return analyticsLoadPromise;
  }

  analyticsLoadPromise = new Promise<void>((resolve) => {
    const finishInit = () => {
      if (window.__analyticsLoaded) {
        resolve();
        return;
      }

      window.dataLayer = window.dataLayer || [];
      window.gtag = window.gtag || function gtag(...args: unknown[]) {
        window.dataLayer?.push(args);
      };
      window.gtag('js', new Date());
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: window.location.pathname,
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
  }).finally(() => {
    analyticsLoadPromise = null;
  });

  return analyticsLoadPromise;
}

export function trackEvent(eventName: string, params?: GtagParams) {
  if (!isBrowser() || !window.__analyticsLoaded || !window.gtag) {
    return;
  }

  window.gtag('event', eventName, params);
}

export function trackPageView(pagePath: string) {
  trackEvent('page_view', {
    page_path: pagePath,
    page_location: isBrowser() ? window.location.href : undefined,
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
    page_location: isBrowser() ? window.location.href : undefined,
    page_title: isBrowser() ? document.title : undefined,
  });
}
