// main.tsx

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
const HomePage = React.lazy(() => import('./pages/HomePage'));
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
import ReactGA from "react-ga4";

ReactGA.initialize("G-P8N6CYZX9Q");
ReactGA.send("pageview");

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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
