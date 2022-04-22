import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Loading, NoResult } from "../Loading";
import useIsMobile from '../useIsMobile';

import { BsPlayCircleFill } from 'react-icons/bs';

export default function ResultSpotify({spotifyApi}) {
    const { state } = useLocation();
    const { trackName, trackArtistId, trackArtist, trackNameReal } = state;
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
      let isMounted = true; 
      fetchData();
      return () => { isMounted = false };

      function fetchData() { 
        if (!trackArtist && !trackName && !trackArtistId) return
        if (!window.localStorage.getItem("accessToken") && !spotifyApi) return
          spotifyApi.setAccessToken(window.localStorage.getItem("accessToken"))
          console.log("Access token @result-spotify")

          async function getSearchTrack() {
            try {
              setLoading(true)
              const result = await spotifyApi.searchTracks('track:'+ trackName + ' artist:' + trackArtistId) //query artist EN
              const trackList = result.body.tracks.items
              if (trackList.length > 0) {
                collectedTrack(trackList)
              } else {
                const result = await spotifyApi.searchTracks('track:'+ trackName + ' artist:' + trackArtist) //query artist JP
                const trackList = result.body.tracks.items
                if (trackList.length > 0) {
                  collectedTrack(trackList)
                } else {
                  const result = await spotifyApi.searchTracks(trackName) //query only track name
                  const trackList = result.body.tracks.items
                  collectedTrack(trackList)
                }
              }
              setLoading(false)
            } catch (err) {
              console.log(err)
            }
          }
          if (isMounted) {
            getSearchTrack()
          }
      }
    }, [trackArtist, trackName, trackArtistId]);

    return (
        <Container style={{ marginTop: 50, marginBottom: 50 }}>  
          <Container style={{ textAlign: 'left' }}>
            <span>Spotify Search Results</span>
            <h1>{trackNameReal}</h1>  
            <div className="tagLevel" id="title-lyric">
              <p className='subtitle' id="sub-data">
                {trackArtist}
              </p> 
            </div>
            <br/>
          </Container>
        {loading ? ( 
          <Loading />
        ) : ( 
        <>
        {resultSpotify.length > 0 ? 
          (
            <Row >
              {resultSpotify.map((track, i) => {
                return (
                  <Col lg={12} key={i}>
                    <Card className='spotify'>
                      <Card.Body>
                        <Row className="items-center">
                            <Col xs={9} md={10}>
                              <div className="d-flex justify-content-left align-items-center">
                                <Card.Img src={track.img} alt=''></Card.Img>
                                <Container className="d-block">
                                  <Card.Title>{track.name}</Card.Title>
                                  <Card.Text>{track.artist}</Card.Text> 
                                </Container>
                              </div>
                            </Col>    
                            <Col xs={3} md={2} className="box-icon" 
                              style={(screenSize) ? { zoom: '80%' } : { zoom: '100%' }}>
                              <a href={track.url} target="_blank">
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
        </Container>
    )
};
