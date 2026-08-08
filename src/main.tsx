// main.tsx

import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import HomePage from "./pages/HomePage";
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const TermsPage = React.lazy(() => import('./pages/TermsPage'));
const PrivacyPage = React.lazy(() => import('./pages/PrivacyPage'));
const ServicesPage = React.lazy(() => import('./pages/ServicesPage'));
const ReviewsPage = React.lazy(() => import('./pages/ReviewsPage'));
const AngelCityCaseStudy = React.lazy(() => import('./components/features/AngelCityMassageCaseStudy'));
const PortfolioDemoPage = React.lazy(() => import('./pages/PortfolioDemoPage'));
const SocialMediaPortfolioPage = React.lazy(() => import('./pages/SocialMediaPortfolioPage'));
const CaseStudyPage = React.lazy(() => import('./pages/CaseStudyPage'));
import "./index.css";
import { initializeTheme } from "./store/appStore";

initializeTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "services",
        element: <ServicesPage />,
      },
      {
        path: "reviews",
        element: <ReviewsPage />,
      },
      {
        path: "portfolio",
        element: <PortfolioDemoPage />,
      },
      {
        path: "portfolio/:slug",
        element: <CaseStudyPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "terms-of-service",
        element: <TermsPage />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPage />,
      },
      {
        path: "case-study",
        element: <AngelCityCaseStudy />,
      },
      {
        path: "social-media",
        element: <SocialMediaPortfolioPage />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root")!;
const app = (
  <React.StrictMode>
    <HelmetProvider>
      <Suspense fallback={<div className="min-h-screen p-8">Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </HelmetProvider>
  </React.StrictMode>
);

/**
 * Always a client render — never hydrateRoot, even on prerendered routes.
 *
 * The prerendered HTML in #root (see PRERENDER_ROUTES in vite.config.ts) is a
 * DOM snapshot taken from a headless browser, not `renderToString` output. It
 * therefore lacks the markers React 18 requires to hydrate: the `<!-- -->`
 * separators between adjacent text nodes and the `<!--$-->`/`<!--/$-->` pairs
 * around Suspense boundaries. hydrateRoot against it always fails (minified
 * errors #418/#423/#425) and React discards the tree and client-renders
 * anyway — so we skip the failed attempt and its console noise.
 *
 * The snapshot still does its job: search engines and AI crawlers get complete
 * route-specific HTML, and the page paints before the bundle executes.
 * createRoot clears the container on first render, so there is no duplication.
 */
ReactDOM.createRoot(rootElement).render(app);
