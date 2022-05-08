import React, { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './path/Home';
import Search from './path/Search';
import Playlist from "./path/Playlist";
import Levels from "./path/Levels";
import Lyric from "./path/Lyric";
import Header from "./component/Navbar/Navbar";
import SubLevels from "./path/SubLevels";
import Data from "./path/Data";
import SubData from "./path/SubData";
import About from "./path/About";
import Spotify from "./path/Spotify";
import { NoMatch } from "./component/Loading";
import ResultSpotify from "./component/Spotify/ResultSpotify";
import PopupSpotify from "./component/Spotify/PopupSpotify";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { backendSrc } from "./component/backendSrc";
import SpotifyWebApi from 'spotify-web-api-node';

const code = new URLSearchParams(window.location.search).get("code");

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
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
            window.history.pushState({}, null, "/spotify")
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
        <Header 
          user={isUser} 
          setIsUser={isUser => setIsUser(isUser)}
          //SpotifyButton()
          open={isOpen}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
        />
        <PopupSpotify open={isOpen} spotifyApi={spotifyApi} onClose={() => setIsOpen(false)}/>

        
        <Routes>
          <Route path="*" element={<NoMatch />} />
          <Route path="/" element={ <Home/> } />
          <Route path="/search" element={ <Search/> } />
          <Route path="/artists" element={ <Data src="artists" /> } />
          <Route path="/artists/:subArtists" element={ <SubData/> } />
          <Route path="/artists/:trackArtist/:trackId" element={ <Lyric user={isUser} spotifyApi={spotifyApi}/> } />
          <Route path="/levels" element={ <Levels/> } />
          <Route path="/levels/:subLevels" element={ <SubLevels/> } />
          <Route path="/series" element={ <Data src="series"/> } />
          <Route path="/series/:subSeries" element={ <SubData/> } />
          <Route path="/playlist/:codePlaylist" element={ <Playlist spotifyApi={spotifyApi}/> } />
          <Route path="/spotify/:trackArtist/:trackName" element={ <ResultSpotify spotifyApi={spotifyApi}/> } />
          <Route path="/spotify" element={ <Spotify code={code}/> } />

          <Route path="/about" element={ <About/> } />
        </Routes>
      </div>
    );
}

export default App;