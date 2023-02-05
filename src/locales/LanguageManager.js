import Languages from "./Languages";
import getValueByFieldString from "../utils/getValueByFieldString";


/**
 * Instances of this class are to be passed onto React-components
 * via the GlobalContext-provider. This class keeps track of the
 * language that is currently selected in ArticleSum. and provides
 * methods to translate texts as well as change the language of
 * the app.
 * 
 * Once ArticleSum. starts, the main component in charge of 
 * providing the GlobalContext (typically the root-component, App)
 * updates the setter function used by this class to change the 
 * language. The setter function is the same as the function 
 * declared in the main components useState.
 */
export default class LanguageManager {

  /**
   * Creates an instance of the LanguageManager class optionally
   * with an inital language pack.
   * @param {JSON} initLanguage Initial language pack to use (NULL
   * by default).
   */
  constructor(initLanguage = null) {
    this.activeLanguage = initLanguage;
    this.setLanguage = null;
  }

  /**
   * Setter function that the manager will use to change the 
   * language of the application and refresh the main component.
   * <br/>
   * NOTICE: Only the main component (typically the root-component)
   * should update the setter.
   * @param {Function} setter Setter function declared in the
   * useState of the component that provides the GlobalContext.
   */
  updateLanguageSetter(setter) {
    this.setLanguage = setter;
  }

  /**
   * Returns a translation in the currently active language given 
   * its key inside the language pack. The keys may be  nested in 
   * order to form categories and subcategories within the language 
   * pack. Categories can be separated using a dot (.), for example: 
   * "forms.filter-form.caption".
   * @param {String} key Keyd of the translation inside the language 
   * pack.
   * @returns The translation associated with the key.
   */
  translate(key) {
    return getValueByFieldString(this.activeLanguage, key);
  }

  /**
   * Changes the language of the application given the JSON of the
   * new language. This is done by first setting the internal state
   * of the LanguageManager instance itself, and then calling the
   * setter function provided by the main component in charge of
   * providing the GlobalContext.
   * @param {JSON} newLanguage JSON of the language to change to.
   */
  changeLanguage(newLanguage) {
    if( !newLanguage )
    return;

    this.activeLanguage = newLanguage;
    this.setLanguage(newLanguage);
  }

  /**
   * Returns a reference to the JSON of the currently active 
   * language pack.
   * @returns Currently active language pack's JSON.
   */
  getActiveLanguage() {
    return this.activeLanguage;
  }

  /**
   * Returns an array of the language packs of all available
   * languages (as outlined inside Languages-JSON).
   * @returns An array of all language packs (JSONs).
   */
  static listAllLanguages() {
    const ls = [];

    for( let l of Object.keys(Languages) )
    ls.push(Languages[l]);
  
    return ls;
  }

  /**
   * Returns a translation in the currently active language given 
   * its key inside the language pack. The keys may be  nested in 
   * order to form categories and subcategories within the language 
   * pack. Categories can be separated using a dot (.), for example: 
   * "forms.filter-form.caption".
   * @param {String} key Keyd of the translation inside the language 
   * pack.
   * @returns The translation associated with the key.
   */
  /**
   * Same as translate, however as the method is static, a 
   * LanguageManager that is to be used must be provided. For more 
   * information see `LanguageManager.translate`.
   * 
   * This method is useful when translations need to be provided to 
   * non-React-functions. An empty string will be returned if the 
   * LanguageManager is null.
   * @param {LanguageManager} languageManager 
   * @param {String} key 
   */
  static getTranslation(languageManager, key) {
    if( !languageManager )
    return "";

    return languageManager.translate(key);
  }
}
