import { FormikProps } from "formik";
import { useState, useRef, RefObject, useEffect } from "react";
import ChatWindow from "../components/ai-chat/chat-window";
import { AudioProvider } from "../contexts/AudioContext";
import FormPageLayout from "../layouts/form-page-layout";
import { stringifyValues } from "../utils/chat.utilts";
import { DealDescriptionContext } from "../models/deal-context-model";
import { DealAction, DealFormType } from "../models/deal-model";
import DealForm from "../components/deal/deal-form";
import { DEAL_DESCRIPTION, DEAL_FORM_VALUES } from "../consts/deal.consts";
import { Helmet } from "react-helmet-async";

const DealPage = () => {
  const [form, setForm] = useState(DEAL_FORM_VALUES);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const formikHelpdeskRef = useRef() as unknown as RefObject<
    FormikProps<DealFormType>
  >;

  useEffect(() => {
    setForm(DEAL_FORM_VALUES);
  }, []);

  const performAction = (action: DealAction) => {
    switch (action) {
      case DealAction.Submit:
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
    } as DealFormType);
    if (responseData.action) performAction(responseData.action);
  };

  const onSubmit = () => {
    setForm(DEAL_FORM_VALUES);
    setIsSuccessModalOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Streamline Deal Creation with Form2Agent AI</title>
        <meta
          name="description"
          content="Discover how Form2Agent AI simplifies the process of creating new deals. Enhance your workflow efficiency by leveraging AI assistance for seamless deal management and execution."
        />
      </Helmet>
      <AudioProvider>
        <FormPageLayout
          title="Add new deal"
          subTitle="Explore how Form2Agent AI can assist in creating new deals."
          onSubmit={onSubmit}
          chatElement={
            <ChatWindow
              executeFormLogic={executeFormLogic}
              formDescription={DEAL_DESCRIPTION}
              formValues={stringifyValues(form)}
              formContext={stringifyValues(DealDescriptionContext)}
            />
          }
          isSuccessModalOpen={isSuccessModalOpen}
          onCloseModal={() => setIsSuccessModalOpen(false)}
        >
          <DealForm
            form={form}
            setForm={setForm}
            formikRef={formikHelpdeskRef}
          />
        </FormPageLayout>
      </AudioProvider>
    </>
  );
};

export default DealPage;
