import React from 'react';
import { Container } from 'react-bootstrap';
import Popup from "./Popup";
import "./SpotifyButton.css";
import useIsMobile from '../component/useIsMobile';

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
                src={require( (screenSize&&open) ?  "../images/Spotify_Icon_RGB_White.png" : "../images/Spotify_Icon_RGB_Black.png" )}
                onMouseOver={e => e.currentTarget.src = require( "../images/Spotify_Icon_RGB_Green.png" )}
                onMouseOut={e => e.currentTarget.src = require( (screenSize&&open) ? "../images/Spotify_Icon_RGB_White.png" : "../images/Spotify_Icon_RGB_Black.png" )}
                onClick={OpenClose}>
            </img>
         
            <Popup open={open} onClose={onClose}>
                {/* Hello! (is children in Popup.js)*/}
            </Popup>
        </Container>

    )
}