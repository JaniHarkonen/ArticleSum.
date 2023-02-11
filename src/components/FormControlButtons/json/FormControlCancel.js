import FormControlSubmit from "./FormControlSubmit";


export default function FormControlCancel(onClick) {
  return {
    ...FormControlSubmit("cancel", onClick),
    props: { variant: "danger" }
  };
}
