import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  PrimaryOwnerFormType,
  MerchantRegistrationFormType,
} from "../../models/merchant-registration-model";
import { Form, Formik, FormikHelpers, FormikProps, FormikValues } from "formik";
import StyledField from "../common/form/styled-field";
import { nameof } from "../../helpers/property-helper";
import { Divider, IconButton } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useDetectDevice from "../../hooks/useDetectDevice";

export interface PrimaryOwnerComponentProps {
  form: PrimaryOwnerFormType;
  setForm: Dispatch<SetStateAction<MerchantRegistrationFormType>>;
  formikRef: RefObject<FormikProps<PrimaryOwnerFormType>>;
}

export const PrimaryOwnerComponent = ({
  form,
  setForm,
  formikRef,
}: PrimaryOwnerComponentProps) => {
  const handleBlur = () => {
    setForm((values) => ({
      ...values,
      primaryOwner: {
        ...formikRef.current?.values,
      },
    }));
  };

  return (
    <Formik
      innerRef={
        formikRef as unknown as
          | RefObject<FormikProps<PrimaryOwnerFormType>>
          | undefined
      }
      validationSchema={null}
      initialValues={form}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);

        setSubmitting(false);
        resetForm();
      }}
    >
      {(props) => (
        <FormComponent
          {...props}
          form={form}
          setForm={setForm}
          handleBlur={handleBlur}
        />
      )}
    </Formik>
  );
};

type FormComponentProps = {
  form: PrimaryOwnerFormType;
  setForm: Dispatch<SetStateAction<MerchantRegistrationFormType>>;
  handleBlur: () => void;
} & FormikValues &
  FormikHelpers<PrimaryOwnerFormType>;
const FormComponent = ({ setValues, form, handleBlur }: FormComponentProps) => {
  const { isAndroid, isIOS } = useDetectDevice();
  const mobileDatePicker = isAndroid() || isIOS() ? "h-11 dateInputCalc-1" : "";
  useEffect(() => {
    setValues(form);
  }, [form, setValues]);

  const [isSSNVisible, setIsSSNVisible] = useState(false);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="text-md font-medium">Owner</div>
      <p className={`text-textSecondary`}>
        Please provide the following information about the primary owner.
      </p>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Form className="flex flex-col gap-y-4">
          <div className="gap-4 grid grid-cols-1">
            <div className="gap-4 grid grid-cols-2">
              <StyledField
                name={nameof<PrimaryOwnerFormType>("firstName")}
                type="text"
                placeholder="First Name"
                onBlur={handleBlur}
              />
              <StyledField
                name={nameof<PrimaryOwnerFormType>("lastName")}
                type="text"
                placeholder="Last Name"
                onBlur={handleBlur}
              />
            </div>
            <div className="gap-4 grid grid-cols-2">
              <StyledField
                name={nameof<PrimaryOwnerFormType>("ownerTitle")}
                type="text"
                placeholder="Owner Title"
                onBlur={handleBlur}
              />
              <StyledField
                name={nameof<PrimaryOwnerFormType>("ownership")}
                type="text"
                placeholder="Percent of ownership (%)"
                onBlur={handleBlur}
              />
            </div>
            <div className="gap-4 grid grid-cols-2">
              <div className="flex justify-between">
                <StyledField
                  name={nameof<PrimaryOwnerFormType>("socialSecurityNumber")}
                  type={isSSNVisible ? "text" : "password"}
                  placeholder="Social Security Number"
                  onBlur={handleBlur}
                  className="w-full mr-1"
                />
                {isSSNVisible ? (
                  <IconButton>
                    <VisibilityOff onClick={() => setIsSSNVisible(false)} />
                  </IconButton>
                ) : (
                  <IconButton>
                    <Visibility onClick={() => setIsSSNVisible(true)} />
                  </IconButton>
                )}
              </div>
              <StyledField
                className={`text-text-placeholder-light ${mobileDatePicker}`}
                name={nameof<PrimaryOwnerFormType>("birthdate")}
                label="Date of Birth"
                type="date"
                placeholder="Date of birth"
                onBlur={handleBlur}
              />
            </div>
            <Divider />
            <div className="gap-4 grid grid-cols-2">
              <StyledField
                name={nameof<PrimaryOwnerFormType>("addressLine1")}
                type="text"
                placeholder="Address Line 1"
                onBlur={handleBlur}
              />
              <StyledField
                name={nameof<PrimaryOwnerFormType>("addressLine2")}
                type="text"
                placeholder="Address Line 2 (Optional)"
                onBlur={handleBlur}
              />
            </div>
            <div className="gap-4 grid grid-cols-2">
              <StyledField
                name={nameof<PrimaryOwnerFormType>("city")}
                type="text"
                placeholder="City"
                onBlur={handleBlur}
              />
              <StyledField
                name={nameof<PrimaryOwnerFormType>("state")}
                type="text"
                placeholder="State"
                onBlur={handleBlur}
              />
            </div>
            <div className="gap-4 grid grid-cols-2">
              <StyledField
                name={nameof<PrimaryOwnerFormType>("zipCode")}
                type="text"
                placeholder="Zip Code"
                onBlur={handleBlur}
              />
              <StyledField
                name={nameof<PrimaryOwnerFormType>("email")}
                type="email"
                placeholder="Email"
                onBlur={handleBlur}
              />
            </div>
          </div>
        </Form>
      </LocalizationProvider>
    </div>
  );
};
