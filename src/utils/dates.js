const MONTHS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december"
];

export const convertDatetimeStringToDefaultDate = (datetimeString) => {
  const splitByDate = datetimeString.split("T")[0];
  const dateComponents = splitByDate.split("-");
  return dateComponents[2] + "." + dateComponents[1] + "." + dateComponents[0];
};

export const convertDefaultDateToDatetimeString = (defaultDate) => {
  const dateComponents = defaultDate.split(".");
  return dateComponents[2] + "-" + dateComponents[1].padStart(2, "0") + "-" + dateComponents[0].padStart(2, "0") + "T00:00Z";
};

export const getMonthName = (month) => {
  return MONTHS[month];
};
