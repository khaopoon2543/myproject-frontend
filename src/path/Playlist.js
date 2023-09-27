import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import { backendSrc } from "../component/backendSrc";
import { Container, Row, Col, Card, DropdownButton, Dropdown } from 'react-bootstrap';
import { Loading, NoLoginSpotify } from "../component/Loading";
import useIsMobile from '../component/useIsMobile';
import ResultAllModal from '../component/Search/ResultAllModal';
import '../component/Spotify/SpotifyEmbed.css';
import './Playlist.css';

import { FiSearch } from 'react-icons/fi';
import { BsPlayCircleFill } from 'react-icons/bs';
import { FaSpotify } from 'react-icons/fa';

import { PlaylistItems } from '../component/Spotify/PlaylistItems';
import { VscCircleFilled } from 'react-icons/vsc';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { PiPlaylistBold } from 'react-icons/pi';


const KASHIFY = <span className="font-semi-bold"> Kashify </span>
const SPOTIFY = <span className="font-semi-bold"><FaSpotify/> Spotify </span>

const btnDetail =
  <div className="description" id="btn-detail" lang="th"> 
    <p className="radius">
      <span className="d-flex align-items-center" style={{marginBottom: '10px'}}>
        <BsPlayCircleFill style={{fontSize: '40px'}}/> &nbsp;&nbsp;
        เปิดเพลงฟังบน &nbsp; {SPOTIFY}
      </span>
      <span className="d-flex align-items-center">
        <button className="icon" id="search-kashify"><FiSearch /></button> &nbsp;&nbsp;
        ค้นหาเพลงใน &nbsp; {KASHIFY}
      </span>
    </p>
  </div>

function Playlist (){
  const [accessToken, setAccessToken] = useState('');

  const { playlistCode } = useParams();
  const [playlists, setPlaylists] = useState([]);
  const [playlistsName, setPlaylistsName] = useState('')
  const [playlistsImg, setPlaylistsImg] = useState('')

  const [loading, setLoading] = useState(false);
  const screenSize = useIsMobile()
  const [selectedTrack, setSelectedTrack] = useState('');

  const [isOpenAllPLaylists, setIsOpenAllPLaylists] = useState(!screenSize ? true : false);
  const [keySearch, setKeySearch] = useState({}); 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (playlistCode) {
    const clientID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
    const base64Credentials = btoa(`${clientID}:${clientSecret}`);
    axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${base64Credentials}`,
        },
    })
    .then((response) => {
        setAccessToken(response.data.access_token);
    })
    .catch((error) => {
        console.error('Error obtaining access token:', error);
    });
    }
  }, [playlistCode]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    // Fetch featured playlists when the access token changes
    if (accessToken && playlistCode) {
    axios
        .get( `https://api.spotify.com/v1/playlists/`+ playlistCode, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        })
        .then((response) => {
        //console.log(response.data);
        setPlaylists(response.data.tracks.items);
        setPlaylistsName(response.data.name);
        setPlaylistsImg(response.data.images[0].url);

        setLoading(false);
        })
        .catch((error) => {
        console.error('Error fetching featured playlists:', error);
        });
    } return () => { isMounted = false; };
  }, [accessToken]);

  const PLAYLISTS = 
    <div className="description" id="playlist-selection">
      <p>
          {PlaylistItems.map((item, index) => {
              return (
              <Link to={item.url} key={index}>
                  <span className="font-semi-bold pink-link"> 
                      <VscCircleFilled id="icon-spotify"/> 
                      {item.title}
                  </span>
              </Link>
              )}
          )}
      </p>
    </div>
  const SPOTIFY_PLAYLISTS = 
    <h2 className="font-bold" style={{marginBottom:0}}>  
      <FaSpotify style={{marginTop:'-5px'}}/> Spotify Playlists 
    </h2>

  return (
  <Container fluid id="playlist">
    <Container className="pages">
      <Row>
        <Col lg={5} xl={5} xxl={5}>
          <div className="header-left">
            <div className="head-spotify-playlists">
              {SPOTIFY_PLAYLISTS} &nbsp;&nbsp; 
            </div>   
   
            <div lang="jp">
              <div className="title-playlist">
                <img src={playlistsImg}  alt=''/>
                <h3>
                  {playlistsName} 
                </h3>
            
              </div>

              {(selectedTrack!='') ?
                <div fluid className="spotify-embed-container" id="spotify-playlists">
                  <iframe
                    title="spotify-embed"
                    src={`https://open.spotify.com/embed/track/${selectedTrack}?utm_source=generator`}
                    width="100%"
                    height="152"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="spotify-embed"
                  />  
                </div>
                :
                btnDetail
              }

              <button   onClick={() => setIsOpenAllPLaylists(!isOpenAllPLaylists)} 
                        id="toggle-spotify-playlist"
                        className={!isOpenAllPLaylists ? "close" : ""}
              >
                <PiPlaylistBold className="icon-spotify-playlist"/> All Playlists
                {!isOpenAllPLaylists ? 
                  <TiArrowSortedDown  className="icon-playlists"/>
                  : <TiArrowSortedUp  className="icon-playlists"/>
                }
              </button>

              {isOpenAllPLaylists && PLAYLISTS}

            </div>

          </div>
        </Col>

        <Col lg={7} xl={7} xxl={7}>
          {loading ? (          
            <Loading />
          ) : ( 
            <div  lang="jp">
              
              {playlists.map((item, i) => {
                const track = item.track;
                const albumImg = track.album.images[2].url
                const trackName = track.name
                const trackArtists = track.artists[0].name
                const trackUrl = track.external_urls.spotify
                const trackID = track.id

                return (
                  <Card key={i} className='spotify'>
                      <Card.Body>

                        <Row className="items-center">
                          <Col xxs={9} xs={10} md={10}>
                            <div className="d-flex justify-content-left align-items-center">
                              <Card.Img src={albumImg} alt=''></Card.Img>
                              <Container className="d-block">
                                <Card.Title>{trackName}</Card.Title>
                                <Card.Text>{trackArtists}</Card.Text> 
                              </Container>
                            </div>
                          </Col> 

                          <Col xxs={3} xs={2} md={2}>
                              <div className="d-flex justify-content-end align-items-center"
                                style={(screenSize) ? { zoom: '80%' } : { zoom: '100%' }}>

                                {!screenSize ?
                                  <button onClick={() => setSelectedTrack(trackID)}>
                                    <BsPlayCircleFill className="icon" style={{marginRight:10}}/>  
                                  </button>
                                :
                                  <Card.Link href={trackUrl} target="blank" style={{marginRight:10}}>
                                    <BsPlayCircleFill className="icon"/>  
                                  </Card.Link>
                                }
                            
                                <button id="search-kashify"
                                  onClick={ () => {
                                    setKeySearch({name: trackName, 
                                                  artists: trackArtists,
                                                  image: albumImg
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
  </Container>  
  );
}

export default Playlist;
