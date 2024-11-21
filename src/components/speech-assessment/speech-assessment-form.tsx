import { Formik, Form, FormikValues, FormikHelpers, FormikProps } from "formik";
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
import useDetectDevice from "../../hooks/useDetectDevice";
import { SelectChangeEvent } from "@mui/material";
import { SelectComponent } from "../common/form/select";

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
      let updatedForm = formikRef.current!.values;
      updatedForm.patientInformation!.pronouns = event.target.value as Pronouns;
      setForm(updatedForm);
      handleBlur();
    };

    const handleAssessmentLanguageChange = (event: SelectChangeEvent) => {
      let updatedForm = formikRef.current!.values;
      updatedForm.assessmentSessionDetails!.assessmentLanguage = event.target
        .value as Language;
      setForm(updatedForm);
      handleBlur();
    };

    const handleTreatmentStageChange = (event: SelectChangeEvent) => {
      let updatedForm = formikRef.current!.values;
      updatedForm.treatmentStage = event.target.value as TreatmentStage;
      setForm(updatedForm);
      handleBlur();
    };

    const handleTelehealthSessionChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      let updatedForm = formikRef.current!.values;
      updatedForm.assessmentSessionDetails!.telehealthSession =
        event.target.value === "yes";
      setForm(updatedForm);
      handleBlur();
    };

    const handleVoiceResonanceChange = (event: SelectChangeEvent) => {
      let updatedForm = formikRef.current!.values;
      updatedForm.perceptualSpeechAnalysis!.voiceResonance = event.target
        .value as VoiceResonance;
      setForm(updatedForm);
      handleBlur();
    };

    const handleNasalEmissionObservationsChange = (
      event: SelectChangeEvent
    ) => {
      let updatedForm = formikRef.current!.values;
      updatedForm.perceptualSpeechAnalysis!.nasalEmissionObservations = event
        .target.value as NasalEmissionObservations;
      setForm(updatedForm);
      handleBlur();
    };

    const handleSpecificSoundNasalEmissionChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      let updatedForm = formikRef.current!.values;
      const { name, checked } = event.target;
      if (
        Object.values(SpecificSoundNasalEmission).includes(
          name as SpecificSoundNasalEmission
        )
      ) {
        if (
          updatedForm.perceptualSpeechAnalysis!.specificSoundNasalEmission.includes(
            name
          )
        ) {
          updatedForm.perceptualSpeechAnalysis!.specificSoundNasalEmission =
            updatedForm.perceptualSpeechAnalysis!.specificSoundNasalEmission.map(
              (item) => (item === name ? event.target.value : item)
            );
        } else {
          updatedForm.perceptualSpeechAnalysis!.specificSoundNasalEmission.push(
            name
          );
        }
      } else {
        updatedForm.perceptualSpeechAnalysis!.specificSoundNasalEmission.push(
          name
        );
      }

      setForm(updatedForm);
      handleBlur();
    };

    const handleArticulationErrorsChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      let updatedForm = formikRef.current!.values;
      const value = event.target.value as ArticulationErrors;
      if (event.target.checked) {
        updatedForm.speechArticulationAssessment!.articulationErrors!.push(
          value
        );
      } else {
        updatedForm.speechArticulationAssessment!.articulationErrors =
          updatedForm.speechArticulationAssessment!.articulationErrors!.filter(
            (item) => item !== value
          );
      }
      setForm(updatedForm);
      handleBlur();
    };

    const handleCompensatoryArticulationPatternsChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      let updatedForm = formikRef.current!.values;
      const value = event.target.value as CompensatoryArticulationPatterns;
      if (event.target.checked) {
        updatedForm.speechArticulationAssessment!.compensatoryArticulationPatterns!.push(
          value
        );
      } else {
        updatedForm.speechArticulationAssessment!.compensatoryArticulationPatterns =
          updatedForm.speechArticulationAssessment!.compensatoryArticulationPatterns!.filter(
            (item) => item !== value
          );
      }
      setForm(updatedForm);
      handleBlur();
    };

    const handleArticulationModificationsRequiredChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      let updatedForm = formikRef.current!.values;
      const value = event.target.value as ArticulationModificationsRequired;
      if (event.target.checked) {
        updatedForm.speechArticulationAssessment!.articulationModificationsRequired!.push(
          value
        );
      } else {
        updatedForm.speechArticulationAssessment!.articulationModificationsRequired =
          updatedForm.speechArticulationAssessment!.articulationModificationsRequired!.filter(
            (item) => item !== value
          );
      }
      setForm(updatedForm);
      handleBlur();
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
            value={
              (values as SpeechAssessmentFormType).patientInformation?.pronouns
            }
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
          <StyledField
            className={`text-text-placeholder-light h-11 dateInputCalc-2`}
            name="assessmentSessionDetails.dateOfAssessment"
            type="date"
            placeholder="Date of Assessment"
            aria-label="Date of Assessment"
            onBlur={handleBlur}
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
            value={
              (values as SpeechAssessmentFormType).assessmentSessionDetails
                ?.assessmentLanguage
            }
            options={Object.values(Language)}
            placeholder="Assessment Language"
            aria-label="Assessment Language"
            onChange={handleAssessmentLanguageChange}
          />
          <SelectComponent
            name="treatmentStage"
            value={(values as SpeechAssessmentFormType).treatmentStage}
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
              checked={
                (values as SpeechAssessmentFormType).assessmentSessionDetails
                  ?.telehealthSession === true
              }
              onChange={handleTelehealthSessionChange}
            />
            <label>Yes</label>
            <input
              type="radio"
              name="assessmentSessionDetails.telehealthSession"
              value="no"
              checked={
                (values as SpeechAssessmentFormType).assessmentSessionDetails
                  ?.telehealthSession === false
              }
              onChange={handleTelehealthSessionChange}
            />
            <label>No</label>
          </div>
        </div>
        <h2 className={`font-medium mt-8 text-black`}>
          Perceptual Speech Analysis
        </h2>
        <div className="grid grid-cols-2">
          <SelectComponent
            name="perceptualSpeechAnalysis.voiceResonance"
            value={
              (values as SpeechAssessmentFormType).perceptualSpeechAnalysis
                ?.voiceResonance
            }
            options={Object.values(VoiceResonance)}
            placeholder="Voice Resonance"
            aria-label="Voice Resonance"
            onChange={handleVoiceResonanceChange}
          />
          <SelectComponent
            name="perceptualSpeechAnalysis.voiceResonance"
            value={
              (values as SpeechAssessmentFormType).perceptualSpeechAnalysis
                ?.nasalEmissionObservations
            }
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
                        (values as SpeechAssessmentFormType)
                          .perceptualSpeechAnalysis
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
                  checked={(
                    values as SpeechAssessmentFormType
                  ).speechArticulationAssessment?.compensatoryArticulationPatterns?.includes(
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
                  checked={(
                    values as SpeechAssessmentFormType
                  ).speechArticulationAssessment?.articulationErrors?.includes(
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
                checked={(
                  values as SpeechAssessmentFormType
                ).speechArticulationAssessment?.articulationModificationsRequired?.includes(
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
