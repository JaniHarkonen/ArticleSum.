import './App.css';
import BootstrapTest from "./components/BootstrapTest";

const test_article = {
  articleTitle: "FINNAIR DID 9/11 - stock soars 911%",
  articleLink: "www.pornhub.com",
  publishDate: "11/09/2001",
  readDate: "12/12/2012",
  tags: [
    "coronavirus",
    "inflation",
    "oil",
    "crisis",
    "boooooooooriiiiiiinnnnnnnng",
    "coronavirus",
    "inflation",
    "oil",
    "crisis",
    "boooooooooriiiiiiinnnnnnnng",
    "coronavirus",
    "inflation",
    "oil",
    "crisis",
    "boooooooooriiiiiiinnnnnnnng"
  ],
  notes: "hmm, what an interesting article\n->indeed, indubitably it was\nchange my mind"
};


function App() {
  return (
    <div className="App">
      <BootstrapTest article={test_article} />
    </div>
  );
}

export default App;
