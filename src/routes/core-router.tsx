import { ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import RoutingPath from "./routes";
import InvoicePage from "../pages/invoice-page";
import HomePage from "../pages/home-page";
import HelpdeskPage from "../pages/helpdesk-page";
import { PatientRegistrationPage } from "../pages/patient-registration-page";
import EcommercePage from "../pages/ecommerce-page";
import KitchenPage from "../pages/kitchen-page";
import PrivacyPolicyPage from "../pages/privacy-policy-page";
import ScheduleDemoPage from "../pages/schedule-demo-page";
import FrontDeskPage from "../pages/frontdesk-page";
import CheckInPage from "../pages/checkin-page";
import CustomerFilterPage from "../pages/customer-filter-page";
import DealPage from "../pages/deal-page";
import { MerchantRegistrationPage } from "../pages/merchant-registration-page";
import AddProductPage from "../pages/add-product-page";
import CarAccidentPage from "../pages/car-accident-page";
import HouseInspectionPage from "../pages/house-inspection-page";
import TravelReimbursementPage from "../pages/travel-reimbursement-page";
import { SurgeryClaimPage } from "../pages/surgery-claim-page";
import SpeechAssessmentPage from "../pages/speech-assessment-page";
import { NoSurgeryClaimPage } from "../pages/no-surgery-claim-page";
import PatientLookupPage from "../pages/patient-lookup-page";

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
        path={RoutingPath.PrivacyPage}
        element={renderRoute(<PrivacyPolicyPage />)}
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
      <Route
        path={RoutingPath.KitchenViewPage}
        element={renderRoute(<KitchenPage />)}
      />
      <Route
        path={RoutingPath.CustomerFilterPage}
        element={renderRoute(<CustomerFilterPage />)}
      />
      <Route
        path={RoutingPath.FrontdeskPage}
        element={renderRoute(<FrontDeskPage />)}
      />
      <Route
        path={RoutingPath.ScheduleDemoPage}
        element={renderRoute(<ScheduleDemoPage />)}
      />
      <Route
        path={RoutingPath.CheckInPage}
        element={renderRoute(<CheckInPage />)}
      />
      <Route path={RoutingPath.AddDeal} element={renderRoute(<DealPage />)} />
      <Route
        path={RoutingPath.MerchantRegistration}
        element={renderRoute(<MerchantRegistrationPage />)}
      />
      <Route
        path={RoutingPath.AddProduct}
        element={renderRoute(<AddProductPage />)}
      />
      <Route
        path={RoutingPath.CarAccidentPage}
        element={renderRoute(<CarAccidentPage />)}
      />
      <Route
        path={RoutingPath.HouseInspectionPage}
        element={renderRoute(<HouseInspectionPage />)}
      />
      <Route
        path={RoutingPath.TravelReimbursementPage}
        element={renderRoute(<TravelReimbursementPage />)}
      />
      <Route
        path={RoutingPath.SurgeryClaimPage}
        element={renderRoute(<SurgeryClaimPage />)}
      />
      <Route
        path={RoutingPath.SpeechAssessmentPage}
        element={renderRoute(<SpeechAssessmentPage />)}
      />
      <Route
        path={RoutingPath.NoSurgeryClaimPage}
        element={renderRoute(<NoSurgeryClaimPage />)}
      />
      <Route
        path={RoutingPath.PatientLookupPage}
        element={renderRoute(<PatientLookupPage />)}
      />
    </Routes>
  );
};
export default CoreRouter;
