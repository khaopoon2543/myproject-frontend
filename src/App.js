import React, { Component } from "react";
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './path/Login';
import Search from './path/Search';
import Home from "./path/Home";
import Playing from "./path/Playing";
import Lyric from "./path/Lyric";
import Result from "./path/Result";
import Header from "./component/Navbar";
class App extends Component {

render() {
    return (
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={ <Search/> } />
          <Route path="/login" element={ <Login/> } />
          <Route path="/home" element={ <Home/> } />
          <Route path="/playing" element={ <Playing/> } />
          <Route path="/lyric/:trackArtist/:trackId" element={ <Lyric/> } />
          <Route path="/result=:searchTerm" element={ <Result/> } />
        </Routes>
      </div>
    );
  }
}

export default App;