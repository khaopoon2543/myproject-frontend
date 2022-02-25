import "./Navbar.css";
import React, { Component } from 'react';
import { MenuItems } from "./MenuItems";
import axios from 'axios';
import { Container, Navbar, Nav } from 'react-bootstrap';


function LoginButton() {
    return (
        <Nav.Link href="/login">
            <span className="nav-button">LOGIN</span>
        </Nav.Link>
    );
}
function SpotifyButton() {
    return (
        <Nav.Link href="/playing">
            <span className="nav-button">SPOTIFY</span>
        </Nav.Link>
    );
}

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_user: false
        };
    }

    componentDidMount() { //check is user data
      axios.get("/home", { mode: 'cors', crossDomain: true })
        .then((response) => {
          this.setState({ is_user: true }); 
        })
        .catch(error => {
          console.log(error.response)
        });
    }

    render() {
        const { is_user }  = this.state;

        return(
            <Navbar expand="lg" sticky="top" className="NavbarItems">
                <Container>
                <Navbar.Brand href="/"><span className="navbar-logo">kashify</span></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        {MenuItems.map((item, index) => {
                            return (
                                <Nav.Link key={index} href={item.url}>
                                    <span className={item.cName}>{item.title}</span>
                                </Nav.Link>
                            )
                        })}  
                    </Nav>
                    <Nav className="ms-auto">
                        {is_user ? <SpotifyButton /> : <LoginButton />}
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}

export default Header;