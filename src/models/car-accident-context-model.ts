import { CHAT_NUMBER_FORMAT } from "../consts/chat.consts";
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
  phone: CHAT_NUMBER_FORMAT,
  carAccidentFamilyGuardian: {
    firstNameFamilyGuardian: "optional(if participant is under 21)",
    lastNameFamilyGuardian: "optional(if participant is under 21)",
    ageFamilyGuardian: "optional(if participant is under 21)",
    phoneNumberFamilyGuardian: `optional(if participant is under 21) ${CHAT_NUMBER_FORMAT}`,
  },
  carAccidentOfficer: {
    firstNameOfficer: "",
    lastNameOfficer: "",
    badgeNumber: "",
    phoneOfficer: `optional() ${CHAT_NUMBER_FORMAT}`,
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
    witnessPhone: CHAT_NUMBER_FORMAT,
    witnessAddress: "optional(if witnessName is present)",
    witnessCity: "optional(if witnessName is present)",
    witnessState: "optional(if witnessName is present)",
    witnessPostalCode: "optional(if witnessName is present)",
    witnessCountry: "optional(if witnessName is present)",
    witnessInsuranceCompany: "optional(if witnessName is present)",
  },
};
