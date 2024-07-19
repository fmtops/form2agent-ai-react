import { RefObject, useEffect, useRef, useState } from "react";
import ChatWindow from "../components/ai-chat/chat-window";
import { AiChatService } from "../services/ai-chat-service";
import { ChatMessage } from "../types/api/AiChatServiceTypes";
import HelpdeskForm from "../components/helpdesk/helpdesk-form";
import { HelpdeskAction, HelpdeskFormType } from "../models/helpdesk-model";
import { HelpdeskDescriptionContext } from "../models/helpdesk-context-model";
import { FormikProps } from "formik";
import { HELPDESK_FORM_VALUES } from "../consts/helpdesk.consts";
import FormPageLayout from "../layouts/form-page-layout";
import { stringifyValues } from "../utils/chat.utilts";

const HelpdeskPage = () => {
  const aiChatService = new AiChatService();
  const [form, setForm] = useState(HELPDESK_FORM_VALUES);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
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

  const sendMessage = async (chatMessage: ChatMessage) => {
    setForm((prevForm) => ({
      ...prevForm,
      ...formikHelpdeskRef.current?.values,
    }));
    let response;
    try {
      response = await aiChatService.sendMessage(chatMessage);
      let responseData = JSON.parse(response.model.appData);
      setForm({
        ...formikHelpdeskRef.current?.values,
        ...responseData,
      } as HelpdeskFormType);

      if (responseData.action) performAction(responseData.action);
    } catch (error) {
      console.log("error", error);
    }

    return response;
  };

  const onSubmit = () => {
    setForm(HELPDESK_FORM_VALUES);
    setIsSuccessModalOpen(true);
  };

  return (
    <FormPageLayout
      title="Helpdesk Form"
      subTitle="Fill out this form to quickly get assistance from our Helpdesk. Provide details about your issue to ensure a fast and effective response."
      onSubmit={onSubmit}
      chatElement={
        <ChatWindow
          createNewChat={aiChatService.createNewChat}
          sendMessage={sendMessage}
          formDescription="Fill out this form to quickly get assistance from our Helpdesk."
          formValues={stringifyValues(form)}
          formContext={stringifyValues(HelpdeskDescriptionContext)}
          setIsChatOpen={setIsChatOpen}
        />
      }
      isChatOpen={isChatOpen}
      isSuccessModalOpen={isSuccessModalOpen}
      onCloseModal={() => setIsSuccessModalOpen(false)}
    >
      <HelpdeskForm
        form={form}
        setForm={setForm}
        formikRef={formikHelpdeskRef}
      />
    </FormPageLayout>
  );
};

export default HelpdeskPage;
