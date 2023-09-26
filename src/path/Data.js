import React, { useState } from "react";
import { Container, Col, Row } from 'react-bootstrap';
import ResultData from '../component/Search/ResultData';
import { EmojiData } from "../component/Loading";
import { PiUserGearBold, PiMonitorPlayBold } from 'react-icons/pi';

const alphabet = [ 'a','b','c','d','e','f','g','h','i','j','k','l','m',
                   'n','o','p','q','r','s','t','u','v','w','x','y','z','#' ]

function Data(props) { // ARTISTS & SERIES
    const src = props.src
    const [selectedAlpha, setSelectedAlpha] = useState(null)

    function loopAlphabet() {
        let text = []
        for (var i = 0; i < alphabet.length; i++) { 
          const thisAlpha = alphabet[i]
          text.push(
            <button id="circle" key={i} onClick={() => setSelectedAlpha(thisAlpha) }>
              {thisAlpha.toUpperCase()} 
            </button>
          );
        } return text
    }

    return (
        <Container className="pages"> 
          <Row>
            <Col xl={4}>
              <div className="header-left">
                <h1 className="font-bold">
                    {src==='artists' ? 
                      <>
                        <PiUserGearBold style={{marginTop:'-5px', marginRight: '5px'}}/>ศิลปิน
                      </> 
                    : 
                      <>
                        <PiMonitorPlayBold style={{marginTop:'-5px', marginRight: '5px'}}/>ซีรีส์
                      </>
                    }&nbsp;
                    {selectedAlpha && 
                      <strong style={{ color: "var(--pink)" }}>
                        {selectedAlpha.toUpperCase()}
                      </strong>
                    }
                </h1>
                <h5 className="gray-text font-semi-bold">ค้นหาเพลงโดย {src==='artists' ? <>ชื่อศิลปิน</> : <>ชื่อซีรีส์</>} </h5> 

                <div className="alphabet" lang="jp">
                  {loopAlphabet()} 
                </div>
              </div>
            </Col>

            <Col xl={8}>
            {selectedAlpha !== null ?
              <div className="result-right">
                <ResultData src={src} alphabet={selectedAlpha} />   
              </div> 
            : <EmojiData />
            } 
            </Col>   
          </Row>  
        </Container>
    );   
}
export default Data;
