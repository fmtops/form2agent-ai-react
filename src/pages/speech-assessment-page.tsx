import { useEffect, useRef, useState } from "react";
import ChatWindow from "../components/ai-chat/chat-window";
import FormPageLayout from "../layouts/form-page-layout";
import { stringifyValues } from "../utils/chat.utilts";
import { FormikProps } from "formik";
import { AudioProvider } from "../contexts/AudioContext";
import { FormAction } from "../consts/general-fields.consts";
import { SpeechAssessmentFormType } from "../models/speech-assessment-model";
import { DescriptionContext } from "../models/speech-assessment-context-model";
import { mergeFormData } from "../utils/speech-assessment.utils";
import { SPEECH_ASSESSMENT_FORM_VALUES } from "../consts/speech-assessment.consts";
import SpeechAssessmentForm from "../components/speech-assessment/speech-assessment-form";
import { useLayout } from "../contexts/LayoutContext";

const SpeechAssessmentPage = () => {
  const [form, setForm] = useState(SPEECH_ASSESSMENT_FORM_VALUES);
  const { isChatExpanded, isNavbarExpanded } = useLayout();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  useEffect(() => {
    setForm(SPEECH_ASSESSMENT_FORM_VALUES);
  }, []);

  const handleSubmit = () => {
    setForm(SPEECH_ASSESSMENT_FORM_VALUES);
    setIsSuccessModalOpen(true);
  };

  const formikRef = useRef<FormikProps<SpeechAssessmentFormType>>(null);

  const performAction = (action: FormAction) => {
    switch (action) {
      case FormAction.Submit:
        handleSubmit();
        break;
      default:
        break;
    }
  };

  const executeFormLogic = async (appData: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      ...formikRef.current?.values,
    }));
    let responseData = JSON.parse(appData);
    setForm((prevForm) => mergeFormData(prevForm, responseData));
    if (responseData.action) performAction(responseData.action);
  };

  return (
    <AudioProvider>
      <FormPageLayout
        title="Speech Assessment"
        subTitle="See how Form2Agent AI manages speech assessment forms. Upload a photo or a PDF file of your speech assessment or hold the button to speak with the assistant and quickly add your speech assessment details."
        onSubmit={handleSubmit}
        chatElement={
          <ChatWindow
            executeFormLogic={executeFormLogic}
            formDescription="Provide detailed information to assist the doctor in the patient's speech assessment."
            formValues={stringifyValues(form)}
            formContext={stringifyValues(DescriptionContext)}
          />
        }
        isSuccessModalOpen={isSuccessModalOpen}
        onCloseModal={() => setIsSuccessModalOpen(false)}
      >
        <SpeechAssessmentForm
          form={form}
          setForm={setForm}
          formikRef={formikRef}
          isChatExpanded={isChatExpanded}
          isNavbarExpanded={isNavbarExpanded}
        />
      </FormPageLayout>
    </AudioProvider>
  );
};

export default SpeechAssessmentPage;
