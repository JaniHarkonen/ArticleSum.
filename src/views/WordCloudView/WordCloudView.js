import WordCloud from "../../components/WordCloud/WordCloud";


export default function WordCloudView(props) {

  const TESTTESTSETSgenerateInventory = () => {
    const listOfWords = [
      "hello",
      "joe",
      "for",
      "mega",
      "foe",
      "trading",
      "stocks",
      "da",
      "moon",
      "xdddd",
      "omegaCRINGE",
      "O_O",
      "X_X",
      "T_T",
      "gagagagaga",
      "tester",
      "på",
      "sverige",
      "energi",
      "dryck"
    ];

    const inventory = [];

    for( let i = 0; i < listOfWords.length; i++ )
    inventory.push({ word: listOfWords[i], occurrences: Math.random() * 100 });

    return inventory;
  };

  return (
    <>
      <WordCloud
        inventory={TESTTESTSETSgenerateInventory()}
        maxFontSize={30}
      />
    </>
  );
}
