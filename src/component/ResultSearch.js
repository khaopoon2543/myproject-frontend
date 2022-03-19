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
  const [visible, setVisible] = useState(6);
  
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

  function checkArtist(track) { return !track.singer ? track.artist : track.singer }

  //from spotify
  function spotifyAll() {
    const spotifyList = IsArtistTerm() ? songs_list
      .filter((track) => {
        if ((
          checkArtist(track).toLowerCase().includes(IsArtistTerm().toLowerCase())
          || track.artist_id.replaceAll("-", "").includes(IsArtistTerm().toLowerCase())
        )&&(
          track.name.toLowerCase().includes(searchTerm.toLowerCase())
          || track.song_id.replaceAll("-", "").includes(searchTerm.toLowerCase())
        )){ return track } 
      }) : null;
    return spotifyList
  }
  function spotifyArtist() {
    const spotifyArtistList = IsArtistTerm() ? songs_list
      .filter((track) => {
        if ((checkArtist(track).toLowerCase().includes(IsArtistTerm().toLowerCase())
            || track.artist_id.replaceAll("-", "").includes(IsArtistTerm().toLowerCase())
            )){ return track } 
      }) : null;
    return spotifyArtistList
  }

  //(default) from SearchForm
  function filterAll() {
    const allList = songs_list
      .filter((track) => {
        if (searchTerm == "") { return "" } 
        else if (track.name.toLowerCase().includes(searchTerm.toLowerCase()) 
                || checkArtist(track).toLowerCase().includes(searchTerm.toLowerCase())
                || track.artist_id.replaceAll("-", "").includes(searchTerm.toLowerCase())
                || track.song_id.replaceAll("-", "").includes(searchTerm.toLowerCase())
                ){ return track }
      })
    return allList
  }
  function filterArtist() {
    const artistList = songs_list
      .filter((track) => {
        if (searchTerm == "") { return "" } 
        else if ((checkArtist(track).toLowerCase().includes(searchTerm.toLowerCase())
                || track.artist_id.replaceAll("-", "").includes(searchTerm.toLowerCase())
                )){ return track } 
      })
    return artistList
  }
  function filterSong() {
    const tracksList = songs_list
      .filter((track) => {
        if (searchTerm == "") { return "" } 
        else if ((track.name.toLowerCase().includes(searchTerm.toLowerCase())
                || track.song_id.replaceAll("-", "").includes(searchTerm.toLowerCase())
                )){ return track } 
      })
    return tracksList
  }
  function filterLyric() {
    const lyricsList = songs_list
      .filter((track) => {
        if (searchTerm == "") { return "" } 
        else if (findWordAndNeighbours(searchTerm, track.lyric)) { return track } 
      })
    return lyricsList
  }

  //check is spotifyAll()?
  function isFormSpotify() {
    const spotifyList = spotifyAll()
    const spotifyArtistList = spotifyArtist()
    if(spotifyList && spotifyList.length > 0) {
      return spotifyList
    } else if(spotifyArtistList && spotifyArtistList.length > 0) {
      return spotifyArtistList
    } return filterAll()
  }

  //select list will show?!
  function isShowList() {
    const filter = IsFilter()
    if (filter === 'lyric') {
      return filterLyric()
    }else if (filter === 'song') {
      return filterSong()
    }else if (filter === 'artist') {
      return filterArtist()
    }else if (filter === 'spotify') { //from Spotify
      return isFormSpotify()
    }
    return filterAll() //default filter --> all
  } 

  function loadMore() { 
    setVisible(visible + 10)
  }

  //test Regex
  function findWordAndNeighbours(searchTerm, lyric) {
    if (searchTerm == "" || !lyric) {
        return false;
    }
    else {
        var re = new RegExp('((\\S+[\\b\\s]?)' + searchTerm + '([\\b\\s]?\\S+))', 'i'),
        matches = lyric.match(re);
        if (matches) {
          var foundWords = lyric.match(re)[0].split(/\s+/),
              foundFragment = foundWords.join(' ');
              return foundFragment
        }
    }
  }
  //const ii = "だあれも知らない私の\nホントの生まれた意味など\n秘密の部屋で作られた\n化学によく似た夜から"
  //console.log(findWordAndNeighbours(searchTerm, ii))

  return (
    <React.Fragment>
    {loading ? ( 
        <Spinner animation="border" />
      ) : ( 
        <><Col md={12}>
        {isShowList().length > 0 ? (
          isShowList()
          .slice(0, visible) //selected elements in an array
          .map((track, index) => {
            return (
                <Card className='card flex-md-row flex-wrap' key={index}>
                  <div className="tagLevel d-flex justify-content-start">
                    <TagLevels levelScore={track.readability_score} /> 
                  </div>
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
                            textToHighlight={!track.singer ? track.artist : track.singer}
                          > <p>{!track.singer ? track.artist : track.singer}</p>
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
                      
                      <br/>

                      { IsFilter() === 'lyric' ?
                      <Highlighter
                        highlightClassName='highlight'
                        searchWords={[searchTerm]}
                        autoEscape={true}
                        textToHighlight={findWordAndNeighbours(searchTerm, track.lyric)}
                        > <span className='subtitle'>
                          {findWordAndNeighbours(searchTerm, track.lyric)}
                          </span>
                      </Highlighter> 

                      : null}
                    
                  </Card.Body>
                </Card>
            )
          })
        ) : (
          <>
          { searchTerm == "" ? (null) : (<p>No Song foud ;-;</p>) } 
          </>
        )}

        {isShowList().length > 10 ?
          (<>
            {visible < isShowList().length &&
              <div className="loadMore" style={{ marginTop: 20 }}>
                <button onClick={() => loadMore()}> Load More </button>
              </div>
            }
          </>)
        : null
        }
        </Col></>
      )
    
    }
    </React.Fragment>
  )

}
