import React, { useState } from "react";
import ResultSearch from "./ResultSearch";
import ResultData from "./ResultData";
import { Modal, ListGroup } from 'react-bootstrap';
import { FaSpotify } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { SpotifyLoadingPopup } from "../Loading";


const SPOTIFY_ICON = { marginBottom: 2, fontSize: 20, }
const spotifyIcon = <FaSpotify style={SPOTIFY_ICON}/>
const spotifyButton =
    <div id="spotify-btn" className="font-small">
      <a href={"https://open.spotify.com/"} target="_blank" rel="noopener nore">
        <button id="spotify-open">
          <FaSpotify className="spotify-icon"/>
          Open Spotify
        </button>
      </a>
    </div>

export default function ResultAllModal(props) {
    const { show, handleClose, dataTrack, loading } = props;
    const typing = dataTrack.name;
    const searchArtist = dataTrack.artists;
    const trackImage = dataTrack.image;
    const [selectedSearch, setSelectedSearch] = useState(false);

    function searchButton() { 
      return (
          <div id="kashify-btn">
            <button onClick={() => setSelectedSearch(true)}>
              <FiSearch className="kashify-icon"/> Kashify
            </button>
          </div>
      )
    }

    function isImage() {
      if (!trackImage) return <span id="spotify-icon-title"><FaSpotify />&nbsp;</span>
        return <img src={trackImage} alt="song image"/>
    }

    return (
        <Modal  
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show} onHide={handleClose} 
            animation={false}
        > 
        <Modal.Header closeButton id="result-all">
          <Modal.Title className="d-flex align-items-center">
            {loading ?  
              <SpotifyLoadingPopup/>:
              <>
              {(typing&&searchArtist) ?
                <div className="banner">
                  {isImage()}
                  <div className="d-block">
                    <strong>{typing}</strong><br/>
                    <span className="black-text"> {searchArtist}</span><br/>
                    {!props.openResult && searchButton()}
                  </div>
                </div>
                : 
                <div lang="th" id="error-head">
                  <span>
                    ขออภัย พบข้อผิดพลาด 🙇‍♀️
                  </span>
                </div>
              }
              </> 
            }
    
          </Modal.Title>
        </Modal.Header>

        {(!loading) &&
        <>
          {(typing&&searchArtist) ?
            <>
            {(selectedSearch || props.openResult) &&
              <Modal.Body id="result">
                <div id="result-title">
                  <span lang="th">ผลการค้นหาจาก Kashify</span>
                </div>
                <ResultData src="artists" searchTerm={searchArtist.toLowerCase()} spotify={true} />
                <ResultSearch searchTerm={typing} filter={'spotify'} searchArtist={searchArtist} />
              </Modal.Body>
            }
            </>
            :
            <Modal.Body lang="th" id="error-body">
              <ListGroup variant="flush">
                <ListGroup.Item className="mb-3">
                  <span>
                    ตอนนี้ยังไม่ได้เปิดเพลงผ่าน
                    <strong> {spotifyIcon} Spotify </strong> นะคับ
                  </span>
                  <br/>
                  <span className="open-spotify">
                    กรุณาเปิดเพลงฟังก่อนนะคับ กดเปิดได้ทางนี้เลย! &nbsp; {spotifyButton}
                  </span> 
                </ListGroup.Item>
                <ListGroup.Item>
                  <span>หรือระบบอาจเกิดข้อผิดพลาดขึ้น กรุณาโหลดหน้าเว็บไซต์ใหม่หรือเข้าสู่ระบบผ่าน 
                        <strong> {spotifyIcon} Spotify </strong> 
                        ใหม่อีกครั้งด้วยนะคับ
                  </span>
                </ListGroup.Item>
              </ListGroup>
            </Modal.Body>
          }
        </>
        }        
        </Modal>
    );
}
