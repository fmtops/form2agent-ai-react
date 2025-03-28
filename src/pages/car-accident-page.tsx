import { RefObject, useEffect, useRef, useState } from "react";
import ChatWindow from "../components/ai-chat/chat-window";
import { CarAccidentFormType } from "../models/car-accident-model";
import { CarAccidentDescriptionContext } from "../models/car-accident-context-model";
import { FormikProps } from "formik";
import { CAR_ACCIDENT_FORM_VALUES } from "../consts/car-accident.consts";
import FormPageLayout from "../layouts/form-page-layout";
import { stringifyValues } from "../utils/chat.utilts";
import { AudioProvider } from "../contexts/AudioContext";
import { FormAction } from "../consts/general-fields.consts";
import CarAccidentForm from "../components/car-accident/car-accident-form";
import { useLayout } from "../contexts/LayoutContext";
import { Helmet } from "react-helmet-async";

const CarAccidentPage = () => {
  const [form, setForm] = useState(CAR_ACCIDENT_FORM_VALUES);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const { isChatExpanded, isNavbarExpanded } = useLayout();
  const formikCarAccidentRef = useRef() as unknown as RefObject<
    FormikProps<CarAccidentFormType>
  >;

  useEffect(() => {
    setForm(CAR_ACCIDENT_FORM_VALUES);
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
      ...formikCarAccidentRef.current?.values,
    }));
    let responseData = JSON.parse(appData);
    setForm({
      ...formikCarAccidentRef.current?.values,
      ...responseData,
    } as CarAccidentFormType);
    if (responseData.action) performAction(responseData.action);
  };

  const onSubmit = () => {
    setForm(CAR_ACCIDENT_FORM_VALUES);
    setIsSuccessModalOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Effortless Car Accident Reporting with Form2Agent AI</title>
        <meta
          name="description"
          content="Simplify the submission of car accident reports using Form2Agent AI. Just hold the chat button to converse with the assistant and streamline the reporting process for quick and accurate documentation."
        />
      </Helmet>
      <AudioProvider>
        <FormPageLayout
          title="Car Accident Report"
          subTitle="Explore how Form2Agent AI can help you in submitting a car accident report by holding the chat button to speak with the assistant."
          onSubmit={onSubmit}
          chatElement={
            <ChatWindow
              executeFormLogic={executeFormLogic}
              formDescription="Fill out this form to quickly get assistance regarding your car accident."
              formValues={stringifyValues(form)}
              formContext={stringifyValues(CarAccidentDescriptionContext)}
            />
          }
          isSuccessModalOpen={isSuccessModalOpen}
          onCloseModal={() => setIsSuccessModalOpen(false)}
        >
          <CarAccidentForm
            isChatExpanded={isChatExpanded}
            isNavbarExpanded={isNavbarExpanded}
            form={form}
            setForm={setForm}
            formikRef={formikCarAccidentRef}
          />
        </FormPageLayout>
      </AudioProvider>
    </>
  );
};

export default CarAccidentPage;
