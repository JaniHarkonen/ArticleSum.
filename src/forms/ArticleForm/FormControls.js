import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import Button from "react-bootstrap/Button";

export default function FormControls() {
  const { workspaceManager: wm } = useContext(GlobalContext);

  return (
    <>
      <Button>Create</Button>
      <Button>Cancel</Button>
    </>
  );
}
