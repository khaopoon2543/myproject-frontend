import "./Navbar.css";
import { MenuItems } from "./MenuItems";
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';

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

function Playlist() {
    return (
        <NavDropdown title="PLAYLIST" id="basic-nav-dropdown">
          <NavDropdown.Item href="/home">Top 50 Japan</NavDropdown.Item>
        </NavDropdown>
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
                            <Nav.Link key={index} href={item.url} className={item.cName}>
                                <span>{item.title}</span>
                            </Nav.Link>
                        )
                    })}  
                    {user && <Playlist />}
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