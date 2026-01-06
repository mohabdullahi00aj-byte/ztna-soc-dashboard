import { lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";

/* Layouts */
const FullLayout = lazy(() => import("../layouts/full/FullLayout"));
const BlankLayout = lazy(() => import("../layouts/blank/BlankLayout"));

/* Pages */
const Dashboard = lazy(() => import("../views/dashboards/Dashboard"));

// utilities
const Typography = lazy(() => import("../views/typography/Typography"));
const TablePage = lazy(() => import("../views/tables/Table"));
const FormPage = lazy(() => import("../views/forms/Form"));
const Shadow = lazy(() => import("../views/shadows/Shadow"));
const AlertsPage = lazy(() => import("../views/alerts/Alerts"));

// icons
const Solar = lazy(() => import("../views/icons/Solar"));

// auth
const Login = lazy(() => import("../views/auth/login/Login"));
const Register = lazy(() => import("../views/auth/register/Register"));
const Error404 = lazy(() => import("../views/auth/error/Error"));

// sample
const SamplePage = lazy(() => import("../views/sample-page/SamplePage"));

/* ZTNA Pages */
const AccessDecisions = lazy(() => import("../views/ztna/AccessDecisions"));
const SuricataAlerts = lazy(() => import("../views/ztna/SuricataAlerts"));
const Policies = lazy(() => import("../views/ztna/Policies"));
const NetworkZones = lazy(() => import("../views/ztna/NetworkZones"));
const SystemHealth = lazy(() => import("../views/ztna/SystemHealth"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { index: true, element: <Dashboard /> },

      // Utilities
      { path: "ui/typography", element: <Typography /> },
      { path: "ui/table", element: <TablePage /> },
      { path: "ui/form", element: <FormPage /> },
      { path: "ui/alert", element: <AlertsPage /> },
      { path: "ui/shadow", element: <Shadow /> },

      // Icons
      { path: "icons/solar", element: <Solar /> },

      // Sample
      { path: "sample-page", element: <SamplePage /> },

      // ZTNA
      { path: "decisions", element: <AccessDecisions /> },
      { path: "alerts", element: <SuricataAlerts /> },
      { path: "policies", element: <Policies /> },
      { path: "zones", element: <NetworkZones /> },
      { path: "system-health", element: <SystemHealth /> },

      // Not found inside app routes
      { path: "*", element: <Navigate to="/auth/404" replace /> },
    ],
  },

  {
    path: "/auth",
    element: <BlankLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "404", element: <Error404 /> },
      { path: "*", element: <Navigate to="/auth/404" replace /> },
    ],
  },
]);

export default router;
