import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Navbar from "./component/Navbar";
import AllPokemon from "./component/AllPokemon";
import SearchResult from "./component/SearchResult";
import Team from "./component/Team"


function App() {
  return (
    <div className="App">
    
    <Router>
    <Navbar/>
      <Route path="/pokemon/all" component={AllPokemon}/>
      <Route path="/pokemon/search/result" component={SearchResult}/>
      <Route path="/team" exact component={Team}/>
    </Router>
      
    </div>
  );
}

export default App;