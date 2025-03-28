import { Formik, Form, FormikValues, FormikHelpers, FormikProps } from "formik";
import { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import StyledField from "../common/form/styled-field";
import { CarAccidentFormType } from "../../models/car-accident-model";
import { nameof } from "../../helpers/property-helper";
import useDetectDevice from "../../hooks/useDetectDevice";
import { DatepickerComponent } from "../common/form/datepicker";
export interface CarAccidentFormProps {
  isChatExpanded: boolean;
  isNavbarExpanded: boolean;
  form: CarAccidentFormType;
  setForm: Dispatch<SetStateAction<CarAccidentFormType>>;
  formikRef: RefObject<FormikProps<CarAccidentFormType>>;
}

export default function CarAccidentForm({
  isChatExpanded,
  isNavbarExpanded,
  form,
  setForm,
  formikRef,
}: CarAccidentFormProps) {
  const FormComponent = ({
    values,
    setValues,
  }: FormikValues &
    FormikHelpers<CarAccidentFormType> & {
      setForm: Dispatch<SetStateAction<CarAccidentFormType>>;
    }) => {
    const { isAndroid, isIOS } = useDetectDevice();
    const mobileDatePicker =
      isAndroid() || isIOS() ? "h-15 dateInputCalc-1" : "";
    useEffect(() => {
      setValues(form);
    }, [form, setValues]);

    const handleBlur = () => {
      setForm((values) => ({
        ...values,
        ...formikRef.current?.values,
      }));
    };

    const nameGridRespClasses =
      isChatExpanded && isNavbarExpanded
        ? "md-chat:grid-cols-3"
        : isChatExpanded
          ? "sm-chat:grid-cols-3"
          : isNavbarExpanded
            ? "md:grid-cols-3"
            : "sm:grid-cols-3";

    const nameGridClasses = `gap-4 grid grid-cols-1 ${nameGridRespClasses}`;

    const handleDateChange = (date: Date | null) => {
      try {
        const dateStr = date?.toISOString();
        setForm(() => ({
          ...formikRef.current?.values,
          date: dateStr ?? "",
        }));
      } catch (e) {
        console.error(e);
      }
    };
    return (
      <Form className="flex flex-col gap-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
              <div>Accident local time</div>
              <StyledField
                name={nameof<CarAccidentFormType>("time")}
                type="text"
                placeholder="Time"
                aria-label="Time"
                onBlur={handleBlur}
                className={`text-text-placeholder-light ${mobileDatePicker}`}
              />
            </div>
            <div className="flex flex-col gap-4">
              <div>Accident local date</div>
              <DatepickerComponent
                label="Date"
                value={values.date}
                handleDateChange={handleDateChange}
              />
            </div>
          </div>
        </div>
        <StyledField
          name={nameof<CarAccidentFormType>("location")}
          type="text"
          placeholder="Accident Location"
          aria-label="Accident Location"
          onBlur={handleBlur}
        />
        <StyledField
          name={nameof<CarAccidentFormType>("accidentDescription")}
          type="text"
          as="textarea"
          placeholder="Accident Description"
          aria-label="Accident Description"
          onBlur={handleBlur}
          className="h-32"
        />
        <h2 className={`font-medium mt-8 text-black`}>The Participant</h2>
        <div className="grid grid-cols-2 gap-4">
          <StyledField
            name={nameof<CarAccidentFormType>("firstName")}
            type="text"
            placeholder="First Name"
            aria-label="First Name"
            onBlur={handleBlur}
          />
          <StyledField
            name={nameof<CarAccidentFormType>("lastName")}
            type="text"
            placeholder="Last name"
            aria-label="Last name"
            onBlur={handleBlur}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <StyledField
            name={nameof<CarAccidentFormType>("age")}
            type="text"
            placeholder="Age"
            aria-label="Age"
            onBlur={handleBlur}
          />
          <StyledField
            name={nameof<CarAccidentFormType>("phone")}
            type="text"
            placeholder="Phone number"
            aria-label="Phone number"
            onBlur={handleBlur}
          />
        </div>
        <h2 className={`font-medium mt-8 text-black`}>Family Guardian</h2>
        <div className="grid grid-cols-2 gap-4">
          <StyledField
            name={nameof<CarAccidentFormType>("firstNameFamilyGuardian")}
            type="text"
            placeholder="First Name"
            aria-label="First Name"
            onBlur={handleBlur}
          />
          <StyledField
            name={nameof<CarAccidentFormType>("lastNameFamilyGuardian")}
            type="text"
            placeholder="Last name"
            aria-label="Last name"
            onBlur={handleBlur}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <StyledField
            name={nameof<CarAccidentFormType>("ageFamilyGuardian")}
            type="text"
            placeholder="Age"
            aria-label="Age"
            onBlur={handleBlur}
          />
          <StyledField
            name={nameof<CarAccidentFormType>("phoneNumberFamilyGuardian")}
            type="text"
            placeholder="Phone number"
            aria-label="Phone number"
            onBlur={handleBlur}
          />
        </div>
        <h2 className={`font-medium mt-8 text-black`}>Police Officer</h2>
        <div className="grid grid-cols-2 gap-4">
          <StyledField
            name={nameof<CarAccidentFormType>("firstNameOfficer")}
            type="text"
            placeholder="First Name"
            aria-label="First Name"
            onBlur={handleBlur}
          />
          <StyledField
            name={nameof<CarAccidentFormType>("lastNameOfficer")}
            type="text"
            placeholder="Last name"
            aria-label="Last name"
            onBlur={handleBlur}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <StyledField
            name={nameof<CarAccidentFormType>("badgeNumber")}
            type="text"
            placeholder="Badge number"
            aria-label="Badge number"
            onBlur={handleBlur}
          />
          <StyledField
            name={nameof<CarAccidentFormType>("phoneOfficer")}
            type="text"
            placeholder="Phone number"
            aria-label="Phone number"
            onBlur={handleBlur}
          />
        </div>
        <h2 className={`font-medium mt-8 text-black`}>Vehicle</h2>
        <div className="grid grid-cols-2 gap-4">
          <StyledField
            name={nameof<CarAccidentFormType>("vehicleMake")}
            type="text"
            placeholder="Vehicle Make"
            aria-label="Vehicle Make"
            onBlur={handleBlur}
          />
          <StyledField
            name={nameof<CarAccidentFormType>("vehicleModel")}
            type="text"
            placeholder="Vehicle Model"
            aria-label="Vehicle Model"
            onBlur={handleBlur}
          />
        </div>
        <div className={nameGridClasses}>
          <StyledField
            name={nameof<CarAccidentFormType>("vehicleLicensePlate")}
            type="text"
            placeholder="License Plate"
            aria-label="License Plate"
            onBlur={handleBlur}
          />
          <StyledField
            name={nameof<CarAccidentFormType>("vehicleYear")}
            type="text"
            placeholder="Made Year"
            aria-label="Made Year"
            onBlur={handleBlur}
          />
          <StyledField
            name={nameof<CarAccidentFormType>("vehicleColor")}
            type="text"
            placeholder="Vehicle Color"
            aria-label="Vehicle Color"
            onBlur={handleBlur}
          />
        </div>
        <StyledField
          name={nameof<CarAccidentFormType>("vehicleInsuranceCompany")}
          type="text"
          placeholder="Vehicle Insurance Company"
          aria-label="Vehicle Insurance Company"
          onBlur={handleBlur}
        />
        <h2 className={`font-medium mt-8 text-black`}>Witness</h2>
        <div className="grid grid-cols-2 gap-4">
          <StyledField
            name={nameof<CarAccidentFormType>("witnessName")}
            type="text"
            placeholder="Full name"
            aria-label="Full name"
            onBlur={handleBlur}
          />
          <StyledField
            name={nameof<CarAccidentFormType>("witnessPhone")}
            type="text"
            placeholder="Phone Number"
            aria-label="Phone Number"
            onBlur={handleBlur}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <StyledField
            name={nameof<CarAccidentFormType>("witnessAddress")}
            type="text"
            placeholder="Address"
            aria-label="Address"
            onBlur={handleBlur}
          />
          <StyledField
            name={nameof<CarAccidentFormType>("witnessCity")}
            type="text"
            placeholder="City"
            aria-label="City"
            onBlur={handleBlur}
          />
        </div>
        <div className={nameGridClasses}>
          <StyledField
            name={nameof<CarAccidentFormType>("witnessState")}
            type="text"
            placeholder="State"
            aria-label="State"
            onBlur={handleBlur}
          />
          <StyledField
            name={nameof<CarAccidentFormType>("witnessPostalCode")}
            type="text"
            placeholder="Postal Code"
            aria-label="Postal Code"
            onBlur={handleBlur}
          />
          <StyledField
            name={nameof<CarAccidentFormType>("witnessCountry")}
            type="text"
            placeholder="Country"
            aria-label="Country"
            onBlur={handleBlur}
          />
        </div>
      </Form>
    );
  };

  return (
    <Formik
      innerRef={
        formikRef as unknown as
          | RefObject<FormikProps<CarAccidentFormType>>
          | undefined
      }
      initialValues={form}
      onSubmit={async (_, { setSubmitting, resetForm }) => {
        setSubmitting(true);

        setSubmitting(false);
        resetForm();
      }}
    >
      {(props) => <FormComponent {...props} setForm={setForm} />}
    </Formik>
  );
}
