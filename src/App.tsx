import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";
// import GuidingLight from "./components/ui/GuidingLight";
import { useAppStore } from './store/appStore';
import AnalyticsTracker from "./components/AnalyticsTracker"
import { loadAnalytics } from "./utils/analytics";

// Scroll to top on route change, or to the #hash target if the URL has one.
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Temporarily disable smooth scroll, scroll to top, then restore
    const html = document.documentElement;
    const originalScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';

    if (hash) {
      // The target route is often React.lazy-loaded, so the hash target may
      // not exist in the DOM yet on the frame this effect first runs. Retry
      // across a bounded number of frames until it mounts.
      const id = hash.slice(1);
      let attempts = 0;
      const tryScrollToHash = () => {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: 'auto', block: 'start' });
        } else if (attempts < 50) {
          attempts += 1;
          requestAnimationFrame(tryScrollToHash);
        }
      };
      tryScrollToHash();
    } else {
      window.scrollTo(0, 0);
    }

    // Restore after a frame
    requestAnimationFrame(() => {
      html.style.scrollBehavior = originalScrollBehavior;
    });
  }, [pathname, hash]);

  return null;
}

/**
 * Hides the static homepage hero (#hero-clarity-static, injected into
 * index.html by the brightpath-inject-static-hero plugin) on any route
 * other than `/`. Without this, the static hero stays visible at the
 * top of every page — /portfolio, /about, /contact all look like the
 * homepage with mystery content scrolled below the fold.
 */
function StaticHeroRouteGate() {
  const { pathname } = useLocation();
  useEffect(() => {
    const hero = document.getElementById('hero-clarity-static');
    if (hero) {
      hero.style.display = pathname === '/' ? '' : 'none';
    }
  }, [pathname]);
  return null;
}

const App: React.FC = () => {
  const { theme } = useAppStore();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleFirstInteraction = () => {
      void loadAnalytics();
    };

    const passiveOptions: AddEventListenerOptions = { once: true, passive: true };
    const onceOptions: AddEventListenerOptions = { once: true };

    window.addEventListener('scroll', handleFirstInteraction, passiveOptions);
    window.addEventListener('click', handleFirstInteraction, onceOptions);
    window.addEventListener('keydown', handleFirstInteraction, onceOptions);
    window.addEventListener('touchstart', handleFirstInteraction, passiveOptions);

    return () => {
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  return (
    <>
      <ScrollToTop />
      <StaticHeroRouteGate />
      <AnalyticsTracker />
      {/* <GuidingLight size={30} glowScale={2} /> */}
      <Navbar theme={theme} />
      <main>
        <Outlet />
      </main>
      <Footer theme={theme} />
    </>
  );
};

export default App;
