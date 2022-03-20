import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ResultSearch from "../component/ResultSearch"

function Result() {

    const { state } = useLocation();
    //From Search.js --> ONLY(key) OR(key,level) //From Playing.js(Spotify) --> (key, artist)
    const { key, artist, level } = state;

    //filter
    const [selectedFilter, setSelectedFilter] = useState(!artist ? 'all' : 'spotify')
    function showALL() { setSelectedFilter('all') }
    function showLyric() { setSelectedFilter('lyric') }
    function showSong() { setSelectedFilter('song') }
    function showArtist() { setSelectedFilter('artist') }
    console.log(selectedFilter)

    return (

        <div className="App">

          <Container style={{ marginTop: 50, marginBottom: 50 }}>
            <span>Results</span>
            <h1>{key}</h1>
            {artist && <p>{artist}</p>}

            {level && <div className="tagLevel" id="title-lyric">
                        <p id={level}>
                            {level}
                        </p>
                      </div>
            }

            <br />
            {(selectedFilter !== 'spotify') ? 
              <Container style={{ marginTop: 10 }}>
                  <div className="filters">
                    <button onClick={() => showALL()} id={`${selectedFilter === 'all' ? "focus" : null}`}>Song・Artist</button>
                    <button onClick={() => showSong()}>Song</button>
                    <button onClick={() => showArtist()}>Artist</button>
                    <button onClick={() => showLyric()}>Lyric</button>
                  </div>   
              </Container>
            : null
            }

            <ResultSearch searchTerm={key} searchArtist={artist} filter={selectedFilter} level={!level ? null : level} />   
          
          </Container>

        </div>
    );

}

export default Result;
