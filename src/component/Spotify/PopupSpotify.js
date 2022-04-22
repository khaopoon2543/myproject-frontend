import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Spinner } from 'react-bootstrap';
import useIsMobile from '../useIsMobile';

import { FiSearch } from 'react-icons/fi'; 
import { BsPlayCircleFill } from 'react-icons/bs';

const POPUP_STYLES = {
    position: 'fixed',
    backgroundColor: '#191414',
    left: 0,
    bottom: 0,
    marginBottom: 0,
    padding: '10px',
    width: '100%',
    borderRadius: 0,
    zIndex: 1000,
    border: '1px solid #191414',
    //boxShadow: "0px 7px 29px 0px #acacac"
}
const INLINE ={
    marginLeft: 10,
    color: 'white'
}

export default function PopupSpotify({ open, onClose, spotifyApi }) {
    
    const [dataTrack, setDataTrack] = useState([])
    const [song_image, setSong_image] = useState([])
    const [loading, setLoading] = useState(false);
    const timeOut = setTimeout(() => setLoading(false), 2000);

    useEffect(() => { //check user
      if (!open) return
      if (!window.localStorage.getItem("accessToken") && !spotifyApi) return
        spotifyApi.setAccessToken(window.localStorage.getItem("accessToken"))
        console.log("Access token @popup")

        async function getPlaying() {
          try {
            setLoading(true)
            const result = await spotifyApi.getMyCurrentPlayingTrack()
            const name = result.body.item.name
            const artists = result.body.item.artists[0].name
            const image = result.body.item.album.images[0].url
            const url = result.body.item.external_urls.spotify
            console.log({image, name, artists, url})
            setDataTrack({image, name, artists, url}); //song data
            setSong_image(image); //user profile image
            setLoading(false); 
          } catch (err) {
            console.log(err)
          }
        }
        getPlaying()
        // if cant find data
        clearTimeout(timeOut);
    }, [open]);

    
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
                    {screenSize ?
                    <>
                        <div className="d-block" style={{zoom:'80%'}}>
                            <span>{dataTrack.name}&nbsp;</span>
                            <br/>
                            <span id="artist">
                                {dataTrack.artists}
                            </span>
                            <br/>
                            <button onClick={(event) => { onClose(); onFormSubmit(event); }} 
                                style={{marginTop:5}}> 
                                <FiSearch className="spotify-icon"/> Kashify 
                            </button>
                                
                        </div>
                    </>
                    : <>
                        <div className="d-flex justify-content-left align-items-center">
                            <div className="d-block">
                                <span >{dataTrack.name}</span>
                                <br/>
                                <span className="font-light" id="artist">
                                    {dataTrack.artists}
                                </span>
                            </div>
                            <button onClick={(event) => { onClose(); onFormSubmit(event); }} 
                                style={{marginLeft:20}}> 
                                <FiSearch className="spotify-icon"/> Kashify 
                            </button>  
                        </div>
                        
                    </>  
                    }
                        
                </div>
            )
        }else{
            return (
                <div className="banner">
                  <div className="wrapper">
                    <h2 className="font-light" style={INLINE}>Please <BsPlayCircleFill /> music on Spotify</h2>             
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
            <Alert style={POPUP_STYLES}>
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