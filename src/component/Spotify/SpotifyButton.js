import React from 'react';
import { Container } from 'react-bootstrap';
import PopupSpotify from "./PopupSpotify";
import "./SpotifyButton.css";
import useIsMobile from '../useIsMobile';

import { FaSpotify } from 'react-icons/fa';

export default function SpotifyButton({ user, open, onOpen, onClose, spotifyApi }) {
    
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
            <FaSpotify className='spotify-btn-icon'
                id={(screenSize&&open) ? 'open-mobile' : 'default'}  
                style={(screenSize&&(!open)) && { boxShadow: 'var(--pinkPastel) 0px 5px 80px' }}    
                onClick={OpenClose}      
            />

            <PopupSpotify open={open} onClose={onClose} spotifyApi={spotifyApi} />
        </Container>

    )
}