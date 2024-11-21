import {
  Formik,
  Form,
  FieldArray,
  FormikValues,
  FormikHelpers,
  FormikProps,
} from "formik";
import {
  ChangeEvent,
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
} from "react";
import AddIcon from "@mui/icons-material/Add";
import { DeleteOutline } from "@mui/icons-material";
import StyledField from "../common/form/styled-field";
import {
  HouseInspectionFormType,
  HouseInspectionRoom,
} from "../../models/house-inspection-model";
import { Divider } from "@mui/material";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";

export interface HouseInspectionProps {
  form: HouseInspectionFormType;
  setForm: Dispatch<SetStateAction<HouseInspectionFormType>>;
  formikRef: RefObject<FormikProps<HouseInspectionFormType>>;
}

const HouseInspectionForm = ({
  form,
  setForm,
  formikRef,
}: HouseInspectionProps) => {
  const FormComponent = ({
    values,
    setValues,
  }: FormikValues & FormikHelpers<HouseInspectionFormType>) => {
    useEffect(() => {
      setValues(form);
    }, [form, setValues]);

    const handleBlur = () => {
      setForm((values) => ({
        ...values,
        ...formikRef.current?.values,
      }));
    };

    const handleUploadPhoto = (index: number) => {
      document.getElementById(`fileButton.${index}`)?.click();
    };

    const handlePhotoChanged = (e: any, index: number) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setValues((values: any) => {
            const newValues = { ...values };
            newValues.rooms[index].roomPhoto = e.target?.result;
            return newValues;
          });
        };
        reader.readAsDataURL(file);
      }
    };

    return (
      <Form className="flex flex-col gap-y-4">
        <h2 className={`text-text-primary-light font-medium mt-4`}>Rooms</h2>
        <FieldArray name="rooms">
          {({ remove, push }) => (
            <div>
              <Divider />
              {values?.rooms?.length > 0 &&
                values.rooms.map((_: any, index: any) => (
                  <>
                    <div
                      className="flex flex-wrap items-center justify-between my-2 gap-x-3 gap-y-4"
                      key={index}
                    >
                      <div className="flex flex-wrap items-center justify-center gap-x-3">
                        {values.rooms[index].roomPhoto && (
                          <img
                            src={values.rooms[index].roomPhoto}
                            alt="Room"
                            className="h-32 w-44 m-3 object-cover"
                          />
                        )}
                        {!values.rooms[index].roomPhoto && (
                          <div
                            onClick={() => handleUploadPhoto(index)}
                            className="flex items-center justify-center h-32 w-44 m-3 bg-blue-200/50 hover:bg-blue-200/75 cursor-pointer"
                          >
                            <input
                              id={`fileButton.${index}`}
                              type="file"
                              accept="image/*"
                              onChange={(e) => handlePhotoChanged(e, index)}
                              hidden
                            />

                            <AddAPhotoOutlinedIcon />
                          </div>
                        )}
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-wrap gap-4 items-center">
                            <StyledField
                              className={`flex-grow`}
                              name={`rooms.${index}.name`}
                              placeholder="Room Type"
                              aria-label={`Room Type.${index}`}
                              onBlur={handleBlur}
                            />
                            <StyledField
                              className={`flex-grow`}
                              name={`rooms.${index}.size`}
                              type="text"
                              placeholder="Room Size (m²)"
                              aria-label={`Room Size.${index}`}
                              onBlur={handleBlur}
                            />
                          </div>
                          <StyledField
                            className={`min-w-16`}
                            name={`rooms.${index}.conditionDescription`}
                            placeholder="Room Condition Description"
                            aria-label={`Room Condition Description.${index}`}
                            type="text"
                            as="textarea"
                            onBlur={handleBlur}
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        className={` p-2 text-button-light`}
                        onClick={() => remove(index)}
                      >
                        <DeleteOutline />
                      </button>
                    </div>
                    <Divider />
                  </>
                ))}

              <button
                className={`p-4 text-lightBlue flex items-center`}
                type="button"
                onClick={() =>
                  push({
                    name: "",
                    size: "",
                    conditionDescription: "",
                    roomPhoto: null,
                  } as HouseInspectionRoom)
                }
              >
                <AddIcon />
                Add Room
              </button>
              <div className="flex flex-col items-start py-4">
                <div className="text-lg pb-2 font-bold">
                  Inspection summary:
                </div>
                <ul>
                  <li>
                    {"- Total House Size: "}
                    {values?.rooms?.length > 0 &&
                      values.rooms.reduce(
                        (sum: any, room: HouseInspectionRoom) =>
                          sum + (Number(room.size) || 0),
                        0
                      )}
                    {"m²"}
                  </li>
                  <li>
                    {"- Total Rooms: "}
                    {values?.rooms?.length ?? 0}
                  </li>
                </ul>
              </div>
            </div>
          )}
        </FieldArray>
      </Form>
    );
  };

  return (
    <Formik
      innerRef={
        formikRef as unknown as
          | RefObject<FormikProps<HouseInspectionFormType>>
          | undefined
      }
      initialValues={form}
      onSubmit={async (_, { setSubmitting, resetForm }) => {
        setSubmitting(true);

        setSubmitting(false);
        resetForm();
      }}
    >
      {(props) => <FormComponent {...props} />}
    </Formik>
  );
};

export default HouseInspectionForm;
