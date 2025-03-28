import { RefObject, useEffect, useRef, useState } from "react";
import ChatWindow from "../components/ai-chat/chat-window";
import HelpdeskForm from "../components/helpdesk/helpdesk-form";
import { HelpdeskFormType } from "../models/helpdesk-model";
import { HelpdeskDescriptionContext } from "../models/helpdesk-context-model";
import { FormikProps } from "formik";
import { HELPDESK_FORM_VALUES } from "../consts/helpdesk.consts";
import FormPageLayout from "../layouts/form-page-layout";
import { stringifyValues } from "../utils/chat.utilts";
import { AudioProvider } from "../contexts/AudioContext";
import { FormAction } from "../consts/general-fields.consts";
import { Helmet } from "react-helmet-async";
import { convertFileContentToStatus } from "../helpers/fetch-file-content";
import { FileFieldStatus } from "../consts/chat.consts";

const HelpdeskPage = () => {
  const [form, setForm] = useState(HELPDESK_FORM_VALUES);
  const [fileInChat, setFileInChat] = useState<string | null>(null);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const formikHelpdeskRef = useRef() as unknown as RefObject<
    FormikProps<HelpdeskFormType>
  >;

  useEffect(() => {
    setForm(HELPDESK_FORM_VALUES);
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
    let responseData = JSON.parse(appData) as HelpdeskFormType;

    if (responseData.attachmentFile === FileFieldStatus.New) {
      responseData.attachmentFile = fileInChat;
      setFileInChat(null);
    } else if (responseData.attachmentFile === FileFieldStatus.None) {
      responseData.attachmentFile = null;
    } else if (responseData.attachmentFile === FileFieldStatus.Existing) {
      responseData.attachmentFile = form.attachmentFile;
    }
    setForm({
      ...formikHelpdeskRef.current?.values,
      ...responseData,
    });
    if (responseData.action) performAction(responseData.action);
  };

  const onSubmit = () => {
    setForm(HELPDESK_FORM_VALUES);
    setIsSuccessModalOpen(true);
  };

  const onFileUpload = (newFile: string | null) => {
    setFileInChat(newFile);
  };

  return (
    <>
      <Helmet>
        <title>Simplify Help Desk Requests with Form2Agent AI</title>
        <meta
          name="description"
          content="Learn how Form2Agent AI streamlines your help desk request process. Just hold the chat button and speak with the assistant to effortlessly submit requests. Enhance support efficiency and user experience today."
        />
      </Helmet>
      <AudioProvider>
        <FormPageLayout
          title="Helpdesk Form"
          subTitle="Explore how Form2Agent AI can assist in submitting a helpdesk request by holding the chat button to speak with the assistant."
          onSubmit={onSubmit}
          chatElement={
            <ChatWindow
              executeFormLogic={executeFormLogic}
              formDescription="Fill out this form to quickly get assistance from our Helpdesk."
              formValues={stringifyValues({
                ...form,
                attachmentFile: convertFileContentToStatus(form.attachmentFile),
              })}
              onFileUpload={onFileUpload}
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
    </>
  );
};

export default HelpdeskPage;
