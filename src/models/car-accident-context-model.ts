import { FormAction } from "../consts/general-fields.consts";

export const CarAccidentDescriptionContext = {
  action: `Allowed actions are ${Object.keys(FormAction).join(", ")} or null`,
  time: "ask about accident time",
  date: "ask about the date of an accident format(ISO date) confirmOrUpdate()",
  location: "",
  accidentDescription: "",
  firstName: "",
  lastName: "",
  age: "",
  phone: "format(+1-222-222-2222)",
  carAccidentFamilyGuardian: {
    firstNameFamilyGuardian: "optional(if participant is under 21)",
    lastNameFamilyGuardian: "optional(if participant is under 21)",
    ageFamilyGuardian: "optional(if participant is under 21)",
    phoneNumberFamilyGuardian: "optional(if participant is under 21) format(+1-222-222-2222)",
  },
  carAccidentOfficer: {
    firstNameOfficer: "",
    lastNameOfficer: "",
    badgeNumber: "",
    phoneOfficer: "optonal() format(+1-222-222-2222)",
  },
  carAccidentVehicle: {
    vehicleMake: "",
    vehicleModel: "",
    vehicleLicensePlate: "",
    vehicleYear: "",
    vehicleColor: "",
    vehicleInsuranceCompany: "",
  },
  carAcciedntWitness: {
    witnessName: "optional()",
    witnessPhone: "format(+1-222-222-2222)",
    witnessAddress: "optional(if witnessName is present)",
    witnessCity: "optional(if witnessName is present)",
    witnessState: "optional(if witnessName is present)",
    witnessPostalCode: "optional(if witnessName is present)",
    witnessCountry: "optional(if witnessName is present)",
    witnessInsuranceCompany: "optional(if witnessName is present)",
  }
};
