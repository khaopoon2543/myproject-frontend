import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Col, Card, Row } from 'react-bootstrap';
import { LevelsItems } from "../component/Levels/LevelsItems";
import useIsMobileLG from '../component/useIsMobileLG';
import "../component/Levels/Levels.css"
import { AiOutlineInfoCircle, AiFillInfoCircle } from 'react-icons/ai';

const KASHIFY = <span className="font-semi-bold"> Kashify </span>
const JReadability = 
  <a href='https://jreadability.net/sys/en' target='blank'className="font-semi-bold pink-link" > 
    <span> JReadability </span> 
  </a>
const Level = <span> ระดับความสามารถในการอ่าน  </span>
const Score = <span> ค่าความสามารถในการอ่าน </span>

const levelsDescription = 
  <div className="description">
    <h5 className="underline"> แบ่งระดับความยากง่ายยังไง ?</h5>
    <p>
      {KASHIFY} แบ่งระดับความยากง่ายในการอ่าน (Text Readability) ของเนื้อเพลงโดยใช้ระบบของ {JReadability}
      (Japanese Text Readability Measurement System) ซึ่งเป็นระบบประเมินความสามารถในการอ่านบทความภาษาญี่ปุ่นสำหรับผู้เรียนภาษาญี่ปุ่น
    </p>
    <p className="radius">
      โดยเมื่อใส่บทความภาษาญี่ปุ่นเข้าไปในระบบ 
      จะได้ {Score} (Readability Score) และ {Level} (Text Readability Level) กลับคืนมา 
      ซึ่งยิ่งค่าความสามารถในการอ่านน้อย บทความนั้นยิ่งอ่านยาก แต่ถ้าค่าความสามารถในการอ่านสูง บทความนั้นยิ่งอ่านได้ง่าย 
      โดย {JReadability} ได้แบ่งระดับความสามารถในการอ่านบทความภาษาญี่ปุ่นออกเป็นทั้งหมด 6 ระดับตามนี้เลย!
    </p>
    <p className="radius">
      แต่อาจจะมีบางเพลงที่ไม่สามารถประมวลผลความสามารถในการอ่านได้ เนื่องจากเนื้อเพลงอาจมีตัวอักษรน้อยหรือมากไป หรือมีเนื้อหาที่ง่ายหรือยากเกินไปกว่าที่ระบบจะสามารถประมวลผลให้มีประสิทธิภาพได้
      โดยใน {KASHIFY} จะแสดงเป็น No level 
    </p>
  </div>

function Levels() {
  const screenSize = useIsMobileLG()
  const [isOpen, setIsOpen] = useState(false);

    return (
        <Container className="pages">
          <Row>
            <Col xl={5} xxl={4} >
              <div className="header-left">
                <h1 className="font-bold">
                  ระดับความยากง่ายของเนื้อเพลง
                    {screenSize &&
                      <button className="icon" onClick={() => setIsOpen(!isOpen)}> 
                        {!isOpen ? <AiOutlineInfoCircle /> : <AiFillInfoCircle />}
                      </button>
                    }
                </h1>

                {!screenSize ?
                  levelsDescription :
                  <>
                    {isOpen && levelsDescription}
                  </>
                } 
              </div>
            </Col>
            
            <Col xl={7} xxl={8} >
            <div className="result-right">
            <Row xs={1} > 
              {LevelsItems.map((item, index) => {
                return (
                  <Col md={6} key={index} style={{ paddingLeft: 20, paddingRight: 20}}>
                    <Link to={"/levels/" + item.id } className="levels-link"> 
                      <Card className="levelCard" id="level">
                        <Card.Header id={item.id} lang="jp"> 
                          <Card.Title className="font-bold" style={{ fontSize: 30 }}>
                            {item.title}
                          </Card.Title>
                          <Card.Subtitle>{item.subtitle}</Card.Subtitle>
                        </Card.Header>
                        <Card.Body>
                          <Card.Text>
                            {item.textTh}
                          </Card.Text>
                        </Card.Body>
                      </Card> 
                    </Link>
                  </Col>        
                )
              })}  
            </Row> 
            </div>   
            </Col>

          </Row>
        </Container>
      );
    
}

export default Levels;
