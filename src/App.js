import React, { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Search from './path/Search';
import Playlist from "./path/Playlist";
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
import SpotifyWebApi from 'spotify-web-api-node'


//import Axios from "axios";
//Axios.defaults.baseURL = "http://localhost:5000"; 
//https://kashify-backend.herokuapp.com //http://localhost:5000

const code = new URLSearchParams(window.location.search).get("code");

const spotifyApi = new SpotifyWebApi({
  clientId: "d97993bb6c89489bb43493cdfa949504",
});

function App(){
    const [isOpen, setIsOpen] = useState(false); //SpotifyButton
    const [isUser, setIsUser] = useState(false); //Header SpotifyButton

    useEffect(() => {
      if (!code) return
        axios.post(`${backendSrc}/login`, { code, })
          .then(response => {
            localStorage.setItem("accessToken", response.data.accessToken)
            localStorage.setItem("refreshToken", response.data.refreshToken)
            localStorage.setItem("expiresIn", response.data.expiresIn)
            localStorage.setItem("timeStamp", Date.now())
            setIsUser(true); 
            window.history.pushState({}, null, "/")
          })
          .catch((err) => {
            console.log(err)
          })
    }, [])

    useEffect(() => { //check token expires
      if (!localStorage.getItem("timeStamp")) return
      let timeStamp = window.localStorage.getItem("timeStamp")
      let expiresIn = window.localStorage.getItem("expiresIn")
      let thisTime = (Date.now() - timeStamp) / 1000
      if (thisTime < expiresIn) return
          setIsUser(false);
          localStorage.clear();
    }, [])

    useEffect(() => { //check user
      if (!localStorage.getItem("accessToken")) return
      let accessToken = window.localStorage.getItem("accessToken")
        setIsUser(true);
        spotifyApi.setAccessToken(accessToken)
        console.log("Access token")     
    }, []);

    return (
      <div className="App">
        <Header user={isUser} setIsUser={isUser => setIsUser(isUser)} />

        <SpotifyButton 
          user={isUser}
          open={isOpen}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          spotifyApi={spotifyApi}
        />
        
        <Routes>
          <Route path="/" element={ <Search/> } />
          <Route path="/playlist" element={ <Playlist spotifyApi={spotifyApi}/> } />
          <Route path="/lyric/:trackArtist/:trackId" element={ <Lyric user={isUser}/> } />
          <Route path="/result=:searchTerm" element={ <Result/> } />
          <Route path="/levels" element={ <Levels/> } />
          <Route path="/levels/:subLevels" element={ <SubLevels/> } />
          <Route path="/artists" element={ <Data src="artists" /> } />
          <Route path="/artists/:subArtists" element={ <SubData/> } />
          <Route path="/series" element={ <Data src="series"/> } />
          <Route path="/series/:subSeries" element={ <SubData/> } />
          <Route path="/spotify/:trackArtist/:trackName" element={ <ResultSpotify spotifyApi={spotifyApi}/> } />

          <Route path="/about" element={ <About/> } />
        </Routes>
      </div>
    );
}

export default App;