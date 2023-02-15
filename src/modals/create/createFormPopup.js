export default function createFormPopup(settings = {}) {
  return {
    titleKey: "",
    FormElement: () => {},
    controls: {},
    useHook: () => {},
    baseInstance: null,
    ...settings
  };
}
