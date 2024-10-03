import { RefObject, useEffect, useRef, useState } from "react";
import ChatWindow from "../components/ai-chat/chat-window";
import HelpdeskForm from "../components/helpdesk/helpdesk-form";
import { HelpdeskAction, HelpdeskFormType } from "../models/helpdesk-model";
import { HelpdeskDescriptionContext } from "../models/helpdesk-context-model";
import { FormikProps } from "formik";
import { HELPDESK_FORM_VALUES } from "../consts/helpdesk.consts";
import FormPageLayout from "../layouts/form-page-layout";
import { stringifyValues } from "../utils/chat.utilts";
import { AudioProvider } from "../contexts/AudioContext";

const HelpdeskPage = () => {
  const [form, setForm] = useState(HELPDESK_FORM_VALUES);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const formikHelpdeskRef = useRef() as unknown as RefObject<
    FormikProps<HelpdeskFormType>
  >;

  useEffect(() => {
    setForm(HELPDESK_FORM_VALUES);
  }, []);

  const performAction = (action: HelpdeskAction) => {
    switch (action) {
      case HelpdeskAction.Submit:
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
    } as HelpdeskFormType);
    if (responseData.action) performAction(responseData.action);
  };

  const onSubmit = () => {
    setForm(HELPDESK_FORM_VALUES);
    setIsSuccessModalOpen(true);
  };

  return (
    <AudioProvider>
      <FormPageLayout
        title="Helpdesk Form"
        subTitle="Explore how Form2Agent AI can assist in submitting a helpdesk request by holding the chat button to speak with the assistant."
        onSubmit={onSubmit}
        chatElement={
          <ChatWindow
            executeFormLogic={executeFormLogic}
            formDescription="Fill out this form to quickly get assistance from our Helpdesk."
            formValues={stringifyValues(form)}
            formContext={stringifyValues(HelpdeskDescriptionContext)}
          />
        }
        isSuccessModalOpen={isSuccessModalOpen}
        onCloseModal={() => setIsSuccessModalOpen(false)}
      >
        <HelpdeskForm
          form={form}
          setForm={setForm}
          formikRef={formikHelpdeskRef}
        />
      </FormPageLayout>
    </AudioProvider>
  );
};

export default HelpdeskPage;
