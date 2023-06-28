import { useEffect, useState, Fragment } from "react";

export const DEFAULT_SETTINGS = {
  inventory: [],
  messages: {
    empty: "No words found"
  },
  font: {
    maxFontSize: 20,
    minFontSize: 8
  }
};


export default function WordCloud(props) {
  const inventory = props.inventory || DEFAULT_SETTINGS.inventory;
  const maxFontSize = props.maxFontSize || DEFAULT_SETTINGS.font.maxFontSize;
  const minFontSize = props.minFontSize || DEFAULT_SETTINGS.font.minFontSize;
  const messageEmpty = props.messageEmpty || DEFAULT_SETTINGS.messages.empty;

  const [occurrenceRange, setOccurrenceRange] = useState({
    highestOccurrences: 0,
    lowestOccurrences: 0
  });

    // Determine the lowest and highest number of occurrences for a 
    // single word in order to size the words properly
  useEffect(() => {
    let highestOccurrences = Number.MIN_SAFE_INTEGER;
    let lowestOccurrences = Number.MAX_SAFE_INTEGER;

    for( let item of inventory )
    {
      const occurrences = item.occurrences;

      if( occurrences > highestOccurrences )
      highestOccurrences = occurrences;
      
      if( occurrences < lowestOccurrences )
      lowestOccurrences = occurrences;
    }

    setOccurrenceRange({
      highestOccurrences: highestOccurrences,
      lowestOccurrences: lowestOccurrences
    });
  }, [inventory]);

  const renderWordSpans = (items) => {
    const {
      highestOccurrences,
      lowestOccurrences
    } = occurrenceRange;

    const occurrenceDelta = highestOccurrences - lowestOccurrences;
    const fontSizeDelta = (maxFontSize - minFontSize);

      // No words
    if( items.length <= 0 )
    return messageEmpty;

      // Generate word cloud, if there are words
    return items.map((item, index) => {
      const fontSize = minFontSize + (item.occurrences - lowestOccurrences) / occurrenceDelta * fontSizeDelta;

      return(
        <Fragment key={"word-cloud-word-span-" + index}>
          <span style={{fontSize: fontSize + "px" }}>
            {item.word}
          </span>
          {' '}
        </Fragment>
      )
    });
  };

  return(
    <div className="d-flex justify-content-center">
      <div className="text-justify bg-light rounded-5 p-3">
        {renderWordSpans(inventory)}
      </div>
    </div>
  );
}
