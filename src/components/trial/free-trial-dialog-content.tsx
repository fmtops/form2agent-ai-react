import { DialogTitle, DialogContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import StyledButton from "../common/styled-button";
import DataUsageInfo from "../common/data-usage-info";
import {
  MAX_INPUT_LENGTH_MEDIUM,
  MAX_INPUT_LENGTH_SHORT,
} from "../../consts/input.consts";
import StyledCheckbox from "../common/mui-styled/styled-checkbox";
import { useState } from "react";
import { GuestTrialService } from "../../services/guest-trial-service";
import {
  validateEmail,
  validateFirstName,
  validateIsMessagingCheckbox,
} from "../../helpers/validation-helper";
import StyledTextField from "../common/mui-styled/styled-text-field";
import { APIError } from "../../lib/errors/api-error";
import { StatusCodes } from "http-status-codes";
import { DEFAULT_TRIAL_DURATION } from "../../consts/api-key.consts";

export default function FreeTrialDialogContent({
  onSuccess,
  onConflict,
  onBack,
  onClose,
}: {
  onSuccess: () => void;
  onConflict: () => void;
  onBack: () => void;
  onClose: () => void;
}) {
  const [formState, setFormState] = useState({
    firstName: "",
    firstNameError: "",
    email: "",
    emailError: "",
    isMessagingChecked: false,
    isMessagingCheckedError: "",
    isProcessingForm: false,
    backendError: "",
  });

  const guestTrialService = new GuestTrialService();

  const handleError = (e: unknown) => {
    console.error(e);
    if (e instanceof APIError && e.statusCode === StatusCodes.CONFLICT) {
      onConflict();
      return;
    }
    setFormState((prevState) => ({
      ...prevState,
      backendError: "Something went wrong. Please try again later.",
    }));
  };

  const validateForm = () => {
    const fNameErrors = validateFirstName(formState.firstName);
    const emailErrors = validateEmail(formState.email);
    const messagingErrors = validateIsMessagingCheckbox(
      formState.isMessagingChecked
    );

    const isFormValid =
      fNameErrors === "" && emailErrors === "" && messagingErrors === "";

    setFormState((prevState) => ({
      ...prevState,
      firstNameError: fNameErrors,
      emailError: emailErrors,
      isMessagingCheckedError: messagingErrors,
    }));

    return isFormValid;
  };

  const handleSubmit = async () => {
    try {
      setFormState((prevState) => ({
        ...prevState,
        isProcessingForm: true,
        backendError: "",
      }));

      if (!validateForm()) {
        return;
      }

      await guestTrialService.addGuestTrialInfo(
        formState.firstName,
        formState.email,
        formState.isMessagingChecked
      );
      onSuccess();
    } catch (e) {
      handleError(e);
    } finally {
      setFormState((prevState) => ({
        ...prevState,
        isProcessingForm: false,
      }));
    }
  };

  const toggleMessagingCheckbox = () => {
    if (formState.isProcessingForm) return;
    setFormState((prevState) => ({
      ...prevState,
      isMessagingChecked: !prevState.isMessagingChecked,
    }));
  };

  return (
    <div
      id="free-trial-dialog-content"
      className="pt-8 pb-8 flex flex-col gap-4"
    >
      <div>
        <div className="flex justify-between items-center">
          <KeyboardBackspaceIcon
            onClick={onBack}
            className={`cursor-pointer text-fg-primary-light`}
          />
          <CloseIcon
            onClick={onClose}
            className={`cursor-pointer text-fg-primary-light`}
          />
        </div>
        <DialogTitle className="!p-0 !pt-4">Start a free trial</DialogTitle>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        noValidate
      >
        <DialogContent
          className="flex flex-col gap-4 !px-0 !pb-0 !border-b-0"
          dividers
        >
          <span className="text-text-primary-light">
            Experience the power of Form2Agent with a free{" "}
            {DEFAULT_TRIAL_DURATION}-hour trial. Just provide your name and
            email to unlock all premium features and see how Form2Agent can
            transform your workflow.
          </span>
          <div className="flex flex-col md:flex-row gap-4">
            <StyledTextField
              value={formState.firstName}
              onChange={(e) =>
                setFormState((prevState) => ({
                  ...prevState,
                  firstName: e.target.value,
                }))
              }
              variant="outlined"
              className="justify-start grow"
              inputProps={{
                className: "!py-[10px]",
                maxLength: MAX_INPUT_LENGTH_SHORT,
              }}
              placeholder="Name (required)"
              type="text"
              required
              error={formState.firstNameError !== ""}
              helperText={formState.firstNameError}
              disabled={formState.isProcessingForm}
            />
            <StyledTextField
              value={formState.email}
              onChange={(e) =>
                setFormState((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }))
              }
              variant="outlined"
              className="justify-start grow"
              inputProps={{
                className: "!py-[10px]",
                maxLength: MAX_INPUT_LENGTH_MEDIUM,
              }}
              placeholder="Email (required)"
              type="email"
              required
              error={formState.emailError !== ""}
              helperText={formState.emailError}
              disabled={formState.isProcessingForm}
            />
            <StyledButton
              id="trial-confirm-button"
              className="px-6 h-fit min-h-[43px] text-sm font-medium"
              type="submit"
              disabled={formState.isProcessingForm}
            >
              Start a free trial
            </StyledButton>
          </div>
          <div className="flex gap-x-2.5">
            <StyledCheckbox
              size="small"
              checked={formState.isMessagingChecked}
              disabled={formState.isProcessingForm}
              onClick={toggleMessagingCheckbox}
            />
            <div className="flex flex-col gap-y-1">
              <span
                className="text-text-secondary-light text-sm cursor-pointer"
                onClick={toggleMessagingCheckbox}
              >
                I agree to receive emails from Freeport Metrics.*
              </span>
              <span className="text-text-secondary-light text-xs">
                <span
                  className="cursor-pointer"
                  onClick={toggleMessagingCheckbox}
                >
                  By checking this box, you agree to our
                </span>{" "}
                <a
                  className="text-text-brand-light"
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>{" "}
                <span
                  className="cursor-pointer"
                  onClick={toggleMessagingCheckbox}
                >
                  and consent to receive marketing communications from us. You
                  can unsubscribe at any time by clicking the link in our
                  emails.
                </span>
              </span>
              {formState.isMessagingCheckedError && (
                <span className="text-red-500 text-xs">
                  {formState.isMessagingCheckedError}
                </span>
              )}
              {formState.backendError && (
                <span className="text-red-500 text-xs">
                  {formState.backendError}
                </span>
              )}
            </div>
          </div>
          <DataUsageInfo />
        </DialogContent>
      </form>
    </div>
  );
}
