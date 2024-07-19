import FormCard from "../components/common/form-card";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import MedicalInformationOutlinedIcon from "@mui/icons-material/MedicalInformationOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import InformationCard from "../components/common/information-card";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";

const HomePage = () => {
  return (
    <div className={`bg-white p-8`}>
      <div>
        <h1 className="text-2xl font-medium mb-2">Form2Agent AI Demo</h1>
        <p className="text-textSecondary text-xl">
          Enhance your users' experience with intelligent, voice-assisted form
          completion
        </p>
      </div>
      <div className="flex gap-4 items-stretch w-full mt-12">
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
        <div className="flex w-full gap-4">
          <InformationCard
            title="Learn more about how Form2Agent can transform your form completion process."
            buttonTitle="Visit our website"
            linkProps={{ href: "https://form2agent.freeportmetrics.com/" }}
            image={"./form2agent-microsite.png"}
          />
          <InformationCard
            title="Download our PDF to explore Form2Agent's powerful capabilities."
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
