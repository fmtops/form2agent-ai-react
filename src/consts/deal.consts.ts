import {
  DealFormType,
  DealStage,
  OrganisationData,
} from "../models/deal-model";

export const Organisations: string[] = [
  "Neuro Research Global",
  "Cardiac Innovators Alliance",
  "Advanced Gastro Society",
  "Continental Oncology Group",
  "Virtual Medicine Institute",
  "Regenerative Medicine League",
  "Pediatric Holistic Council",
  "Rare Genetics Forum",
];

export const OrganisationDatas: OrganisationData[] = [
  {
    name: Organisations[0],
    contact: "John Doe",
    email: "example@a.com",
    address: "123 Main St, New York, NY 10001",
    contactPerson: ["John Doe", "Jane Doe"],
  },
  {
    name: Organisations[1],
    contact: "Jane Smith",
    email: "example@b.com",
    address: "456 Elm St, Los Angeles, CA 90001",
    contactPerson: ["Jane Smith", "John Smith"],
  },
  {
    name: Organisations[2],
    contact: "Michael Johnson",
    email: "example@c.com",
    address: "789 Oak St, Chicago, IL 60601",
    contactPerson: ["Michael Johnson", "Emily Johnson"],
  },
  {
    name: Organisations[3],
    contact: "Emily Davis",
    email: "example@d.com",
    address: "101 Pine St, Houston, TX 77001",
    contactPerson: ["Emily Davis", "Michael Davis"],
  },
  {
    name: Organisations[4],
    contact: "Chris Brown",
    email: "example@e.com",
    address: "202 Maple St, Phoenix, AZ 85001",
    contactPerson: ["Chris Brown", "Sarah Brown"],
  },
  {
    name: Organisations[5],
    contact: "Jessica Wilson",
    email: "example@f.com",
    address: "303 Cedar St, Philadelphia, PA 19101",
    contactPerson: ["Jessica Wilson", "David Wilson"],
  },
  {
    name: Organisations[6],
    contact: "David Martinez",
    email: "example@g.com",
    address: "404 Birch St, San Antonio, TX 78201",
    contactPerson: ["David Martinez", "Elizabeth Martinez"],
  },
  {
    name: Organisations[7],
    contact: "Sarah Lee",
    email: "example@h.com",
    address: "505 Walnut St, San Diego, CA 92101",
    contactPerson: ["Sarah Lee", "Joseph Lee"],
  },
];

export const DEAL_FORM_VALUES: DealFormType = {
  action: null,
  value: 0,
  organization: "",
  currency: "",
  probability: 0,
  closingDate: "",
  startingDate: "",
  stage: DealStage.Qualification,
  note: "",
  referedBy: "",
};

export const DEAL_DESCRIPTION = `
  Manage this add deal form for creation of new deals for customers. 
  Help the user to fill in the form. 
  When asked to clear the form refer to ${JSON.stringify(DEAL_FORM_VALUES)}.
  `;
