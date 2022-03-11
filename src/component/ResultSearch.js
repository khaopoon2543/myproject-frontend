import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { Col, Card, Spinner } from 'react-bootstrap';
import Highlighter from "react-highlight-words";

export default function ResultSearch(props) {

  const [songs_list, setSongsList] = useState([])
  const [loading, setLoading] = useState(true);

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

  const searchTerm = props.searchTerm;
  function IsArtistTerm() {
    return props.searchArtist;
  }

  const spotify_filter_list = IsArtistTerm() ? 
    songs_list
      .filter((track) => {
        if ((track.artist.toLowerCase().includes(IsArtistTerm().toLowerCase())
            || track.artist_id.toLowerCase().replaceAll("-", " ").includes(IsArtistTerm().toLowerCase()))
            && track.name.toLowerCase().includes(searchTerm.toLowerCase())
            || track.song_id.toLowerCase().replaceAll("-", " ").includes(searchTerm.toLowerCase())
            ){
          return track
        } 
      }) 
    : null;

  const sort_artist_list = IsArtistTerm() ? 
    songs_list
      .filter((track) => {
        if ((track.artist.toLowerCase().includes(IsArtistTerm().toLowerCase())
            || track.artist_id.toLowerCase().replaceAll("-", " ").includes(IsArtistTerm().toLowerCase())
            )){
          return track
        } 
      }) 
    : null;

  const filter_list = songs_list
    .filter((track) => {
      if (searchTerm == "") { return "" } 
      else if (track.name.toLowerCase().includes(searchTerm.toLowerCase()) 
              || track.artist.toLowerCase().includes(searchTerm.toLowerCase())
              || track.artist_id.toLowerCase().replaceAll("-", " ").includes(searchTerm.toLowerCase())
              || track.song_id.toLowerCase().replaceAll("-", " ").includes(searchTerm.toLowerCase())
              ){
        return track
      }
    })

  //check is spotify_filter_list?
  function isShowList() {
    try {
      if(IsArtistTerm() && spotify_filter_list && spotify_filter_list.length > 0) {
        return spotify_filter_list
      }
      else if(sort_artist_list && sort_artist_list.length > 0) {
        return sort_artist_list
      }
        return filter_list
    } //console.log(isShowList())
    catch(e){
        console.log(e)
    }
  }

  const TITLE = {
    fontWeight: "500",
    textDecorationLine: 'none',
    fontSize: 20,
    color: '#666666'
  }
  const SUBTITLE = {
    fontWeight: "normal",
    fontSize: 14,
    paddingLeft: 10,
    color: '#666666'
  }
  const ARTISTS = {
    textDecorationLine: 'none',
    fontSize: 18,
    color: '#666666'
  }
  const HIGHLIGH= {
    fontWeight: "bold",
    color: '#E85394',
    background: 'none'
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
                <Card style={{ marginBottom: 0 }} key={index}>
                    <Card.Body style={{ textAlign: 'left' }}>
                
                        <Link to={"/lyric/" + track.artist_id + '/' + track.song_id} 
                          style={TITLE}>
                            <Highlighter
                                highlightStyle={HIGHLIGH}
                                searchWords={[searchTerm]}
                                autoEscape={true}
                                textToHighlight={track.name}
                            > <h3>{track.name}</h3> 
                            </Highlighter>

                          <span style={SUBTITLE}>
                          (<Highlighter
                                highlightStyle={HIGHLIGH}
                                searchWords={[searchTerm]}
                                autoEscape={true}
                                textToHighlight={track.song_id.replace(/-/g, ' ')}
                            > {track.song_id}
                            </Highlighter>
                          )</span>
                        </Link>

                        <br/>

                        <Link to={"/artist/" + track.artist_id} 
                          style={ARTISTS}>
                            <Highlighter
                                highlightStyle={HIGHLIGH}
                                searchWords={[searchTerm,IsArtistTerm()]}
                                autoEscape={true}
                                textToHighlight={track.artist}
                            > <p>{track.artist}</p>
                            </Highlighter>
                          
                          <span style={SUBTITLE}>
                          (<Highlighter
                                highlightStyle={HIGHLIGH}
                                searchWords={[searchTerm]}
                                autoEscape={true}
                                textToHighlight={track.artist_id.replace(/-/g, ' ')}
                            > {track.artist_id}
                            </Highlighter>
                          )</span>
                        </Link>

                    </Card.Body>
                </Card>
            )
          })
        ) : (
          <p>No Song foud ;-;</p>
        )}
        </Col></>
      )
    
    }
    </React.Fragment>
  )

}
