export default function openLinkUsingHTTPS(link) {
  const prefix = "https://";

  if( link.substring(0, prefix.length) !== prefix )
  link = prefix + link;
  
  window.require("electron").shell.openExternal(link);
}
