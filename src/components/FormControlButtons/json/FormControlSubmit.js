import FormControlButton from "./FormControlButton";


export default function FormControlSubmit(type, onClick) {
  return FormControlButton({
    titleKey: "modals.form-modal.controls." + type,
    onClick: onClick,
  });
}
