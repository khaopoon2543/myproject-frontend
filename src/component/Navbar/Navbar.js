import "./Navbar.css";
import React, { useEffect, useState } from "react";
import { MenuItems } from "./MenuItems";
import { Container, Navbar, Nav, Offcanvas } from 'react-bootstrap';
import useIsMobileLG from '../useIsMobileLG';
import { LoginButton, SpotifyDropdown, SpotifyButton } from "./NavbarButton";

import { HiMenu } from 'react-icons/hi';

function Header({ user, setIsUser, open, onOpen, onClose }){
    const screenSize = useIsMobileLG()
    const [itTime, setItTime] = useState(false);
    const [waitUser, setWaitUser] = useState(false);
    const timeOut = setTimeout(() => setItTime(true), 500);

    //SpotifyButton()
    const spotifyButton = SpotifyButton(user, open, onOpen, onClose)

    useEffect(() => { //wait time for check user
        if ( !user ) return
        setWaitUser(true);
        clearTimeout(timeOut);
    }, [ user ]);

    const logout = () => {
        setIsUser(false);
        localStorage.clear();
        window.location = "/";
    }

    return(
    <>
      {(!screenSize) ?
        <Navbar sticky="top" className="NavbarItems" lang='th'>
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
            <Nav className="ms-auto d-flex align-items-center">
                {itTime && <>{!waitUser ? <LoginButton /> : <>{spotifyButton} {SpotifyDropdown(logout)}</>}</>}
            </Nav>
          </Container>
        </Navbar>
        :
        <Navbar expand={false} sticky="top" className="NavbarItems" lang='th'>
            <Container fluid>
            <Navbar.Brand href="/"><span className="navbar-logo">kashify</span></Navbar.Brand>
            <Navbar className="ms-auto d-flex align-items-center">{spotifyButton}</Navbar>
            <Navbar.Toggle aria-controls="basic-navbar-nav"> <HiMenu /> </Navbar.Toggle>
            <Navbar.Offcanvas style={{width:'70%', border:'none'}}
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
                placement="end"
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id="offcanvasNavbarLabel">
                        <span className="navbar-logo">kashify</span>
                    </Offcanvas.Title>
                </Offcanvas.Header>

                <Nav id="offcanvas-item">
                    <Nav>
                        {MenuItems.map((item, index) => {
                            return (
                                <Nav.Link key={index} href={item.url} className="nav-links">
                                    <span>{item.title}</span>
                                </Nav.Link>
                            )
                        })}  
                    </Nav>
                    <Nav id="offcanvas-item-spotify">
                        {!user ? <LoginButton /> : <>{SpotifyDropdown(logout)}</>}
                    </Nav>
                </Nav>

            </Navbar.Offcanvas>
            </Container> 
        </Navbar>
      }
    </>
    )
}

export default Header;