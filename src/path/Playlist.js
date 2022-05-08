import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Loading, NoLoginSpotify } from "../component/Loading";
import useIsMobile from '../component/useIsMobile';
import ResultAllModal from '../component/Search/ResultAllModal';

import { FiSearch } from 'react-icons/fi';
import { BsPlayCircleFill } from 'react-icons/bs';
import { FaSpotify } from 'react-icons/fa';

const KASHIFY = <span className="font-semi-bold"> Kashify </span>
const SPOTIFY = <span className="font-semi-bold"><FaSpotify/> Spotify </span>

const btnDetail = 
  <div className="description" id="btn-detail"> 
    <h5 className="underline"> ปุ่มกดข้าง ๆ คืออะไร ?</h5>
    <p>
      <div className="d-flex align-items-center" style={{marginBottom: '10px'}}>
        <FaSpotify style={{fontSize: '40px'}}/> &nbsp;&nbsp;
        เปิดเพลงฟังบน &nbsp; {SPOTIFY}
      </div>
      <div className="d-flex align-items-center">
        <button className="icon" id="search-kashify"><FiSearch /></button> &nbsp;&nbsp;
        ค้นหาเพลงใน &nbsp; {KASHIFY}
      </div>
    </p>
  </div>

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
        let isMounted = true;
        setLoading(true)
        spotifyApi.setAccessToken(window.localStorage.getItem("accessToken"))
        console.log("Access token @result-spotify")
        getPlaylist().then((dict) => {
          if (isMounted && dict) {
            setPlaylistsInfo({name:dict.result.body.name, 
                description: dict.result.body.description,
                url: dict.result.body.external_urls.spotify
              })
            setPlaylists(dict.all_tracks)
            setLoading(false);
          } else {
            setIsTokenExpired(true)
          }
        });
        return () => { isMounted = false; };

        async function getPlaylist() {
          try {
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
            return {result, all_tracks}
          } catch (err) {
            console.log(err)
          }
        }

    }, [ codePlaylist ]);

   const buttonOpenSpotify = 
      <div id="spotify-btn">
        <button  id="spotify-search" lang="th">
          <FaSpotify className="spotify-icon"/>
          Open Playlist on Spotify 
        </button> 
      </div>

  if (isTokenExpired) return <NoLoginSpotify />
  return (
    <Container className="pages">
      <Row>
        <Col xl={5} xxl={4}>
          <div className="header-left">
            <div className="tag-series">
              <Link to="/spotify">
                <span id="button-back">  <FaSpotify /> Spotify Playlists </span>
              </Link>   
            </div>

            <div lang="jp">
              <h3 className="title-series"> 
                {playlistsInfo.name} 
                <a href={playlistsInfo.url} target="_blank" rel="noopener noreferrer">
                  {buttonOpenSpotify}
                </a>
              </h3>
              <span className="sub-title-series">{playlistsInfo.description}</span>
            </div>
          </div>
          
        </Col>

        <Col xl={7} xxl={8}>

          {loading ? (          
            <Loading />
          ) : ( 
          <div className="result-search" lang="jp">
           
              {playlists.map((track, i) => {
                return (
                  <Card key={i} className='spotify'>
                      <Card.Body>

                        <Row className="items-center">
                          <Col xxs={9} xs={10} md={10}>
                            <div className="d-flex justify-content-left align-items-center">
                              <Card.Img src={track.image} alt=''></Card.Img>
                              <Container className="d-block">
                                <Card.Title>{track.name}</Card.Title>
                                <Card.Text>{track.artists}</Card.Text> 
                              </Container>
                            </div>
                          </Col> 

                          <Col xxs={3} xs={2} md={2}>
                              <div className="d-flex justify-content-end align-items-center"
                                style={(screenSize) ? { zoom: '80%' } : { zoom: '100%' }}>
                                <Card.Link href={track.url} target="blank" style={{marginRight:10}}>
                                  <BsPlayCircleFill className="icon"/>  
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
          </div>   
          )}

        </Col>

        {keySearch &&
            <ResultAllModal  dataTrack={keySearch} show={show} handleClose={handleClose} openResult={true} />
        }

      </Row>
    </Container>
  );
}

export default Playlist;
