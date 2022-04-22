import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ResultSearch from "../component/Search/ResultSearch"
import ResultData from '../component/Search/ResultData';

function Result() {

    const { state } = useLocation();
    //From Search.js --> ONLY(key) OR(key,level) //From Playing.js(Spotify) --> (key, artist)
    const { key, artist, level } = state;

    //filter
    const [selectedFilter, setSelectedFilter] = useState(!artist ? 'song' : 'spotify')
    function showSong() { setSelectedFilter('song') }
    function showArtist() { setSelectedFilter('artist') }
    function showSeries() { setSelectedFilter('series') }
    function showLyric() { setSelectedFilter('lyric') }
    console.log(selectedFilter)
    function isFocus(filter) {
      if (selectedFilter === filter){
        return "focus"
      } return null
    }

    return (

        <div className="App" style={{zoom: '90%'}}>

          <Container className="pages">
            <span>Results</span>
            <h1>{key}</h1>
            {artist && <p>{artist}</p>}

            {level && 
              <div className="tagLevel" id="title-lyric">
                <p id={level}> {level} </p>
              </div>
            }

          <br/>
          {(selectedFilter !== 'spotify') ? 
            <Container style={{ marginTop: 10 }}>
              <div className="filters">
                <button onClick={() => showSong()} id={isFocus('song')}>Song</button>
                <button onClick={() => showArtist()} id={isFocus('artist')}>Artist</button>
                <button onClick={() => showSeries()} id={isFocus('series')}>Series</button>
                <button onClick={() => showLyric()} id={isFocus('lyric')}>Lyric</button>
              </div>   
            </Container>
            : null
          }

          {(selectedFilter==='artist') &&
            <ResultData src="artists" searchTerm={key} />   
          }
          {(selectedFilter==='series') &&
            <ResultData src="series" searchTerm={key} />   
          }
          <ResultSearch searchTerm={key} searchArtist={artist} filter={selectedFilter} level={!level ? null : level} />   
          
          </Container>

        </div>
    );

}

export default Result;
