import { Organisations } from "../consts/deal.consts";
import {
  Currency,
  DealAction,
  DealStage,
} from "./deal-model";

export const DealDescriptionContext = {
  action: `Allowed actions are ${Object.keys(DealAction).join(", ")} or null`,
  organization: `radio(${Organisations.join(", ")}) optional()`,
  value: "format(positive number)",
  currency: `radio(${Object.values(Currency).join(", ")}) deduct from other responses`,
  probability: "format(0 to 100)",
  closingDate: "format(ISO date) confirmOrUpdate()",
  startingDate: "format(ISO date) confirmOrUpdate()",
  stage: `radio(${Object.values(DealStage).join(", ")})`,
  note: "",
  referedBy: "",
};
