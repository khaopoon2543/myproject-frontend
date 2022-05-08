import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import SearchBar from "../component/Search/SearchBar";
import useIsMobileLG from '../component/useIsMobileLG';
import { FiSearch } from 'react-icons/fi';
import { FaSpotify } from 'react-icons/fa';
import { IoMusicalNotes, IoLanguage } from 'react-icons/io5';
import { MdMusicNote } from 'react-icons/md';

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

  return (
    <Container className="pages">
      <Row>
        <Col xl={5} xxl={4}>
          <div className="header-left">

            <h1 className="font-bold">
              ค้นหาเพลง<MdMusicNote/>         
            </h1>

            <div className="tag-series search">
              <h5 className="gray-text font-semi-bold">ค้นหาโดยตัวอักษร </h5> 
              <Link to="/artists">
                <span id="button-back"> ศิลปิน </span>
              </Link>
              &nbsp;&nbsp; 
              <Link to="/series">
                <span id="button-back"> ซีรีส์ </span>
              </Link>              
            </div>

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