import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import ResultSearch from "../component/ResultSearch";


function Home (){

    const [user, setUser] = useState([])
    const [user_image, setUserImage] = useState([])
    const [playlists, setPlaylists] = useState([])

    useEffect(() => {
      axios.get("/home", { mode: 'cors', crossDomain: true })
        .then((response) => {
          setUser(response.data.me);
          setUserImage(response.data.image);
        })
        .catch(error => {
          console.log(error.response)
        });

      axios.get("/playlist", { mode: 'cors', crossDomain: true })
        .then((response) => {
          console.log(response.data.all_tracks)
          setPlaylists(response.data.all_tracks);
        })
        .catch(error => {
          console.log(error.response)
        });
    }, []);

    const navigate = useNavigate ();

      return (
        <div className="App">
          
          {/* <p> {user.display_name} </p> 
          <img className='thumbnail-image' src={user_image} alt=''></img>
          <p> {user.id} </p>
          <br/>
          */}

          <Container style={{ marginTop: 50, marginBottom: 50 }}>
            <Row>
              <h1 className="font-bold">TOP 50 JAPAN</h1>

              {playlists.map((track, index) => {
                return (
                  <Col md={4} key={index}>
                    <Card>
                        <Card.Body>
                            <Card.Img src={track.image} alt=''></Card.Img>
                            <Card.Title>{track.name}</Card.Title>
                            <Card.Text>{track.artist}</Card.Text>
                            <Card.Link href={track.url} target="_blank">
                              <Button variant="success">Spotify</Button>
                            </Card.Link>
                            <Button onClick={ (event) => {
                                        navigate('/result='+ track.artist.replace(/\/\//g, '') + track.name.replace(/\/\//g, '') ,
                                         { state: { key:track.name, artist:track.artist} })
                                        event.preventDefault()
                                    }}> Kashify 
                            </Button>
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

export default Home;
