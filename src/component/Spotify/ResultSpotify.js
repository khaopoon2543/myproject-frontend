import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Modal } from 'react-bootstrap';
import { Loading, NoResult, SpotifyErrorPopup } from "../Loading";
import useIsMobile from '../useIsMobile';

import { FaSpotify } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { BsPlayCircleFill } from 'react-icons/bs';

export default function ResultSpotify(props) {
    const { spotifyApi, show, handleClose, 
            trackName, trackArtistId, trackArtist, trackNameReal } = props;
    const [resultSpotify, setResultSpotify] = useState([])
    const [loading, setLoading] = useState(false);
    const [isTokenExpired, setIsTokenExpired] = useState(false);
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
      return trackList
    }
    
    useEffect(() => {
        if (!window.localStorage.getItem("accessToken")) return setIsTokenExpired(true)
        if (!window.localStorage.getItem("accessToken") && !spotifyApi) return
          
        let isMounted = true;
        setIsTokenExpired(false)

        setLoading(true)
        spotifyApi.setAccessToken(window.localStorage.getItem("accessToken"))
        console.log("Access token @result-spotify")
        getSearchTrack().then(() => {
          if (isMounted) {
            setLoading(false);
          }
        });
        return () => { isMounted = false; };

          async function getSearchTrack() {
            try {
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
            } catch (err) {
              console.log(err)
            }
          }
    }, [trackArtist, trackName, trackArtistId]);

    if (isTokenExpired) return <SpotifyErrorPopup show={show} handleClose={handleClose} isTokenExpired={true}/>
    return (
      <div className="App">
      <Modal  
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show} onHide={handleClose} 
        animation={false}
      > 
        <Modal.Header closeButton lang="jp">
          <Modal.Title className="d-flex align-items-center">
            <div className="banner">
                <FaSpotify id="title-popup"/>
                <div className="d-block">
                  <strong>{trackNameReal}</strong><br/>
                  <span className="black-text"> {trackArtist}</span>
                </div>
            </div>
          </Modal.Title>
        </Modal.Header> 

        <Modal.Body id="result">
        {loading ? ( 
          <Loading />
        ) : ( 
        <>
        <div className="tag-result mb-2">
          <span id="title">ผลการค้นหาจาก</span>
          <span id="by">Spotify</span>
        </div>
        {resultSpotify.length > 0 ? 
          (
            <div lang="jp">
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
                              style={(screenSize) ? { zoom: '90%' } : { zoom: '100%' }}>
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
            </div> 
        )
        : (<NoResult/>)
        }
        </>)
        }  
        </Modal.Body>
        </Modal>
        </div>
    )
};
