import { createContext } from "react";
import { locales } from "../locales/locales";

export const GlobalContext = createContext({
  locale: { activeLocale: locales.ENG, setLocale: (locale) => {} },
  theme: { activeTheme: null, setTheme: (theme) => {} }
});
