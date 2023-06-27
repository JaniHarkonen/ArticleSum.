import Button from "react-bootstrap/Button";


export default function createButtons(buttons) {
  return buttons.map((btn) => {
    return (
      <Button
        className={btn.className || ""}
        onClick={btn.onClick}
      >
        {btn.caption}
      </Button>
    );
  });
}
