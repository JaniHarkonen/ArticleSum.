import { useState, useLayoutEffect, useContext } from "react";
import { GlobalContext } from "../../../context/GlobalContext";

import DateSlot from "./DateSlot/DateSlot";
import usePannableView from "../../../hooks/mouse/usePannableView";
import nmod from "../../../utils/nmod";
import useResizeEffect from "../../../hooks/useResizeEffect";
import { Point } from "../../../utils/geometry";
import { Styles } from "../Timeline.styles";
import { compareDateStrings } from "../../../utils/sortComparisons";
import { DATE_INTERVAL_TYPES } from "../../../components/IntervalPicker/IntervalPicker";
import { convertDatetimeStringToDefaultDate, getMonthFromDatetimeString, getMonthName, getYearFromDatetimeString } from "../../../utils/dates";

export const DEFAULT_SETTINGS = {
  slotWidth: 250,
  articles: [],
  orderedArticles: [],
  dateField: "publish-date",
  dateInterval: DATE_INTERVAL_TYPES.day
};

export const ELEMENT_ID = {
  timelineContainer: "timeline-container"
};


export default function Timeline(props) {
  const originDate = props.origin || new Date();  // Date form which to start rendering the timeline
  const articles = props.articles || DEFAULT_SETTINGS.articles; // Available articles that can be displayed on the timeline
  const slotWidth = props.slotWidth || DEFAULT_SETTINGS.slotWidth; // Width of a date slot (in pixels)
  const dateField = props.dateField || DEFAULT_SETTINGS.dateField; // Field in the article JSON containing the date according to which the timeline is assembled
  const dateInterval = props.dateInterval || DEFAULT_SETTINGS.dateInterval; // The interval type according to which the date slots will be constructed (day, month, year)

  const [orderedArticles, setOrderedArticles] = useState(DEFAULT_SETTINGS.orderedArticles); // Arrays of articles grouped by date
  const {viewPosition, setConstraints} = usePannableView({
    position: Point(slotWidth - 1, 0)
  });
  const [numberOfSlots, setNumberOfSlots] = useState(0);  // Number of slots displayed in the timeline
  const [articleRenditionStartIndex, setArticleRenditionStartIndex] = useState(-1); // Index of the article group in orderedArticles to start rendering the timeline from

  const { languageManager: lm } = useContext(GlobalContext);


    // Determine the number of displayed slots according to the parent container's dimensions
  useResizeEffect(() => {
    const timelineElement = document.getElementById(ELEMENT_ID.timelineContainer);

    if( timelineElement )
    setNumberOfSlots(Math.ceil(timelineElement.offsetWidth / slotWidth) + 1);
  });

    // Order articles according to their date
  useLayoutEffect(() => {
    if(articles.length <= 0)
    return;

      // Sort articles by their dates
    const sortedArticles = articles.sort((a1, a2) => compareDateStrings(a2[dateField], a1[dateField]));
    const originTimestamp = originDate.getTime();   // Milliseconds of the date of the first visible date on the timeline

      // Filter and order articles into arrays by date
    const filteredArticles = [];  // Contains arrays of articles grouped a shared date
    let articlesInDate = [];      // Articles sharing the currently iterated date
    let renditionStartIndex = -1; // Index of filteredArticles from which to start rendering the timeline
    let articleDatePrevious = sortedArticles[0][dateField]; // Date string of the previously iterated date
    let dateResolver = (article) => article[dateField];

    switch( dateInterval )
    {
      case DATE_INTERVAL_TYPES.month:
        dateResolver = (article) => getYearFromDatetimeString(article[dateField]) + "-" + getMonthFromDatetimeString(article[dateField]);
        articleDatePrevious = getYearFromDatetimeString(articleDatePrevious) + "-" + getMonthFromDatetimeString(articleDatePrevious);
        break;

      case DATE_INTERVAL_TYPES.year:
        dateResolver = (article) => getYearFromDatetimeString(article[dateField]);
        articleDatePrevious = getYearFromDatetimeString(articleDatePrevious);
        break;
    }

      // Assemble the sorted articles by date into different arrays
    for( let article of sortedArticles )
    {
      const articleDate = dateResolver(article); // Date string of the currently iterated article (see dateField above)
      const articleDateTimestamp = new Date(article[dateField]);  // Timestamp of the article's date

        // Exclude articles with no date
      if( !articleDate )
      continue;

        // Determine the index from which to start rendering the timeline
      if( renditionStartIndex < 0 && articleDateTimestamp >= originTimestamp )
      renditionStartIndex = filteredArticles.length + 1;

        // New date encountered
      if( articleDate !== articleDatePrevious )
      {
        filteredArticles.push(articlesInDate);
        articlesInDate = [article];
        articleDatePrevious = articleDate;
      }
      else
      articlesInDate.push(article);
    }

      // Add the remaining articles
    if( articlesInDate.length > 0 )
    filteredArticles.push(articlesInDate);

    setOrderedArticles(filteredArticles);
    setArticleRenditionStartIndex(renditionStartIndex);

    setConstraints({
      left: slotWidth,
      right: (renditionStartIndex + 2) * slotWidth - 1
    });
  }, [articles, originDate, dateField, dateInterval]);

  const renderArticleSlots = (dateField) => {
    let slots = [];   // Contains all the SlotContainer elements
    const startIndex = Math.max(0, articleRenditionStartIndex - Math.floor((viewPosition.x - slotWidth) / slotWidth)); // Index of the article from which to start (offset)
    const endIndex = Math.min(orderedArticles.length, startIndex + numberOfSlots);  // Index of the article where to stop rendering the slots

    for( let i = startIndex; i < endIndex; i++ )
    {
      const articlesByDate = orderedArticles[i];

      if( !articlesByDate[0] )
      continue;

        // Determine the appropriate caption for the date slot
        // DEFAULT: dd.mm.yyyy
      const date = articlesByDate[0][dateField];
      let slotCaption = convertDatetimeStringToDefaultDate(date);

      switch( dateInterval )
      {
          // By month: month.yyyy
        case DATE_INTERVAL_TYPES.month:
          const month = getMonthName(parseInt(getMonthFromDatetimeString(date)));
          slotCaption = lm.translate("date.months." + month) + " " + getYearFromDatetimeString(date);
          break;

          // By year: yyyy
        case DATE_INTERVAL_TYPES.year:
          slotCaption = getYearFromDatetimeString(date);
          break;
      }

      slots.push(
        <Styles.SlotContainer
          key={"timeline-slot-" + date}
          style={{ width: slotWidth }}
        >
          <DateSlot
            caption={slotCaption}
            articles={articlesByDate}
          />
        </Styles.SlotContainer>
      );
    }

    return slots;
  };

  return (
    <>
      <Styles.TimelineContainer id={ELEMENT_ID.timelineContainer}>
        <Styles.SlotCarouselContainer style={{
          left: (nmod(viewPosition.x, slotWidth) - slotWidth) + "px"
        }}>
          {renderArticleSlots(dateField)}
        </Styles.SlotCarouselContainer>
      </Styles.TimelineContainer>
    </>
  );
}
