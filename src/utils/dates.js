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

export const convertDateToDatetimestring = (date) => {
  const year = "" + date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return year + "-" + (month > 9 ? "" : "0") + (month + 1) + "-" + ((day > 9 ? "" : "0") + day) + "T00:00Z";
};

export const getYearFromDatetimeString = (datetimeString) => {
  if( !datetimeString || datetimeString === "" )
  return datetimeString;
  
  return datetimeString.substring(0, datetimeString.indexOf("-"));
};

export const getMonthFromDatetimeString = (datetimeString) => {
  if( !datetimeString || datetimeString === "" )
  return datetimeString;
  
  return datetimeString.split("-")[1];
};

export const getMonthName = (month) => {
  return MONTHS[month - 1];
};

export const isDatetimeStringValid = (datetimeString) => {
  if( !datetimeString || typeof datetimeString !== "string" || datetimeString === "" )
  return false;

  return /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}Z/.test(datetimeString);
};
