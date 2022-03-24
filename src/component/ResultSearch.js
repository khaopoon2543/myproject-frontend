import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Col, Card, Spinner } from 'react-bootstrap';
import Highlighter from "react-highlight-words";
import "./ResultSearch.css";
import TagLevels from "./TagLevels";

export default function ResultSearch(props) {

  const [songs_list, setSongsList] = useState([])
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(6);
  const navigate = useNavigate ();
  
  //get props from SearchForm.js or Result.js
  const searchTerm = props.searchTerm;
  function IsArtistTerm() { return props.searchArtist; }
  function IsFilter() { return props.filter; } //all lyric song spotify
  function IsLevel() { return props.level; } //level from SubLevel.js
  function IsSubArtists() { return props.subArtists; } //level from SubArtists.js

  const fetchResult = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/result', 
        { mode: 'cors', crossDomain: true,
          params: { 
            searchTerm : searchTerm,
            searchArtist : IsArtistTerm(),             
            filter : IsFilter(),             
            level : IsLevel()
          }
        
      });
      setSongsList(response.data)
      setLoading(false);
    } catch (error) { // catch error
      throw new Error(error.message)
    }
  }
  useEffect(() => {
    fetchResult();
    }, []);

  function checkArtist(track) { return !track.singer ? track.artist : track.singer }
  function loadMore() { setVisible(visible + 10) }

  //from spotify
  function spotifyAll() {
    const spotifyList = IsArtistTerm() ? songs_list
      .filter((track) => {
        if ((
          checkArtist(track).toLowerCase().includes(IsArtistTerm().toLowerCase())
          || track.artist_id.replaceAll("-", " ").includes(IsArtistTerm().toLowerCase())
        )&&(
          track.name.toLowerCase().includes(searchTerm.toLowerCase())
          || track.song_id.replaceAll("-", " ").includes(searchTerm.toLowerCase())
        )){ return track } 
      }) : null;
    return spotifyList
  }
  function spotifyArtist() {
    const spotifyArtistList = IsArtistTerm() ? songs_list
      .filter((track) => {
        if ((checkArtist(track).toLowerCase().includes(IsArtistTerm().toLowerCase())
            || track.artist_id.replaceAll("-", " ").includes(IsArtistTerm().toLowerCase())
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
                || track.artist_id.replaceAll("-", " ").includes(searchTerm.toLowerCase())
                || track.song_id.replaceAll("-", " ").includes(searchTerm.toLowerCase())
                ){ return track }
      })
    return allList
  }
  function filterArtist() {
    const artistList = songs_list
      .filter((track) => {
        if (searchTerm == "") { return "" } 
        else if ((checkArtist(track).toLowerCase().includes(searchTerm.toLowerCase())
                || track.artist_id.replaceAll("-", " ").includes(searchTerm.toLowerCase())
                || track.artist_id.includes(searchTerm.toLowerCase()) //search from SubArtist.js
                )){ return track } 
      })
    return artistList
  }
  function filterSeries() {
    const seriesList = songs_list
      .filter((track) => {
        if (searchTerm == "") { return "" } 
        else if ((track.series.id.toLowerCase().includes(searchTerm.toLowerCase())
                || track.series.name.replaceAll("-", " ").includes(searchTerm.toLowerCase())
                || track.series.id.includes(searchTerm.toLowerCase()) //search from SubSeries.js
                )){ return track }
      })
    return seriesList
  }
  function filterSong() {
    const tracksList = songs_list
      .filter((track) => {
        if (searchTerm == "") { return "" } 
        else if ((track.name.toLowerCase().includes(searchTerm.toLowerCase())
                || track.song_id.replaceAll("-", " ").includes(searchTerm.toLowerCase())
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
    }else if (filter === 'show') { //from Spotify
      return songs_list //show result (no searchTerm) at SubLevel.js
    }
    return filterAll() //default filter 'all'
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

  function checkLevel(levelScore) {
    if (0.5 <= levelScore && levelScore <= 1.49) {
        return 'very-difficult'
    } else if (1.5 <= levelScore && levelScore <= 2.49) {
        return 'difficult'
    } else if (2.5 <= levelScore && levelScore <= 3.49) {
        return 'slightly-difficult'
    } else if (3.5 <= levelScore && levelScore <= 4.49) {
        return 'so-so'
    } else if (4.5 <= levelScore && levelScore <= 5.49) {
        return 'easy'
    }
    return 'very-easy'
  }

  function reallyShowList() {
    const songs_list = isShowList()
    const tracksList = songs_list
      .filter((track) => {
        if (IsLevel()) { 
          if (checkLevel(track.readability_score) === IsLevel()) { return track } 
          else { return null }
        } 
        else { return track }
      })
    return tracksList
  }

  return (
    <React.Fragment>
    {loading ? ( 
      <Spinner animation="border" />
      ) : ( 
      <><Col md={12}>
      {reallyShowList().length > 0 ? (
        reallyShowList()
        .slice(0, visible) //selected elements in an array
        .map((track, index) => {
          return (
                <Card className='flex-wrap flex-md-row' key={index}>
                  <div className="tagLevel d-flex">
                    <TagLevels levelScore={track.readability_score}/>
                  </div>
                    <Card.Body>
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
                        > {track.song_id.replace(/-/g, ' ')}
                        </Highlighter>
                      )</span> 
                      <br/>

                      {!IsSubArtists() ?
                        <>
                        <button className='artist' id="artist" 
                          onClick={event => { navigate('/artists/'+ track.artist_id,
                          { state: { artistName: !track.singer ? track.artist : track.singer } }) 
                          event.preventDefault()}}
                        > <Highlighter
                            highlightClassName='highlightArtist'
                            searchWords={[searchTerm,IsArtistTerm()]}
                            autoEscape={true}
                            textToHighlight={!track.singer ? track.artist : track.singer}
                          > <p>{!track.singer ? track.artist : track.singer}</p>
                          </Highlighter>
                        </button>
                        <span className='subtitle'>
                          (<Highlighter
                            highlightClassName='highlightArtist'
                            searchWords={[searchTerm]}
                            autoEscape={true}
                            textToHighlight={track.artist_id.replace(/-/g, ' ')}
                            > {track.artist_id.replace(/-/g, ' ')}
                          </Highlighter>)
                        </span> 
                        </>
                      : //IsSubArtists() === true
                        <>
                        <button className='artist' id="sub-artist">
                          <p>{!track.singer ? track.artist : track.singer}</p>
                        </button>
                        <button className='subtitle' id="sub-artist">
                          {track.artist_id.replace(/-/g, ' ')}
                        </button> 
                        </>
                      }

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
          { searchTerm == "" ? (null) : (
            <div style={{ marginTop: 100 }}>
              <p>No Result Found (T^T)</p>
            </div>
          ) } 
          </>
        )}

        {reallyShowList().length > 10 ?
          (<>
            {visible < reallyShowList().length &&
              <div className="loadMore" style={{ marginTop: 50 }}>
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
