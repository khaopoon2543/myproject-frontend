import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { Col, Card } from 'react-bootstrap';

export default function ResultSearch(props) {

  const searchTerm = props.searchTerm;

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

  return (

    songs_list.filter((track) => {
        if (searchTerm == "") {
          return ""
        //} else if ( track.name.toLowerCase().includes(searchTerm.toLowerCase()) && track.artist.toLowerCase().includes(searchArtist.toLowerCase()) ) {
          //return track
        } else if (track.name.toLowerCase().includes(searchTerm.toLowerCase()) 
                  || track.artist.toLowerCase().includes(searchTerm.toLowerCase())
                  || track.song_url.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
          return track
        } 
    }).slice(0, 30) //selected elements in an array
    .map((track, index) => {
        return (
          <Col md={12} key={index}>
            <Card>
                <Card.Body >
                    <Link to={"/lyric/" + track.artist + '/' + track.name}>
                      <Card.Title>{track.name}</Card.Title>
                      <Card.Text>{track.artist}</Card.Text>
                    </Link>
                </Card.Body>
            </Card>
          </Col>
        )
    })
     
  )

}
