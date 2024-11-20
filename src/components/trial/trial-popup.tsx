import InfoPopup from "../common/info-popup";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getStoredProxyKeyExpiration,
  setStoredProxyKeyDetails,
} from "../../utils/api-key.utils";
import { APIError } from "../../lib/errors/api-error";
import { GuestTrialService } from "../../services/guest-trial-service";
import { UrlParam } from "../../consts/url.consts";
import { StatusCodes } from "http-status-codes";
import {
  getMinutesLeft,
  getTimeAsString,
  getTimeAsClockValue,
} from "../../utils/dates.utils";
import { emailConfig } from "../../configs/configs";
import { DEFAULT_TRIAL_DURATION } from "../../consts/api-key.consts";

enum PopupOption {
  Confirmation,
  Processing,
  Success,
  Conflict,
  Error,
}

type PopupDetails = {
  header: string;
  content: string | JSX.Element;
  confirmText: string | undefined;
  confirmAction?: () => void;
  icon: JSX.Element;
};

export default function TrialPopup() {
  const guestTrialService = new GuestTrialService();
  const [params] = useSearchParams();
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const [popupOption, setPopupOption] = useState(PopupOption.Confirmation);

  async function confirmTrial() {
    try {
      const response = await guestTrialService.startGuestTrial(
        params.get(UrlParam.Email)!,
        params.get(UrlParam.Hash)!
      );

      setStoredProxyKeyDetails(response.proxyKey, response.expirationDate);
      setPopupOption(PopupOption.Success);
    } catch (e) {
      if (e instanceof APIError && e.statusCode === StatusCodes.CONFLICT) {
        setPopupOption(PopupOption.Conflict);
      } else {
        setPopupOption(PopupOption.Error);
      }
    }
  }

  const TrialConfirmationDetails: PopupDetails = {
    header: "Confirm your trial.",
    content: `Would you like to start your free trial? Once you start, you will have ${DEFAULT_TRIAL_DURATION} hours to explore our features. The trial will only work in this browser.`,
    confirmText: "Start trial",
    confirmAction: confirmTrial,
    icon: <AccessTimeIcon className="!fill-text-brand-light" />,
  };

  const TrialProcessingDetails: PopupDetails = {
    header: "Processing your free trial.",
    content: <>Please hold on while we get your trial key...</>,
    confirmText: undefined,
    icon: <AccessTimeIcon color="disabled" />,
  };

  const GetTrialSuccessDetails: () => PopupDetails = () => {
    const expirationDate = getStoredProxyKeyExpiration()!;
    const minutesLeft = getMinutesLeft(expirationDate);
    const timeLeftString = getTimeAsString(minutesLeft);
    const timeLeftClockValue = getTimeAsClockValue(minutesLeft);

    return {
      header: `Enjoy your free trial for ${timeLeftString}!`,
      content: "Make the most of it while you explore our features.",
      confirmText: "Start exploring",
      icon: (
        <div id="trial-success-clock" className="flex flex-row gap-2">
          <AccessTimeIcon className="!fill-text-brand-light" />
          <span className="text-text-brand-light font-medium">
            {timeLeftClockValue}
          </span>
        </div>
      ),
    };
  };

  const GetTrialConflictDetails: () => PopupDetails = () => {
    const expDateString = getStoredProxyKeyExpiration()!;
    const expirationDate = new Date(expDateString);
    const currentDate = new Date();

    if (expirationDate > currentDate) {
      const minutesLeft = getMinutesLeft(expDateString);
      const timeLeftClockValue = getTimeAsClockValue(minutesLeft);

      return {
        header: "Your trial is already in progress!",
        content:
          "Your trial has already started. Make the most of it while you explore our features.",
        confirmText: "Continue exploring",
        icon: (
          <div className="flex flex-row gap-2">
            <AccessTimeIcon className="!fill-text-brand-light" />
            <span className="text-text-brand-light font-medium">
              {timeLeftClockValue}
            </span>
          </div>
        ),
      };
    } else {
      return {
        header: "Your trial has expired.",
        content: (
          <>
            Your trial has already expired and you can't start a new trial using
            this link. If you want to schedule a meeting or need a new trial,
            contact us at{" "}
            <a
              className="text-text-brand-light"
              href={`mailto:${emailConfig.SUPPORT_EMAIL}`}
            >
              {emailConfig.SUPPORT_EMAIL}
            </a>
            .
          </>
        ),
        confirmText: "Close",
        icon: <AccessTimeIcon color="error" />,
      };
    }
  };

  const TrialErrorDetails: PopupDetails = {
    header: "Sorry, something went wrong.",
    content: (
      <>
        Your trial could not be started. Please try again later or contact
        support at{" "}
        <a
          className="text-text-brand-light"
          href={`mailto:${emailConfig.SUPPORT_EMAIL}`}
        >
          {emailConfig.SUPPORT_EMAIL}
        </a>
        .
      </>
    ),
    confirmText: "Close",
    icon: <AccessTimeIcon color="error" />,
  };

  const getPopupDetails = (option: PopupOption): PopupDetails => {
    switch (option) {
      case PopupOption.Success:
        return GetTrialSuccessDetails();
      case PopupOption.Conflict:
        return GetTrialConflictDetails();
      case PopupOption.Error:
        return TrialErrorDetails;
      case PopupOption.Processing:
        return TrialProcessingDetails;
      case PopupOption.Confirmation:
      default:
        return TrialConfirmationDetails;
    }
  };

  const popupDetails = getPopupDetails(popupOption);

  return (
    <InfoPopup
      title={popupDetails.header}
      onClose={() => setIsPopupVisible(false)}
      onConfirm={popupDetails.confirmAction}
      confirmText={popupDetails.confirmText}
      open={isPopupVisible}
      icon={popupDetails.icon}
    >
      {popupDetails.content}
    </InfoPopup>
  );
}
