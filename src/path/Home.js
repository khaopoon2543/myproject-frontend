import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function LogoutButton() {
  return (
    <a href="https://accounts.spotify.com/logout"><Button variant="danger"> LOGOUT </Button></a>    
  );
}

function Home (){

    const [is_user, setIs_user] = useState([])
    const [user, setUser] = useState([])
    const [user_image, setUserImage] = useState([])
    const [playlists, setPlaylists] = useState([])

    useEffect(() => {
      axios.get("/home", { mode: 'cors', crossDomain: true })
        .then((response) => {
          setIs_user(true);
          setUser(response.data.me);
          setUserImage(response.data.image);
        })
        .catch(error => {
          console.log(error.response)
          setIs_user(false);
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
          
          <h1>やったー \ (^O^) / !!! <br/> YOU GOT THE HOME</h1>
          <p> {user.display_name} </p>
          <img src={user_image} alt=''></img>
          <p> {user.id} </p>
          {is_user && <LogoutButton />}
          <br/>

          <Container style={{ marginTop: 50 }}>
            <Row>
              
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
                                        navigate('/result='+ track.artist + track.name , { state: { key:track.name, artist:track.artist} })
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
