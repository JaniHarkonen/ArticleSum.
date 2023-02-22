import { useEffect } from "react";
import addEventListenerTo from "../../utils/addEventListenerTo";


export default function useKeyListener(props) {
  const listeners = props.listeners;

  useEffect(() => {
    return addEventListenerTo(
      document,
      { type: "keydown", listener: handleKeyPress }
    );
  });

  const handleKeyPress = (e) => {
    const listener = listeners[e.code];

    if( listener !== undefined )
    {
      if( listener === null )
      e.preventDefault();
      else
      listener(e);
    }
  };
}
