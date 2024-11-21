export const getTimeFromISO = (date: Date = new Date()): string => {
  return date.toISOString().split("T")[1].split(".")[0];
};

export const getDateFromISO = (date: Date = new Date()): string => {
  return date.toISOString().split("T")[0];
};
