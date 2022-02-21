import "./Navbar.css";
import React, { Component } from 'react';
import { MenuItems } from "./MenuItems";
import axios from 'axios';

function LoginButton() {
    return (
        <li>
            <a className="nav-button" href="/login">
                LOGIN
            </a>
        </li>
    );
}
function SpotifyButton() {
    return (
        <li>
            <a className="nav-button" href="/playing">
                SPOTIFY
            </a>
        </li>
    );
}

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {clicked: false, isUser: false};
    }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    componentDidMount() { //check is user data
      axios.get("/home", { mode: 'cors', crossDomain: true })
        .then((response) => {
          this.setState({ isUser: true }); //user data
        })
        .catch(error => {
          console.log(error.response)
        });
    }

    render() {
        const { isUser }  = this.state;
        
        let button;
        if (isUser) {
            button = <SpotifyButton />;
        } else {
            button = <LoginButton />;
        }

        return(
            <nav className="NavbarItems">

                <h4 className="navbar-logo">kashify</h4>
        
                <div className="menu-icon" onClick={this.handleClick} >
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>

                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <a className={item.cName} href={item.url}>
                                {item.title}
                                </a>
                            </li>
                        )
                    })}
                    
                    {button}

                </ul>

                

            </nav>
        )
    }
}

export default Navbar;