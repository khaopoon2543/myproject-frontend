import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { LoadingIMG } from "../component/Loading";
import { isJapanese } from 'wanakana';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import useIsMobile from '../component/useIsMobile';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

function Home (){

    const [user, setUser] = useState([])
    const [user_image, setUserImage] = useState([])
    const [playlists, setPlaylists] = useState([])
    const [loading, setLoading] = useState(false);
    const screenSize = useIsMobile()

    useEffect(() => {
      setLoading(true);
      axios.get("/home", { mode: 'cors', crossDomain: true })
        .then((response) => {
          setUser(response.data.me);
          setUserImage(response.data.image);
          setLoading(false);
        })
        .catch(error => {
          console.log(error.response)
        });

      axios.get("/playlist", { mode: 'cors', crossDomain: true })
        .then((response) => {
          console.log(response.data.all_tracks)
          setPlaylists(response.data.all_tracks);
        })
        .catch(error => {
          console.log(error.response)
        });
    }, []);

    function checkSpecialChars(sentences) {
      const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      const specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,.";
      if (format.test(sentences)) {
        for (var i = 0; i < specialChars.length; i++) {
          sentences = sentences.replace(new RegExp("\\" + specialChars[i], "g"), "");
        }
        return sentences;
      }
      return sentences;
    }

    function truncate(input) {
      if (isJapanese(input) && input.length > 8) {
        return input.substring(0, 8) + '...'
      } else if (!isJapanese(input) && input.length > 18) {
        return input.substring(0, 18) + '...'
      } else { return input}
    }
    function hoverFullText(input) {
      return (
      <Tooltip  id="button-tooltip">
          {input}
      </Tooltip>
      )
    }

    const navigate = useNavigate ();

      return (
        <Container style={{ marginTop: 50, marginBottom: 50 }}>
          <h1 className="font-bold">TOP 50 JAPAN</h1>
          <br/>

          {/* <p> {user.display_name} </p> 
          <img className='thumbnail-image' src={user_image} alt=''></img>
          <p> {user.id} </p>
          <br/>
          */}

        {loading ? (          
          <LoadingIMG />
        ) : ( 
          <Container>
            <Row>
              {playlists.map((track, i) => {
                return (
                <Col lg={12} key={i}>
                  <Card className='spotify d-flex flex-wrap flex-md-row'>
                      <Card.Body>

                      <div>
                      <Row className="items-center">
                          <Col xs={3} md={3}>
                              <Card.Img src={track.image} alt=''></Card.Img>
                          </Col>    
                          <Col xs={7} md={7} className="text">
                            <Card.Title>
                              <OverlayTrigger placement="bottom" delay={{ show: 300, hide: 0 }} overlay={hoverFullText(track.name)}>
                                  <span>{!screenSize ? truncate(track.name) : track.name}</span>
                              </OverlayTrigger>
                            </Card.Title>
                            <Card.Text>{track.artist}</Card.Text> 
                          </Col>
                          <Col xs={2} md={2} className="box-icon">
                            <Row>
                              <Col xs={12} md={3}>
                                <a href={track.url} target="_blank">
                                  <div className="banner" id="spotify-btn">
                                      <div className="items-left">
                                        <button id="search-kashify">
                                          <FontAwesomeIcon icon="fa-solid fa-play" />
                                        </button>
                                      </div>
                                    </div>
                                </a>
                              </Col>
                              <Col xs={12} md={3}>
                                <a onClick={ (event) => {
                                    navigate('/result='+ checkSpecialChars(track.artist) + checkSpecialChars(track.name) ,
                                    { state: { key:track.name, artist:track.artist} })
                                    event.preventDefault()
                                    }}> 
                                    <div className="banner" id="spotify-btn">
                                      <div className="items-left">
                                        <button id="search-kashify">
                                          <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /> 
                                        </button>
                                      </div>
                                    </div>
                                </a>
                              </Col>
                            </Row>
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
          )}

        </Container>
      );
}

export default Home;
