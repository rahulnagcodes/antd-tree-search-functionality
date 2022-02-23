import logo from "./logo.svg";
import "./App.css";
import SearchTree from "./SearchOnTyping/SearchTree";
import SearchTreeOnClick from "./SearchOnClickSearchIcon/SearchTreeOnCLick";
function App() {
  return (
    <div className="App">
      <SearchTree />
      <SearchTreeOnClick />
    </div>
  );
}

export default App;
