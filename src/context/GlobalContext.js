import { createContext } from "react";
import { locales } from "../locales/Languages";

export const GlobalContext = createContext({
  //locale: { activeLocale: locales.ENG, setLocale: (locale) => {} },
  languageManager: null,
  theme: { activeTheme: null, setTheme: (theme) => {} }
});
