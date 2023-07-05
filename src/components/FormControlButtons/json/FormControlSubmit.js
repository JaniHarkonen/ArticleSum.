import FormControlButton from "./FormControlButton";

/**
 * Creates a submit button for form modals (for example article or tag form) 
 * with a given onClick-action. The "type" of the button must also be 
 * specified, which will function as the `LanguageManager`-translation 
 * key.
 * 
 * @param {String} type `LanguageManager`-translation key suffix that will 
 * be used to fetch the translation for the button title.
 * @param {Function} onClick Name of the action that will be executed upon 
 * click.
 * 
 * @returns A JSON representing the submit control button that can be passed
 * onto a `FormControlButtons`-component.
 */
export default function FormControlSubmit(type, onClick) {
  return FormControlButton({
    titleKey: "modals.form-modal.controls." + type,
    onClick: onClick,
    props: {
      variant: "secondary"
    }
  });
}
