import React, { useState } from "react";
import { Container, Col, Row } from 'react-bootstrap';
import useIsMobile from '../component/useIsMobile';
import ResultData from '../component/ResultData';

const BUTTON = { marginLeft: 100, marginRight: 100 }
const BUTTON_MOBILE = { marginLeft: 5, marginRight: 5 }
const alphabet = [ 'a','b','c','d','e','f','g','h','i','j','k','l','m',
                   'n','o','p','q','r','s','t','u','v','w','x','y','z','#' ]

function Series() {
    const screenSize = useIsMobile()
    const [selectedAlpha, setSelectedAlpha] = useState(null)

    function loopAlphabet() {
        let text = []
        for (var i = 0; i < alphabet.length; i++) { 
          const thisAlpha = alphabet[i]
          text.push(
            <button id="circle" key={i} onClick={() => setSelectedAlpha(thisAlpha)}>
              {thisAlpha.toUpperCase()} 
            </button>
          );
        } return text
    }

    return (
        <div className="App">
          <Container style={{ marginTop: 50, marginBottom: 50 }} > 
            <h1 className="font-bold">
                SERIES {selectedAlpha && <strong style={{ color: "var(--pink)" }}>{selectedAlpha.toUpperCase()}</strong>}
            </h1>
            <Row style={{ marginTop: 30 }}>
                <Col md={12}>
                    <div className="filters" style={!screenSize ? BUTTON : BUTTON_MOBILE}>
                        {loopAlphabet()} 
                    </div>
                </Col>
                {selectedAlpha !== null && 
                  <Container style={{ marginTop: 0 }}>
                    <ResultData src="series" alphabet={selectedAlpha} />   
                  </Container> 
                }    
            </Row> 
            
          </Container>
        </div>
    );
    
}

export default Series;
