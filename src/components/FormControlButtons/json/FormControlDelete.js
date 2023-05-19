import FormControlButton from "./FormControlButton";


export default function FormControlDelete(onClick) {
  return FormControlButton({
    titleKey: "modals.form-modal.controls.delete",
    onClick: onClick,
    props: { variant: "danger" }
  });
}
