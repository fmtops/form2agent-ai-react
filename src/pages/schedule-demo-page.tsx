import { RefObject, useEffect, useRef, useState } from "react";
import ChatWindow from "../components/ai-chat/chat-window";
import ScheduleDemoForm from "../components/schedule-demo/schedule-demo-form";
import {
  ScheduleDemoAction,
  ScheduleDemoFormType,
} from "../models/schedule-demo-model";
import { ScheduleDemoDescriptionContext } from "../models/schedule-demo-context-model";
import { FormikProps } from "formik";
import { SCHEDULE_DEMO_FORM_VALUES } from "../consts/schedule-demo.consts";
import FormPageLayout from "../layouts/form-page-layout";
import { stringifyValues } from "../utils/chat.utilts";
import { AudioProvider } from "../contexts/AudioContext";
import { Helmet } from "react-helmet-async";

const ScheduleDemoPage = () => {
  const [form, setForm] = useState(SCHEDULE_DEMO_FORM_VALUES);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const formikScheduleDemoRef = useRef() as unknown as RefObject<
    FormikProps<ScheduleDemoFormType>
  >;

  useEffect(() => {
    setForm(SCHEDULE_DEMO_FORM_VALUES);
  }, []);

  const performAction = (action: ScheduleDemoAction) => {
    switch (action) {
      case ScheduleDemoAction.Send:
        onSubmit();
        break;
      default:
        break;
    }
  };

  const executeFormLogic = async (appData: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      ...formikScheduleDemoRef.current?.values,
    }));
    let responseData = JSON.parse(appData);
    setForm({
      ...formikScheduleDemoRef.current?.values,
      ...responseData,
    } as ScheduleDemoFormType);
    if (responseData.action) performAction(responseData.action);
  };

  const onSubmit = () => {
    setForm(SCHEDULE_DEMO_FORM_VALUES);
    setIsSuccessModalOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Effortless Demo Scheduling with Form2Agent</title>
        <meta
          name="description"
          content="Experience seamless demo scheduling with Form2Agent. Simply fill out a form with your availability, and let the AI handle coordination for the perfect time. Eliminate the hassle of back-and-forth emails and streamline your scheduling process."
        />
      </Helmet>
      <AudioProvider>
        <FormPageLayout
          title="Schedule a Demo"
          subTitle="Form2Agent simplifies scheduling a demo by automating the process. Just fill out a form with your availability, and it coordinates with all parties to confirm the best time. No more back-and-forth—Form2Agent handles it all, making scheduling quick and easy."
          onSubmit={onSubmit}
          chatElement={
            <ChatWindow
              executeFormLogic={executeFormLogic}
              formDescription="Fill out this form to quickly schedule a demo of Form2Agent."
              formValues={stringifyValues(form)}
              formContext={stringifyValues(ScheduleDemoDescriptionContext)}
            />
          }
          isSuccessModalOpen={isSuccessModalOpen}
          onCloseModal={() => setIsSuccessModalOpen(false)}
        >
          <ScheduleDemoForm
            form={form}
            setForm={setForm}
            formikRef={formikScheduleDemoRef}
          />
        </FormPageLayout>
      </AudioProvider>
    </>
  );
};

export default ScheduleDemoPage;
