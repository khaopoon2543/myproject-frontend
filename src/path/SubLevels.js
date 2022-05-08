import React, { useState } from "react";
import { Container, Col, Card, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { LevelsItems } from "../component/Levels/LevelsItems";
import SearchBar from "../component/Search/SearchBar";
import useIsMobile from '../component/useIsMobile';
import { AiOutlineInfoCircle, AiFillInfoCircle } from 'react-icons/ai';

function subLevelsDescription(item) {
  return (
    <Card.Body id="sub-level">
      <span>
        <strong className="score">Readability-Score : </strong>
        {item.readabilityScore}
      </span>
      <span>
        <strong className="score">EN : </strong>
        {item.textEn}
      </span>
      <span>
        <strong className="score">TH : </strong>
        {item.textTh}
      </span>
    </Card.Body>
  )
}

function SubLevels() {
  const { subLevels } = useParams()
  const screenSize = useIsMobile()
  const [isOpen, setIsOpen] = useState(false); 

    return (
        <Container className="pages">
          <Row>
            <Col xl={4}>
              {LevelsItems.map((item, index) => {
                if (item.id === subLevels) {
                  return (
                    <Card key={index} className="levelCard" id="sub-level">
                      <Card.Header id={item.id}> 
                        <h2 className="font-bold" lang="jp">
                          {item.title}
                        </h2>
                        <span style={{fontSize: 20}} lang="jp">
                          {item.subtitle}
                        </span>
                        {screenSize &&
                            <button className="icon" onClick={() => setIsOpen(!isOpen)}> 
                              {!isOpen ? <AiOutlineInfoCircle /> : <AiFillInfoCircle />}
                            </button>
                        }
                      {!screenSize ?
                        subLevelsDescription(item) :
                        <>
                          {isOpen && subLevelsDescription(item)}
                        </>
                      } 
                      </Card.Header> 
                    </Card>
                  )
                }
              })}
            </Col> 
            <Col xl={8}>
              <SearchBar level={subLevels} />
            </Col>     
          </Row>         
        </Container>
    );
}
export default SubLevels;