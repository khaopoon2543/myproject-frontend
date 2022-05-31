import "./Navbar.css";
import { Link } from "react-router-dom";
import { NavDropdown } from 'react-bootstrap';
import { PlaylistItems } from '../Spotify/PlaylistItems';
import { FaSpotify } from 'react-icons/fa';

const TITLE_DROPDOWN2 = <> Spotify Playlists </>
function PlaylistsDropdown() {
    return (
        <NavDropdown title={TITLE_DROPDOWN2} id="nav-dropdown" align={{ md: 'end' }}>
            {PlaylistItems.map((item, index) => {
                return (
                <NavDropdown.Item key={index} href={item.url} id="list">
                    <span> {item.title}</span>
                </NavDropdown.Item>
                )}
            )}
        </NavDropdown>
    )
}

function PlaylistsHome() {
    return (
        <Link to={"/playlist/37i9dQZEVXbKXQ4mDTEBXq"}>
          <div id="spotify-btn">
            <button id="spotify-login" lang='th'>
                <FaSpotify className="spotify-icon"/>
                Spotify Playlists
            </button>
          </div>
        </Link>
    )
}

export {
    PlaylistsDropdown,
    PlaylistsHome,
}
