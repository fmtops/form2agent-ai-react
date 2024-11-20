import InfoPopup from "../common/info-popup";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { useState } from "react";
import { GuestTrialService } from "../../services/guest-trial-service";
import { useSearchParams } from "react-router-dom";
import { UrlParam } from "../../consts/url.consts";
import { removeUrlSearchParams } from "../../utils/url.utils";
import { emailConfig } from "../../configs/configs";

enum PopupOption {
  OptOutChoice,
  Success,
  Error,
}

type PopupDetails = {
  header: string;
  content: string | JSX.Element;
  confirmText: string | undefined;
  buttonAction: () => void;
};

export default function OptOutPopup() {
  const guestTrialService = new GuestTrialService();
  const [params] = useSearchParams();
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const [popupOption, setPopupOption] = useState(PopupOption.OptOutChoice);

  const OptOutChoiceDetails: PopupDetails = {
    header: "Sad to see you go!",
    content: (
      <>
        Before you opt out, we'd love to offer you a chance to{" "}
        <a
          className="text-text-brand-light"
          href="https://calendar.app.google/6jaKPZD9oa9xHDty5"
        >
          schedule a meeting
        </a>{" "}
        with us to discuss how our newsletter can better serve your interests.
        Staying subscribed means you'll continue to receive the latest updates
        and insights in the world of AI. We hope you'll reconsider and stay with
        us on this exciting journey!
      </>
    ),
    confirmText: "Opt out",
    buttonAction: () => handleOptOut(),
  };

  const OptOutSuccessDetails: PopupDetails = {
    header: "You have been succesfully opted out!",
    content:
      "You’ve successfully opted out of our emails, but we’d still love to stay connected and chat more about the magic of AI whenever you're ready.",
    confirmText: "Close",
    buttonAction: () => handleClose(),
  };

  const OptOutErrorDetails: PopupDetails = {
    header: "Something went wrong",
    content: (
      <>
        Please try again later or contact support at{" "}
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
    buttonAction: () => handleClose(),
  };

  const handleOptOut = async () => {
    try {
      let response = await guestTrialService.OptOut(
        params.get(UrlParam.Email)!,
        params.get(UrlParam.Hash)!
      );
      if (response.ok) {
        setPopupOption(PopupOption.Success);
      } else {
        setPopupOption(PopupOption.Error);
      }
    } catch (e) {
      setPopupOption(PopupOption.Error);
    }
  };

  const handleClose = () => {
    removeUrlSearchParams([UrlParam.Email, UrlParam.Hash]);
    setIsPopupVisible(false);
  };

  const getPopupDetails = (option: PopupOption): PopupDetails => {
    switch (option) {
      case PopupOption.OptOutChoice:
        return OptOutChoiceDetails;
      case PopupOption.Success:
        return OptOutSuccessDetails;
      case PopupOption.Error:
        return OptOutErrorDetails;
    }
  };

  const popupDetails = getPopupDetails(popupOption);

  return (
    <InfoPopup
      title={popupDetails.header}
      onClose={handleClose}
      onConfirm={popupDetails.buttonAction}
      confirmText={popupDetails.confirmText}
      open={isPopupVisible}
      icon={
        <SentimentVeryDissatisfiedIcon className="!fill-text-brand-light" />
      }
    >
      {popupDetails.content}
    </InfoPopup>
  );
}
