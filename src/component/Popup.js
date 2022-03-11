import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Alert, Button, Spinner } from 'react-bootstrap';

const POPUP_STYLES = {
    position: 'fixed',
    backgroundColor: '#191414',
    left: -100,
    bottom: 0,
    marginBottom: 0,
    padding: '20px',
    width: '100%',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    zIndex: 1000
}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 1000
}

const IMG_SONG={
    width: 70,
    height: 70
}

const INLINE ={
    marginLeft: '.5rem',
    color: 'white'
}

export default function Popup({ open, children, onClose }) {
    
    const [dataTrack, setDataTrack] = useState([])
    const [song_image, setSong_image] = useState([])
    const [loading, setLoading] = useState(true);

    //get data from spotify api
    useEffect(() => {
      axios.get("/playing", { mode: 'cors', crossDomain: true }) 
          .then((response) => {
              //song data
              setDataTrack(response.data);
              //user profile image
              setSong_image(response.data.image);
              setLoading(!loading);

          })
          .catch(error => {
              console.log(error.response)
          });
    }, []);
    
    //navigate to Result.js
    const navigate = useNavigate ();
    const onFormSubmit = e => {
      navigate('/result='+ dataTrack.artists.replace(/\/\//g, '') + dataTrack.name.replace(/\/\//g, ''), //App.js :searchTerm
              { state: { key:dataTrack.name, artist:dataTrack.artists }})
      e.preventDefault()
    }

    function refreshPage() {
        window.location.hash = 'reload';
        window.location.reload();
    }

    function isData() {
        if (song_image.length > 0) {
            return (
                <div>
                    <img src={song_image} alt='' style={IMG_SONG}/>
                    <span style={INLINE}>{dataTrack.name}</span>
                    <span style={INLINE}>{dataTrack.artists} </span>
                    <Button style={INLINE} onClick={() => { onClose(); onFormSubmit(); }}> Kashify </Button>
                    <Button style={INLINE} onClick={refreshPage}> RE </Button>
                </div>
            )
        }else{
            return (
                <div>
                    <h2>PLEASE
                        <Button style={INLINE} onClick={refreshPage}> RE </Button>
                    </h2>             
                </div>
            )
        }
    }

    if (!open) return null 
    return (
        <>
        {/* <div style={OVERLAY_STYLES}> */}
            <Alert style={POPUP_STYLES}>
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