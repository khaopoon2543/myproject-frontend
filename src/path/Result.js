import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Col, Card, Row } from 'react-bootstrap';
import ResultSearch from "../component/ResultSearch"

function Result() {

    const { state } = useLocation();
    const navigate = useNavigate();
    //From Search.js --> ONLY(key) //From Playing.js(Spotify) --> (key, artist)
    const { key, artist } = state;

    //filter
    const [selectedFilter, setSelectedFilter] = useState('all')
    function showALL() { setSelectedFilter('all') }
    function showLyric() { setSelectedFilter('lyric') }
    function showSong() { setSelectedFilter('song') }
    useEffect(() => { if ( artist ) { setSelectedFilter('spotify') } }, []);
    console.log(selectedFilter)
     
    return (

        <div className="App">

          <Container style={{ marginTop: 50 }}> 
            <h1>{key}</h1>
            <p>{artist}</p>
            <br />
            <button id="back" onClick={() => navigate(-1)}>Back to Search</button> 
            <br />

            <Container style={{ marginTop: 10 }}>
                <div className="filters">
                  <button onClick={() => showALL()} id="focus">All</button>
                  <button onClick={() => showLyric()}>Lyric</button>
                  <button onClick={() => showSong()}>Song</button>
                </div>        
            </Container>

            <ResultSearch searchTerm={key} searchArtist={artist} filter={selectedFilter} />   
          
          </Container>

        </div>
    );

}

export default Result;
