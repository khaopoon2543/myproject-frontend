import React, { Component } from "react";
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

class Home extends Component {
    constructor(props) {
      super(props);
      this.state = {
        user: [],
        user_image: [],
        playlists: []
      };
    }

    componentDidMount() {
      axios.get("/home", { mode: 'cors', crossDomain: true })
        .then((response) => {
          console.log(response.data.image)
          this.setState({ user: response.data.me });//user data
          this.setState({ user_image: response.data.image });//user data
          //document.getElementById("user_img").src = response.data.me.images[0].url;//user profile image
        })
        .catch(error => {
          console.log(error.response)
          //this.setState({ user: ';-;' });
        });

      axios.get("/playlist", { mode: 'cors', crossDomain: true })
        .then((response) => {
          console.log(response.data.all_tracks)
          this.setState({ playlists: response.data.all_tracks });//user data
        })
        .catch(error => {
          console.log(error.response)
        });
    }

    render() {

      const { user, user_image, playlists } = this.state;

      function LogoutButton() {
        return (
          <a href="https://accounts.spotify.com/logout"><Button variant="danger"> LOGOUT </Button></a>    
        );
      }
      let logoutbutton;
      if (user) {
        logoutbutton = <LogoutButton />;
      }

      return (
        <div className="App">
          
          <h1>やったー \ (^O^) / !!! <br/> YOU GOT THE HOME</h1>
          <p> {user.display_name} </p>
          <img src={user_image} alt=''></img>
          <p> {user.id} </p>
          {logoutbutton}
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
                              <Button variant="secondary">Search</Button>
                            </Card.Link>
                            
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
}

export default Home;
