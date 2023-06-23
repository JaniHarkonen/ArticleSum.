import { convertDefaultDateToDatetimeString, getMonthFromDatetimeString, getYearFromDatetimeString } from "../../utils/dates";
import { numberOfCharOccurrences } from "../../utils/stringUtils";

/**
 * Filter function. Tests whether a given target string contains 
 * a keyword. <b>Notice: </b>if the target is empty, true will be 
 * returned.
 * @param {String} target String to search.
 * @param {String} keyword Keyword to be searched.
 * 
 * @returns Whether the given keyword exists in the target string.
 * True is returned also if the target is empty (NULL or "").
 */
const testKeyword = (target, keyword) => {
  if( !target || target === "" )
  return true;

  return target.includes(keyword);
};

/**
 * Filter function. Tests whether a given target string is empty 
 * or NULL.
 * @param {String} target String to check.
 * 
 * @returns Whether the target string is empty (null or "").
 */
const testEmpty = (target) => {
  return !target || target === "";
};

/**
 * Filter function. Tests whether a given target date (milliseconds) 
 * is after a starting date (milliseconds). If the target is empty 
 * (NaN), false is returned.
 * @param {String} target Date (MS) to check.
 * @param {String} startDate Date (MS) after which the target date is 
 * expected to be (inclusive).
 * 
 * @returns Whether the target date is after the starting date. False 
 * is returned also if the target is emtpy (NaN).
 */
const testStartDate = (target, startDate) => {
  if( target === NaN )
  return false;

  return target >= startDate;
};

/**
 * Filter function. Tests whether a given target date (milliseconds) 
 * is before an ending date (milliseconds). If the target is empty 
 * (NaN), false is returned.
 * @param {String} target Date (MS) to check.
 * @param {String} startDate Date (MS) before which the target date is 
 * expected to be (inclusive).
 * 
 * @returns Whether the target date is before the ending date. False is 
 * returned also if the target is emtpy (NaN).
 */
const testEndDate = (target, endDate) => {
  if( target === NaN )
  return false;

  return target <= endDate;
};

/**
 * Filter function. Tests whether a given target date (milliseconds) 
 * is between a starting (milliseconds) and an ending date (milliseconds). 
 * If the target is empty (NaN), false is returned.
 * @param {String} target Date (MS) to check.
 * @param {String} startDate Date (MS) after which the target date is 
 * expected to be (inclusive).
 * @param {String} endDate Date (MS) before which the target date is 
 * expected to be (inclusive).
 * 
 * @returns Whether the target date is between the starting and ending 
 * dates. False is returned also if the target is emtpy (NaN).
 */
const testDateRange = (target, startDate, endDate) => {
  if( target === NaN )
  return false;

  return target >= startDate && target <= endDate;
};

const Result = (failed = false, filters = []) => {
  return {
    failed,
    filters
  };
};

  // Returns a failure JSON
const fail = (result) => {
  result.failed = true;
  return result;
};

const parseKeywordFilter = (filterString) => {

    // Spaces are used to separate different filters
  const filterWords = filterString.split(" ");
  const result = Result();

    // Filter is left empty
  if( filterWords[0][0] === "-" )
  {
    result.filters.push(testEmpty);
    return result;
  }

  let currentCompound = ""; // Currently open compound so far
  let isCompoundOpen = false; // Whether a compound is being processed
  let isNegated = false;  // Whether the keyword is to be negated
  for( let i = 0; i < filterWords.length; i++ )
  {
    const word = filterWords[i];  // Current word in filter string
    let keyword = ""; // Parsed keyword (will be single or compound)
    let isCompoundEnding = (word[word.length - 1] === '"'); // Whether the word should end a compound
    
      // Compound word continues
    if( isCompoundOpen )
    {
        // This word ends the compound
      if( isCompoundEnding )
      {
        keyword = currentCompound + " " + word.substring(0, word.length - 1);
        isCompoundOpen = false;
      }
      else
      {
        currentCompound += " " + word;
        continue;
      }
    }
    else
    {
        // Account for negation
      let firstCharOffset = 0;
      if( word[0] === "!" )
      {
        firstCharOffset++;
        isNegated = true;
      }

        // Compound word
      if( word[firstCharOffset] === '"' )
      {
          // FAIL - Compound opens twice
        if( isCompoundOpen )
        return fail(result);

        currentCompound = word.substring(firstCharOffset + 1);

          // Compound ends at the same word
        if( isCompoundEnding )
        keyword = currentCompound.substring(0, currentCompound.length - 1);
        else
        {
          isCompoundOpen = true;
          continue;
        }
      }
      else
      {
          // FAIL - Unopened compound closes
        if( isCompoundEnding )
        return fail(result);

          // Standard, non-compound word
        if( isNegated )
        keyword = word.substring(1);
        else
        keyword = word;
      }
    }

    const negate = isNegated; // Bind the negation
    result.filters.push((target) => negate ^ testKeyword(target, keyword));

      // Reset negation as compound ends
    if( isCompoundEnding )
    isNegated = false;
  }

  return result;
};

const jDate = (startDate, negate = false, endDate = NaN) => {
  return {
    startDate,
    endDate,
    negate
  };
};

const parseDate = (dateString) => {
  let cDateString = dateString;
  let negation = (cDateString[0] === "!");
  let startDate = NaN;
  let endDate = NaN;

  if( negation )
  cDateString = cDateString.substring(1);

    // Date with at least a month and a year
  const dotCount = numberOfCharOccurrences(cDateString, ".");
  if( dotCount === 0 )  // Year-only date (implies a start and an end date)
  {
    if( !/^\d+$/.test(cDateString) )
    return null;

    startDate = Date.parse(cDateString + "-01-01");

    let date = new Date(startDate);
    endDate = Date.parse(new Date(date.getFullYear(), 11, 31));
  }
  else if( dotCount === 1 ) // Month-only date (implies a start and an end date)
  {
    if( !/^\d{1,2}\.\d+$/.test(cDateString) )
    return null;

    const datetimeString = convertDefaultDateToDatetimeString("1." + cDateString);
    startDate = Date.parse(getYearFromDatetimeString(datetimeString) + "-" + getMonthFromDatetimeString(datetimeString) + "-01");

    let date = new Date(startDate);
    endDate = Date.parse(new Date(date.getFullYear(), date.getMonth() + 1, 0));
  }
  else if( dotCount === 2 ) // Full date
  {
    startDate = Date.parse(convertDefaultDateToDatetimeString(cDateString));
    endDate = startDate;
  }

    // Date parse failed
  if( startDate === NaN )
  return null;

  return jDate(startDate, negation, endDate);
};

const parseDateFilter = (dateString) => {

    // Spaces are used to separate date filters
  const dates = dateString.split(" ");
  const result = Result();

    // Filter is left empty
  if( dateString.length === 1 && dateString === "-" )
  {
    result.filters.push(testEmpty);
    return result;
  }

  for( let date of dates )
  {
    const subDates = date.split("-"); // Extract ranged dates

      // Too many range operators (dashes, -)
    if( subDates.length > 2 )
    return fail(result);
  
    let parseIndex = 0; // Index of subDates that contains the first date
    let parseSecondDate = false;  // Whether a second date needs to be parsed (double-ended)
    let isOpenEnded = false;  // Whether the date range is open ended (only start or only end)
    let dateTester = testEndDate; // Tester function that acts as the filter

      // Range ending at a given date
    if( date[0] === "-" )
    {
      isOpenEnded = true;
      parseIndex = 1;
    }
    else if( date[date.length - 1] === "-" )
    {
        // Range starting at a given date or unranged
      isOpenEnded = true;
      dateTester = testStartDate;
    }
    else if( date.includes("-") )
    parseSecondDate = true; // Range with start and end dates
    
      // Attempt to parse the date
    const firstDate = parseDate(subDates[parseIndex]);

      // Parse end date
    if( !firstDate )
    return fail(result);
    
      // Handle single date and double-ended dates
    if( parseSecondDate || !isOpenEnded )
    {
      const secondDateMS = parseSecondDate ? parseDate(subDates[1]).endDate : firstDate.endDate;
      result.filters.push((target) => firstDate.negate ^ testDateRange(target, firstDate.startDate, secondDateMS));
    }
    else
    {
        // Handle open-ended dates
      const dateLimitMS = (parseIndex === 1) ? firstDate.endDate : firstDate.startDate;
      result.filters.push((target) => firstDate.negate ^ dateTester(target, dateLimitMS));
    }
  }

  return result;
};

export const filterArticle = (article, filter) => {

  const parseAndTestFilter = (target, filter, parser) => {
    if( !filter || filter === "" )
    return true;

    const parsedFilter = parser(filter);
    if( !parsedFilter.failed )
    {
      for( let testFilter of parsedFilter.filters )
      {
        if( testFilter(target) )
        return true;
      }
    }

    return false;
  };

  const testTagsFilter = (target, filter) => {
    if( !filter || filter.length === 0 )
    return true;

    for( let tag of filter )
    {
      if( target.includes(tag) )
      return true;
    }

    return false;
  };

  return (
    parseAndTestFilter(article.id, filter.id, parseKeywordFilter) &&
    parseAndTestFilter(article.title, filter.title, parseKeywordFilter) &&
    parseAndTestFilter(Date.parse(article["publish-date"]), filter.publishDate, parseDateFilter) &&
    parseAndTestFilter(Date.parse(article["read-date"]), filter.readDate, parseDateFilter) &&
    parseAndTestFilter(article.source, filter.source, parseKeywordFilter) &&
    testTagsFilter(article.tags, filter.tags) &&
    parseAndTestFilter(article.notes, filter.notes, parseKeywordFilter)
  );
};
