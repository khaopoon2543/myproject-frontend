import React, { useEffect, useState } from "react";
import { Container, Col, Card, Row } from 'react-bootstrap';
import { LevelsItems } from "../component/LevelsItems";
import "./Levels.css"

function Levels() {

      return (
        <div className="App">
          <Container style={{ marginTop: 50 }} > 
            <h1>LEVELS</h1>
            <Row xs={1} md={2} style={{ marginTop: 50 }}>
              {LevelsItems.map((item, index) => {
                return (
                  <Col md={6}>
                    <Card key={index} className={item.cName}>
                      <Card.Header className="header" id={item.id}> 
                        <Card.Title className="font-weight-bold">{item.title}</Card.Title>
                        <Card.Subtitle>{item.subtitle}</Card.Subtitle>
                      </Card.Header>
                      <Card.Body>
                        <Card.Text lang="th">
                          {item.text}
                        </Card.Text>
                      </Card.Body>
                    </Card> 
                  </Col>        
                )
              })}  
            </Row>        
          </Container>
        </div>
      );
    
}

export default Levels;
