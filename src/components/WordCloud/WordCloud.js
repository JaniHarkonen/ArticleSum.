import { useEffect, useState } from "react";


export default function WordCloud(props) {
  const inventory = props.inventory;
  const maxFontSize = props.maxFontSize || 20;
  const minFontSize = props.minFontSize || 8;

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

      // Generate word cloud
    return items.map((item) => {
      const fontSize = minFontSize + (item.occurrences - lowestOccurrences) / occurrenceDelta * fontSizeDelta;

      return(
        <>
          <span style={{ fontSize: fontSize + "px" }}
          >
            {item.word}
          </span>
          {' '}
        </>
      )
    });
  };

  return(
    <div style={{ width: "350px", textAlign: "justify" }}>
      {renderWordSpans(inventory)}
    </div>
  );
}
