/**
 * This utility module contains functions for dealing with date conversions.
 * 
 * *Definitions*
 * - "datetime string" refers to a string that contains a date with the form 
 * `YYYY-MM-DDThh:mmZ`
 * - "default date" is used to refer to a default date string used in the 
 * application that has the following form 
 * - "Date" is used to refer to an instance of the `Date`-class
 */

/**
 * A zero-based array of all months in lowercase.
 */
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

/**
 * Converts a datetime string (`YYYY-MM-DDT00:00Z`) to a default date string 
 * (`dd.mm.yyyy`). 
 * 
 * @param {String} datetimeString Datetime string that is to be converted.
 * 
 * @returns A default date string.
 */
export const convertDatetimeStringToDefaultDate = (datetimeString) => {
  const splitByDate = datetimeString.split("T")[0];
  const dateComponents = splitByDate.split("-");
  return dateComponents[2] + "." + dateComponents[1] + "." + dateComponents[0];
};

/**
 * Converts a default date string (`dd.mm.yyyy`) to a datetime string 
 * (`YYYY-MM-DDT00:00Z`). 
 * 
 * @param {String} defaultDate Default date string that is to be converted.
 * 
 * @returns A datetime string.
 */
export const convertDefaultDateToDatetimeString = (defaultDate) => {
  const dateComponents = defaultDate.split(".");
  return dateComponents[2] + "-" + dateComponents[1].padStart(2, "0") + "-" + dateComponents[0].padStart(2, "0") + "T00:00Z";
};

/**
 * Converts an instance of `Date`-class into a datetime string.
 * 
 * @param {Date} date `Date` instance that is to be converted.
 * 
 * @returns A datetime string.
 */
export const convertDateToDatetimestring = (date) => {
  const year = "" + date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return year + "-" + (month > 9 ? "" : "0") + (month + 1) + "-" + ((day > 9 ? "" : "0") + day) + "T00:00Z";
};

/**
 * Extract the year from a datetime string.
 * 
 * @param {String} datetimeString Datetime string whose year
 * is to be extracted.
 * 
 * @returns A string containing the year.
 */
export const getYearFromDatetimeString = (datetimeString) => {
  if( !datetimeString || datetimeString === "" )
  return datetimeString;
  
  return datetimeString.substring(0, datetimeString.indexOf("-"));
};

/**
 * Extract the month from a datetime string.
 * 
 * @param {String} datetimeString Datetime string whose month
 * is to be extracted.
 * 
 * @returns A string containing the month.
 */
export const getMonthFromDatetimeString = (datetimeString) => {
  if( !datetimeString || datetimeString === "" )
  return datetimeString;
  
  return datetimeString.split("-")[1];
};

/**
 * Returns the name of a month given its non-zero-based index 
 * ranging between 1-12.
 * 
 * @param {Number} month Month index (1-12).
 * 
 * @returns Name of the month.
 */
export const getMonthName = (month) => {
  return MONTHS[month - 1];
};

/**
 * Determines whether a string is a valid datetime string with 
 * form `YYYY-MM-DDThh:mmZ`.
 * 
 * @param {String} datetimeString The proposed datetime string.
 * 
 * @returns A boolean indicating whether the string is a valid 
 * datetime string.
 */
export const isDatetimeStringValid = (datetimeString) => {
  if( !datetimeString || typeof datetimeString !== "string" || datetimeString === "" )
  return false;

  return /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}Z/.test(datetimeString);
};
