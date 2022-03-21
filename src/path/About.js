import React, { useState } from "react";
import { Container, Col, Row } from 'react-bootstrap';


function About() {

    return (
        <div className="App">
          <Container style={{ marginTop: 50, marginBottom: 50 }} > 
            <h1 className="font-bold">
                ABOUT 
                <strong style={{ color: "var(--pink)" }}>
                    KASHIFY
                </strong>
            </h1>
            
          </Container>
        </div>
    );
}

export default About;
