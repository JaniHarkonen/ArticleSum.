import Button from "react-bootstrap/Button";


export default function createButtons(buttons) {
  return buttons.map((btn, index) => {
    return (
      <Button
        className={btn.className || ""}
        key={btn.key || ("generated-button-" + index)}
        onClick={btn.onClick}
      >
        {btn.caption}
      </Button>
    );
  });
}
