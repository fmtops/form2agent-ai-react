import { FormikProps } from "formik";
import { useState, useRef, RefObject, useEffect } from "react";
import ChatWindow from "../components/ai-chat/chat-window";
import HelpdeskForm from "../components/helpdesk/helpdesk-form";
import { AudioProvider } from "../contexts/AudioContext";
import FormPageLayout from "../layouts/form-page-layout";
import { stringifyValues } from "../utils/chat.utilts";
import {
  CHECKIN_DESCRIPTION,
  CHECKIN_FORM_VALUES,
  CheckInDescriptionContext,
} from "../models/checkin-context-model";
import { CheckinFormType } from "../models/checkin-model";
import CheckinForm from "../components/checkin/checkin-form";
import { FormAction } from "../consts/general-fields.consts";
import { Helmet } from "react-helmet-async";

const CheckInPage = () => {
  const [form, setForm] = useState(CHECKIN_FORM_VALUES);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const formikHelpdeskRef = useRef() as unknown as RefObject<
    FormikProps<CheckinFormType>
  >;

  useEffect(() => {
    setForm(CHECKIN_FORM_VALUES);
  }, []);

  const performAction = (action: FormAction) => {
    switch (action) {
      case FormAction.Submit:
        onSubmit();
        break;
      default:
        break;
    }
  };

  const executeFormLogic = async (appData: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      ...formikHelpdeskRef.current?.values,
    }));
    let responseData = JSON.parse(appData);
    setForm({
      ...formikHelpdeskRef.current?.values,
      ...responseData,
    } as CheckinFormType);
    if (responseData.action) performAction(responseData.action);
  };

  const onSubmit = () => {
    setForm(CHECKIN_FORM_VALUES);
    setIsSuccessModalOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Simplify Check-In with Form2Agent AI</title>
        <meta
          name="description"
          content="Discover the ease of checking in with Form2Agent AI. Streamline your process and enhance guest experience by utilizing advanced AI technology for efficient and accurate check-ins."
        />
      </Helmet>
      <AudioProvider>
        <FormPageLayout
          title="Check in Form"
          subTitle="Explore how Form2Agent AI can assist in checking in a new hotel resident."
          onSubmit={onSubmit}
          chatElement={
            <ChatWindow
              executeFormLogic={executeFormLogic}
              formDescription={CHECKIN_DESCRIPTION}
              formValues={stringifyValues(form)}
              formContext={stringifyValues(CheckInDescriptionContext)}
            />
          }
          isSuccessModalOpen={isSuccessModalOpen}
          onCloseModal={() => setIsSuccessModalOpen(false)}
        >
          <CheckinForm
            form={form}
            setForm={setForm}
            formikRef={formikHelpdeskRef}
          />
        </FormPageLayout>
      </AudioProvider>
    </>
  );
};

export default CheckInPage;
