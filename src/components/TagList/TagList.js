import ArticleTag from "../ArticleTag/ArticleTag";


const TEST_TAGS = [
  {
    id: 1,
    name: "coronavirus",
    color: { r: 255, g: 0, b: 0 }
  },
  {
    id: 2,
    name: "inflation",
    color: { r: 0, g: 255, b: 0 }
  },
  {
    id: 3,
    name: "crypto",
    color: { r: 0, g: 0, b: 255 }
  },
  {
    id: 4,
    name: "oil",
    color: { r: 128, g: 128, b: 128 }
  }
];

export default function TagList() {

  const renderTagListings = (tags) => {
    return tags.map((tag) => {
      return (
        <>
          <ArticleTag 
            name={tag.name}
            color={tag.color}
          />
          <br />
        </>
      );
    });
  };

  return (
    <>
    {renderTagListings(TEST_TAGS)}
    </>
  );
}
