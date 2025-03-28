import { useEffect, useRef, useState } from "react";
import ChatWindow from "../components/ai-chat/chat-window";
import FormPageLayout from "../layouts/form-page-layout";
import { stringifyValues } from "../utils/chat.utilts";
import { FormikProps } from "formik";
import { AudioProvider } from "../contexts/AudioContext";
import { FormAction } from "../consts/general-fields.consts";
import {
  BasicRoom,
  HOUSE_INSPECTION_FORM_VALUES,
} from "../consts/house-inspection.consts";
import { HouseInspectionFormType } from "../models/house-inspection-model";
import { mergeFormData } from "../utils/house-inspection.utils";
import {
  DescriptionContext,
  ROOM_FORM_DESCRIPTION,
} from "../models/house-inspection-context-model";
import HouseInspectionForm from "../components/house-inspection/house-inspection";
import { Helmet } from "react-helmet-async";
import { FileFieldStatus } from "../consts/chat.consts";
import { convertFileContentToStatus } from "../helpers/fetch-file-content";

const HouseInspectionPage = () => {
  const [form, setForm] = useState(HOUSE_INSPECTION_FORM_VALUES);
  const [fileInChat, setFileInChat] = useState<string | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  useEffect(() => {
    setForm(HOUSE_INSPECTION_FORM_VALUES);
  }, []);

  const handleSubmit = () => {
    setForm({
      ...HOUSE_INSPECTION_FORM_VALUES,
      rooms: [{ ...BasicRoom, roomPhoto: null }],
    });
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
    let responseData = JSON.parse(appData) as HouseInspectionFormType;
    if (responseData?.rooms) {
      for (let i = 0; i < responseData.rooms.length; i++) {
        let room = responseData.rooms[i];
        // for whatever reason when file is missing and user asks for file upload, this messes up the response
        if (
          room.size === undefined ||
          room.name === undefined ||
          room.conditionDescription === undefined
        ) {
          let image = form.rooms.find((item) => item.id === room.id)?.roomPhoto;
          if (room.roomPhoto === FileFieldStatus.New) {
            image = fileInChat;
            setFileInChat(null);
          }
          if (room.roomPhoto === FileFieldStatus.None) {
            image = null;
          }
          setForm((prevForm) => ({
            ...prevForm,
            rooms: prevForm.rooms.map((item) =>
              item.id === room.id ? { ...item, roomPhoto: image } : item
            ),
          }));
          return;
        }
        if (room.id === "") room.id = crypto.randomUUID();
        if (room.roomPhoto === FileFieldStatus.New) {
          room.roomPhoto = fileInChat;
          setFileInChat(null);
        } else if (room.roomPhoto === FileFieldStatus.None) {
          room.roomPhoto = null;
        } else if (room.roomPhoto === FileFieldStatus.Existing) {
          room.roomPhoto =
            i < form.rooms.length ? form.rooms[i].roomPhoto : null;
        }
      }
      setForm((prevForm) => mergeFormData(prevForm, responseData));
    }
    if (responseData.action) performAction(responseData.action);
  };

  const onFileUpload = (newFile: string | null) => {
    setFileInChat(newFile);
  };
  return (
    <>
      <Helmet>
        <title>Revolutionize Room Inspection with Form2Agent AI</title>
        <meta
          name="description"
          content="Explore how Form2Agent AI streamlines room inspections with flexible form inputs. Easily upload room photos or use voice commands to swiftly add inspection details, enhancing efficiency and accuracy."
        />
      </Helmet>
      <AudioProvider>
        <FormPageLayout
          title="Room Inspection"
          subTitle="See how Form2Agent AI manages room inspection forms with a dynamic number of item inputs. Upload a photo of your rooms or hold the button to speak with the assistant and quickly add your room inspection details."
          onSubmit={handleSubmit}
          chatElement={
            <ChatWindow
              executeFormLogic={executeFormLogic}
              formDescription={ROOM_FORM_DESCRIPTION}
              formValues={stringifyValues({
                rooms: form.rooms.map((item) => ({
                  ...item,
                  roomPhoto: convertFileContentToStatus(item.roomPhoto),
                })),
              })}
              formContext={stringifyValues(DescriptionContext)}
              onFileUpload={onFileUpload}
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
    </>
  );
};

export default HouseInspectionPage;
