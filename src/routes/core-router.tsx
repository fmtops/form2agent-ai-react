import { ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import RoutingPath from "./routes";
import InvoicePage from "../pages/invoice-page";
import HomePage from "../pages/home-page";
import HelpdeskPage from "../pages/helpdesk-page";
import { PatientRegistrationPage } from "../pages/patient-registration-page";
import EcommercePage from "../pages/ecommerce-page";

/**
 *
 * @returns returns the core router
 * @description Used to render the core routes of the application
 * The `renderRoute` function can be used to check the authentication status and render the route accordingly.
 * Extend the `Routes` component to add more routes to the application
 */
const CoreRouter = () => {
  const renderRoute = (element: ReactNode) => {
    const isAuthenticated = true;
    if (isAuthenticated) {
      //some possible auth check here
      return element;
    }
    return <Navigate to={RoutingPath.DefaultPage} replace />;
  };
  return (
    <Routes>
      <Route
        path={RoutingPath.DefaultPage}
        element={renderRoute(<HomePage />)}
      />
      <Route
        path={RoutingPath.InvoicePage}
        element={renderRoute(<InvoicePage />)}
      />
      <Route
        path={RoutingPath.PatientRegistration}
        element={renderRoute(<PatientRegistrationPage />)}
      />
      <Route
        path={RoutingPath.HelpdeskPage}
        element={renderRoute(<HelpdeskPage />)}
      />
      <Route
        path={RoutingPath.EcommercePage}
        element={renderRoute(<EcommercePage />)}
      />
    </Routes>
  );
};
export default CoreRouter;
