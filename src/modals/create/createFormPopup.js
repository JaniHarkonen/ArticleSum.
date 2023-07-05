/**
 * Creator-function for the props of a `FormModal`. This creator
 * simply constructs a form with default settings.
 * 
 * @param {JSON} settings Initial settings for the form modal 
 * JSON.
 * 
 * @returns The default props for a `FormModal`.
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
