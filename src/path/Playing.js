import React, { Component } from "react";
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

class Playing extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: []
      };
    }

    componentDidMount() {
      axios.get("/playing", { mode: 'cors', crossDomain: true }) 
        .then((response) => {
            //song data
            this.setState({ data: response.data});
            
            //user profile image
            document.getElementById("song_img").src = response.data.image;
        })
        .catch(error => {
            console.log(error.response)
        });
    }

    render() {

      const { data } = this.state;

      return (
        <div className="App">
          
          <h1>楽しいー \ (;w;) / !!! <br/> YOU GOT NOW SONG</h1>
          <p> {data.name} </p>
          <p> {data.artists} </p>
          <p> {data.url} </p>
          <img id="song_img" alt=''></img>
          
          <br/><br/>
          <a href="/home"><Button> HOME </Button></a>

        </div>
      );
    }
}

export default Playing;
