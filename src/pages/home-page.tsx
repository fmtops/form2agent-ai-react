import FormCard from "../components/common/form-card";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import MedicalInformationOutlinedIcon from "@mui/icons-material/MedicalInformationOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import InformationCard from "../components/common/information-card";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import { useLayout } from "../contexts/LayoutContext";

const HomePage = () => {
  const { isNavbarExpanded } = useLayout();

  const useCaseGridClasses = `gap-4 items-stretch w-full grid grid-cols-1 
    ${isNavbarExpanded ? "md:grid-cols-2 xl:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-4"}`;

  const suggestionGridClasses = `w-full gap-4 grid grid-cols-1
    ${isNavbarExpanded ? "md:grid-cols-2" : "sm:grid-cols-2"}`;

  const logoImgAttributes = {
    className: "w-8 h-8",
    src: "./f2a_signet.svg",
    alt: "Form2Agent logo",
  };
  const websiteLinkProps = {
    href: "https://form2agent.freeportmetrics.com/",
    target: "_blank",
  };
  const contactLinkAttributes = {
    className: "text-text-brand-light",
    href: "https://calendar.app.google/6jaKPZD9oa9xHDty5",
    target: "_blank",
  };

  const demoAppDescriptionComponent = (
    <p className="text-textSecondary text-xl">
      Form2Agent is an open-source React AI accelerator by Freeport Metrics.
      This demo illustrates a few of the infinite use cases.
    </p>
  );
  const callToActionComponent = (
    <p className="text-textSecondary text-xl">
      <a {...contactLinkAttributes}>Book a free AI strategy session</a> to
      enhance your existing web apps with intelligent, voice-assisted form
      completion, content management, dataset searching, filtering, and more.
    </p>
  );

  return (
    <div className={`bg-white py-8`}>
      <div>
        <h1 className="text-2xl font-medium mb-2 flex items-center gap-2">
          <img {...logoImgAttributes} /> Form2Agent AI Demo
        </h1>
        {demoAppDescriptionComponent}
        <br />
        {callToActionComponent}
      </div>
      <h2 className={`text-lg mt-12 mb-6 font-medium text-text-primary-light`}>
        Explore use case examples
      </h2>
      <div className={`${useCaseGridClasses}`}>
        <FormCard
          title="Add invoice"
          description="Quickly add a new invoice to the system."
          icon={<ArticleOutlinedIcon />}
          buttonTitle="Add invoice"
          linkProps={{ href: "/invoice" }}
        />
        <FormCard
          title="Patient registration"
          description="Register a new patient and their details."
          icon={<MedicalInformationOutlinedIcon />}
          buttonTitle="Register patient"
          linkProps={{ href: "/patient-registration" }}
        />
        <FormCard
          title="Helpdesk"
          description="Get assistance or report an issue."
          icon={<HelpOutlineIcon />}
          buttonTitle="Helpdesk"
          linkProps={{ href: "/helpdesk" }}
        />
        <FormCard
          title="Orders"
          description="Make changes to existing orders."
          icon={<ListAltOutlinedIcon />}
          buttonTitle="Update orders"
          linkProps={{ href: "/ecommerce" }}
        />
      </div>
      <div className="mt-12">
        <h2
          className={`text-lg mt-12 mb-6 font-medium text-text-primary-light`}
        >
          Suggested
        </h2>
        <div className={`${suggestionGridClasses}`}>
          <InformationCard
            title="Learn more about how Form2Agent AI can transform your form completion process."
            buttonTitle="Visit our website"
            linkProps={websiteLinkProps}
            image={"./form2agent-microsite.png"}
          />
          <InformationCard
            title="Download our PDF to explore Form2Agent AI's powerful capabilities."
            buttonTitle="Download PDF"
            linkProps={{ href: "./form2Agent.pdf", download: "form2Agent.pdf" }}
            image={"./form2agent-pdf.png"}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
