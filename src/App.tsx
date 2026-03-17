import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";
// import GuidingLight from "./components/ui/GuidingLight";
import { useAppStore } from './store/appStore';
import AnalyticsTracker from "./components/AnalyticsTracker"
import { loadAnalytics } from "./utils/analytics";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Temporarily disable smooth scroll, scroll to top, then restore
    const html = document.documentElement;
    const originalScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';

    window.scrollTo(0, 0);

    // Restore after a frame
    requestAnimationFrame(() => {
      html.style.scrollBehavior = originalScrollBehavior;
    });
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
