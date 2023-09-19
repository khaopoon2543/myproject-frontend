import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import TagLevels from "../Levels/TagLevels";
import { checkSpecialChars } from '../Spotify/checkSpecialChars'
import { FaSpotify } from 'react-icons/fa';
import { SiApplemusic } from 'react-icons/si';
import { ArtistLink, SeriesLink } from "../linkPath";
import { ImPlay } from 'react-icons/im';
import { AiFillCloseCircle } from 'react-icons/ai';
import './Video.css';

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
            <span id="pink">{titleInfo.series.theme}</span>
          </span>
          <Link to={SeriesLink(titleInfo.series.id)}>
              <button id="artist">{titleInfo.series_info.name}</button>
          </Link>
     
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
function buttonSearchSpotify(searchTitle, trackArtist) {
    const title = checkSpecialChars(searchTitle)
    const artist_id = trackArtist.replace(/-/," ")
    return (
      <Container className="info text-left" id="search">
       <div className="d-flex align-items-center">
        <span id="head" lang="th">ค้นหาเพลง</span>
        <div id="spotify-btn">
          <a href={`https://open.spotify.com/search/${title}%20${artist_id}`} target="_blank" rel="noopener nore">
          <button id="spotify-search" lang="th">
            <FaSpotify className="spotify-icon"/>
            Spotify 
          </button> 
          </a>
        </div>
        <div id="spotify-btn">
          <a href={`https://music.apple.com/us/search?term=${title}%20${artist_id}`} target="_blank" rel="noopener nore">
          <button id="spotify-search" lang="th">
            <SiApplemusic className="spotify-icon"/>
            Apple Music 
          </button> 
          </a>
        </div>
       </div>
      </Container>
    )
}

function SongImage() { // width="761" height="426"
  const img_url="https://www.lyrical-nonsense.com/wp-content/uploads/2022/08/HoneyWorks-Kawaii-ne-tte-Iwarechatta-feat-Juri-Hattori-Ayane-Sakura.jpg"
  return (
      <Container className="img-song">
      <img src={img_url} width="761" height="426"/>
      </Container>
  );
}

/* ---------------------------------------------------------------- */

function TitleLyrics(props) {
  const titleInfo = props.titleInfo
  const trackArtist = props.trackArtist
  const setVideoVisible = props.setVideoVisible
  const videoVisible = props.isOpenVideo
  console.log(videoVisible)

  const resultTitle = titleInfo.name && checkFeat(titleInfo.name)
  const embed_code = '__HPQPjSdzw' //'PVrp_lNkoYE' '3vXqdNci_z8'

  const toggleVideo = () => {
    setVideoVisible(!videoVisible); 
  }
  
  return (
    <>
    <Container className="titleLyric" fluid>
      <Container fluid="md">
        <Row>
        <Col md={5} lg={4} xl={3}>
          {SongImage()}
        </Col>
        <Col md={7} lg={8} xl={9}>
        <Container className="text-left">  
          {resultTitle instanceof Array ? //if return titleList (is feat. in title)
            <>
              <h1 className="font-semi-bold">{resultTitle[1]}</h1>
              <h5 className="font-semi-light">{resultTitle[2]}</h5>
            </>
          : 
              <h1 className="font-semi-bold">{titleInfo.name}</h1>
          }
          <div className="info" style={{marginTop: 20}}>
            <span id="head" lang="th">ศิลปิน</span>
            <Link to={ArtistLink(trackArtist)}>
              <button id="artist">{titleInfo.artist}</button>
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
              <span id="pink">{titleInfo.readability_score}</span>
            </span>
            <div className="tagLevel" id="title-lyric">
              <TagLevels levelScore={titleInfo.readability_score}/>
            </div>
          </div>
        </Container>
      
        {resultTitle instanceof Array ?
          buttonSearchSpotify(resultTitle[1], trackArtist)
          :buttonSearchSpotify(titleInfo.name, trackArtist)
        }

        <Container className="info text-left" id="search">
          <div className="d-flex align-items-center">
            <span id="head" lang="th">คลิปวีดีโอเพลง</span>
            <div id="spotify-btn">
              {!videoVisible ?
                  <button id="toggle-video" lang="th" onClick={toggleVideo}>
                    <ImPlay className="spotify-icon"/>
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
        </Container>

        </Col>
        </Row>   
        
      </Container>
    </Container>
 
      {videoVisible && (
        <div className="video-container">
          <iframe
              id="video-frame"
              src={"https://www.youtube.com/embed/"+ embed_code +"?loop=1&playlist=" + embed_code} 
              frameBorder="0" allow="accelerometer; autoplay; clipboard-write;
              encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen>
          </iframe>
        </div>
      )}

    </>
  )
};

export default TitleLyrics
