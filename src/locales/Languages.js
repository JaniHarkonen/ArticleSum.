/**
 * This file is set to contain the declarations for all language packs that
 * are available in ArticleSum. In order to add a new language pack, simply
 * import its JSON-file and add a reference to it inside the Languages-JSON.
 * 
 * Removal of language packs should be equally easy by removing the reference
 * to the language pack from the Language-JSON along with its import-
 * statement.
 */

import FI from "./packs/FI.json";
import ENG from "./packs/ENG.json";


/**
 * A JSON containing all available language packs paired with their 
 * abbreviations.
 */
const Languages = {
  FI,
  ENG
};

export default Languages;
