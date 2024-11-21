import { useEffect, useRef, useState } from "react";
import ChatWindow from "../components/ai-chat/chat-window";
import FormPageLayout from "../layouts/form-page-layout";
import { stringifyValues } from "../utils/chat.utilts";
import { FormikProps } from "formik";
import { AudioProvider } from "../contexts/AudioContext";
import { FormAction } from "../consts/general-fields.consts";
import { HOUSE_INSPECTION_FORM_VALUES } from "../consts/house-inspection.consts";
import { HouseInspectionFormType } from "../models/house-inspection-model";
import { mergeFormData } from "../utils/house-inspection.utils";
import { DescriptionContext } from "../models/house-inspection-context-model";
import HouseInspectionForm from "../components/house-inspection/house-inspection";

const HouseInspectionPage = () => {
  const [form, setForm] = useState(HOUSE_INSPECTION_FORM_VALUES);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  useEffect(() => {
    setForm(HOUSE_INSPECTION_FORM_VALUES);
  }, []);

  const handleSubmit = () => {
    setForm(HOUSE_INSPECTION_FORM_VALUES);
    setIsSuccessModalOpen(true);
  };

  const formikHouseInspectionRef =
    useRef<FormikProps<HouseInspectionFormType>>(null);

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
      ...formikHouseInspectionRef.current?.values,
    }));
    let responseData = JSON.parse(appData);
    setForm((prevForm) => mergeFormData(prevForm, responseData));
    if (responseData.action) performAction(responseData.action);
  };

  return (
    <AudioProvider>
      <FormPageLayout
        title="House Inspection"
        subTitle="See how Form2Agent AI manages house inspection forms with a dynamic number of item inputs. Upload a photo of your rooms or hold the button to speak with the assistant and quickly add your house inspection details."
        onSubmit={handleSubmit}
        chatElement={
          <ChatWindow
            executeFormLogic={executeFormLogic}
            formDescription="Add a new house inspection to the system."
            formValues={stringifyValues(form)}
            formContext={stringifyValues(DescriptionContext)}
          />
        }
        isSuccessModalOpen={isSuccessModalOpen}
        onCloseModal={() => setIsSuccessModalOpen(false)}
      >
        <HouseInspectionForm
          form={form}
          setForm={setForm}
          formikRef={formikHouseInspectionRef}
        />
      </FormPageLayout>
    </AudioProvider>
  );
};

export default HouseInspectionPage;
