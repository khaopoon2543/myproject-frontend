import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Modal } from 'react-bootstrap';
import TagLevels from "../Levels/TagLevels";
import { checkSpecialChars } from '../Spotify/checkSpecialChars'
import { ArtistLink, SeriesLink } from "../linkPath";
import { songImageLyric, noSongImageLyric, noSongImageSearch, isImage } from "../ImageSong/ImageSongFunction";
import './Video.css';
import VideoPlayer from './VideoPlayer';
import axios from 'axios';
import { Loading } from "../Loading";
import useIsMobileLG from '../useIsMobileLG';

import { FaSpotify } from 'react-icons/fa';
import { SiApplemusic } from 'react-icons/si';
import { TbBrandYoutubeFilled } from 'react-icons/tb';
import { AiFillCloseCircle } from 'react-icons/ai';
import { PiPlayBold } from 'react-icons/pi';
import { TbHeadphones, TbVideo } from 'react-icons/tb';

function isSingers(titleInfo) {
    let text = []
      titleInfo.singers.map((singer, i) => {
        text.push(
          <>
          {singer.id ?
            <Link to={ArtistLink(singer.id)} key={i}>
              <button id="singer">{singer.name}</button>
            </Link>
          : 
            <button id="singer" className="no-id" key={i}>{singer.name}</button>
          }
          </>
        );
      })
      return text
}
function isSeries(titleInfo) {
    return (
        <>
          <span id="head">
            {titleInfo.series_info.type} 
          </span>
          <Link to={SeriesLink(titleInfo.series.id)}>
              <button id="artist">{titleInfo.series_info.name}</button>
          </Link> 
          <span id="gray-text">
              {titleInfo.series.theme}
          </span>           
        </>
    )
}
function checkFeat(titleName) { //選んでくれてありがとう。 feat. 榎本虎太朗(花江夏樹)・瀬戸口雛(麻倉もも)
  const re = new RegExp('^(.+).(feat..+)', 'i'), matches = titleName.match(re);
  if (matches) {
    var titleList = titleName.match(re)
    return titleList
  } else {
    return titleName
  }
}
function buttonSearchSpotify(title_name, artist_name) {
    const title = checkSpecialChars(title_name)
    const artist_id = artist_name.replace(/-/," ")
    return (
      <div className="info text-left" id="search">
       <div className="d-flex align-items-center">
        <span id="head" className="media" lang="th">
          <TbHeadphones/> ฟังเพลง
        </span>
        <div id="spotify-btn">
          <a href={`https://open.spotify.com/search/${title}%20${artist_id}`} target="_blank" rel="noopener nore">
          <button id="toggle-spotify" className="search-spotify" lang="th">
            <FaSpotify className="spotify-icon"/>
            Spotify 
          </button> 
          </a>
        </div>
        <div id="spotify-btn">
          <a href={`https://music.apple.com/us/search?term=${title}%20${artist_id}`} target="_blank" rel="noopener nore">
          <button id="toggle-spotify" className="search-apple" lang="th">
            <SiApplemusic className="spotify-icon"/>
            Apple Music 
          </button> 
          </a>
        </div>
       </div>
      </div>
    )
}
function ResultEmbed(trackID) {
    return (
      <Container fluid className="video-container">
        <Container className="text-left">
        <iframe
          title="spotify-embed"
          src={`https://open.spotify.com/embed/track/${trackID}?utm_source=generator`}
          width="100%"
          height="152"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="spotify-embed"
        />  
        </Container>
      </Container>
    )
}

/* -------------------------------------------------------------------------------------------------------------------------------- */

function TitleLyrics(props) {
  const screenSize = useIsMobileLG();

  const titleInfo = props.titleInfo
  const trackArtist = props.trackArtist
  const resultCheckTitle = titleInfo.name && checkFeat(titleInfo.name)

  const title_name = resultCheckTitle instanceof Array ? resultCheckTitle[1] : titleInfo.name
  const title_img = titleInfo.pic
  const title_artist_name = titleInfo.artist

  // -------------------------- VIDEO YOUTUBE -------------------------- //
  const setVideoVisible = props.setVideoVisible;
  const videoVisible = props.isOpenVideo; //false
  const embed_code = titleInfo.mv // const embed_code = '__HPQPjSdzw' //'PVrp_lNkoYE' '3vXqdNci_z8'
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isVideoID, setIsVideoID] = useState(embed_code ? embed_code : '');
  const [loadingVideo, setLoadingVideo] = useState(false);

  const toggleVideo = () => {
    setVideoVisible(!videoVisible);
    setSelectedTrack('');
  }

  const keyVideoID = `${title_name + title_artist_name}`;
  const videoIDLocal = localStorage.getItem(keyVideoID);

  useEffect(() => {
    let isMounted = true;
    setLoadingVideo(true);
    
    if (isVideoID) {
      setLoadingVideo(false);
    }
    else if (videoIDLocal) {
      setIsVideoID(videoIDLocal);
      setLoadingVideo(false);
    }
    else if (!videoIDLocal && videoVisible && !embed_code ) {
      const youtubeApiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

      axios.get("https://www.googleapis.com/youtube/v3/search", {
            params: {
              key: youtubeApiKey,
              type: "video",
              q: title_name + title_artist_name,
              maxResults: 1
            }
          })
            .then((response) => {
              console.log('collected video id from youtube api');
              const videoId = response.data.items[0].id.videoId;
              setIsVideoID(videoId);
              localStorage.setItem(keyVideoID, videoId);
              setLoadingVideo(false);
            })
            .catch(error => { console.log(error) });
    } return () => { isMounted = false; };
  }, [videoVisible]);

  useEffect(() => {
      // Function to remove the item from local storage when the window is closed
      const handleBeforeUnload = () => { localStorage.clear(); };
      // Attach the event listener
      window.addEventListener('beforeunload', handleBeforeUnload);
      // Cleanup: Remove the event listener when the component unmounts
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
  }, []);


  // -------------------------- SPOTIFY -------------------------- //
  const [accessToken, setAccessToken] = useState('');
  const [tracksList, setTracksList] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loadingSpotify, setLoadingSpotify] = useState(false);

  const handleClose = () => setShowModal(false);

  function toggleSelectedTrack(trackID) {
    setSelectedTrack(trackID);
  }
  const toggleSpotify = () => {
    setShowModal(!showModal);
    setVideoVisible(false); 
  }

  useEffect(() => {
    if (!screenSize && showModal) {
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
  }, [showModal]);

  useEffect(() => {
    let isMounted = true;
    setLoadingSpotify(true);
    // Fetch featured playlists when the access token changes
    if (!screenSize && accessToken && showModal) {
      axios
        .get( `https://api.spotify.com/v1/search?q=` 
              + checkSpecialChars(title_name) + '+' + title_artist_name
              + `&type=track&limit=7&market=jp`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setTracksList(response.data.tracks.items)
          console.log(response.data.tracks.items)
          setLoadingSpotify(false);
        })
        .catch((error) => {
          console.error('Error fetching featured playlists:', error);
        });
    } return () => { isMounted = false; };
  }, [accessToken]);
  
  return (
    <>
    <Container className="titleLyric" fluid>
      <Container fluid="md" className="title-info">
        <Row>
          <Col md={5} lg={4} xl={3} className="album-img">
            {title_img ? songImageLyric(title_img) : noSongImageLyric()}
          </Col>
          <Col md={7} lg={8} xl={9}>
            <Container className="text-left">  
              {titleInfo.reading &&
                <span className="gray-text" style={{fontSize: 14, marginLeft: 5}}>
                  {titleInfo.reading}
                </span>
              }
              {resultCheckTitle instanceof Array ? //if return titleList (is feat. in title)
                <>
                  <h1 className="font-semi-bold">{resultCheckTitle[1]}</h1>
                  <h5 className="font-semi-light">{resultCheckTitle[2]}</h5>
                </>
              : 
                  <h1 className="font-semi-bold">{title_name}</h1>
              }
              <div className="info" style={{marginTop: 20}}>
                <span id="head" lang="th">ศิลปิน</span>
                <Link to={ArtistLink(trackArtist)}>
                  <button id="artist">{title_artist_name}</button>
                </Link>
                {(titleInfo.singers?.length>0) &&  
                  isSingers(titleInfo)
                }
              </div> 

              {titleInfo.series_info && 
                <div className="info">
                  { isSeries(titleInfo) }
                </div>
              }

              <div className="info" id="readability">
                <span lang="th" id="head">
                  ความยากง่าย 
                </span>
                <div className="tagLevel" id="title-lyric">
                  <TagLevels levelScore={titleInfo.readability_score}/>
                </div>
              </div>
            
            {/*resultCheckTitle instanceof Array ?
              buttonSearchSpotify(resultCheckTitle[1], trackArtist)
              :buttonSearchSpotify(title_name, trackArtist)
            */}

            {(!screenSize) ?
            <div className="info text-left" id="search">
              <div className="d-flex align-items-center">
                <span id="head" className="media" lang="th">
                  <TbHeadphones/> ฟังเพลง
                </span>
                <div id="spotify-btn">
                  <button id="toggle-spotify" lang="th" onClick={toggleSpotify}>
                    <FaSpotify className="spotify-icon" id='search-kashify'/>
                    ค้นหาเพลง
                  </button>
                </div>
                <div id="spotify-btn">
                  {selectedTrack &&                  
                    <button id="toggle-spotify" lang="th" onClick={() => setSelectedTrack('')} className="close">
                      <AiFillCloseCircle className="spotify-icon"/>
                      ปิดเพลง
                    </button>
                  } 
                </div>
              </div>
            </div>
            :
            buttonSearchSpotify(title_name, title_artist_name)     
            }

            <div className="info text-left" id="search">
              <div className="d-flex align-items-center">
                <span id="head" className="media" lang="th">
                  <TbVideo/> คลิปวีดีโอเพลง
                </span>
                <div id="spotify-btn">
                  {!videoVisible ?
                      <button id="toggle-video" lang="th" onClick={toggleVideo}>
                        <TbBrandYoutubeFilled className="spotify-icon"/>
                        เปิดคลิปวีดีโอ
                      </button>
                    :
                      <button id="toggle-video" className="close" lang="th" onClick={toggleVideo}>
                        <AiFillCloseCircle className="spotify-icon"/>
                        ปิดคลิปวีดีโอ
                      </button>
                  }
                </div>
              </div>
            </div>

            </Container>
          </Col>
        </Row>   
        
      </Container>
    </Container>

    
    {(showModal&&tracksList!=[]) && 
      <Modal  
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal} onHide={handleClose} 
        animation={false}
      > 
        <Modal.Header closeButton id="result-all">
          <Modal.Title className="d-flex align-items-center">
            {(tracksList) &&
              <div className="banner">
                {title_img ? isImage(title_img) : noSongImageSearch()}
                <div className="d-block" lang="jp">
                  <strong>{title_name}</strong><br/>
                  <span className="black-text"> {title_artist_name}</span><br/>
                </div>
              </div>
            }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body id="result">
          <div className="tag-result mb-2">
            <span id="title">ผลการค้นหาเพลงจาก </span>
            <div id="spotify-btn">
              <span id="by">
                <FaSpotify className="spotify-icon"/> Spotify
              </span>
            </div>
          </div>

          {loadingSpotify ? ( <Loading /> ) :
            (<>
              {tracksList.map((track, i) => {
                const album_img = track.album.images[2].url
                const artist_name = track.artists[0].name
                const track_name = track.name
                return (
                  <Card key={i} className='spotify spotify-search'>
                    <Card.Body>
                      <Row className="items-center">
                        <Col xxs={9} xs={10} md={10}>
                          <div className="d-flex justify-content-left align-items-center">
                            <Card.Img src={album_img} alt=''></Card.Img>
                            <Container className="d-block">
                              <Card.Title>{track_name}</Card.Title>
                              <Card.Text>{artist_name}</Card.Text> 
                            </Container>
                          </div>
                        </Col>
                        <Col xxs={3} xs={2} md={2}>
                          <div className="d-flex justify-content-end align-items-center">
                            <button id="search-kashify" onClick={() => {toggleSelectedTrack(track.id); setShowModal(false)}}>
                              <PiPlayBold /> 
                            </button>
                          </div>
                        </Col> 
                      </Row>
                    </Card.Body>
                  </Card>
                )
              } ) }
            </>)
          }
        </Modal.Body>
      </Modal>
    }

    <Container fluid className="spotify-embed-container">
        {(selectedTrack!='') && 
              <Container>
                <iframe
                  title="spotify-embed"
                  src={`https://open.spotify.com/embed/track/${selectedTrack}?utm_source=generator`}
                  width="100%"
                  height="152"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="spotify-embed"
                />  
              </Container>
        }   
    </Container>

    <Container fluid className="video-container">
      <Container>
        {(videoVisible&&isVideoID) && 
          <>
          {loadingVideo ? ( <Loading /> ) :
            ( <VideoPlayer setHasLoaded={()=>{setHasLoaded()}} videoId={isVideoID} /> )
          }
          </>
        }
      </Container>
    </Container>

    </>
  )
};

export default TitleLyrics
