import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Col, Card } from 'react-bootstrap';
import Highlighter from "react-highlight-words";
import "./ResultSearch.css";
import TagLevels from "../Levels/TagLevels";
import { Loading, LoadingIMGLevels, NoResult } from "../Loading";
import useIsMobile from '../useIsMobile';
import { backendSrc } from "../backendSrc";

export default function ResultSearch(props) {
  
  //get props from SearchForm.js or Result.js
  const searchTerm = props.searchTerm && props.searchTerm.replace(/\s\s+/g, ' ');
  const searchArtist = props.searchArtist;
  const filter = props.filter; //all lyric song spotify
  const level = props.level; //level from SubLevel.js
  const subArtists = props.subArtists; //subArtists from SubData.js
  const subSeries = props.subSeries; //subSeries from SubData.js
  const searchAll = props.searchAll; //filter 'all' from SearchBar.js

  const [songs_list, setSongsList] = useState([])
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(!searchAll ? 20 : 8);
  function loadMore() { setVisible(visible + 10) }
  const navigate = useNavigate ();
  const screenSize = useIsMobile()

  useEffect(() => {
    let isMounted = true; 
    fetchData();
    return () => { isMounted = false };
    
    function fetchData() {
      if ( filter || searchTerm || filter, searchTerm ) {
        setLoading(true);
        axios.get(`${backendSrc}/result`, { mode: 'cors', crossDomain: true,
                  params: { searchTerm : searchTerm,
                            searchArtist : searchArtist,             
                            filter : filter,             
                            level : level,
                            subArtists : subArtists
                          }
                  })
                  .then((response) => {
                    if (isMounted) {
                      setSongsList(response.data);
                      //console.log(response.data)
                    }
                    setLoading(false);
                  })
                  .catch(error => {
                    console.log(error.response)
                  });   
      }
    }
  }, [ filter || searchTerm || filter, searchTerm ]);

  useEffect(() => {
    let isMounted = true; 
    fetchDataLevel();
    return () => { isMounted = false };
    
    function fetchDataLevel() {
      if ( filter==='show' && level) {
        setLoading(true);
        axios.get(`${backendSrc}/result` , { mode: 'cors', crossDomain: true,
                    params: { filter : filter,             
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
    }
  }, [ filter && level ]);

  //test Regex
  function findWordAndNeighbours(searchTerm, lyric) {
    if (searchTerm == "" || !lyric) {
        return false;
    } else {
        var re = new RegExp('((?:^|[\r\n]|\\S+[\\b\\s]?)' + searchTerm + '(?:$|[\r\n]|[\\b\\s]?\\S+))', 'i'),
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

  function isOnlyNameSeries(track) { //filter Series
    if (track.series_info && track.series) {
      return (
          <div className="artist-series">
              <span id="sub-data">{track.series_info.type}</span>
              <span id="sub-data">「</span>
              {!subSeries ? 
                <button id='artist'
                  onClick={event => { navigate('/series/'+ track.series.id.replaceAll(" ","-"), 
                  { state: { seriesName: track.series_info.name, seriesType: track.series_info.type } }) 
                  event.preventDefault()}}
                > {track.series_info.name} &nbsp; 
                </button>
              
              : //subSeries === true
                <span id="sub-data">{track.series_info.name} &nbsp;</span>
              }
              <span id="sub-data">」</span>
              <span id="sub-data">{track.series.theme}</span>
          </div>
        )
    } else if (track.series && track.series.name) { 
        return ( <><br/>{track.series.name}</>)
    }  return null 
        //if change filter from another to 'series' & searchTerm no result in 'series'
        //then app NOT setState(setSongsList) in useEffect!!
  }

  function highlight(searchTerm, track, type) {
    if (type==='title-subtitle-song') { //----------------------- title-subtitle-song ----------------------- //
      return(
        searchTerm ?
        <>
        <button className='title' id="song" 
          onClick={event => {navigate("/lyric/" + track.artist_id.replaceAll(" ","-") + '/' + track.song_id.replaceAll(" ","-")) 
          event.preventDefault()}}
        > <Highlighter
            highlightClassName='highlight'
            searchWords={[searchTerm]}
            autoEscape={true}
            textToHighlight={track.name}
          > <h3 className='title' id="song">{track.name}</h3> 
          </Highlighter>
        </button>
        </>
        :
        <>
        <button className='title' id="song" 
          onClick={event => {navigate("/lyric/" + track.artist_id.replaceAll(" ","-") + '/' + track.song_id.replaceAll(" ","-")) 
          event.preventDefault()}}
        > <h3 className='title' id="song">{track.name}</h3> 
        </button>
        </>
      )
    } else if (type==='title-subtitle-artist') { //----------------------- title-subtitle-artist ----------------------- //
      const artist_id = track.artist_id
      const artist = track.artist
      return(
        searchTerm ?
        <div className="artist-series">
          <span id="sub-data">歌手 </span>
          <button id='artist'
            onClick={event => { navigate("/artists/"+ artist_id.replaceAll(" ","-"),
            { state: { artistName: artist } }) 
            event.preventDefault()}}
          > <Highlighter
              highlightClassName='highlightArtist'
              searchWords={[searchTerm,searchArtist]}
              autoEscape={true}
              textToHighlight={artist}
            > {artist}
            </Highlighter>
          </button> 
        </div>
        :
        <div className="artist-series">
          <span id="sub-data">歌手 </span>
          <button id='artist'
            onClick={event => { navigate("/artists/"+ artist_id.replaceAll(" ","-"),
            { state: { artistName: artist } }) 
            event.preventDefault()}}
          > {artist}
          </button> 
        </div>
      )
    } else if (type==='lyric') { //----------------------- lyric ----------------------- //
      return(
        searchTerm ?
        <span className='subtitle' id='lyric'>
        <Highlighter
          highlightClassName='highlight'
          searchWords={[searchTerm]}
          autoEscape={true}
          textToHighlight={findWordAndNeighbours(searchTerm, track.lyric)}
          > {findWordAndNeighbours(searchTerm, track.lyric)} 
        </Highlighter>
        </span>
        :
        <span className='subtitle' id='lyric'>
          {findWordAndNeighbours(searchTerm, track.lyric)} 
        </span>
      )
    }
  }

  const alignItem = screenSize ? 'lyric flex-wrap flex-md-row d-flex justify-content-left align-items-left' //left
                    : 'lyric flex-wrap flex-md-row d-flex justify-content-left align-items-center' //center
  return (
    <React.Fragment>
    {loading ? ( 
        <>
        {!searchAll ?
          <>
          {filter==='show'&&level ? <LoadingIMGLevels level={level} /> : <Loading />} 
          </>
          : null
        }
        </>
      ) : ( 
      <>
        {(searchTerm!=="" && filter && filter!=='artist' && filter!=='series' && reallyShowList().length > 0) &&
          <div className="bg-search-all">
            <h3 className="search-all">{filter.toUpperCase()}</h3>
          </div>
        }

        {reallyShowList().length > 0 ? (
          reallyShowList()
          .slice(0, visible) //selected elements in an array
          .map((track, index) => {
            return (
            <Link key={index} to={"/lyric/" + track.artist_id.replaceAll(" ","-") + '/' + track.song_id.replaceAll(" ","-")}>
              <Card className={alignItem}>
                <div className="tagLevel d-flex">
                  <TagLevels levelScore={track.readability_score}/>
                </div>
                      
                <Card.Body className="d-block">
                  {highlight(searchTerm, track, 'title-subtitle-song')}

                  {(!subArtists || track.singers.length>0) &&
                    <><br/>
                    {highlight(searchTerm, track, 'title-subtitle-artist')}
                    </>
                  }
                  {filter==='lyric' &&
                    <>
                      {highlight(searchTerm, track, 'lyric')}
                    </>
                  }
                  {isOnlyNameSeries(track)}   
                </Card.Body>

              </Card>
            </Link>
            )
          })
        ) : (
          <>
          {(searchAll || searchTerm == "") ? (null) : (
            <NoResult searchTerm={searchTerm} />
          )} 
          </>
        )}

        {(reallyShowList().length > 10)?
          (<>
            {visible < reallyShowList().length &&
              <div className="load-more">
                <button onClick={() => loadMore()}> Load More </button>
              </div>
            }
          </>)
        : null
        }

      </>
      )
    
    }
    </React.Fragment>
  )

}
