import {
  FiltersType,
  MedicalCondition,
  PatientLookupBaseFormType,
  PatientLookupFormType,
} from "../models/patient-lookup-model";
import {
  isToday,
  isYesterday,
  isWithinLastWeek,
  isWithin30Days,
} from "../utils/dates.utils";
import { GenderOptionsOther } from "../consts/general-fields.consts";
import { DateFilters } from "../types/Ecommerce/Orders";

/**
 * @param prevForm - previous form data
 * @param responseData - response data to merge with the previous form data
 * @returns returns the merged form data
 * @description Used to merge the response data with the previous form data
 */
export function mergeFormData(
  prevForm: PatientLookupFormType,
  responseData: Partial<PatientLookupFormType>
): PatientLookupFormType {
  return {
    ...prevForm,
    ...responseData,
    emergencyContact: {
      ...prevForm.emergencyContact,
      ...responseData.emergencyContact,
    },
  };
}

export const filterPatientsByDate = (
  patients: PatientLookupBaseFormType[],
  dateFilter: DateFilters
) => {
  let newFilteredPatients = [...patients];
  switch (dateFilter) {
    case DateFilters.TODAY:
      newFilteredPatients = newFilteredPatients.filter((patient) =>
        isToday(patient.dateOfBirth)
      );
      break;
    case DateFilters.YESTERDAY:
      newFilteredPatients = newFilteredPatients.filter((patient) =>
        isYesterday(patient.dateOfBirth)
      );
      break;
    case DateFilters.LAST_7_DAYS:
      newFilteredPatients = newFilteredPatients.filter((patient) =>
        isWithinLastWeek(patient.dateOfBirth)
      );
      break;
    case DateFilters.LAST_30_DAYS:
      newFilteredPatients = newFilteredPatients.filter((patient) =>
        isWithin30Days(patient.dateOfBirth)
      );
      break;
    default:
      break;
  }
  return newFilteredPatients;
};

const firstNames = [
  "Alice",
  "Bob",
  "Charlie",
  "Diana",
  "Eve",
  "Frank",
  "Grace",
  "Hank",
  "Ivy",
  "Jack",
  "Kathy",
  "Leo",
  "Mona",
  "Nate",
  "Olivia",
  "Paul",
  "Quinn",
  "Rita",
  "Sam",
  "Tina",
  "Uma",
  "Victor",
  "Wendy",
  "Xander",
  "Yara",
  "Zane",
];
const lastNames = [
  "Johnson",
  "Williams",
  "Brown",
  "Taylor",
  "Anderson",
  "Thomas",
  "Jackson",
  "White",
  "Harris",
  "Martin",
  "Thompson",
  "Garcia",
  "Martinez",
  "Robinson",
  "Clark",
  "Rodriguez",
  "Lewis",
  "Lee",
  "Walker",
  "Hall",
];

export enum Relation {
  Parent = "Parent",
  Spouse = "Spouse",
  Friend = "Friend",
  Colleague = "Colleague",
  Neighbor = "Neighbor",
  Other = "Other",
}

export function generatePatients(): PatientLookupBaseFormType[] {
  const patients: PatientLookupBaseFormType[] = [];
  for (let i = 0; i < 12; i++) {
    patients.push(getPatient(i, patients.length));
  }
  // Generate today's patients
  for (let i = 0; i < 12; i++) {
    patients.push(getPatient(i, patients.length));
  }

  // Generate yesterday's patients
  for (let i = 0; i < 12; i++) {
    patients.push(getPatient(i, patients.length));
  }
  // Generate last 7 days patients
  for (let i = 0; i < 12; i++) {
    patients.push(getPatient(i, patients.length));
  }

  // Generate last 30 days patients
  for (let i = 0; i < 12; i++) {
    patients.push(getPatient(i, patients.length));
  }

  // Generate remaining patients from the last 40 days
  for (let i = 0; i < 12; i++) {
    patients.push(getPatient(i, patients.length));
  }

  return patients;
}

export const getRandomMedicalCondition = (): MedicalCondition => {
  const conditions = Object.values(MedicalCondition);
  const randomIndex = Math.floor(Math.random() * conditions.length);
  return conditions[randomIndex];
};

export const getRandomContactNumber = (): string => {
  const getRandomDigit = () => Math.floor(Math.random() * 10);
  const areaCode = `${getRandomDigit()}${getRandomDigit()}${getRandomDigit()}`;
  const centralOfficeCode = `${getRandomDigit()}${getRandomDigit()}${getRandomDigit()}`;
  const lineNumber = `${getRandomDigit()}${getRandomDigit()}${getRandomDigit()}${getRandomDigit()}`;
  return `(${areaCode}) ${centralOfficeCode}-${lineNumber}`;
};

// Utility function to generate a random home address
export const getRandomHomeAddress = (): string => {
  const streetNumbers = Array.from({ length: 1000 }, (_, i) => i + 1);
  const streetNames = [
    "Main St",
    "Elm St",
    "Maple Ave",
    "Oak St",
    "Pine St",
    "Cedar St",
    "Birch St",
    "Walnut St",
    "Chestnut St",
    "Willow St",
  ];
  const cities = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    "Dallas",
    "San Jose",
  ];
  const states = ["NY", "CA", "IL", "TX", "AZ", "PA", "TX", "CA", "TX", "CA"];
  const zipCodes = Array.from({ length: 100000 }, (_, i) =>
    (i + 10000).toString().padStart(5, "0")
  );

  const getRandomElement = (arr: string[] | number[]) =>
    arr[Math.floor(Math.random() * arr.length)];

  const streetNumber = getRandomElement(streetNumbers);
  const streetName = getRandomElement(streetNames);
  const city = getRandomElement(cities);
  const state = getRandomElement(states);
  const zipCode = getRandomElement(zipCodes);

  return `${streetNumber} ${streetName}, ${city}, ${state} ${zipCode}`;
};

export const getRandomRelation = (): Relation => {
  const relations = Object.values(Relation);
  const randomIndex = Math.floor(Math.random() * relations.length);
  return relations[randomIndex];
};

export const getRandomGender = () => {
  const genders = GenderOptionsOther;
  const randomIndex = Math.floor(Math.random() * genders.length);
  return genders[randomIndex];
};

export const generateRandomDateOfBirth = (
  minAge: number = 3,
  maxAge: number = 20
) => {
  // Current date
  const today = new Date();

  // Calculate the minimum and maximum birth year
  const maxBirthYear = today.getFullYear() - minAge;
  const minBirthYear = today.getFullYear() - maxAge;

  // Generate a random year, month, and day
  const randomYear =
    Math.floor(Math.random() * (maxBirthYear - minBirthYear + 1)) +
    minBirthYear;
  const randomMonth = Math.floor(Math.random() * 12); // Months are 0-based
  const randomDay =
    Math.floor(
      Math.random() * new Date(randomYear, randomMonth + 1, 0).getDate() // Get days in the month
    ) + 1;

  // Create a random date
  return new Date(randomYear, randomMonth, randomDay, 0, 0, 0, 0);
};

function getPatient(index: number, id: number): PatientLookupBaseFormType {
  return {
    id: id.toString(),
    fullName: `${firstNames[index]} ${lastNames[index]}`,
    dateOfBirth: generateRandomDateOfBirth().toLocaleDateString(),
    gender: getRandomGender(),
    contactNumber: getRandomContactNumber(),
    emailAddress: `${firstNames[index].toLowerCase()}@example.com`,
    homeAddress: getRandomHomeAddress(),
    emergencyContact: {
      name: `${firstNames[index]} ${lastNames[index]}`,
      relation: getRandomRelation(),
      contactNumber: getRandomContactNumber(),
    },
    medicalCondition: getRandomMedicalCondition(),
  };
}

export const filterPatients = (
  patients: PatientLookupBaseFormType[],
  filters: FiltersType
): PatientLookupBaseFormType[] => {
  let newFilteredPatients: PatientLookupBaseFormType[] = [...patients];

  // Filter by fullName
  if (filters.fullName !== "") {
    newFilteredPatients = newFilteredPatients.filter((patient) =>
      patient.fullName.toLowerCase().includes(filters.fullName.toLowerCase())
    );
  }

  // Filter by dateOfBirth
  if (filters.dateOfBirth !== "") {
    const date = new Date(filters.dateOfBirth);
    newFilteredPatients = newFilteredPatients.filter(
      (patient) => patient.dateOfBirth === date.toLocaleDateString()
    );
  }

  // Filter by gender
  if (filters.gender.length > 0) {
    newFilteredPatients = newFilteredPatients.filter((patient) =>
      filters.gender.includes(patient.gender)
    );
  }

  // Filter by contactNumber
  if (filters.contactNumber !== "") {
    newFilteredPatients = newFilteredPatients.filter((patient) =>
      patient.contactNumber.includes(filters.contactNumber)
    );
  }

  // Filter by emailAddress
  if (filters.emailAddress !== "") {
    newFilteredPatients = newFilteredPatients.filter((patient) =>
      patient.emailAddress
        .toLowerCase()
        .includes(filters.emailAddress.toLowerCase())
    );
  }

  // Filter by homeAddress
  if (filters.homeAddress !== "") {
    newFilteredPatients = newFilteredPatients.filter((patient) =>
      patient.homeAddress
        .toLowerCase()
        .includes(filters.homeAddress.toLowerCase())
    );
  }

  // Filter by emergencyContactName
  if (filters.emergencyContactName !== "") {
    newFilteredPatients = newFilteredPatients.filter((patient) =>
      patient.emergencyContact.name
        .toLowerCase()
        .includes(filters.emergencyContactName.toLowerCase())
    );
  }

  // Filter by emergencyContactRelation
  if (filters.emergencyContactRelation !== "") {
    newFilteredPatients = newFilteredPatients.filter((patient) =>
      patient.emergencyContact.relation
        .toLowerCase()
        .includes(filters.emergencyContactRelation.toLowerCase())
    );
  }

  // Filter by emergencyContactNumber
  if (filters.emergencyContactNumber !== "") {
    newFilteredPatients = newFilteredPatients.filter((patient) =>
      patient.emergencyContact.contactNumber.includes(
        filters.emergencyContactNumber
      )
    );
  }

  // Filter by medicalCondition
  if (filters.medicalCondition.length > 0) {
    newFilteredPatients = newFilteredPatients.filter((patient) =>
      filters.medicalCondition.includes(
        patient.medicalCondition as MedicalCondition
      )
    );
  }

  return newFilteredPatients;
};

export const updateFilters = (
  prevFilters: FiltersType,
  newFilters: Partial<FiltersType>
) => {
  return {
    ...prevFilters,
    ...newFilters,
  };
};
