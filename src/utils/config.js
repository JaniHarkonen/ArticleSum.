/**
 * This utility module provides the two basic configuration functionalities: 
 * - editing of configuration
 * - retrieving of configuration information
 */

const fs = window.require("fs");

/**
 * File name of the configuration file.
 */
export const CONFIG_FILENAME = "config.json";

/**
 * Directory of the configuration file.
 */
export const CONFIG_DIR = process.cwd();

/**
 * Full file path of the configuration file.
 */
export const CONFIG_PATH = CONFIG_DIR + "\\" + CONFIG_FILENAME;

/**
 * Default configuration JSON.
 */
const configBody = {
  lastWorkspace: "",
  language: ""
};

/**
 * Takes a JSON that represents the updated state of the configuration
 * and appends it to the current configuration file. If the 
 * configuration file does not exist, it will be created.
 * 
 * @param {JSON} changes A JSON containing the updates that are to be 
 * posted to the configuration JSON. The `changes` should have the 
 * same form as the configuration as they will be appended using the
 * spread operator (...).
 */
export const editConfig = (changes) => {
  let newConfig;

  if( !fs.existsSync(CONFIG_PATH) )
  newConfig = configBody;
  else
  {
    const config = JSON.parse(fs.readFileSync(CONFIG_PATH));
    newConfig = {
      ...config,
      ...changes
    };
  }

  fs.writeFileSync(CONFIG_PATH, JSON.stringify(newConfig, null, 2));
};

/**
 * Loads the configuration JSON from the configuration file and 
 * returns its contents.
 * 
 * @returns The configuration JSON.
 */
export const getConfig = () => {
  return JSON.parse(fs.readFileSync(CONFIG_PATH));
};