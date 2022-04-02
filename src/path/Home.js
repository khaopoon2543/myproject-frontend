import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { LoadingIMG } from "../component/Loading";

function Home (){

    const [user, setUser] = useState([])
    const [user_image, setUserImage] = useState([])
    const [playlists, setPlaylists] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true);
      axios.get("/home", { mode: 'cors', crossDomain: true })
        .then((response) => {
          setUser(response.data.me);
          setUserImage(response.data.image);
          setLoading(false);
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
        <Container style={{ marginTop: 50, marginBottom: 50 }}>
            <h1 className="font-bold">TOP 50 JAPAN</h1>

          {/* <p> {user.display_name} </p> 
          <img className='thumbnail-image' src={user_image} alt=''></img>
          <p> {user.id} </p>
          <br/>
          */}

        {loading ? (          
          <LoadingIMG />
        ) : ( 
            <Row>
              {playlists.map((track, index) => {
                return (
                  <Col sm={6} md={4} xl={3} key={index}>
                    <Card className="spotify">
                        <Card.Body>
                          <Card.Img src={track.image} alt='' className="mb-2"></Card.Img>
                          <Card.Title>{track.name}</Card.Title>
                          <Card.Text>{track.artist}</Card.Text>  
                          <div className="filters">
                            <a href={track.url} target="_blank">
                              <button>Spotify</button>
                            </a>
                            <a onClick={ (event) => {
                              navigate('/result='+ track.artist.replace(/\/\//g, '') + track.name.replace(/\/\//g, '') ,
                              { state: { key:track.name, artist:track.artist} })
                              event.preventDefault()
                              }}> <button>Kashify</button> 
                            </a>
                          </div>
                        </Card.Body>
                    </Card>
                  </Col>
                )
              })}
              
            </Row>
          )}
        </Container>
        </div>
      );
}

export default Home;
