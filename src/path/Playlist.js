import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Loading, SpotifyTokenExpired } from "../component/Loading";
import useIsMobile from '../component/useIsMobile';
import ResultAllModal from '../component/Search/ResultAllModal';

import { FiSearch } from 'react-icons/fi';
import { BsPlayCircleFill } from 'react-icons/bs';
import { FaSpotify } from 'react-icons/fa';

function Playlist ({spotifyApi}){

    const [playlists, setPlaylists] = useState([]);
    const [playlistsInfo, setPlaylistsInfo] = useState({})
    const [loading, setLoading] = useState(false);
    const [isTokenExpired, setIsTokenExpired] = useState(false);
    const { codePlaylist } = useParams();
    const screenSize = useIsMobile()

    const [keySearch, setKeySearch] = useState({}); 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
      if (!window.localStorage.getItem("accessToken")) return setIsTokenExpired(true)
      if (!window.localStorage.getItem("accessToken") && !spotifyApi && codePlaylist) return
        spotifyApi.setAccessToken(window.localStorage.getItem("accessToken"))
        console.log("Access token @result-spotify")

        async function getPlaylist() {
          try {
            setLoading(true)
            const result = await spotifyApi.getPlaylist(codePlaylist)
            const track_item = result.body.tracks.items
            const all_tracks = [];
            track_item.forEach(function(track, index) {
              var track = {};
              track["name"] = result.body.tracks.items[index].track.name;
              track["artists"] = result.body.tracks.items[index].track.artists[0].name;
              track["image"] = result.body.tracks.items[index].track.album.images[0].url;
              track["url"] = result.body.tracks.items[index].track.external_urls.spotify;
              all_tracks.push(track);
            })
            //console.log(result.body)
            setPlaylistsInfo({name:result.body.name, 
                              description: result.body.description,
                              url: result.body.external_urls.spotify
                            })
            setPlaylists(all_tracks)
            setLoading(false)
          } catch (err) {
            console.log(err)
          }
        }
        getPlaylist()
    }, [ codePlaylist ]);

  return (
    <Container className="pages">
      <Row>

        <Col xl={4} >
          <div className="header-left">
            <h1 className="font-bold">SPOTIFY PLAYLIST</h1>
            <a href={playlistsInfo.url} target="_blank" rel="noopener noreferrer">
              <h2 className="font-bold playlist-name"><FaSpotify/> {playlistsInfo.name}</h2>
            </a>
            <span className="gray-text">{playlistsInfo.description}</span>
          </div>
          <br/><br/>
        </Col>

        <Col xl={8} >
        {isTokenExpired ? <SpotifyTokenExpired /> :
        <>
          {loading ? (          
            <Loading />
          ) : ( 
            <div>
            <Row>
              {playlists.map((track, i) => {
                return (
                  <Card key={i} className='spotify'>
                      <Card.Body>

                        <Row className="items-center">
                          <Col xxs={10} xs={10} md={10}>
                            <div className="d-flex justify-content-left align-items-center">
                              <Card.Img src={track.image} alt=''></Card.Img>
                              <Container className="d-block">
                                <Card.Title>{track.name}</Card.Title>
                                <Card.Text>{track.artists}</Card.Text> 
                              </Container>
                            </div>
                          </Col> 

                          <Col xxs={2} xs={2} md={2}>
                              <div className="d-flex justify-content-end align-items-center"
                                style={(screenSize) ? { zoom: '70%' } : { zoom: '100%' }}>
                                <Card.Link href={track.url} target="blank">
                                  <div style={{marginRight:10}}>
                                    <BsPlayCircleFill className="icon"/>  
                                  </div>
                                </Card.Link>
                            
                                <button id="search-kashify" 
                                  onClick={ () => {
                                    setKeySearch({name:track.name, 
                                                  artists:track.artists,
                                                  image:track.image
                                                });
                                    handleShow();
                                }}>
                                  <FiSearch /> 
                                </button>
                              </div>
                          </Col>
                        </Row> 

                      </Card.Body>
                  </Card>        
                )
              })} 
            </Row>
            </div>   
          )}
        </>
        }
        </Col>
        {keySearch &&
          <>      
            <ResultAllModal  dataTrack={keySearch} show={show} handleClose={handleClose} openResult={true} />
          </>
        }
    </Row>
    </Container>
  );
}

export default Playlist;
