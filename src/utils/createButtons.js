import Button from "react-bootstrap/Button";

/**
 * Creates an array of Bootstrap `Button`-components based on an 
 * array of buttons. Each button is represented by a JSON that 
 * at least holds the `caption` of the button. The JSON can also 
 * contain the `onClick`-function of the button which will be 
 * executed upon click, the `className`-React prop of the button 
 * as well as the React `key` of the button.
 * 
 * If no `key` is provided for a button, a default key with the 
 * prefix "generated-button" will be generated based on the 
 * position of the button JSON in the array of buttons.
 * 
 * @param {Array} buttons Array of button JSONs that is to be 
 * rendered.
 * 
 * @returns An array of Bootstrap `Button`-components representing 
 * the buttons.
 */
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
