import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import SearchBar from "../component/Search/SearchBar";
import TopLists from "./TopLists";
import { FiSearch } from 'react-icons/fi';
import { FaSpotify } from 'react-icons/fa';
import { IoMusicalNotes, IoLanguage } from 'react-icons/io5';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { PiMusicNoteFill } from 'react-icons/pi';
import useIsMobileLG from '../component/useIsMobileLG';

const KASHIFY = <span className="font-semi-bold"> Kashify </span>
const SPOTIFY = <span className="font-semi-bold"><FaSpotify/> Spotify </span>

const searchDescription = 
  <div className="description">
    <h5 className="font-semi-bold">
        <FiSearch id="circle-icon"/> &nbsp; ค้นหา 
        <br/>
        <IoMusicalNotes id="circle-icon"/> &nbsp; เลือกเพลง 
        <br/>
        <IoLanguage id="circle-icon"/> &nbsp; แล้วไปเรียนรู้คำศัพท์กัน!
    </h5>
  </div>


function Search() {
  const screenSize = useIsMobileLG()
  const [isOpen, setIsOpen] = useState(screenSize ? false : true); 

  return (
    <Container className="pages">
      <Row>
        <Col xl={5} xxl={4}>
          <div className="header-left">

            <h1 className="font-bold">
              ค้นหาเพลง<PiMusicNoteFill style={{marginTop:'-5px'}}/>         
            </h1>

            <div className="tag-series search">
              <h5 className="gray-text font-semi-bold"> ค้นหาโดยตัวอักษร </h5> 
              <Link to="/artists">
                <span id="button-tag-data"> ศิลปิน </span>
              </Link>
              &nbsp;&nbsp; 
              <Link to="/series">
                <span id="button-tag-data"> ซีรีส์ </span>
              </Link>              
            </div>

            <div className="search">
              <h5 className="gray-text font-semi-bold"> ศิลปินและซีรี่ส์ยอดนิยม </h5> 
              {!isOpen ? 
                  <TiArrowSortedDown className="icon-playlists" onClick={() => setIsOpen(!isOpen)}/> 
                : 
                  <TiArrowSortedUp className="icon-playlists" onClick={() => setIsOpen(!isOpen)}/> 
              }
            </div>
            <TopLists open={isOpen} />

          </div>
        </Col>

        <Col xl={7} xxl={8}> 
          <SearchBar />
        </Col>
      </Row>
    </Container>
 
    );
}
export default Search;