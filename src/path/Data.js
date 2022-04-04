import React, { useState } from "react";
import { Container, Col, Row } from 'react-bootstrap';
import useIsMobile from '../component/useIsMobile';
import ResultData from '../component/ResultData';

const BUTTON = { marginLeft: 100, marginRight: 100 }
const BUTTON_MOBILE = { marginLeft: 5, marginRight: 5 }
const alphabet = [ 'a','b','c','d','e','f','g','h','i','j','k','l','m',
                   'n','o','p','q','r','s','t','u','v','w','x','y','z','#' ]

function Data(props) { // ARTISTS & SERIES
    const src = props.src
    const screenSize = useIsMobile()
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
      <div className="App">
        <Container style={{ marginTop: 50, marginBottom: 50 }} > 
          <Row>
            <Col xl={3} style={!screenSize ? { padding: 50 } : { marginBottom: 10 }}>
              <h1 className="font-bold" id="sub-level">
                {src.toUpperCase()} {selectedAlpha && <strong style={{ color: "var(--pink)" }}>{selectedAlpha.toUpperCase()}</strong>}
              </h1>
            </Col>

            <Col xl={9}>
              <div className="filters" style={!screenSize ? BUTTON : BUTTON_MOBILE}>
                 {loopAlphabet()} 
              </div>
            
            {selectedAlpha !== null && 
              <Container style={{ marginTop: 0 }}>
                <ResultData src={src} alphabet={selectedAlpha} />   
              </Container> 
            } 
            </Col>   
          </Row>  
        </Container>
      </div>
    );   
}
export default Data;