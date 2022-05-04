import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from 'axios';
import { Card } from 'react-bootstrap';
import "./ResultSearch.css";
import TagLevels from "../Levels/TagLevels";
import { Loading, NoResult } from "../Loading";
import { backendSrc } from "../backendSrc";

import { reallyShowList, isOnlyNameSeries, resultDetails  } from "./ResultSearchFunction"
import { isArtist, isSeries } from "./ResultDataFunction"

export default function ResultSearchAll(props) {
  
  const searchTerm = props.searchTerm && props.searchTerm.replace(/\s\s+/g, ' ');
  const level = props.level; //level from SubLevel.js
  const navigate = useNavigate();

  const [songs_list, setSongsList] = useState([])
  const [lyric_list, setLyricList] = useState([])
  const [artists_list, setArtistsList] = useState([])
  const [series_list, setSeriesList] = useState([])

  const [loading, setLoading] = useState(false);

  const [visible_song, setVisibleSong] = useState(8);
  const [visible_artist, setVisibleArtist] = useState(8);
  const [visible_lyric, setVisibleLyric] = useState(8);
  const [visible_series, setVisibleSeries] = useState(8);

  function loadMoreSong() { setVisibleSong(visible_song + 10) }
  function loadMoreArtist() { setVisibleArtist(visible_artist + 10) }
  function loadMoreLyric() { setVisibleLyric(visible_lyric + 10) }
  function loadMoreSeries() { setVisibleSeries(visible_series + 10) }

  function LOAD_MORE(filter, result, visible) {
    function check_filter(filter) {
      if (filter==='song') { return loadMoreSong()}
      else if (filter==='artist') { return loadMoreArtist()}
      else if (filter==='lyric') { return loadMoreLyric()}
      else if (filter==='series') { return loadMoreSeries()}
    }
    if (result?.length > 10) {
      if (visible < result?.length) {
        return (
          <div className="load-more">
            <button onClick={() => check_filter(filter)}> Load More </button>
          </div>
        )
      }
    }
  }

  useEffect(() => {
    if ( searchTerm ) {  
      setLoading(true);
      getData()
    async function getData(){
      const all = 
        await axios.get(`${backendSrc}/result/song`, { params: { searchTerm : searchTerm } })
                .then((response) => {
                  setSongsList(response.data);
                })
                .catch(error => {
                  console.log(error.response)
                });  

        axios.get(`${backendSrc}/result/lyric`, { params: { searchTerm : searchTerm } })
                .then((response) => {
                  setLyricList(response.data);
                })
                .catch(error => {
                  console.log(error.response)
                });  

        axios.get(`${backendSrc}/artists`, { params: { searchTerm : searchTerm } })
                .then((response) => {
                  setArtistsList(response.data);
                })
                .catch(error => {
                  console.log(error.response)
                });

        axios.get(`${backendSrc}/series`, { params: { searchTerm : searchTerm } })
                .then((response) => {
                  setSeriesList(response.data);
                })
                .catch(error => {
                  console.log(error.response)
                });
      setLoading(false);
      return all
    }
  
  } 
  }, [ searchTerm ]);
 

  const RESULTS_SONG = songs_list.length > 0 && reallyShowList(songs_list, level)
  const RESULTS_LYRIC = lyric_list.length > 0 &&  reallyShowList(lyric_list, level)
  const RESULTS_ARTIST = artists_list.length > 0 && isArtist(artists_list, visible_artist, navigate)
  const RESULTS_SERIES = series_list.length > 0 && isSeries(series_list, visible_series, navigate)

  const ARTISTS = 
    <>
      <div className="bg-search-all">
        <h3 className="search-all" id="is-result">ARTISTS</h3>
      </div>
      {RESULTS_ARTIST}
      {LOAD_MORE('artist', RESULTS_ARTIST, visible_artist)}
    </>

  const SERIES = 
    <>
      <div className="bg-search-all">
        <h3 className="search-all" id="is-result">SERIES</h3>
      </div>
      {RESULTS_SERIES}
      {LOAD_MORE('series', RESULTS_SERIES, visible_series)}
    </>

  function SONG_LYRIC(filter, result, visible) {
    return (
    <>
        <div className="bg-search-all">
          <h3 className="search-all" id="is-result">
            {filter==='song' ? 'SONGS' : 'LYRIC'}
          </h3>
        </div>
        {result?.length > 0 && (
          result
          .slice(0, visible) //selected elements in an array
          .map((track, index) => {
            return (
            <Link key={index} to={"/lyric/" + track.artist_id.replaceAll(" ","-") + '/' + track.song_id.replaceAll(" ","-")}>
              <Card className="lyric flex-md-row">
                <div className="tagLevel">
                  <TagLevels levelScore={track.readability_score}/>
                </div>
                <Card.Body className="d-block">
                  {resultDetails(searchTerm, track, 'title-subtitle-song', navigate)}

                    <><br/>
                    {resultDetails(searchTerm, track, 'title-subtitle-artist', navigate)}
                    </>
                    
                  {isOnlyNameSeries(track, navigate)}

                  {filter==='lyric' &&
                    <>
                    {resultDetails(searchTerm, track, 'lyric', navigate)}
                    </>
                  }
                </Card.Body> 
              </Card>
            </Link>
            )
          })
        )}
        {LOAD_MORE('song', result, visible)}
    </>
  )}
          
  return (
    <React.Fragment>
    {loading ? ( 
        <Loading />
      ) : ( 
      <>
        {(!RESULTS_SONG && !RESULTS_LYRIC && !RESULTS_ARTIST && !RESULTS_SERIES) ?
          <>
            { (searchTerm == "") ? null : <NoResult searchTerm={searchTerm}/> } 
          </>
        :
          <>
            {(RESULTS_SONG) && SONG_LYRIC('song', RESULTS_SONG, visible_song)}
            {(RESULTS_LYRIC) && SONG_LYRIC('lyric', RESULTS_LYRIC, visible_lyric)}

            {(!level&&RESULTS_ARTIST) && ARTISTS}
            {(!level&&RESULTS_SERIES) && SERIES}
          </>
        }
      </>
      )
    
    }
    </React.Fragment>
  )

}
