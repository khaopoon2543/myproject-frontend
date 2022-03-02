import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Button } from 'react-bootstrap';

function Playing() {

    const [dataTrack, setDataTrack] = useState([])

    useEffect(() => {
      axios.get("/playing", { mode: 'cors', crossDomain: true }) 
          .then((response) => {
              //song data
              setDataTrack(response.data);
              //user profile image
              document.getElementById("song_img").src = response.data.image;
          })
          .catch(error => {
              console.log(error.response)
          });
    }, []);
    
    const navigate = useNavigate ();
    const onFormSubmit = e => {
      navigate('/result='+ dataTrack.artists + dataTrack.name,
              { state: { key:dataTrack.name, artist:dataTrack.artists }})
      e.preventDefault()
    }

      return (
        <div className="App">
          
          <h1>楽しいー \ (;w;) / !!! <br/> YOU GOT NOW SONG</h1>
          <p> {dataTrack.name} </p>
          <p> {dataTrack.artists} </p>

          <Button onClick={onFormSubmit}> Search in Kashify </Button>

          <p> {dataTrack.url} </p>
          <img id="song_img" alt=''></img>
          
          <br/><br/>
          <a href="/home"><Button> HOME </Button></a>

        </div>
      );
    
}

export default Playing;
