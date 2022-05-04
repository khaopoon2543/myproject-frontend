import React, { useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import SearchBar from "../component/Search/SearchBar";
import useIsMobile from '../component/useIsMobile';
import { FaSpotify } from 'react-icons/fa';
import { AiOutlineInfoCircle, AiFillInfoCircle } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import { IoMusicalNotes, IoLanguage } from 'react-icons/io5';

const PINK = {
  color: "var(--pink)",
  textDecoration: "underline 1px solid var(--pink)"
}
const KASHIFY = <strong> Kashify </strong>
const SPOTIFY = <span> <FaSpotify /> Spotify </span>

const searchDescription = 
  <div className="description" lang="th">
    <h4>
      <strong>
        <FiSearch id="circle-icon"/> ค้นหา 
        <br/>
        <IoMusicalNotes id="circle-icon"/> เลือกเพลง 
        <br/>
        <IoLanguage id="circle-icon"/> แล้วไปเรียนรู้คำศัพท์กัน!
      </strong>
    </h4>
    <br/>
    <p>
      ถ้าใครมีบัญชี {SPOTIFY} ก็สามารถเข้าสู่ระบบผ่าน {SPOTIFY} เพื่อเพิ่มความสะดวกในการค้นหาและใช้งาน 
      {KASHIFY}
      ได้ดียิ่งขึ้น! ลองไปเล่นกันได้เล้ยย แล้วอย่าลืมเปิดเพลงฟังไปพร้อม ๆ กับเรียนรู้คำศัพท์ผ่านเนื้อเพลงด้วยนะ!
    </p>
    <p id="pls-help-me">
      <span>
        ลองใช้งาน {KASHIFY} กันแล้ว รบกวนทุกคนช่วยทำ
        <a href='https://forms.gle/r3kVyMy8KH5hazBB9' target='blank' rel='noopener noreferrer' style={PINK}> 
          <strong> แบบประเมินความพึงพอใจในการใช้งาน {KASHIFY} </strong>
        </a>
        กันด้วยน้า
      </span>
      <br/><br/>
      <span>
          หากมีข้อผิดพลาดใด ๆ ต้องขออภัยล่วงหน้าด้วยนะคะ
          ขอบคุณทุกคนมากเลยค่า 🙏💗
      </span>
    </p>
  </div>

function Search() {
  const screenSize = useIsMobile()
  const [isOpen, setIsOpen] = useState(false); 

  return (
    <Container className="pages">
      <Row>
        <Col xl={4}>
          <div className="header-left" lang="th">
            <h1 className="font-bold">
              ค้นหาเพลง
              {screenSize &&
                <button className="icon" onClick={() => setIsOpen(!isOpen)}> 
                  {!isOpen ? <AiOutlineInfoCircle /> : <AiFillInfoCircle />}
                </button>
              }            
            </h1>
            {!screenSize ?
              searchDescription :
              <>
                {isOpen && searchDescription}
              </>
            } 
          </div>
        </Col>

        <Col xl={8}> 
          <SearchBar />
        </Col>
      </Row>
    </Container>
 
    );
}
export default Search;