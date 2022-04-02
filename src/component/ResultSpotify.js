import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

const IMG_SONG={
    width: 150,
    height: 150
}
const INLINE ={
    marginLeft: 10,
    color: 'black'
}

export default function ResultSpotify() {
    const { state } = useLocation();
    const { trackName, trackArtistId, trackArtist } = state;
    const [resultSpotify, setResultSpotify] = useState([])

    useEffect(() => {
        if ( trackArtist, trackName ) {
            axios.get('/searchTrack/'+ trackArtistId + '/' + trackArtist + '/' + trackName , { mode: 'cors', crossDomain: true })
            .then((response) => {
                setResultSpotify(response.data);
                console.log(response.data)
            })
            .catch(error => {
              console.log(error.response)
            });
    }}, [ trackArtist, trackName ]);

    return (
        <Container style={{ marginTop: 50, marginBottom: 50 }}>  
          <span>Spotify Search Results</span>
          <h1>{trackName}</h1>  
          <div className="tagLevel" id="title-lyric">
            <p className='subtitle' id="sub-data">
              {trackArtist.replace(/-/g, ' ')}
            </p> 
          </div>
          <br/> 
          <Row>
          {resultSpotify.map((track, i) => {
            return (
                <Col md={4} xl={3} key={i}>
                    <Card className='spotify d-flex flex-wrap flex-md-row'>
                        <Card.Body>

                        <div>
                        <Row className="items-center">
                            <Col xs={3} md={12}>
                                <Card.Img src={track.img} alt=''></Card.Img>
                            </Col>    
                            <Col xs={7} md={12}>
                                <Card.Title>{track.name}</Card.Title>
                                <Card.Text>{track.artist}</Card.Text> 
                            </Col>
                            <Col xs={2} md={12} className="box-icon">
                                <a href={track.url} target="_blank">
                                <FontAwesomeIcon icon="fa-solid fa-circle-play" className="icon"/>
                                </a>
                            </Col>
                        </Row> 
                        </div>   

                        </Card.Body>
                    </Card>        
                </Col>    
            )
          })}
          </Row>         
        </Container>
    )
};
