import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Col, Card, Row } from 'react-bootstrap';
import ResultSearch from "../component/ResultSearch"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)


function Result() {

    const { state } = useLocation();
    //From Search.js --> ONLY(key) //From Playing.js(Spotify) --> (key, artist)
    const { key, artist } = state;

    //filter
    const [selectedFilter, setSelectedFilter] = useState('all')
    function showALL() { setSelectedFilter('all') }
    function showLyric() { setSelectedFilter('lyric') }
    function showSong() { setSelectedFilter('song') }
    function showArtist() { setSelectedFilter('artist') }
    useEffect(() => { if ( artist ) { setSelectedFilter('spotify') } }, []);
    console.log(selectedFilter)
    function refreshPage() {
      window.location.reload();
    }
     
    return (

        <div className="App">

          <Container style={{ marginTop: 50, marginBottom: 50 }}>
            <span>Results</span>
            <h1>{key}</h1>
            {artist && <p>{artist}</p>}

            <br />
            {(selectedFilter !== 'spotify') ? 
              <Container style={{ marginTop: 10 }}>
                  <div className="filters">
                    <button onClick={() => showALL()} id={`${selectedFilter === 'all' ? "focus" : null}`}>Song・Artist</button>
                    <button onClick={() => showSong()}>Song</button>
                    <button onClick={() => showArtist()}>Artist</button>
                    <button onClick={() => showLyric()}>Lyric</button>
                    <button onClick={refreshPage} id="refresh"> <FontAwesomeIcon icon="fa-solid fa-arrow-rotate-right" /> </button>
                  </div>   
              </Container>
            : null
            }

            <ResultSearch searchTerm={key} searchArtist={artist} filter={selectedFilter} />   
          
          </Container>

        </div>
    );

}

export default Result;
