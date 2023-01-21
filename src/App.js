import './App.css';
import Header from './components/Header/Header';
import Workspace from './components/Workspace/Workspace';

const test_article = {
  articleTitle: "FINNAIR DID 9/11 - stock soars 911%",
  articleLink: "www.pornhub.com",
  publishDate: "11/09/2001",
  readDate: "12/12/2012",
  tags: [],
  notes: "hmm, what an interesting article\n->indeed, indubitably it was\nchange my mind"
};


function App() {
  return (
    <div className="App">
      <Header />
      <Workspace />
    </div>
  );
}

export default App;
