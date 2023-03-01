/**
 * Finds an element in `document` given its ID and executes a 
 * specified callback-function with the element as the input.
 * 
 * If the element is not found, nothing happens.
 * 
 * @param {String} id ID of the DOM-element.
 * @param {Function} callback Function that will be executed 
 * with a reference to the element passed in.
 */
export default function callbackElementById(id, callback) {
  const e = document.getElementById(id);

  if( e )
  callback(e);
}
