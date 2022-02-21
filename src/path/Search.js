import React, { useState } from "react";
import { Link } from "react-router-dom";
import token_demo_file from '../file/demo_file.json';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

function Search() {

    const [searchTerm, setSearchTerm] = useState([])

    return (

        <div className="App">

          <Container style={{ marginTop: 50 }}>
            <Row>
              
              <Form>
                <Form.Label>Search</Form.Label>
                <Form.Control type="search" placeholder="Search" 
                  onChange={(event) => {setSearchTerm(event.target.value)}}
                />
                <br/>
              </Form>  

              {token_demo_file.filter((track) => {
                if (searchTerm == "") {
                  return ""
                } else if (track.name.toLowerCase().includes(searchTerm.toLowerCase()) 
                            || track.song_url.toLowerCase().includes(searchTerm.toLowerCase())) {
                  return track
                }
              })
              .map((track, index) => {
                return (
                  <Col md={12} key={index}>
                    <Card>
                        <Card.Body>
                            <Link to={"/lyric/" + track.name}>
                              <Card.Title>{track.name}</Card.Title>
                            </Link>
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

export default Search;
