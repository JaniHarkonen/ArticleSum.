import { useState, useLayoutEffect, useContext } from "react";

import DateSlot from "./DateSlot/DateSlot";

import { GlobalContext } from "../../../context/GlobalContext";
import { Point } from "../../../utils/geometry";
import { Styles } from "../Timeline.styles";
import { compareDateStrings } from "../../../utils/sortComparisons";
import { DATE_INTERVAL_TYPES } from "../../../components/IntervalPicker/IntervalPicker";
import { convertDatetimeStringToDefaultDate, getMonthFromDatetimeString, getMonthName, getYearFromDatetimeString } from "../../../utils/dates";
import usePannableView from "../../../hooks/mouse/usePannableView";
import useResizeEffect from "../../../hooks/useResizeEffect";
import nmod from "../../../utils/nmod";

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
  const originDate = props.origin || new Date();  // Date of the first visible article
  const articles = props.articles || DEFAULT_SETTINGS.articles; // Articles available for display
  const slotWidth = props.slotWidth || DEFAULT_SETTINGS.slotWidth; // Article slot width (in pixels)
  const dateField = props.dateField || DEFAULT_SETTINGS.dateField; // Field in the article JSON containing the date according to which the timeline is assembled
  const dateInterval = props.dateInterval || DEFAULT_SETTINGS.dateInterval; // The interval type according to which the articles will be grouped (day, month, year)

  const [orderedArticles, setOrderedArticles] = useState(DEFAULT_SETTINGS.orderedArticles); // Article slots to be displayed
  const [numberOfSlots, setNumberOfSlots] = useState(0);  // Number of currently visible slots
  const { viewPosition, setConstraints, moveView } = usePannableView();
  const { languageManager: lm } = useContext(GlobalContext);


    // Determine the max number of visible slots according to the parent container's dimensions
  useResizeEffect(() => {
    const timelineElement = document.getElementById(ELEMENT_ID.timelineContainer);

    if( timelineElement )
    setNumberOfSlots(Math.ceil(timelineElement.offsetWidth / slotWidth) + 1);
  });

    // Order articles according to their date
  useLayoutEffect(() => {
    if( articles.length <= 0 )
    return;

      // Sort articles
    const sortedArticles = articles
    .filter((a) => a[dateField] !== "")
    .sort((a1, a2) => compareDateStrings(a2[dateField], a1[dateField]));

    const originTimestamp = originDate.getTime();   // Milliseconds of the date of the first visible date on the timeline

    const articleGroups = [];     // Contains arrays of articles grouped a shared date (slots)
    let dateArticles = [];        // Articles sharing the currently iterated date (current slot)
    let renditionStartIndex = -1;  // Index of the first visible slot in timeline
    let articleDatePrevious = null; // Date string of the previously iterated date


    let dateResolver = (article) => article[dateField]; // Resolves the date of an article according to date interval (default: day)

    switch( dateInterval )
    {
        // Resolve date according to month interval
      case DATE_INTERVAL_TYPES.month:
        dateResolver = (article) => getYearFromDatetimeString(article[dateField]) + "-" + getMonthFromDatetimeString(article[dateField]);
        break;

        // Resolve date according to year interval
      case DATE_INTERVAL_TYPES.year:
        dateResolver = (article) => getYearFromDatetimeString(article[dateField]);
        break;
    }

      // Order articles into "slots" by date interval
    for( let article of sortedArticles )
    {
      const articleDate = dateResolver(article); // Date string of the currently iterated article (see dateField above)
      const isPreviousDateSet = !!articleDatePrevious;
      const articleDateTimestamp = (new Date(article[dateField])).getTime();  // Date's timestamp in MS

        // Determine index of the first visible slot
      if( renditionStartIndex < 0 && articleDateTimestamp >= originTimestamp )
      {
        renditionStartIndex = articleGroups.length + 1;

        if( !isPreviousDateSet )
        renditionStartIndex--;
      }

      if( !isPreviousDateSet )
      articleDatePrevious = articleDate;

        // New date encountered -> new slot
      if( articleDate !== articleDatePrevious )
      {
        articleGroups.push(dateArticles);
        dateArticles = [article];
        articleDatePrevious = articleDate;
      }
      else
      dateArticles.push(article);
    }

      // Add the remaining articles
    if( dateArticles.length > 0 )
    articleGroups.push(dateArticles);

    const totalSlots = articleGroups.length;

    if( renditionStartIndex < 0 )
    renditionStartIndex = (renditionStartIndex < 0) ? totalSlots : renditionStartIndex;

    setOrderedArticles(articleGroups);
    moveView(Point((Math.min(totalSlots, totalSlots - renditionStartIndex)) * slotWidth - 1, 0));
    setConstraints({
      left: 0,
      right: totalSlots * slotWidth - 1
    });
  }, [
    articles,
    originDate,
    dateField,
    dateInterval
  ]);

  const renderArticleSlots = (dateField) => {
    let slots = [];   // Contains all the SlotContainer elements (result)
    const startSlot = Math.max(0, orderedArticles.length - Math.floor(viewPosition.x / slotWidth) - 1); // Index of first visible slot
    const endSlot = Math.min(orderedArticles.length, startSlot + numberOfSlots);  // Index of last visible slot

    for( let i = startSlot; i < endSlot; i++ )
    {
      const articlesByDate = orderedArticles[i];

      if( !articlesByDate[0] )
      continue;

        // Determine date slot caption according to date interval (see dateInterval above)
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
          left: (nmod(viewPosition.x, slotWidth) - slotWidth) + "px",
          width: (numberOfSlots * slotWidth) + "px"
        }}>
          {renderArticleSlots(dateField)}
        </Styles.SlotCarouselContainer>
      </Styles.TimelineContainer>
    </>
  );
}
