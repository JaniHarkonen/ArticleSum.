import FormControlButton from "./FormControlButton";

/**
 * Creates a deletion button for form modals (for example article or tag form) 
 * with a given onClick-action. The button will receive its caption from the 
 * `LanguageManager`. An additional prop is provided to color the button using 
 * Bootstrap's `danger`-variant.
 * 
 * @param {Function} onClick Name of the action that will be executed upon 
 * click.
 * 
 * @returns A JSON representing the delete control button that can be passed
 * onto a `FormControlButtons`-component.
 */
export default function FormControlDelete(onClick) {
  return FormControlButton({
    titleKey: "modals.form-modal.controls.delete",
    onClick: onClick,
    props: { variant: "danger" }
  });
}
