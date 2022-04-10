import React from 'react';
import { Container } from 'react-bootstrap';
import PopupSpotify from "./PopupSpotify";
import "./SpotifyButton.css";
import useIsMobile from '../useIsMobile';

export default function SpotifyButton({ user, open, onOpen, onClose }) {
    
    function OpenClose() {
        if(!open){
            return onOpen();
        }
            return onClose();
    }
    const screenSize = useIsMobile()
    
    if (!user) return null 
    return (

        <Container>
            <img id='spotify' alt='spotify button'
                src={require( (screenSize&&open) ?  "../../images/Spotify_Icon_RGB_White.png" : "../../images/Spotify_Icon_RGB_Black.png" )}
                onMouseOver={e => e.currentTarget.src = require( "../../images/Spotify_Icon_RGB_Green.png" )}
                onMouseOut={e => e.currentTarget.src = require( (screenSize&&open) ? "../../images/Spotify_Icon_RGB_White.png" : "../../images/Spotify_Icon_RGB_Black.png" )}
                onClick={OpenClose}>
            </img>
         
            <PopupSpotify open={open} onClose={onClose}>
                {/* Hello! (is children in PopupSpotify.js)*/}
            </PopupSpotify>
        </Container>

    )
}