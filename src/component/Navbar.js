import "./Navbar.css";
import React, { useEffect, useState } from "react";
import { MenuItems } from "./MenuItems";
import { Container, Navbar, Nav, NavDropdown, Offcanvas } from 'react-bootstrap';
import useIsMobile from '../component/useIsMobile';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

function LoginButton() {
    return (
        <Nav.Link href="/login">
        <div className="banner" id="spotify-btn">
            <button id="spotify-login">
                <div className="items-left">
                    <img alt='spotify search' src={require("../images/Spotify_Icon_RGB_White.png")}></img>
                    LOGIN SPOTIFY
                </div>
            </button>
        </div>
        </Nav.Link>
    );
}
function LogoutButton() {
    return (
        <Nav.Link href="/home">
        <div className="banner" id="spotify-btn">
            <button id="spotify-login">
                <div className="items-left">
                    <img alt='spotify search' src={require("../images/Spotify_Icon_RGB_White.png")}></img>
                    PLAYLISTS
                </div>
            </button>
        </div>
        </Nav.Link>
    );
}

function Header({ user }){
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

    return(
        !screenSize ?
        <Navbar expand="lg" sticky="top" className="NavbarItems">
            <Container>
            <Navbar.Brand href="/"><span className="navbar-logo">kashify</span></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"> <FontAwesomeIcon icon="fa-solid fa-bars-staggered" /> </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
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
                    {itTime && <>{!waitUser ? <LoginButton /> : <LogoutButton />}</>}
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
        :
        <Navbar expand={false} sticky="top" className="NavbarItems">
            <Container fluid>
            <Navbar.Brand href="/"><span className="navbar-logo">kashify</span></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"> <FontAwesomeIcon icon="fa-solid fa-bars-staggered" /> </Navbar.Toggle>
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

                <Nav className="justify-content-left align-items-left" style={{marginLeft:50}}>
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
                        {!user ? <LoginButton /> : <LogoutButton />}
                    </Nav>
                </Nav>

            </Navbar.Offcanvas>
            </Container> 
        </Navbar>
    )
}

export default Header;