import React, { Component } from "react";
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './path/Login';
import Search from './path/Search';
import Home from "./path/Home";
import Playing from "./path/Playing";
import Lyric from "./path/Lyric";
import Navbar from "./component/Navbar";
class App extends Component {
  
render() {
    return (
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={ <Search/> } />
          <Route path="/login" element={ <Login/> } />
          <Route path="/home" element={ <Home/> } />
          <Route path="/playing" element={ <Playing/> } />
          <Route path="/lyric/:trackId" element={ <Lyric/> } />
        </Routes>
      </div>
    );
  }
}

export default App;