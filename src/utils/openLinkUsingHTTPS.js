
/**
 * Opens a given link in a browser using the `HTTPS`-protocol.
 * 
 * @param {String} link Link that is to be opened.
 */
export default function openLinkUsingHTTPS(link) {
  const prefix = "https://";

  if( link.substring(0, prefix.length) !== prefix )
  link = prefix + link;
  
  window.require("electron").shell.openExternal(link);
}
