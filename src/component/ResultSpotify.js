import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Loading } from "./Loading";
import useIsMobile from '../component/useIsMobile';

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
    const [loading, setLoading] = useState(false);
    const screenSize = useIsMobile()

    useEffect(() => {
      let isMounted = true; 
      fetchData();
      return () => { isMounted = false };

      function fetchData() {
        if ( trackArtist && trackName && trackArtistId ) {
        setLoading(true);
        axios.get('/searchTrack/'+ trackArtistId + '/' + trackArtist + '/' + trackName , { mode: 'cors', crossDomain: true })
            .then((response) => {
                if (isMounted) {
                    setResultSpotify(response.data);
                }
                setLoading(false);
            })
            .catch(error => {
              console.log(error.response)
            });
        }
      }
    }, [ trackArtist && trackName && trackArtistId ]);

    return (
        <Container style={{ marginTop: 50, marginBottom: 50 }}>  
          <span>Spotify Search Results</span>
          <h1>{trackName}</h1>  
          <div className="tagLevel" id="title-lyric">
            <p className='subtitle' id="sub-data">
              {trackArtist}
            </p> 
          </div>
        {loading ?
            <Loading />
        : <>
        <br/>
        <Container>
          <Row className="d-flex justify-content-center align-items-center">
          {resultSpotify.map((track, i) => {
            return (
                <Col md={4} lg={3} key={i}>
                    <a href={track.url} target="_blank">

                    <Card className='spotify d-flex flex-wrap flex-md-row'>
                        <Card.Body>

                        <Row className="items-center">
                            <Col xs={3} md={12}>
                                <Card.Img src={track.img} alt=''></Card.Img>
                            </Col>    
                            <Col xs={7} md={12}>
                                <Card.Title>{track.name}</Card.Title>
                                <Card.Text>{track.artist}</Card.Text> 
                            </Col>
                            {screenSize &&
                                <Col xs={2} md={12} className="box-icon">
                                    <a href={track.url} target="_blank">
                                    <FontAwesomeIcon icon="fa-solid fa-circle-play" className="icon"/>
                                    </a>
                                </Col>
                            }
                            
                        </Row> 

                        </Card.Body>
                    </Card> 
                    </a>       
                </Col>    
            )
          })}
          </Row> 
        </Container> 
        </> 
        }       
        </Container>
    )
};
