import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ResultSearch from "../component/ResultSearch"


function Result() {

    const { state } = useLocation();
    const navigate = useNavigate();
    //From Search.js --> ONLY(key) //From Playing.js(Spotify) --> (key, artist)
    const { key, artist } = state;
    //{artist ? console.log(artist) : console.log(key)}
     
    return (

        <div className="App">

          <Container style={{ marginTop: 50 }}> 
          <button onClick={() => navigate(-1)}>Back to Search</button>    
          <h1>{key}</h1>
          <p>{artist}</p>
          <br />
          <ResultSearch searchTerm={key} searchArtist={artist} id="ResultSearch"/>   
          </Container>

        </div>
    );

}

export default Result;
