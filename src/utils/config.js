const fs = window.require("fs");

export const CONFIG_FILENAME = "config.json";
export const CONFIG_DIR = process.cwd();
export const CONFIG_PATH = CONFIG_DIR + "\\" + CONFIG_FILENAME;

const configBody = {
  lastWorkspace: "",
  language: ""
};

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

export const getConfig = () => {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH));
  return config;
};