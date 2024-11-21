import { DialogContent, Typography, RadioGroup } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import StyledButton from "../common/styled-button";
import FormCardRadio from "../common/form-card-radio";
import SimpleAccordion from "../common/simple-accordion";
import { TrialDialogContent } from "../../types/Trial/TrialDialogContent";
import { TrialQuestionAccordion } from "../../types/Trial/TrialQuestionAccordion";
import { DEFAULT_TRIAL_DURATION } from "../../consts/api-key.consts";

export default function TrialOptionsDialogContent({
  onClose,
  setOpenDialog,
}: {
  onClose: () => void;
  setOpenDialog: React.Dispatch<React.SetStateAction<TrialDialogContent>>;
}) {
  const [expandedAccordion, setExpandedAccordion] =
    useState<TrialQuestionAccordion | null>(
      TrialQuestionAccordion.HowDoesItWork
    ); // only one FAQ accordion expanded at a time, or none
  const [selectedTrialOption, setSelectedTrialOption] = useState(
    TrialDialogContent.TrialKeyForm
  ); // option selected by radio, to open after button press

  const toggleAccordion = (question: TrialQuestionAccordion) => {
    setExpandedAccordion((prev) => (prev === question ? null : question));
  };

  const handleRadioOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedTrialOption(event.target.value as TrialDialogContent);
  };

  const handleChooseTrialOption = () => {
    setOpenDialog(selectedTrialOption);
  };

  // Expand if more options are added in the future
  const optionButtonText =
    selectedTrialOption === TrialDialogContent.TrialKeyForm
      ? "Start a free trial"
      : "Enter an OpenAI API key";

  return (
    <div className="pt-6 pb-8 flex flex-col gap-6">
      <div className="flex justify-end items-center">
        <CloseIcon
          onClick={onClose}
          className={`cursor-pointer text-fg-primary-light`}
        />
      </div>
      <DialogContent className="grid grid-cols-1 md:grid-cols-2 gap-8 !p-0">
        <div className="flex flex-col gap-8">
          <Typography variant="h5" className="!p-0 !font-medium max-w-sm">
            Choose how you'd like to experience Form2Agent
          </Typography>
          <div className="flex flex-col gap-4">
            <SimpleAccordion
              header="How does the free trial work?"
              isExpanded={
                expandedAccordion === TrialQuestionAccordion.HowDoesItWork
              }
              onChange={() =>
                toggleAccordion(TrialQuestionAccordion.HowDoesItWork)
              }
            >
              Simply provide your name and email to receive instant access to
              all our premium features for {DEFAULT_TRIAL_DURATION} hours. No
              credit card is required, and there's no commitment—just an
              opportunity to explore and experience how Form2Agent can
              streamline your workflow.
            </SimpleAccordion>
            <SimpleAccordion
              header="What’s an OpenAI API key?"
              isExpanded={
                expandedAccordion === TrialQuestionAccordion.WhatIsAnOpenAIKey
              }
              onChange={() =>
                toggleAccordion(TrialQuestionAccordion.WhatIsAnOpenAIKey)
              }
            >
              An OpenAI API key is a unique code used to access OpenAI's models
              programatically. To leverage AI capabilities for text and speech,
              our demo app can use the key to authenticate with OpenAI services.
            </SimpleAccordion>
            <SimpleAccordion
              header="Do I need to pay at any point?"
              isExpanded={
                expandedAccordion === TrialQuestionAccordion.IsThisFree
              }
              onChange={() =>
                toggleAccordion(TrialQuestionAccordion.IsThisFree)
              }
            >
              Now, you don’t, and that’s the best part!
            </SimpleAccordion>
          </div>
        </div>
        <RadioGroup
          name="trial-option"
          className="flex flex-col gap-4 justify-between"
          value={selectedTrialOption}
          onChange={handleRadioOptionChange}
        >
          <FormCardRadio
            title="Start a free trial"
            description={`Experience the power of Form2Agent with a free ${DEFAULT_TRIAL_DURATION}-hour trial.`}
            value={TrialDialogContent.TrialKeyForm}
          ></FormCardRadio>
          <FormCardRadio
            title="Enter an OpenAI API key"
            description="Explore Form2Agent app with your own OpenAI API key."
            value={TrialDialogContent.OpenAIKeyForm}
          ></FormCardRadio>
          <StyledButton onClick={handleChooseTrialOption} className="w-full">
            {optionButtonText}
          </StyledButton>
        </RadioGroup>
      </DialogContent>
    </div>
  );
}
