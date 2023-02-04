/**
 * A utility function that adds given event listener or array of 
 * event listeners to a given `object` (usually `document` or 
 * `window`) and returns a function that React will use  whenever 
 * the component unmounts. *Notice* that `addEventListenerTo` should 
 * only be used inside a `useEffect` or `useLayoutEffect` function.
 * 
 * The listeners must take the following form:
 * 
 * `{ type: String, listener: Function, object?: any }`
 * 
 * where the `type` determines the event type ("mousedown", for 
 * example), `listener` determines the event listener function 
 * itself and, the optional, `object` determines the object to 
 * attach the listener to (by default, the `object` parameter 
 * determines the object, however, a different object may be 
 * assigned via this property).
 * @param {*} object Object to attach the event listener to.
 * @param {*} listeners Listener function(s) to be attached. Can 
 * be a JSON or an array of JSON in case of multiple listeners.
 * 
 * @returns A function that can be used to remove the event 
 * listeners when the component using them "unmounts".
 */
export default function addEventListenerTo(object, listeners = []) {
  if( listeners.constructor != Array )
  listeners = [listeners];

    // Add event listeners to the given object and return a lambda which
    // will be called by React's useEffect on "unmount"
  listeners.forEach((l) => (l.object || object).addEventListener(l.type, l.listener));
  return () => listeners.forEach((l) => (l.object || object).removeEventListener(l.type, l.listener));
}
