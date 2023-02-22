import { convertDefaultDateToDatetimeString } from "../../utils/dates";


export const ArticleFilter = (settings = {}) => {
  return {
    id: "",
    title: "",
    "publish-date": "",
    "read-date": "",
    source: "",
    tags: [],
    notes: "",
    ...settings,
    type: "article-filter"
  };
};

const splitAndTest = (target, string) => {
  if( !string || string === "" )
  return true;

  target = "" + target;

  const words = parseFilter(string);

  for( let w of words )
  if( target.includes(w) )
  return true;

  return false;
};

const splitAndTestDate = (target, string) => {
  if( !string || string === "" )
  return true;

  const criterias = parseDateFilter(string);

  for( let testCriteria of criterias )
  {
    if( testCriteria(target) )
    return true;
  }

  return false;
};

const testTag = (target, tagIDs) => {
  if( !tagIDs || tagIDs.length === 0 )
  return true;

  for( let id of tagIDs )
  if( target.includes(id) )
  return true;

  return false;
};

const parseFilter = (string) => {
  const words = string.split(" ");
  const tokens = [];

  let currentToken = "";
  let tokenOpen = false;

  for( let i in words )
  {
    let w = words[i];

    if( tokenOpen === false )
    {
        // Normal word
      if( w[0] !== '"' )
      {
        tokens.push(w);
        continue;
      }
      else
      {
          // Compound word starts
        w = w.substring(1);
        tokenOpen = true;
      }
    }
    
      // Compound word is finished
    if( w[w.length - 1] === '"' )
    {
      tokens.push(currentToken + w.substring(0, w.length - 1));

      currentToken = "";
      tokenOpen = false;
    }
    else
    currentToken += w + " ";  // Compound word continues
  }

    // Compound word didn't close -> include it anyway
  if( currentToken !== "" )
  tokens.push(currentToken);

  return tokens;
};

const parseDateFilter = (string) => {
  const words = string.split(" ");
  const tokens = [];

  for( let w of words )
  {
    const dashPosition = w.indexOf("-");
    if( dashPosition < 0 )
    tokens.push((date) => new Date(date) === new Date(convertDefaultDateToDatetimeString(w)));
    else if( w[0] === "-" )
    {
      const compareTo = convertDefaultDateToDatetimeString(w.substring(1));
      tokens.push((date) => new Date(date) <= new Date(compareTo));
    }
    else if( w[w.length - 1] === "-" )
    {
      const compareTo = convertDefaultDateToDatetimeString(w.substring(0, w.length - 1));
      tokens.push((date) => new Date(date) >= new Date(compareTo));
    }
    else
    {
      const rangeStart = convertDefaultDateToDatetimeString(w.substring(0, dashPosition));
      const rangeEnd = convertDefaultDateToDatetimeString(w.substring(dashPosition + 1));

      tokens.push((date) => {
        const dateInstance = new Date(date);
        return (dateInstance >= new Date(rangeStart) && dateInstance <= new Date(rangeEnd));
      });
    }
  }

  return tokens;
};

export const filterArticle = (item, filter) => {
  return (
    splitAndTest(item.id, filter.id) &&
    splitAndTest(item.title, filter.title) &&
    splitAndTestDate(item["publish-date"], filter.publishDate) &&
    splitAndTestDate(item["read-date"], filter.readDate) &&
    splitAndTest(item.source, filter.source) &&
    testTag(item.tags, filter.tags) &&
    splitAndTest(item.notes, filter.notes)
  );
};
