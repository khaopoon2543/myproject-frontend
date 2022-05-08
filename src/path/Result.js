import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import SearchBar from "../component/Search/SearchBar";
import useIsMobile from '../component/useIsMobile';
import { RiMusicFill } from 'react-icons/ri';
import { FaSpotify } from 'react-icons/fa';
import { AiOutlineInfoCircle, AiFillInfoCircle } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';

const PINK = {
  color: "var(--pink)"
}
const searchDescription = 
  <div className="description">
    <h5><strong>ค้นหา เลือกเพลง แล้วไปเรียนรู้คำศัพท์กัน!</strong></h5>
    <p>
      ถ้าใครมีบัญชี <FaSpotify /> Spotify ก็สามารถ Login ผ่าน Spotify เพื่อเพิ่มความสะดวกในการค้นหาและใช้งาน 
      <strong style={PINK}> KASHIFY </strong> 
      ได้สะดวกยิ่งขึ้นด้วย! ลองไปเล่นกันได้เล้ยย แล้วอย่าลืมเปิดเพลงฟังไปพร้อม ๆ กับเรียนรู้คำศัพท์ผ่านเนื้อเพลงด้วยนะ!
    </p>
    <span>
      ลองใช้งาน <strong style={PINK}> KASHIFY </strong> กันแล้ว รบกวนทุกคนช่วยทำ
      <strong> แบบสอบถามความพึงพอใจในการใช้งาน <span style={PINK}> KASHIFY </span> </strong>กันด้วยน้า
      <a href='http://localhost:3000/' target='blank'> กดตรงนี้ได้เลย! </a>
    </span>
    <span>
        หากมีข้อผิดพลาดใด ๆ ต้องขออภัยล่วงหน้าด้วยนะคะ
        ขอบคุณทุกคนมากเลยค่า 🙏💗
    </span>
    <br/><br/>
  </div>

function Result() {
  const screenSize = useIsMobile()
  const [isOpen, setIsOpen] = useState(false); 

  const { state } = useLocation();
  //From Search.js --> ONLY(key) OR(key,level) //From Playing.js(Spotify) --> (key, artist)
  const { key, artist, level } = state;

  return (
    <Container className="pages">
      <Row>
        <Col xl={4}>
          <Container className="header-left">
            <h1 className="font-bold">
              Result
              <br/>
              <span className="font-semi-light">
                <FiSearch /> ผลการค้นหา
              </span>
              <h1>{key}</h1>
              {artist && <p>{artist}</p>}

              {level && 
                <div className="tagLevel" id="title-lyric">
                  <p id={level}> {level} </p>
                </div>
              }  

              {screenSize &&
                <button className="icon" onClick={() => setIsOpen(!isOpen)}> 
                  {!isOpen ? <AiOutlineInfoCircle /> : <AiFillInfoCircle />}
                </button>
              } 
                    
            </h1>
            <br/>
            {!screenSize ?
              searchDescription :
              <>
                {isOpen && searchDescription}
              </>
            } 
          </Container>
        </Col>

        <Col xl={8}> 
          <SearchBar />
        </Col>
      </Row>
    </Container>
 
    );
}
export default Result;
