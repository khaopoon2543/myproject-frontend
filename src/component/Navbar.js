import "./Navbar.css";
import { MenuItems } from "./MenuItems";
import { Container, Navbar, Nav, Alert, Button } from 'react-bootstrap';

function LoginButton() {
    return (
        <Nav.Link href="/login" >
            <span className="nav-button">LOGIN</span>
        </Nav.Link>
    );
}
function LogoutButton() {
    return (
        <Nav.Link href="https://accounts.spotify.com/logout">
            <span className="nav-button">LOGOUT</span>
        </Nav.Link>
    );
}

function Header({ user }){

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
                    {!user ? <LoginButton /> : <LogoutButton />}
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;