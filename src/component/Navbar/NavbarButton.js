import "./Navbar.css";
import "./SpotifyButton.css";
import { Container, NavDropdown } from 'react-bootstrap';
import { PlaylistItems } from '../Spotify/PlaylistItems';

import { FaSpotify, FaHeadphonesAlt } from 'react-icons/fa';
import { MdQueueMusic, MdLogout } from 'react-icons/md';
import { AiOutlineQuestion } from 'react-icons/ai';


const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URL
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "code"
function LoginButton() {
    return (
        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-read-private%20user-read-currently-playing&show_dialog=true`}>
          <div id="spotify-btn">
            <button id="spotify-login" lang='th'>
                <FaSpotify className="spotify-icon"/>
                Log In
            </button>
          </div>
        </a>
    );
}

function LogoutButton(logout) {
    return (
        <a onClick={logout}>
          <div id="spotify-btn">
            <button id="spotify-login" lang='th'>
                <MdLogout className="spotify-icon"/>
                Log Out
            </button>
          </div>
        </a>
    );
}

const TITLE_DROPDOWN = <><FaSpotify className="spotify-icon"/> Spotify </>
function SpotifyDropdown(logout) {
    return (
        <NavDropdown title={TITLE_DROPDOWN} id="nav-dropdown" align={{ md: 'end' }}>
            <NavDropdown.Header>
                <span id="playlist-title">
                    <MdQueueMusic className="icon-dropdown"/> Japanese Playlists
                </span>
            </NavDropdown.Header>
            {PlaylistItems.map((item, index) => {
                return (
                <NavDropdown.Item key={index} href={item.url} id="list">
                    <span> {item.title}</span>
                </NavDropdown.Item>
                )}
            )}

            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logout} id="logout">
                <span><MdLogout className="icon-dropdown"/> 
                    &nbsp;Log Out
                </span>
            </NavDropdown.Item>
        </NavDropdown>
    )
}

function SpotifyButton(user, open, onOpen, onClose) {
    
    function OpenClose() {
        if(!open){ return onOpen(); }
        return onClose();
    } 
    if (!user) return null 
        return (
            <Container>
                <FaHeadphonesAlt className='spotify-btn-icon'
                    id={(!open) ? 'default' : 'open'}  
                    onClick={OpenClose}      
                />
            </Container>
        )
}

export {
    LoginButton,
    LogoutButton,
    SpotifyDropdown,
    SpotifyButton,
}
