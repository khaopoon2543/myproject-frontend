import React, { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './path/Login';
import Search from './path/Search';
import Home from "./path/Home";
import Playing from "./path/Playing";
import Lyric from "./path/Lyric";
import Result from "./path/Result";
import Header from "./component/Navbar";
import SpotifyButton from "./component/SpotifyButton";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import Axios from "axios";
Axios.defaults.baseURL = "http://localhost:5000";

function App(){
    
    const [isOpen, setIsOpen] = useState(false); //SpotifyButton
    const [is_user, setIs_user] = useState(false); //Header SpotifyButton

    useEffect(() => {
      axios.get("/home", { mode: 'cors', crossDomain: true })
        .then(() => {
          setIs_user(true); 
        })
        .catch(error => {
          console.log(error.response)
        });
        
      if(window.location.hash) {
        setIsOpen(true);
      }
    }, []);

    return (
      <div className="App">
        <Header user={is_user} />

        <SpotifyButton 
          user={is_user}
          open={isOpen}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
        />
        
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

export default App;