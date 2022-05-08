import React, { useEffect, useState } from "react";
import { SpotifyErrorPopup } from "../Loading";
import ResultAllModal from '../Search/ResultAllModal';

export default function PopupSpotify({ open, spotifyApi, onClose }) {
    
    const [dataTrack, setDataTrack] = useState([])
    const [loading, setLoading] = useState(false);
    const [isTokenExpired, setIsTokenExpired] = useState(false);
    const [isNoResult, setIsNoResult] = useState(false);
    const timeOut = setTimeout(() => {setLoading(false); handleShow();}, 2000);
    
    const [show, setShow] = useState(false); //show search result 'playing spotify' on kashify
    const handleClose = () => {setShow(false); onClose();}
    const handleShow = () => setShow(true);

    useEffect(() => { //check user
      if (!open) return
      if (!window.localStorage.getItem("accessToken")) return setIsTokenExpired(true)
      if (!window.localStorage.getItem("accessToken") && !spotifyApi) return 

        let isMounted = true;
        setIsNoResult(false)
        setIsTokenExpired(false)

        setLoading(true)
        getPlaying().then((result) => {
          if (isMounted && result) {
            setLoading(false); handleShow(); 
          } else {
            setIsNoResult(true)
          }
        });
        return () => { isMounted = false; };

        async function getPlaying() {
          try {
            spotifyApi.setAccessToken(window.localStorage.getItem("accessToken"))
            console.log("Access token @popup")
            const result = await spotifyApi.getMyCurrentPlayingTrack()
            const name = result.body.item.name
            const artists = result.body.item.artists[0].name
            const image = result.body.item.album.images[0].url
            //const url = result.body.item.external_urls.spotify //url
            setDataTrack({ name, artists, image }); //song data  
            return result        
          } catch (err) {
            console.log(err)
          }
        }
    }, [open]);

    if (!open) return  null
    if (isTokenExpired) return <SpotifyErrorPopup show={show} handleClose={handleClose} isTokenExpired={true}/>
    if (isNoResult) return <SpotifyErrorPopup show={show} handleClose={handleClose} isTokenExpired={false}/>
    if (dataTrack)
    return (
        <ResultAllModal  
                dataTrack={dataTrack} 
                selectedFilter='spotify'
                show={show} handleClose={handleClose}
                loading={loading}
        />
    )
}