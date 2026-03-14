declare global {
  interface Window {
    gtag?: (
      command: 'event',
      eventName: string,
      params?: Record<string, string>
    ) => void;
  }
}

export function trackPortfolioClick(
  eventName: string,
  linkText: string,
  linkUrl: string,
  projectName: string
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      link_text: linkText,
      link_url: linkUrl,
      project_name: projectName,
      page_location: window.location.href,
      page_title: document.title
    });
  }
}
