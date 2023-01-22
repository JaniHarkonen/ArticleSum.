import FI from "./FI.json";
import ENG from "./ENG.json";

import createEnum from "../utils/createEnum";
import getValueByFieldString from "../utils/getValueByFieldString";


export const locales = createEnum([
  "FI",
  "ENG"
]);

const localeJsons = {};
localeJsons[locales.FI] = FI;
localeJsons[locales.ENG] = ENG;

export const getTranslation = (locale, field) => {
  return getValueByFieldString(localeJsons[locale], field);
};

export const getAllLocales = () => {
  const ls = [];
  for( let l of Object.keys(localeJsons) )
  ls.push(localeJsons[l]);

  return ls;
}
