/**
 * Creator-function for the props of a `FormModal`. This creator
 * simply constructs a form with default settings.
 * 
 * @param {JSON} settings 
 * 
 * @returns 
 */
export default function createFormPopup(settings = {}) {
  return {
    titleKey: "",
    FormElement: () => <></>,
    controls: {},
    useHook: () => {},
    baseInstance: null,
    ...settings
  };
}
