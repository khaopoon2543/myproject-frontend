import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Col, Card, Row } from 'react-bootstrap';
import { LevelsItems } from "../component/Levels/LevelsItems";
import useIsMobile from '../component/useIsMobile';
import "../component/Levels/Levels.css"
import { AiOutlineInfoCircle, AiFillInfoCircle } from 'react-icons/ai';

const levelsDescription = 
  <div className="description" lang="th">
    <br/>
    <p>
      KASHIFY แบ่งระดับความยากง่ายในการอ่าน (Text Readability) ของเนื้อเพลงโดยใช้ระบบของ
      <a href='https://jreadability.net/sys/en' target='blank'> <strong>jreadability</strong> </a>
      (Japanese Text Readability Measurement System) ซึ่งเป็นระบบประเมินความสามารถในการอ่านบทความภาษาญี่ปุ่นสำหรับผู้เรียนภาษาญี่ปุ่น
    </p>
    <p>
      โดยเมื่อใส่บทความภาษาญี่ปุ่นเข้าไปในระบบ 
      จะได้ค่าความสามารถในการอ่าน (Readability Score) และ ระดับความสามารถในการอ่าน (Text Readability Level) กลับคืนมา 
      ซึ่งยิ่งค่าความสามารถในการอ่านน้อย บทความนั้นยิ่งอ่านยาก แต่ถ้าค่าความสามารถในการอ่านสูง บทความนั้นยิ่งอ่านได้ง่าย 
      โดย jreadability ได้แบ่งระดับความสามารถในการอ่านบทความภาษาญี่ปุ่นออกเป็นทั้งหมด 6 ระดับตามนี้เลย!
    </p>
  </div>

function Levels() {
  const screenSize = useIsMobile()
  const [isOpen, setIsOpen] = useState(false);

    return (
        <Container className="pages">
          <Row>
            <Col xl={4} >
              <Container className="header-left">
                <h1 className="font-bold">
                  LEVELS
                  <br/>
                  <span lang="th" className="font-semi-light">
                    ระดับความยากง่าย 
                    {screenSize &&
                      <button className="icon" onClick={() => setIsOpen(!isOpen)}> 
                        {!isOpen ? <AiOutlineInfoCircle /> : <AiFillInfoCircle />}
                      </button>
                    }
                  </span>
                </h1>
                {!screenSize ?
                  levelsDescription :
                  <>
                    {isOpen && levelsDescription}
                  </>
                } 
              </Container>
            </Col>

            <Col xl={8} >
            <Row xs={1} > 
              {LevelsItems.map((item, index) => {
                return (
                  <Col md={6} key={index} style={{ paddingLeft: 20, paddingRight: 20}}>
                    <Link to={"/levels/" + item.id } className="levels-link"> 
                      <Card className="levelCard" id="level">
                        <Card.Header id={item.id}> 
                          <Card.Title className="font-bold" style={{ fontSize: 30 }}>
                            {item.title}
                          </Card.Title>
                          <Card.Subtitle>{item.subtitle}</Card.Subtitle>
                        </Card.Header>
                        <Card.Body>
                          <Card.Text lang="th">
                            {item.textTh}
                          </Card.Text>
                        </Card.Body>
                      </Card> 
                    </Link>
                  </Col>        
                )
              })}  
            </Row> 
            </Col>   

          </Row>
        </Container>
      );
    
}

export default Levels;
