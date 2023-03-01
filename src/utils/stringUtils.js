export const capitalizeFirstLetter = (string) => {
  return string[0].toUpperCase() + string.substring(1);
};

export const kebabCaseToCamelCase = (string) => {
  string = string[0].toLowerCase() + string.substring(1);
  
  const dashSplit = string.split("-");
  let camelString = dashSplit[0];

  for( let i = 1; i < dashSplit.length; i++ )
  camelString += capitalizeFirstLetter(dashSplit[i]);

  return camelString;
};

export const renderStringOrEmptyFiller = (string) => {
  return (!string || string === "") ? <>&nbsp;</> : <>{string}</>;
}
