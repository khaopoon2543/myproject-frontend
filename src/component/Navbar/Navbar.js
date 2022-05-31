import "./Navbar.css";
import { MenuItems } from "./MenuItems";
import { Container, Navbar, Nav, Offcanvas } from 'react-bootstrap';
import useIsMobileLG from '../useIsMobileLG';
import { PlaylistsDropdown } from "./NavbarButton";
import { FaSpotify, FaFacebook } from 'react-icons/fa';

import { HiMenu } from 'react-icons/hi';

const ABOUT_FORM = 
  <>
    <Nav.Link href="/about" className="nav-links">
        <span>เกี่ยวกับเรา</span>
    </Nav.Link> 
    <Nav.Link href='https://airtable.com/shrQF9cQwkt3UJzIO' className="nav-links" target='_blank'>
        <span>รายงานปัญหา</span>
    </Nav.Link>
    <Nav.Link  href="https://www.facebook.com/111873184863262" id="fb" target="_blank">
        <FaFacebook style={{fontSize:20}}/>
    </Nav.Link>
  </>

function Header(){
    const screenSize = useIsMobileLG()

    return(
    <>
      {(!screenSize) ?
        <Navbar sticky="top" className="NavbarItems" lang='th'>
           <Container fluid="lg">
            <Navbar.Brand href="/"><span className="navbar-logo">kashify</span></Navbar.Brand>
            <Nav className="ms-auto d-flex align-items-center">
                {MenuItems.map((item, index) => {
                    return (
                        <Nav.Link key={index} href={item.url} className={item.cName}>
                            <span>{item.title}</span>
                        </Nav.Link>
                    )
                })}  
                <PlaylistsDropdown />
                {ABOUT_FORM}
            </Nav>
          </Container>
        </Navbar>
        :
        <Navbar expand={false} sticky="top" className="NavbarItems" lang='th'>
            <Container fluid>
            <Navbar.Brand href="/"><span className="navbar-logo">kashify</span></Navbar.Brand>
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
                        <PlaylistsDropdown />
                    </Nav>
                    <Nav>
                        {ABOUT_FORM}
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