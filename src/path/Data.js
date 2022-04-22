import React, { useState } from "react";
import { Container, Col, Row } from 'react-bootstrap';
import useIsMobile from '../component/useIsMobile';
import ResultData from '../component/Search/ResultData';
import { EmojiData } from "../component/Loading";

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
            <Col xl={4} >
              <Container className="header-left">
                <h1 className="font-bold">
                  {src.toUpperCase()} {selectedAlpha && <strong style={{ color: "var(--pink)" }}>{selectedAlpha.toUpperCase()}</strong>}
                  <br/>
                  <span lang="th" className="font-semi-light">
                    {src==='artists' ? 'ศิลปิน' : 'ซีรีส์'}
                  </span>
                </h1>
                <div className="alphabet">
                  {loopAlphabet()} 
                </div>
              </Container>
            </Col>

            <Col xl={8}>
            {selectedAlpha !== null ?
              <div style={{ marginTop: 10 }}>
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
