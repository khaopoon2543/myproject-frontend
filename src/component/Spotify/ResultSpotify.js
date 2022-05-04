import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Modal } from 'react-bootstrap';
import { Loading, NoResult } from "../Loading";
import useIsMobile from '../useIsMobile';

import { FaSpotify } from 'react-icons/fa';
import { BsPlayCircleFill } from 'react-icons/bs';

export default function ResultSpotify(props) {
    const { spotifyApi, show, handleClose, 
            trackName, trackArtistId, trackArtist, trackNameReal } = props;
    const [resultSpotify, setResultSpotify] = useState([])
    const [loading, setLoading] = useState(false);
    const screenSize = useIsMobile()

    function collectedTrack(trackList) {
      let trackArray = []
      for (let i = 0; i < trackList.length; i++) { 
          let trackInfo = {}
          trackInfo.img = trackList[i].album.images[0].url
          trackInfo.artist = trackList[i].artists[0].name
          trackInfo.name = trackList[i].name
          trackInfo.url = trackList[i].external_urls.spotify
          trackArray.push(trackInfo)
      }
      setResultSpotify(trackArray)
    }
    
    useEffect(() => {
        if (!window.localStorage.getItem("accessToken") && !spotifyApi) return
          spotifyApi.setAccessToken(window.localStorage.getItem("accessToken"))
          console.log("Access token @result-spotify")

          async function getSearchTrack() {
            try {
              setLoading(true)
              const result = await spotifyApi.searchTracks('track:'+ trackName + ' artist:' + trackArtistId ,{ limit: 5 }) //query artist EN
              const trackList = result.body.tracks.items
              if (trackList.length > 0) {
                collectedTrack(trackList)
              } else {
                const result = await spotifyApi.searchTracks('track:'+ trackName + ' artist:' + trackArtist ,{ limit: 5 }) //query artist JP
                const trackList = result.body.tracks.items
                if (trackList.length > 0) {
                  collectedTrack(trackList)
                } else {
                  const result = await spotifyApi.searchTracks(trackName ,{ limit: 5 }) //query only track name
                  const trackList = result.body.tracks.items
                  collectedTrack(trackList)
                }
              }
              setLoading(false)
            } catch (err) {
              console.log(err)
            }
          }
          getSearchTrack()
    }, [trackArtist, trackName, trackArtistId]);

    return (
      <Modal  
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show} onHide={handleClose} 
        animation={false}
      > 
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center">
            <div className="banner">
                <span id="spotify-icon-title"><FaSpotify />&nbsp;</span>
                <div className="d-block">
                  <strong>{trackNameReal}</strong><br/>
                  <span className="gray-text"> {trackArtist}</span>
                </div>
            </div>
          </Modal.Title>
        </Modal.Header> 

        <Modal.Body id="result">
        {loading ? ( 
          <Loading />
        ) : ( 
        <>
        <div id="result-title">
          <span lang="th">ผลการค้นหาจาก Spotify</span>
        </div>
        {resultSpotify.length > 0 ? 
          (
            <Row >
              {resultSpotify.slice(0, 5).map((track, i) => {
                return (
                  <Col lg={12} key={i}>
                    <Card className='spotify'>
                      <Card.Body>
                        <Row className="items-center">
                            <Col xs={9} md={10} className="items">
                              <Card.Img src={track.img} alt=''></Card.Img>
                              <Container className="d-block">
                                <Card.Title>{track.name}</Card.Title>
                                <Card.Text>{track.artist}</Card.Text> 
                              </Container>
                            </Col>    
                            <Col xs={3} md={2} className="box-icon" 
                              style={(screenSize) ? { zoom: '80%' } : { zoom: '100%' }}>
                              <a href={track.url} target="_blank" rel="noopener noreferrer"> 
                                <BsPlayCircleFill className="icon"/>
                              </a>
                            </Col>               
                        </Row> 
                      </Card.Body>
                    </Card> 
                  </Col>    
                )
              })}
            </Row> 
        )
        : (<NoResult/>)
        }
        </>)
        }  
        </Modal.Body>
        </Modal>
    )
};
