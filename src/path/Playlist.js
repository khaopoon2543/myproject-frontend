import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Loading } from "../component/Loading";
import useIsMobile from '../component/useIsMobile';

import { FiSearch } from 'react-icons/fi';
import { BsPlayCircleFill } from 'react-icons/bs';

function Playlist ({spotifyApi}){

    const [playlists, setPlaylists] = useState([])
    const [loading, setLoading] = useState(false);
    const screenSize = useIsMobile()

    useEffect(() => {
      if (!window.localStorage.getItem("accessToken") && !spotifyApi) return
        spotifyApi.setAccessToken(window.localStorage.getItem("accessToken"))
        console.log("Access token @result-spotify")

        async function getPlaylist() {
          try {
            setLoading(true)
            const result = await spotifyApi.getPlaylist('37i9dQZEVXbKXQ4mDTEBXq')
            const track_item = result.body.tracks.items
            const all_tracks = [];
            track_item.forEach(function(track, index, arr) {
              var track = {};
              track["name"] = result.body.tracks.items[index].track.name;
              track["artist"] = result.body.tracks.items[index].track.artists[0].name;
              track["image"] = result.body.tracks.items[index].track.album.images[0].url;
              track["url"] = result.body.tracks.items[index].track.external_urls.spotify;
              all_tracks.push(track);
            })
            setPlaylists(all_tracks)
            setLoading(false)
          } catch (err) {
            console.log(err)
          }
        }
        getPlaylist()
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

    const navigate = useNavigate ();

      return (
        <Container className="pages">
          <span>Spotify Playlist</span>
          <h1 className="font-bold">TOP 50 JAPAN</h1>
          <br/>

        {loading ? (          
          <Loading />
        ) : ( 
          <Container>
            <Row>
              {playlists.map((track, i) => {
                return (
                  <Card className='spotify d-flex flex-wrap flex-md-row'>
                      <Card.Body>

                        <Row className="items-center">
                          <Col xs={9} md={10}>
                            <div className="d-flex justify-content-left align-items-center">
                              <Card.Img src={track.image} alt=''></Card.Img>
                              <Container className="d-block">
                                <Card.Title>{track.name}</Card.Title>
                                <Card.Text>{track.artist}</Card.Text> 
                              </Container>
                            </div>
                          </Col> 

                          <Col xs={3} md={2}>
                              <div className="d-flex justify-content-left align-items-center"
                                style={(screenSize) ? { zoom: '80%' } : { zoom: '100%' }}>
                                <a href={track.url} target="_blank">
                                  <div style={{marginRight:10}}>
                                    <BsPlayCircleFill className="icon"/>  
                                  </div>
                                </a>
                              
                                <a onClick={ (event) => {
                                    navigate('/result='+ checkSpecialChars(track.artist) + checkSpecialChars(track.name) ,
                                    { state: { key:checkSpecialChars(track.name), artist:checkSpecialChars(track.artist)} })
                                    event.preventDefault()
                                    }}> 
                                    <button id="search-kashify">
                                      <FiSearch /> 
                                    </button>
                                </a>
                              </div>
                          </Col>
                        </Row> 

                      </Card.Body>
                  </Card>        
                )
              })}
              
            </Row>
          </Container>   
          )}

        </Container>
      );
}

export default Playlist;
