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
  const [visible, setVisible] = useState(20);
  function loadMore() { setVisible(visible + 10) }
  const navigate = useNavigate ();
  
  //get props from SearchForm.js or Result.js
  const searchTerm = props.searchTerm && props.searchTerm.replace(/\s\s+/g, ' ');
  const searchArtist = props.searchArtist;
  const filter = props.filter; //all lyric song spotify
  const level = props.level; //level from SubLevel.js
  const subArtists = props.subArtists; //subArtists from SubData.js
  const subSeries = props.subSeries; //subSeries from SubData.js

  useEffect(() => {
    if ( filter,searchTerm ) {
      setLoading(true);
      axios.get('/result' , { mode: 'cors', crossDomain: true,
                  params: { searchTerm : searchTerm,
                            searchArtist : searchArtist,             
                            filter : filter,             
                            level : level }
              })
              .then((response) => {
                setSongsList(response.data);
                setLoading(false);
              })
              .catch(error => {
                console.log(error.response)
              });
    }
  }, [ filter,searchTerm ]);

  useEffect(() => { //from SubLevels.js
    if ( filter==='show' ) {
      setLoading(true);
      axios.get('/result' , { mode: 'cors', crossDomain: true,
                  params: { filter : filter }            
              })
              .then((response) => {
                setSongsList(response.data);
                setLoading(false);
              })
              .catch(error => {
                console.log(error.response)
              });
    }
  }, [ filter ]);

  //test Regex
  function findWordAndNeighbours(searchTerm, lyric) {
    if (searchTerm == "" || !lyric) {
        return false;
    } else {
        var re = new RegExp('((\\S+[\\b\\s]?)' + searchTerm + '([\\b\\s]?\\S+))', 'i'),
        matches = lyric.match(re);
        if (matches) {
          var foundWords = lyric.match(re)[0].split(/\s+/),
              foundFragment = foundWords.join(' ');
              return foundFragment
        }
    }
  }

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
    const tracksList = songs_list
      .filter((track) => {
        if (level) { 
          if (checkLevel(track.readability_score) === level) { return track } 
          else { return null }
        } 
        else { return track }
      })
    return tracksList
  }

  function isOnlyNameSeries(track) {
    if (track.series_info) {
        return (
          <><br/>
            「{track.series_info.type}」

            {!subSeries ? 
              <button className='artist' id="artist"
                onClick={event => { navigate('/series/'+ track.series.id.replaceAll(" ","-"),
                { state: { seriesName: track.series_info.name } }) 
                event.preventDefault()}}
              > {track.series_info.name} &nbsp; 
              </button>
            : <>{track.series_info.name} &nbsp;</>
            }

              {track.series.theme}
          </>
    )} else if (track.series && track.series.name) { 
        return (
          <><br/>{track.series.name}</>
    )}  console.log(track.name , track.series)
        return null 
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
                <Card className='lyric flex-wrap flex-md-row' key={index}>
                  <div className="tagLevel d-flex">
                    <TagLevels levelScore={track.readability_score}/>
                  </div>
                    <Card.Body>
                      <Link to={"/lyric/" + track.artist_id.replaceAll(" ","-") + '/' + track.song_id.replaceAll(" ","-")} 
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
                          textToHighlight={track.song_id}
                        > {track.song_id}
                        </Highlighter>
                      )</span> 
                      <br/>

                      {!subArtists ?
                        <>
                        <button className='artist' id="artist" 
                          onClick={event => { navigate('/artists/'+ track.artist_id.replaceAll(" ","-"),
                          { state: { artistName: !track.singer ? track.artist : track.singer } }) 
                          event.preventDefault()}}
                        > <Highlighter
                            highlightClassName='highlightArtist'
                            searchWords={[searchTerm,searchArtist]}
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
                            textToHighlight={track.artist_id}
                            > {track.artist_id}
                          </Highlighter>)
                        </span> 
                        </>
                      : //subArtists === true
                        <>
                        <button className='artist' id="sub-data">
                          <p>{!track.singer ? track.artist : track.singer}</p>
                        </button>
                        <button className='subtitle' id="sub-data">
                          {track.artist_id}
                        </button> 
                        </>
                      }

                      { filter === 'lyric' ?
                      <><br/>
                      <Highlighter
                        highlightClassName='highlight'
                        searchWords={[searchTerm]}
                        autoEscape={true}
                        textToHighlight={findWordAndNeighbours(searchTerm, track.lyric)}
                        > <span className='subtitle'>
                          {findWordAndNeighbours(searchTerm, track.lyric)}
                          </span>
                      </Highlighter></> 
                      : null}

                      {filter === "series" && isOnlyNameSeries(track)}
                    
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
