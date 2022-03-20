import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Col, Card, Row } from 'react-bootstrap';
import { LevelsItems } from "../component/LevelsItems";
import "./Levels.css"

function Levels() {

      return (
        <div className="App">
          <Container style={{ marginTop: 50, marginBottom: 50 }} > 
            <h1 className="font-bold">LEVELS</h1>
            <Row xs={1} md={2} style={{ marginTop: 30 }}>
              {LevelsItems.map((item, index) => {
                return (
                  <Col md={6} key={index}>
                  <Link to={"/levels/" + item.id } className="levels-link"> 
                    <Card className={item.cName}>
                      <Card.Header className="header" id={item.id}> 
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
          </Container>
        </div>
      );
    
}

export default Levels;
