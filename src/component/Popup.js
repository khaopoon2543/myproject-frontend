import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Alert, Spinner } from 'react-bootstrap';
import useIsMobile from '../component/useIsMobile';

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
const IMG_SONG={
    width: 70,
    height: 70
}
const INLINE ={
    marginLeft: 10,
    color: 'white'
}

export default function Popup({ open, children, onClose }) {
    
    const [dataTrack, setDataTrack] = useState([])
    const [song_image, setSong_image] = useState([])
    const [loading, setLoading] = useState(false);

    //get data from spotify api
    useEffect(() => {
        if ( open ) {
            setLoading(true);
            axios.get("/playing", { mode: 'cors', crossDomain: true }) 
                .then((response) => {
                    //song data
                    setDataTrack(response.data);
                    //user profile image
                    setSong_image(response.data.image);
                    setLoading(false);

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

    function refreshPage() {
        window.location.hash = 'reload';
        window.location.reload();
    }

    function isData() {
        if (song_image.length > 0) {
            return (
                <div className="banner">
                  <div className="wrapper">
                    <img src={song_image} alt="song image" style={IMG_SONG}/>
                    <span style={INLINE}>{dataTrack.name}</span>
                    <span style={INLINE}>({dataTrack.artists})</span>      
                    <br/>
                    <span>
                        <button onClick={() => { onClose(); onFormSubmit(); }}> 
                        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /> Kashify </button>
                    </span>
                  </div>
                </div>
            )
        }else{
            return (
                <div>
                    <h2>PLEASE
                        <button style={INLINE} onClick={refreshPage}>
                            <FontAwesomeIcon icon="fa-solid fa-arrow-rotate-right" /></button>
                    </h2>             
                </div>
            )
        }
    }

    if (!open) return null 
    return (
        <>
        {/* <div style={OVERLAY_STYLES}> */}
            <Alert style={!screenSize ? POPUP_STYLES : POPUP_STYLES_MOBILE}>
                {children}
                {loading ? ( 
                    <Spinner animation="border" />
                ) : isData()
                }
            </Alert>
        {/* </div> */}
        </>
        
    )
}