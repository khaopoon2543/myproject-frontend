import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { Col, Card, Spinner } from 'react-bootstrap';
import Highlighter from "react-highlight-words";
import "./ResultSearch.css";
import TagLevels from "./TagLevels";

export default function ResultSearch(props) {

  const [songs_list, setSongsList] = useState([])
  const [loading, setLoading] = useState(true);
  
  //get props from SearchForm.js or Result.js
  const searchTerm = props.searchTerm;
  function IsArtistTerm() { return props.searchArtist; }
  function IsFilter() { return props.filter; } //all lyric song spotify

  useEffect(() => {
    axios.get("/result", { mode: 'cors', crossDomain: true })
      .then((response) => {
        setSongsList(response.data);
        setLoading(!loading);
      })
      .catch(error => {
        console.log(error.response)
      });
  }, []);

  //from spotify
  const spotifyList = IsArtistTerm() ? 
    songs_list
      .filter((track) => {
        if ((
              track.artist.toLowerCase().includes(IsArtistTerm().toLowerCase())
              || track.artist_id.replaceAll("-", " ").includes(IsArtistTerm().toLowerCase())
            )&&(
              track.name.toLowerCase().includes(searchTerm.toLowerCase())
              || track.song_id.replaceAll("-", " ").includes(searchTerm.toLowerCase())
            )){
          return track
        } 
      }) 
    : null;
  const spotifyArtistList = IsArtistTerm() ? 
    songs_list
      .filter((track) => {
        if ((track.artist.toLowerCase().includes(IsArtistTerm().toLowerCase())
            || track.artist_id.replaceAll("-", " ").includes(IsArtistTerm().toLowerCase())
            )){
          return track
        } 
      }) 
    : null;

  //(default) from SearchForm
  const allList = songs_list
    .filter((track) => {
      if (searchTerm == "") { return "" } 
      else if (track.name.toLowerCase().includes(searchTerm.toLowerCase()) 
              || track.artist.toLowerCase().includes(searchTerm.toLowerCase())
              || track.artist_id.replaceAll("-", " ").includes(searchTerm.toLowerCase())
              || track.song_id.replaceAll("-", " ").includes(searchTerm.toLowerCase())
              ){
        return track
      }
    })
  const artistList = songs_list
      .filter((track) => {
        if (searchTerm == "") { return "" } 
        else if ((track.artist.toLowerCase().includes(searchTerm.toLowerCase())
            || track.artist_id.replaceAll("-", " ").includes(searchTerm.toLowerCase())
            )){
          return track
        } 
    }) 

  //check is spotifyList?
  function isFormSpotify() {
    if(spotifyList && spotifyList.length > 0) {
      return spotifyList
    } else if(spotifyArtistList && spotifyArtistList.length > 0) {
      return spotifyArtistList
    } return allList
  }

  //select list will show?!
  function isShowList() {
    const filter = IsFilter()
    if (filter === 'lyric') {
      return artistList
    }else if (filter === 'song') {
      return allList
    }else if (filter === 'spotify') { //from Spotify
      return isFormSpotify()
    }
    return allList //default filter --> all
  } 

  return (
    <React.Fragment>
    {loading ? ( 
        <Spinner animation="border" />
      ) : ( 
        <><Col md={12}>
        {isShowList().length > 0 ? (
          isShowList()
          .slice(0, 10) //selected elements in an array
          .map((track, index) => {
            return (

                <Card className='card flex-md-row flex-wrap' key={index}>
                  <TagLevels levelScore={track.readability_score} /> 
                    <Card.Body style={{ textAlign: 'left' }}>

                      <Link to={"/lyric/" + track.artist_id + '/' + track.song_id} 
                        className='title' id="song"> 
                        <Highlighter
                            highlightClassName='highlight'
                            searchWords={[searchTerm]}
                            autoEscape={true}
                            textToHighlight={track.name}
                        > <h3 className='title' id="song">{track.name}</h3> 
                        </Highlighter>
                      </Link>

                      <span className='subtitle'>
                      (<Highlighter
                          highlightClassName='highlight'
                          searchWords={[searchTerm]}
                          autoEscape={true}
                          textToHighlight={track.song_id.replace(/-/g, ' ')}
                        > {track.song_id}
                        </Highlighter>
                      )</span> 

                      <br/>

                      <Link to={"/artist/" + track.artist_id} 
                        className='artist' id="artist">
                          <Highlighter
                            highlightClassName='highlightArtist'
                            searchWords={[searchTerm,IsArtistTerm()]}
                            autoEscape={true}
                            textToHighlight={track.artist}
                          > <p>{track.artist}</p>
                          </Highlighter>
                      </Link>

                      <span className='subtitle'>
                          (<Highlighter
                            highlightClassName='highlightArtist'
                            searchWords={[searchTerm]}
                            autoEscape={true}
                            textToHighlight={track.artist_id.replace(/-/g, ' ')}
                            > {track.artist_id}
                          </Highlighter>
                      )</span>
                      
                  </Card.Body>
                </Card>
              
            )
          })
        ) : (
          <>
          { searchTerm == "" ? (null) : (<p>No Song foud ;-;</p>) } 
          </>
        )}
        </Col></>
      )
    
    }
    </React.Fragment>
  )

}
