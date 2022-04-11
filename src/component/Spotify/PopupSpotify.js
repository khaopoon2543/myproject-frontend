import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Alert, Spinner } from 'react-bootstrap';
import useIsMobile from '../useIsMobile';
import { backendSrc } from "../backendSrc";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

const POPUP_STYLES = {
    position: 'fixed',
    backgroundColor: '#191414',
    left: -100,
    bottom: 0,
    marginBottom: -1,
    padding: '10px',
    width: '100%',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    zIndex: 1000,
    border: '1px solid #191414',
    boxShadow: "0px 7px 29px 0px #acacac"
}
const POPUP_STYLES_MOBILE = {
    position: 'fixed',
    backgroundColor: '#191414',
    left: 0,
    bottom: 0,
    marginBottom: -1,
    padding: '20px',
    width: '100%',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    zIndex: 1000,
    boxShadow: "0px 7px 29px 0px #acacac"
}
const INLINE ={
    marginLeft: 10,
    color: 'white'
}

export default function PopupSpotify({ open, onClose }) {
    
    const [dataTrack, setDataTrack] = useState([])
    const [song_image, setSong_image] = useState([])
    const [loading, setLoading] = useState(false);
    const timeOut = setTimeout(() => setLoading(false), 2000);

    //get data from spotify api
    useEffect(() => {
        if ( open ) {
            setLoading(true);
            axios.get(`${backendSrc}/playing`, { mode: 'cors', crossDomain: true }) 
                .then((response) => {
                    setDataTrack(response.data); //song data
                    setSong_image(response.data.image); //user profile image
                    setLoading(false);
                    // if cant find data
                    clearTimeout(timeOut);
                })
                .catch(error => {
                    console.log(error.response)
                });
        }
    }, [ open ]);
    
    //navigate to Result.js
    const navigate = useNavigate ();
    const onFormSubmit = event => {
      navigate('/result='+ 'spotify', //App.js :searchTerm
              { state: { key:dataTrack.name, artist:dataTrack.artists }})
      event.preventDefault()
    }
    const screenSize = useIsMobile()

    function isData() {
        if (song_image.length > 0) {
            return (
                <div className="banner">
                    <img src={song_image} alt="song image"/>
                    <span style={INLINE}>{dataTrack.name}</span>
                    <span style={INLINE}>({dataTrack.artists})</span>      
                    <br/>
                    <span>
                        <button onClick={(event) => { onClose(); onFormSubmit(event); }}> 
                        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /> &nbsp;Kashify </button>
                    </span>
                </div>
            )
        }else{
            return (
                <div className="banner">
                  <div className="wrapper">
                    <h2 className="font-light" style={INLINE}>Please <FontAwesomeIcon icon="fa-solid fa-circle-play" /> music on Spotify</h2>             
                  </div>
                </div>
            )
        }
    }

    const inSpinner = {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        color: 'white'
    }

    if (!open) return null 
    return (
        <>
        {/* <div style={OVERLAY_STYLES}> */}
            <Alert style={!screenSize ? POPUP_STYLES : POPUP_STYLES_MOBILE}>
                {loading ? ( 
                    <div className="banner">
                        <div className="wrapper">
                            <Spinner animation="border" style={inSpinner}/>
                        </div>
                    </div>
                ) : isData()
                }
            </Alert>
        {/* </div> */}
        </>
        
    )
}