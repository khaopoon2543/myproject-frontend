import React, { useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import SearchBar from "../component/Search/SearchBar";
import { FcMusic } from 'react-icons/fc';
import { FaSpotify } from 'react-icons/fa';
import useIsMobile from '../component/useIsMobile';
import { AiOutlineInfoCircle, AiFillInfoCircle } from 'react-icons/ai';

const PINK = {
  color: "var(--pink)"
}
const searchDescription = 
  <div className="description" lang="th">
    <h5><strong>ค้นหา เลือกเพลง แล้วไปเรียนรู้คำศัพท์กัน!</strong></h5>
    <p>
      ถ้าใครมีบัญชี <FaSpotify /> Spotify ก็สามารถ Login ผ่าน Spotify เพื่อเพิ่มความสะดวกในการค้นหาและใช้งาน 
      <strong style={PINK}> KASHIFY </strong> 
      ได้สะดวกยิ่งขึ้นด้วย! ลองไปเล่นกันได้เล้ยย แล้วอย่าลืมเปิดเพลงฟังไปพร้อม ๆ กับเรียนรู้คำศัพท์ผ่านเนื้อเพลงด้วยนะ!
    </p>
  </div>

function Search() {
  const screenSize = useIsMobile()
  const [isOpen, setIsOpen] = useState(false); 

  return (
    <Container className="pages">
      <Row>
        <Col xl={4}>
          <Container className="header-left">
            <h1 lang="th" className="font-bold">
              SEARCH
              <br/>
              <span lang="th" className="font-semi-light">
                ค้นหาเพลง<FcMusic />
              </span>
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
            <div lang="th">
              <span>
                ลองใช้งาน <strong style={PINK}> KASHIFY </strong> กันแล้ว รบกวนทุกคนช่วยทำ
                <strong> แบบสอบถามความพึงพอใจในการใช้งาน <span style={PINK}> KASHIFY </span> </strong>กันด้วยน้า
                <a href='http://localhost:3000/' target='blank'> กดตรงนี้ได้เลย! </a>
              </span>
              <span>
                  หากมีข้อผิดพลาดใด ๆ ต้องขออภัยล่วงหน้าด้วยนะคะ
                  ขอบคุณทุกคนมากเลยค่า 🙏💗
              </span>
            </div>
            <br/><br/>
          </Container>
        </Col>

        <Col xl={8}> 
          <SearchBar />
        </Col>
      </Row>
    </Container>
 
    );
}
export default Search;