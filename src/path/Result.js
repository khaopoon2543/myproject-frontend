import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import ResultSearch from "../component/ResultSearch"

function Result() {

    const { state } = useLocation();
    //From Search.js --> ONLY(key) //From Playing.js(Spotify) --> (key, artist)
    const { key, artist } = state;
    {artist ? console.log(key, artist) : console.log(key);}
    
    return (

        <div className="App">

          <Container style={{ marginTop: 50 }}> 
          
          <h1>{key}</h1>
          <p>{artist}</p>
          <br />
          <ResultSearch searchTerm={key} searchArtist={artist} />
          
          </Container>

        </div>
    );

}

export default Result;
