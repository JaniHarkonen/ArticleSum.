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

const parseFilter = (string) => {
  const words = string.split(" ");
  const tokens = [];

  let currentToken = "";
  let tokenOpen = false;
  let tokenOpenThisIteration = false;

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
        tokenOpenThisIteration = true;
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

export const filterArticle = (item, filter) => {
  return (
    splitAndTest(item.id, filter.id) &&
    splitAndTest(item.title, filter.title) &&
    //splitAndTest(item["publish-date"], filter["publish-date"]) &&
    //splitAndTest(item["read-date"], filter["read-date"]) &&
    splitAndTest(item.source, filter.source) &&
    //splitAndTest(filter.tags) ||
    splitAndTest(item.notes, filter.notes)
  );
};
