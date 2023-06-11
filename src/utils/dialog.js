const ipcRenderer = window.require("electron").ipcRenderer;

/**
 * Shows a folder selection dialog window with the given settings
 * that are analogous to the dialog "options" outlined in "electron.js".
 * The title and the selection button label can be customized with
 * the settings.
 * 
 * After the dialog window closes a given callback function will be
 * executed with the selection result passed in as an argument.
 * 
 * The *response* will either be an array containing only the path of
 * the selected folder, or undefined, if the user didn't choose one.
 * @param {JSON} settings 
 * @param {Function} callback 
 */
/*export const showOpenFolder = (settings, callback) => {
  ipcRenderer.invoke("open-filesys-dialog", {
      title: settings.title,
      buttonLabel: settings.buttonLabel,
      properties: ["openDirectory"]
  })
  .then((response) => {
      callback(response);
  });

  console.log("money");
}*/

/**
 * Shows a file opening dialog window with the given settings that
 * are analogous to the dialog "options" outlined in "electron.js".
 * The title, the selection button caption and whether to allow
 * multiple selection can be customized in the settings.
 * 
 * After the dialog window closes a given callback function will be
 * executed with the selection result passed in as an argument.
 * 
 * The *response* will either be an array containing only the paths of
 * the selected files, or undefined, if the user didn't choose any
 * files.
 * @param {JSON} settings 
 * @param {Function} callback 
 */
/*export const showOpenFile = (settings, callback) => {
  ipcRenderer.invoke("save-filesys-dialog", {
      title: settings.title,
      buttonLabel: settings.buttonLabel,
      filters: settings.filters,
      properties: ["openFile"].concat(settings.multiSelections && "multiSelections")
  })
  .then((response) => {
      callback(response);
  });
}*/

/*export const showOpenFile = (settings, callback) => {

}*/

const openDialog = (type, form, callback) => {
  ipcRenderer.invoke(type, form)
  .then((response) => {
    callback(response);
  });
};

export const FilesysDialogSettings = (dontAddToRecent = true) => {
  return {
    title: "",
    buttonLabel: "",
    filters: "",
    properties: dontAddToRecent ? ["dontAddToRecent"] : [],
    multiSelections: false
  };
};

export const showOpenFile = (settings, callback) => {
  openDialog("open-filesys-dialog", {
    ...settings,
    properties: settings.properties.concat("openFile").concat(settings.multiSelections && "multiSelections")
  }, callback);
};

export const showSaveFile = (settings, callback) => {
  openDialog("save-filesys-dialog", {
    ...settings,
    properties: settings.properties.concat("openFile")
  }, callback);
};
