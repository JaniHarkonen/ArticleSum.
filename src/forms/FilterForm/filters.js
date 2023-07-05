/**
 * This utility module provides two main functions: parsing and 
 * testing of filters on an article.
 * 
 * When complex filters are needed they can be parsed from a 
 * JSON of strings using the `parseFilter`-function. The strings 
 * are parsed down to series of functions that either return 
 * `true` or `false` depending on whether an article passed into
 * them passes the filter.
 * 
 * An article can be passed through to a filter using the 
 * `filterArticle`-function. It takes in a parsed filter and an 
 * article and checks each field of the article JSON using the 
 * functions found in the parsed filter. Articles that pass 
 * the filter test return `true` while others return `false`.
 * 
 * Complex filters support the following settings:
 * - negation of terms with exclamation point ! (example: !inflation)
 * - compounding of terms with quotes "" (example: "inflation rose")
 * - date ranges using dashes - (example: 1.1.2000-1.1.2010)
 * - open ended open date (example: -1.1.2020)
 * - open ended end date (example: 1.1.2020-)
 * - month-only dates (example: 1.2005)
 * - year-only dates (example: 2008)
 * - force data to be empty with a single dash -
 */

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

/**
 * Parser functions return a result JSON that contains the following 
 * information:
 * - whether the parsing was successful
 * - an array of all the parsed filters (functions)
 * 
 * This is a component function that returns a JSON with the given 
 * settings or default settings if none are provided.
 * 
 * @param {Boolean} failed Whether the parsing was successful (default:
 * `false`).
 * @param {Array} filters Array of filters (functions) that were parsed
 * (default: emtpy array []).
 * 
 * @returns A parser result-type JSON.
 */
const Result = (failed = false, filters = []) => {
  return {
    failed,
    filters
  };
};

/**
 * Helper function that sets the failure-state of a given parser 
 * result JSON to `true` and returns the result. This function is 
 * to be used when the parser fails.
 * 
 * @param {JSON} result Parser result JSON that will be returned 
 * by the parser that failed.
 * 
 * @returns Parser result with `failed`-field set to `true`.
 */
const fail = (result) => {
  result.failed = true;
  return result;
};

/**
 * Takes a keyword string and parses it according to the complex 
 * filter rules. The result is a parser result -type JSON that 
 * indicates whether the parsing was successful and includes all
 * the parsed filters (functions) in an array.
 * 
 * The keywords must be separated using spaces unless a compound 
 * word is formed using double quotes (""). Keywords, including 
 * compound words, may be negated by adding an exclamation point
 * (!) immediately to the left of the keyword.
 * 
 * @param {String} filterString String from which to parse the complex
 * filter.
 * 
 * @returns Parser result JSON (see `Result`-function component 
 * for more information).
 */
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

/**
 * A date JSON that is returned only by the `parseDate`-function.
 * Because date filter strings allow ambiguous dates (such as 1.2005
 * or 2008), the parsing of a single date filter may yield date ranges.
 * This function component will produce a JSON where the date range is 
 * provided to the `parseDateFilter`.
 * 
 * If the filter being parsed only contains a single date, the 
 * `startDate` and the `endDate` will be the same.
 * 
 * If the date is negated using an exclamation point (!), the 
 * `negate`-flag is set to `true`.
 * 
 * If the filter is ambiguous, the `startDate` and the `endDate` will be
 * calculated and differ in the final result.
 * 
 * @param {Number} startDate Date (in MS) from which the date range
 * starts.
 * @param {Boolean} negate Whether the date range is negated.
 * @param {Number} endDate Date (in MS) where the date range ends.
 * 
 * @returns A date JSON containing the start and end dates as well as 
 * whether the range is inverted (negated).
 */
const jDate = (startDate, negate = false, endDate = NaN) => {
  return {
    startDate,
    endDate,
    negate
  };
};

/**
 * Helper function for `parseDateFilter`. Determines the date indicated 
 * by a string that only contains a single date. Because dates can be 
 * ambiguous, this function returns a date JSON that contains the 
 * starting and the ending of the date. The result also contains whether 
 * the range is inverted (negated).
 * 
 * @param {String} dateString String that only contains a single date. 
 * Can contain negation and/or an ambiguous date.
 * 
 * @returns A date JSON (see `jDate` for more information).
 */
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

/**
 * Takes a default date string (form: `dd.mm.yyyy`) and parses it
 * according to the complex filter rules. The result is a parser result
 * -type JSON that indicates whether the parsing was successful and
 * includes all the parsed filters (functions) in an array.
 * 
 * The dates must be separated using spaces, however, they may be 
 * negated by adding an exclamation point (!) immediately to the left of 
 * the date. Date ranges can be constructed using a dash (-). When a 
 * dash is placed on the left side of a date, it indicates a range ending 
 * at the date. When placed on the right side of a date, it indicates a 
 * range starting from the date. A dash between two dates indicates a 
 * range starting at the left-side date and ending at the right-side date.
 * 
 * Dates are considered ambiguous when they are not entered in their full 
 * form (for example `1.2000` or `2008`). These dates will be parsed into 
 * date ranges representing the month or the year entered.
 * 
 * @param {String} dateString String from which to parse the complex
 * filter.
 * 
 * @returns Parser result JSON (see `Result`-function component 
 * for more information).
 */
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

/**
 * Takes an array of strings representing tag names and generates a 
 * filter that checks whether a given target array contains any of 
 * the tags. The complex filter rules are not applied here, as the 
 * tag input doesn't allow it as of yet.
 * 
 * @param {String} tags Array of tags that are to be tested by the 
 * filter.
 * 
 * @returns Parser result JSON (see `Result`-function component 
 * for more information).
 */
const parseTagFilter = (tags) => {
  const result = Result();
  result.filters.push((target) => {
    if( tags.length === 0 )
    return true;
    
    for( let tag of tags )
    {
      if( target.includes(tag) )
      return true;
    }

    return false;
  });

  return result;
};

/**
 * Creates a filter that always lets an item passed onto it through.
 * This filter is used as a non-filter when a filter string that is 
 * to be parsed is empty or `null`.
 * 
 * @returns A "skipped filter" that accepts all items.
 */
const createSkippedFilter = () => {
  const result = Result();
  result.filters.push((target) => true);

  return result;
};

/**
 * Takes a JSON that consists of filter strings that are to 
 * be parsed into an article filter. It is recommended that 
 * a filter is parsed before it is tested on the articles as 
 * parsing the filter each time it is tested would be very 
 * inefficient.
 * 
 * The filters are parsed using the appropriate parsers 
 * depending on the type of the article field that the filter 
 * tests; title filter will be parsed as a keyword whereas the
 * publish date filter will be parsed as a date.
 * 
 * The result is a JSON containing the parsed filters for 
 * each article field (`id`, `title`, `publishDate`, `readDate`,
 * `source`, `tags`, `notes`). If any filter field is missing 
 * or is empty, a "skipped filter" will be created for that 
 * field, meaning, it is not considered during filteration 
 * (see `createSkippedFilter`).
 * 
 * @param {String} filterStrings JSON consisting of filter 
 * strings coupled with each field of the article.
 * 
 * @returns A JSON that represents an article filter, which
 * can be passed onto `filterArticle`-function.
 */
export const parseFilter = (filterStrings) => {

  const parseOrCreateSkipper = (filterString, parse) => {
    if( !filterString || filterString === "" )
    return createSkippedFilter();
    else
    return parse(filterString);
  };

  return {
    id: parseOrCreateSkipper(filterStrings.id, parseKeywordFilter),
    title: parseOrCreateSkipper(filterStrings.title, parseKeywordFilter),
    publishDate: parseOrCreateSkipper(filterStrings.publishDate, parseDateFilter),
    readDate: parseOrCreateSkipper(filterStrings.readDate, parseDateFilter),
    source: parseOrCreateSkipper(filterStrings.source, parseKeywordFilter),
    tags: parseOrCreateSkipper(filterStrings.tags, parseTagFilter),
    notes: parseOrCreateSkipper(filterStrings.notes, parseKeywordFilter)
  };
};

/**
 * A utility function used by `filterArticle` to test a parsed filter function
 * on a `target` article. If the parsed filter failed to parse previously, the
 * test will yield `false`. Otherwise the test will yield either `true` or 
 * `false` depending on whether the `target` article passed the filter.
 * 
 * @param {*} target Article that is to be tested by the filter.
 * @param {JSON} parsedFilter Filter that is to be used to test the article.
 * 
 * @returns Whether the article passed the filter test.
 */
const testFilter = (target, parsedFilter) => {
  if( parsedFilter.failed === false )
  {
    for( let test of parsedFilter.filters )
    {
      if( test(target) )
      return true;
    }
  }

  return false;
};

/**
 * Tests given article filters represented by a JSON on an article, and 
 * returns whether the article passed the filters provided. The following 
 * fields of the `parsedFilter` are tested agains the corresponding fields 
 * of the article: 
 * - `id`
 * - `title`
 * - `publishDate` (`publish-date` in article)
 * - `readDate` (`read-date` in article)
 * - `source`
 * - `tags`
 * - `notes`
 * 
 * @param {JSON} article The article that is to be filtered.
 * @param {JSON} parsedFilter Filter that is to be used.
 * 
 * @returns Whether the article satisfied the filters.
 */
export const filterArticle = (article, parsedFilter) => {
  return (
    testFilter(article.id, parsedFilter.id) &&
    testFilter(article.title, parsedFilter.title) &&
    testFilter(article["publish-date"], parsedFilter.publishDate) &&
    testFilter(article["read-date"], parsedFilter.readDate) &&
    testFilter(article.source, parsedFilter.source) &&
    testFilter(article.tags, parsedFilter.tags) &&
    testFilter(article.notes, parsedFilter.notes)
  );
};
