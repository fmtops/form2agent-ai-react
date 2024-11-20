export type ScheduleDemoBaseFormType = {
  firstName?: string;
  email?: string;
  company?: string;
  projectDetails?: string;
};

export type ScheduleDemoFormType = {
  action?: null | ScheduleDemoAction;
} & ScheduleDemoBaseFormType;

export enum ScheduleDemoAction {
  Send = "Send",
}
