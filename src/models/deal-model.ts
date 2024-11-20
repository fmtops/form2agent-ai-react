export enum DealAction {
  Submit = "Submit",
}

export type DealBaseFormType = {
  value: number | null;
  currency?: string;
  probability: number | null;
  closingDate: string;
  startingDate: string;
  stage: DealStage;
  note: string;
  referedBy: string;
  organization?: string;
  contactPerson?: string;
};

export type DealFormType = {
  action?: DealAction | null;
} & DealBaseFormType;

export enum Currency {
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
}

export enum DealStage {
  Qualification = "Qualification",
  Proposal = "Proposal",
  Negotiation = "Negotiation",
  ClosedWon = "Closed Won",
  ClosedLost = "Closed Lost",
}

export type OrganisationData = {
  name: string;
  contact: string;
  email: string;
  address: string;
  contactPerson: string[];
};
