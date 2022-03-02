import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { Col, Card } from 'react-bootstrap';

export default function ResultSearch(props) {

  const [songs_list, setSongsList] = useState([])
  useEffect(() => {
    axios.get("/result", { mode: 'cors', crossDomain: true })
      .then((response) => {
        setSongsList(response.data);
      })
      .catch(error => {
        console.log(error.response)
      });
  }, []);

  const searchTerm = props.searchTerm;
  function IsArtistTerm() {
    return props.searchArtist;
  }

  const spotify_filter_list = IsArtistTerm() ? 
    songs_list
      .filter((track) => {
        if (searchTerm == "") { return "" } 
        
        else if (track.artist.toLowerCase().includes(IsArtistTerm().toLowerCase())
                && track.name.toLowerCase().includes(searchTerm.toLowerCase())
                ){
          return track
        } 
        return ""
      }) 
    : null;

  const filter_list = songs_list
    .filter((track) => {
      if (searchTerm == "") { return "" } 

      else if (track.name.toLowerCase().includes(searchTerm.toLowerCase()) 
              || track.artist.toLowerCase().includes(searchTerm.toLowerCase())
              || track.song_url.toLowerCase().includes(searchTerm.toLowerCase())
              ){
        return track
      }
    })

  return (
    
    (!spotify_filter_list ? filter_list : spotify_filter_list)
    .slice(0, 100) //selected elements in an array
    .map((track, index) => {
        return (
          <Col md={12} key={index}>
            <Card>
                <Card.Body >
                    <Link to={"/lyric/" + track.artist + '/' + track.name}>
                      <Card.Title>{track.name}</Card.Title>
                      <Card.Text>{track.artist}</Card.Text>
                    </Link>
                    <Card.Text>{track.artist_url}</Card.Text>
                </Card.Body>
            </Card>
          </Col>
        )
    })
     
  )

}
