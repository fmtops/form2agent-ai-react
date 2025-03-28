import {
  Formik,
  Form,
  FormikValues,
  FormikHelpers,
  FormikProps,
  Field,
} from "formik";
import { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import StyledField from "../common/form/styled-field";
import {
  SpeechAssessmentFormType,
  Pronouns,
  Language,
  TreatmentStage,
  VoiceResonance,
  SpecificSoundNasalEmission,
  ArticulationErrors,
  CompensatoryArticulationPatterns,
  ArticulationModificationsRequired,
  NasalEmissionObservations,
} from "../../models/speech-assessment-model";
import { SelectChangeEvent } from "@mui/material";
import { SelectComponent } from "../common/form/select";
import { DatepickerComponent } from "../common/form/datepicker";

export interface SpeechAssessmentFormProps {
  isChatExpanded: boolean;
  isNavbarExpanded: boolean;
  form: SpeechAssessmentFormType;
  setForm: Dispatch<SetStateAction<SpeechAssessmentFormType>>;
  formikRef: RefObject<FormikProps<SpeechAssessmentFormType>>;
}

export default function SpeechAssessmentForm({
  isChatExpanded,
  isNavbarExpanded,
  form,
  setForm,
  formikRef,
}: SpeechAssessmentFormProps) {
  const FormComponent = ({
    values,
    setValues,
  }: FormikValues &
    FormikHelpers<SpeechAssessmentFormType> & {
      setForm: Dispatch<SetStateAction<SpeechAssessmentFormType>>;
    }) => {
    useEffect(() => {
      setValues(form);
    }, [form, setValues]);

    const handleBlur = () => {
      setForm((values) => ({
        ...values,
        ...formikRef.current?.values,
      }));
    };

    const handlePronounsChange = (event: SelectChangeEvent) => {
      setForm(() => ({
        ...formikRef.current?.values,
        patientInformation: {
          ...formikRef.current?.values.patientInformation,
          pronouns: event.target.value as Pronouns,
        },
      }));
    };

    const handleAssessmentLanguageChange = (event: SelectChangeEvent) => {
      setForm(() => ({
        ...formikRef.current?.values,
        assessmentSessionDetails: {
          ...formikRef.current?.values.assessmentSessionDetails,
          assessmentLanguage: event.target.value as Language,
        },
      }));
    };

    const handleTreatmentStageChange = (event: SelectChangeEvent) => {
      setForm(() => ({
        ...formikRef.current?.values,
        treatmentStage: event.target.value as TreatmentStage,
      }));
    };

    const handleTelehealthSessionChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setForm(() => ({
        ...formikRef.current?.values,
        assessmentSessionDetails: {
          ...formikRef.current?.values.assessmentSessionDetails,
          telehealthSession: event.target.value === "yes",
        },
      }));
    };

    const handleDateChange = (date: Date | null) => {
      try {
        const dateStr = date?.toISOString();
        setForm(() => ({
          ...formikRef.current?.values,
          assessmentSessionDetails: {
            ...formikRef.current?.values.assessmentSessionDetails,
            dateOfAssessment: dateStr ?? "",
          },
        }));
      } catch (e) {
        console.error(e);
      }
    };

    const handleVoiceResonanceChange = (event: SelectChangeEvent) => {
      setForm(() => ({
        ...formikRef.current?.values,
        perceptualSpeechAnalysis: {
          ...formikRef.current?.values.perceptualSpeechAnalysis,
          voiceResonance: event.target.value as VoiceResonance,
        },
      }));
    };

    const handleNasalEmissionObservationsChange = (
      event: SelectChangeEvent
    ) => {
      setForm(() => ({
        ...formikRef.current?.values,
        perceptualSpeechAnalysis: {
          ...formikRef.current?.values.perceptualSpeechAnalysis,
          nasalEmissionObservations: event.target
            .value as NasalEmissionObservations,
        },
      }));
    };

    const handleSpecificSoundNasalEmissionChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const updatedForm = formikRef.current!.values;
      let oldSpecificSoundNasalEmission = [
        ...updatedForm.perceptualSpeechAnalysis!.specificSoundNasalEmission!,
      ];
      const { name, checked } = event.target;
      if (
        Object.values(SpecificSoundNasalEmission).includes(
          name as SpecificSoundNasalEmission
        ) &&
        oldSpecificSoundNasalEmission.includes(name)
      ) {
        oldSpecificSoundNasalEmission = oldSpecificSoundNasalEmission.map(
          (item) => (item === name ? event.target.value : item)
        );
      } else {
        oldSpecificSoundNasalEmission.push(name);
      }

      setForm(() => ({
        ...formikRef.current?.values,
        perceptualSpeechAnalysis: {
          ...formikRef.current?.values.perceptualSpeechAnalysis,
          specificSoundNasalEmission: oldSpecificSoundNasalEmission,
        },
      }));
    };

    const handleArticulationErrorsChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const updatedForm = formikRef.current!.values;
      const value = event.target.value as ArticulationErrors;
      let articulationErrors = [
        ...updatedForm.speechArticulationAssessment!.articulationErrors!,
      ];
      if (event.target.checked) {
        articulationErrors.push(value);
      } else {
        articulationErrors = articulationErrors.filter(
          (item) => item !== value
        );
      }
      setForm(() => ({
        ...formikRef.current?.values,
        speechArticulationAssessment: {
          ...formikRef.current?.values.speechArticulationAssessment,
          articulationErrors: articulationErrors,
        },
      }));
    };

    const handleCompensatoryArticulationPatternsChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const updatedForm = formikRef.current!.values;
      const value = event.target.value as CompensatoryArticulationPatterns;
      let compensatoryArticulationPatterns = [
        ...updatedForm.speechArticulationAssessment!
          .compensatoryArticulationPatterns!,
      ];
      if (event.target.checked) {
        compensatoryArticulationPatterns!.push(value);
      } else {
        compensatoryArticulationPatterns =
          compensatoryArticulationPatterns.filter((item) => item !== value);
      }
      setForm(() => ({
        ...formikRef.current?.values,
        speechArticulationAssessment: {
          ...formikRef.current?.values.speechArticulationAssessment,
          compensatoryArticulationPatterns: compensatoryArticulationPatterns,
        },
      }));
    };

    const handleArticulationModificationsRequiredChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const updatedForm = formikRef.current!.values;
      const value = event.target.value as ArticulationModificationsRequired;
      let articulationModificationsRequired = [
        ...updatedForm.speechArticulationAssessment!
          .articulationModificationsRequired!,
      ];
      if (event.target.checked) {
        articulationModificationsRequired.push(value);
      } else {
        articulationModificationsRequired =
          articulationModificationsRequired.filter((item) => item !== value);
      }
      setForm(() => ({
        ...formikRef.current?.values,
        speechArticulationAssessment: {
          ...formikRef.current?.values.speechArticulationAssessment,
          articulationModificationsRequired: articulationModificationsRequired,
        },
      }));
    };
    return (
      <Form className="flex flex-col gap-y-4">
        <h2 className={`font-medium mt-8 text-black`}>Patient Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <StyledField
            name="patientInformation.patientName"
            type="text"
            placeholder="Patient Name"
            aria-label="Patient Name"
            onBlur={handleBlur}
          />
          <StyledField
            name="patientInformation.uniquePatientIdentifier"
            type="text"
            placeholder="Unique Patient Identifier"
            aria-label="Unique Patient Identifier"
            onBlur={handleBlur}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <StyledField
            name="patientInformation.age"
            type="number"
            placeholder="Age"
            aria-label="Age"
            onBlur={handleBlur}
          />
          <SelectComponent
            name="patientInformation.pronouns"
            value={values.patientInformation?.pronouns}
            options={Object.values(Pronouns)}
            placeholder="Pronouns"
            aria-label="Pronouns"
            onChange={handlePronounsChange}
          />
        </div>
        <StyledField
          name="patientInformation.referringInstitution"
          type="text"
          placeholder="Referring Institution"
          aria-label="Referring Institution"
          onBlur={handleBlur}
        />
        <h2 className={`font-medium mt-8 text-black`}>
          Assessment Session Details
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <DatepickerComponent
            value={values.assessmentSessionDetails?.dateOfAssessment}
            handleDateChange={handleDateChange}
            label="Date of Assessment"
          />
          <StyledField
            name="assessmentSessionDetails.speechPathologist"
            type="text"
            placeholder="Speech Pathologist"
            aria-label="Speech Pathologist"
            onBlur={handleBlur}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <SelectComponent
            name="assessmentSessionDetails.assessmentLanguage"
            value={values.assessmentSessionDetails?.assessmentLanguage}
            options={Object.values(Language)}
            placeholder="Assessment Language"
            aria-label="Assessment Language"
            onChange={handleAssessmentLanguageChange}
          />
          <SelectComponent
            name="treatmentStage"
            value={values.treatmentStage}
            options={Object.values(TreatmentStage)}
            placeholder="Treatment Stage"
            aria-label="Treatment Stage"
            onChange={handleTreatmentStageChange}
          />
        </div>
        <div className="flex flex-col items-start gap-4">
          <label className="text-black">Telehealth Session</label>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="assessmentSessionDetails.telehealthSession"
              value="yes"
              checked={values.assessmentSessionDetails?.telehealthSession}
              onChange={handleTelehealthSessionChange}
            />
            <label>Yes</label>
            <input
              type="radio"
              name="assessmentSessionDetails.telehealthSession"
              value="no"
              checked={!values.assessmentSessionDetails?.telehealthSession}
              onChange={handleTelehealthSessionChange}
            />
            <label>No</label>
          </div>
        </div>
        <h2 className={`font-medium mt-8 text-black`}>
          Perceptual Speech Analysis
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <SelectComponent
            name="perceptualSpeechAnalysis.voiceResonance"
            value={values.perceptualSpeechAnalysis?.voiceResonance}
            options={Object.values(VoiceResonance)}
            placeholder="Voice Resonance"
            aria-label="Voice Resonance"
            onChange={handleVoiceResonanceChange}
          />
          <SelectComponent
            name="perceptualSpeechAnalysis.nasalEmissionObservations"
            value={values.perceptualSpeechAnalysis?.nasalEmissionObservations}
            options={Object.values(NasalEmissionObservations)}
            placeholder="Nasal Emission Observations"
            aria-label="Nasal Emission Observations"
            onChange={handleNasalEmissionObservationsChange}
          />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className={`flex flex-col w-full`}>
            <label className="text-black">Specific Sound Nasal Emission</label>
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.values(SpecificSoundNasalEmission).map((field) =>
                (field as string) !== "other" ? (
                  <div key={field} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name={field}
                      checked={(
                        values.perceptualSpeechAnalysis
                          ?.specificSoundNasalEmission as SpecificSoundNasalEmission[]
                      ).includes(field)}
                      onChange={handleSpecificSoundNasalEmissionChange}
                    />
                    <label>{field}</label>
                  </div>
                ) : null
              )}
            </div>
            <StyledField
              name="perceptualSpeechAnalysis.specificSoundNasalEmissionOther"
              className="w-1/2"
              type="text"
              placeholder="Other"
              aria-label="Other"
              onBlur={handleSpecificSoundNasalEmissionChange}
            />
          </div>
        </div>
        <h2 className={`font-medium mt-8 text-black`}>
          Speech Articulation Assessment
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-black">
              Compensatory Articulation Patterns
            </label>
            {Object.values(CompensatoryArticulationPatterns).map((value) => (
              <div key={value} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="speechArticulationAssessment.compensatoryArticulationPatterns"
                  value={value}
                  checked={values.speechArticulationAssessment?.compensatoryArticulationPatterns?.includes(
                    value
                  )}
                  onChange={handleCompensatoryArticulationPatternsChange}
                />
                <label>{value}</label>
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            <label className="text-black">Articulation Errors</label>
            {Object.values(ArticulationErrors).map((value) => (
              <div key={value} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="speechArticulationAssessment.articulationErrors"
                  value={value}
                  checked={values.speechArticulationAssessment?.articulationErrors?.includes(
                    value
                  )}
                  onChange={handleArticulationErrorsChange}
                />
                <label>{value}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="font-medium mb-4  text-black">
            Articulation Modifications Required
          </h2>
          {Object.values(ArticulationModificationsRequired).map((value) => (
            <div key={value} className="flex items-center gap-2">
              <input
                type="checkbox"
                name="speechArticulationAssessment.articulationModificationsRequired"
                value={value}
                checked={values.speechArticulationAssessment?.articulationModificationsRequired?.includes(
                  value
                )}
                onChange={handleArticulationModificationsRequiredChange}
              />
              <label>{value}</label>
            </div>
          ))}
        </div>
        <StyledField
          name="speechArticulationAssessment.otherArticulationIssues"
          type="text"
          placeholder="Other Articulation Issues"
          aria-label="Other Articulation Issues"
          onBlur={handleBlur}
        />
        <StyledField
          name="additionalComments"
          type="text"
          as="textarea"
          placeholder="General Comments"
          aria-label="General Comments"
          onBlur={handleBlur}
        />
      </Form>
    );
  };

  return (
    <Formik
      initialValues={form}
      onSubmit={(values) => {
        setForm(values);
      }}
      innerRef={formikRef}
    >
      {(formikProps) => <FormComponent {...formikProps} setForm={setForm} />}
    </Formik>
  );
}
