import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Card } from 'react-bootstrap';
import ResultSearch from "../component/ResultSearch";
import { useParams } from 'react-router-dom';
import { LevelsItems } from "../component/LevelsItems";


function SubLevels() {
    const { sublevels } = useParams() 

    
    return (
          <Container style={{ marginTop: 50, marginBottom: 50 }}>
            <h1>{sublevels}</h1>
            {LevelsItems.map((item, index) => {
                if (item.id === sublevels) {
                return (
                  <Col md={12} key={index}>
                    <Card className={item.cName}>
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
                )}
              })}  
                
          </Container>
    );
}
export default SubLevels;