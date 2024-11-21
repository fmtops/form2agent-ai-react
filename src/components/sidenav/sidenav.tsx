import { Link, useLocation } from "react-router-dom";
import { SIDE_NAV_LINKS } from "../../consts/sidenav.consts";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import LanguageSelect from "./language-select";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useState } from "react";
import { SHOULD_SHOW_API_KEY_DIALOG } from "../../consts/api-key.consts";
import TrialOptionsDialog from "../trial/trial-options-dialog";
import StyledLink from "../common/styled-link";
import { Box } from "@mui/material";

/**
 * SideNav component
 * @param setIsNavbarOpen - function to set the state of the navbar
 * @returns SideNav component
 */
const SideNav = ({
  setIsNavbarOpen,
}: {
  setIsNavbarOpen: (isOpen: boolean) => void;
}) => {
  const [isApiKeyDialogVisible, setIsApiKeyDialogVisible] = useState(false);
  const renderApiKeyModal = SHOULD_SHOW_API_KEY_DIALOG && isApiKeyDialogVisible;
  const githubLinkAttributes = {
    href: "https://github.com/fmtops/form2agent-ai-react",
    target: "_blank",
    className:
      "flex items-center p-3 justify-between border border-border-primary-light rounded-lg",
  };

  const location = useLocation();
  return (
    <div className="relative z-50 flex flex-col h-full justify-between w-full md:w-auto">
      <div
        className={
          "transition-all duration-500 ease-in-out bg-white text-black"
        }
      >
        <div className="px-5 py-4 flex justify-between items-center">
          <div>
            <img
              className="transition duration-500 ease-in-out w-28"
              src={"./fm LOGO.svg"}
              alt=""
            />
          </div>
          <button className="" onClick={() => setIsNavbarOpen(false)}>
            <KeyboardDoubleArrowLeftOutlinedIcon />
          </button>
        </div>
        <div
          className={`px-5 py-5 space-y-2 transition duration-500 bg-white text-black`}
        >
          <div style={{ overflowY: "auto", maxHeight: "calc(100vh - 450px)" }}>
            {SIDE_NAV_LINKS.filter((x) => !x.isDisabled).map((link, index) => (
              <Link
                key={link.path}
                onClick={() => setIsNavbarOpen(false)}
                to={link.path}
                className={`flex items-center space-x-2 text-sm p-2 rounded-md transition duration-500 
                 hover:bg-gray-300
                    ${
                      location.pathname === link.path
                        ? `bg-bg-active-light`
                        : ""
                    }
                `}
              >
                <link.icon />
                <p>{link.text}</p>
              </Link>
            ))}
          </div>
          <div className="bg-bg-active-light border rounded p-3 pb-6 border-border-primary-light !mt-6">
            <p className="mb-6">
              Ready to add a friendly AI agent to your app?
            </p>
            <StyledLink
              className="px-6 w-fit mt-6 font-medium"
              href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0FO3B2ymP66im56xjAY33k26aIr4IvDRmByfCKyoHAl3gA-4ylFEfgT0pD8OP2MqF5UdezeNZu"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a call
            </StyledLink>
          </div>
        </div>
      </div>
      <div className="p-5 flex flex-col gap-2">
        <div className="flex items-center pl-3 justify-between ">
          Demo Key
          <VpnKeyIcon
            onClick={() => setIsApiKeyDialogVisible(true)}
            className="text-3xl cursor-pointer text-text-secondary-light mr-8"
          />
        </div>
        <div className="flex items-center pl-3 justify-between ">
          Chat Language
          <LanguageSelect />
        </div>
        <a {...githubLinkAttributes}>
          <span className="flex items-center justify-between gap-2">
            <GitHubIcon />
            View on GitHub
          </span>
          <OpenInNewIcon />
        </a>
      </div>
      {renderApiKeyModal && (
        <TrialOptionsDialog
          open={isApiKeyDialogVisible}
          onClose={() => setIsApiKeyDialogVisible(false)}
          id="api-key-dialog"
        />
      )}
    </div>
  );
};

export default SideNav;
