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
const ReviewsList = React.lazy(() => import('./components/ui/ReviewsList'));
const ServicesPage = React.lazy(() => import('./pages/ServicesPage'));
const ReviewsPage = React.lazy(() => import('./pages/ReviewsPage'));
const AngelCityCaseStudy = React.lazy(() => import('./components/features/AngelCityMassageCaseStudy'));
const PortfolioDemoPage = React.lazy(() => import('./pages/PortfolioDemoPage'));
import "./index.css";
import { initializeTheme } from "./store/appStore";
// import PortfolioProject from "./pages/PortfolioProject.tsx";

// Call the theme initialization function here, before the router is created
initializeTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // <-- CHANGE THIS LINE
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
        path: "review",
        element: <ReviewsPage />,
      },
      {
        path: "portfolio",
        element: <PortfolioDemoPage />,
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
        path: "reviews",
        element: <ReviewsList />,
      },
      {
        path: "case-study",
        element: <AngelCityCaseStudy />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);