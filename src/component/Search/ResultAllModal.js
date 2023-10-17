import React, { useState } from "react";
import ResultSearch from "./ResultSearch";
import ResultData from "./ResultData";
import { Modal } from 'react-bootstrap';
import { FaSpotify } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { ModalLoading } from "../Loading";


export default function ResultAllModal(props) {
    const { show, handleClose, dataTrack, loading } = props;
    const typing = dataTrack.name;
    const searchArtist = dataTrack.artists;
    const trackImage = dataTrack.image;
    const [selectedSearch, setSelectedSearch] = useState(false);

    function searchButton() { 
      return (
          <div id="kashify-btn" lang="th">
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
              <ModalLoading/>
              :
              <>
              {(typing&&searchArtist) &&
                <div className="banner">
                    {isImage()}
                    <div className="d-block" lang="jp">
                      <strong>{typing}</strong><br/>
                      <span className="black-text"> {searchArtist}</span><br/>
                      {!props.openResult && searchButton()}
                    </div>
                </div>
              }
              </>
            }
          </Modal.Title>
        </Modal.Header>

        {(!loading&&typing&&searchArtist) &&
          <>
            {(selectedSearch || props.openResult) &&
              <Modal.Body id="result">
                <div className="tag-result mb-2">
                  <span id="title">ผลการค้นหาจาก</span>
                  <span id="result-by-kashify">Kashify</span>
                </div>
                <ResultData src="artists" searchTerm={searchArtist.toLowerCase()} spotify={true} />
                <ResultSearch searchTerm={typing} filter={'spotify'} searchArtist={searchArtist} />
              </Modal.Body>
            }
          </>
        }        
        </Modal>
    );
}
