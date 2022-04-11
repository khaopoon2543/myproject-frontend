import React, { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './path/Login';
import Search from './path/Search';
import Home from "./path/Home";
import Levels from "./path/Levels";
import Lyric from "./path/Lyric";
import Result from "./path/Result";
import Header from "./component/Navbar/Navbar";
import SpotifyButton from "./component/Spotify/SpotifyButton";
import SubLevels from "./path/SubLevels";
import Data from "./path/Data";
import SubData from "./path/SubData";
import About from "./path/About";
import ResultSpotify from "./component/Spotify/ResultSpotify";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { backendSrc } from "./component/backendSrc";

//import Axios from "axios";
//Axios.defaults.baseURL = "http://localhost:5000"; 
//https://kashify-backend.herokuapp.com //http://localhost:5000

function App(){
    
    const [isOpen, setIsOpen] = useState(false); //SpotifyButton
    const [isUser, setIsUser] = useState(false); //Header SpotifyButton

    useEffect(() => {
      axios.get(`${backendSrc}/home`, { mode: 'cors', crossDomain: true })
        .then(() => {
          setIsUser(true); 
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
        <Header user={isUser} />

        <SpotifyButton 
          user={isUser}
          open={isOpen}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
        />
        
        <Routes>
          <Route path="/" element={ <Search/> } />
          <Route path="/login" element={ <Login/> } />
          <Route path="/home" element={ <Home/> } />
          <Route path="/lyric/:trackArtist/:trackId" element={ <Lyric user={isUser}/> } />
          <Route path="/result=:searchTerm" element={ <Result/> } />
          <Route path="/levels" element={ <Levels/> } />
          <Route path="/levels/:subLevels" element={ <SubLevels/> } />
          <Route path="/artists" element={ <Data src="artists" /> } />
          <Route path="/artists/:subArtists" element={ <SubData/> } />
          <Route path="/series" element={ <Data src="series"/> } />
          <Route path="/series/:subSeries" element={ <SubData/> } />
          <Route path="/spotify/:trackArtist/:trackName" element={ <ResultSpotify/> } />

          <Route path="/about" element={ <About/> } />
        </Routes>
      </div>
    );
}

export default App;