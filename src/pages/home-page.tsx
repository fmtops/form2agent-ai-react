import FormCard from "../components/common/form-card";
import InformationCard from "../components/common/information-card";
import { useLayout } from "../contexts/LayoutContext";
import { useSearchParams } from "react-router-dom";
import OptOutPopup from "../components/trial/optout-popup";
import TrialPopup from "../components/trial/trial-popup";
import { UrlPopupType as UrlPopupType, UrlParam } from "../consts/url.consts";
import {
  CategoriesOrdered,
  Route,
  SIDE_NAV_LINKS,
} from "../consts/sidenav.consts";

const HomePage = () => {
  const { isNavbarExpanded } = useLayout();
  const [params] = useSearchParams();
  const popupToShow = params.get(UrlParam.Popup);

  const footerGridResponsiveClasses = `grid grid-cols-1 gap-2
    ${isNavbarExpanded ? "md:flex lg:gap-3 xl:gap-6" : "sm:flex md:gap-3 lg:gap-6"}`;

  const footerSubgridResponsiveClasses = `grid grid-cols-1 gap-2 content-start
    ${isNavbarExpanded ? "lg:flex lg:gap-3 xl:gap-6" : "md:flex md:gap-3 lg:gap-6"}`;

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

  const cleanedRoutes = SIDE_NAV_LINKS.filter(
    (link) => !link.isHidden && !link.isDisabled && link.category !== "None"
  );

  return (
    <>
      <div className={`bg-white py-8`}>
        <div>
          <h1 className="text-2xl font-medium mb-2 flex items-center gap-2">
            <img {...logoImgAttributes} /> Form2Agent AI Demo
          </h1>
          {demoAppDescriptionComponent}
          <br />
          {callToActionComponent}
        </div>

        {popupToShow === UrlPopupType.NewTrial && <TrialPopup />}
        {popupToShow === UrlPopupType.OptOut && <OptOutPopup />}
        {CategoriesOrdered.map((category) => (
          <div>
            <h2
              className={`text-lg mt-12 mb-6 font-medium text-text-primary-light`}
            >
              {category}
            </h2>
            <div className={`${useCaseGridClasses}`}>
              {cleanedRoutes
                .filter((x) => x.category === category)
                .sort((a, b) => a.order - b.order)
                .map((link) => (
                  <FormCard
                    key={link.path}
                    title={link.text}
                    description={link.description ?? ""}
                    Icon={link.icon}
                    buttonTitle={link.buttonTitle ?? ""}
                    linkProps={{ href: link.path }}
                  />
                ))}
            </div>
          </div>
        ))}

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
              linkProps={{
                href: "./form2Agent.pdf",
                download: "form2Agent.pdf",
              }}
              image={"./form2agent-pdf.png"}
            />
          </div>
        </div>
      </div>
      <footer
        className={`${footerGridResponsiveClasses} justify-between text-[#A7A7AB] px-4 py-0`}
      >
        <div className={footerSubgridResponsiveClasses}>
          <span>© 2024 Freeport Metrics</span>
          <a href="/privacy-policy">Privacy Policy</a>
        </div>
        <div className={footerSubgridResponsiveClasses}>
          <a
            href="https://www.freeportmetrics.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Freeport Metrics
          </a>
          <a
            href="https://www.fmventures.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            FM Ventures
          </a>
          <a
            href="https://ddd.freeportmetrics.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            DDD Methodology
          </a>
        </div>
      </footer>
    </>
  );
};

export default HomePage;
