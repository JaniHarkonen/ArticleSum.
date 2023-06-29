/**
 * Creates a generic form control button JSON that can be used by the
 * `FormControlButtons`-component. The button will have a title, an 
 * onClick-action and additional props.
 * 
 * @param {JSON} settings A settings JSON whose structure corresponds to 
 * that of the form control button. These settings are applied to the 
 * control button JSON.
 * 
 * @returns A form control button JSON that can be passed onto the 
 * `FormControlButtons`-component.
 */
export default function FormControlButton(settings) {
  return {
    titleKey: null,
    onClick: () => {},
    props: {},
    ...settings
  };
};
