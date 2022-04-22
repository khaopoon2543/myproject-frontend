import "./Navbar.css";
import React, { useEffect, useState } from "react";
import { MenuItems } from "./MenuItems";
import { Container, Navbar, Nav, Offcanvas } from 'react-bootstrap';
import useIsMobile from '../useIsMobile';

import { FaSpotify } from 'react-icons/fa';
import { MdQueueMusic } from 'react-icons/md';
import { HiMenuAlt3 } from 'react-icons/hi';

const CLIENT_ID = "d97993bb6c89489bb43493cdfa949504"
const REDIRECT_URI = "http://localhost:3000"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "code"
function LoginButton() {
    return (
        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-read-private%20user-read-currently-playing&show_dialog=true`}>
          <div className="banner" id="spotify-btn">
            <button id="spotify-login">
                <FaSpotify className="spotify-icon"/>
                LOGIN
            </button>
          </div>
        </a>
    );
}

function PlaylistButton() {
    return (
        <Nav.Link href="/playlist" className="nav-links">
            <span><MdQueueMusic style={{fontSize:20, marginBottom:2}}/> TOP 50 JAPAN</span>
        </Nav.Link>
    );
}

function Header({ user, setIsUser }){
    const screenSize = useIsMobile()
    const [itTime, setItTime] = useState(false);
    const [waitUser, setWaitUser] = useState(false);
    const timeOut = setTimeout(() => setItTime(true), 500);

    useEffect(() => { //wait time for check user
        if ( user ) {
            setWaitUser(true);
            clearTimeout(timeOut);
        }
    }, [ user ]);

    const logout = () => {
        setIsUser(false);
        localStorage.clear();
        window.location = "/";
    }
    function LogoutButton() {
        return (
            <a onClick={logout}>
              <div className="banner" id="spotify-btn">
                <button id="spotify-login">
                    <FaSpotify className="spotify-icon"/>
                    LOGOUT
                </button>
              </div>
            </a>
        );
    }

    return(
        !screenSize ?
        <Navbar sticky="top" className="NavbarItems">
           <Container fluid="lg">
            <Navbar.Brand href="/"><span className="navbar-logo">kashify</span></Navbar.Brand>
            <Nav>
                {MenuItems.map((item, index) => {
                    return (
                        <Nav.Link key={index} href={item.url} className={item.cName}>
                            <span>{item.title}</span>
                        </Nav.Link>
                    )
                })}  
            </Nav>
            <Nav className="ms-auto">
                {itTime && <>{!waitUser ? <LoginButton /> : <><PlaylistButton /><LogoutButton /></>}</>}
            </Nav>
          </Container>
        </Navbar>
        :
        <Navbar expand={false} sticky="top" className="NavbarItems">
            <Container fluid>
            <Navbar.Brand href="/"><span className="navbar-logo">kashify</span></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"> <HiMenuAlt3 /> </Navbar.Toggle>
            <Navbar.Offcanvas style={{width:'80%', border:'none'}}
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
                placement="end"
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id="offcanvasNavbarLabel" style={{marginLeft:30}}>
                        <span className="navbar-logo">kashify</span>
                    </Offcanvas.Title>
                </Offcanvas.Header>

                <Nav style={{marginLeft:50}}>
                    <Nav>
                        {MenuItems.map((item, index) => {
                            return (
                                <Nav.Link key={index} href={item.url} className={item.cName}>
                                    <span>{item.title}</span>
                                </Nav.Link>
                            )
                        })}  
                    </Nav>
                    <Nav style={{marginTop: '20px'}}>
                        {!user ? <LoginButton /> : <><PlaylistButton /><LogoutButton/></>}
                    </Nav>
                </Nav>

            </Navbar.Offcanvas>
            </Container> 
        </Navbar>
    )
}

export default Header;