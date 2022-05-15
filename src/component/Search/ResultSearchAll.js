import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Card } from 'react-bootstrap';
import "./ResultSearch.css";
import TagLevels from "../Levels/TagLevels";
import { Loading, NoResult } from "../Loading";
import { backendSrc } from "../backendSrc";

import { reallyShowList, isOnlyNameSeries, resultDetails  } from "./ResultSearchFunction"
import { isArtist, isSeries } from "./ResultDataFunction"
import { LyricLink } from "../linkPath"

export default function ResultSearchAll(props) {
  
  const searchTerm = props.searchTerm && props.searchTerm.replace(/\s\s+/g, ' ');
  const level = props.level; //level from SubLevel.js

  const [songs_list, setSongsList] = useState([])
  const [lyric_list, setLyricList] = useState([])
  const [artists_list, setArtistsList] = useState([])
  const [series_list, setSeriesList] = useState([])
  const navigate = useNavigate();

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
        let isMounted = true; 
        setLoading(true);
        getData().then(() => {
          if (isMounted) {
            setLoading(false);
          }
        });
      
      return () => { isMounted = false; };
    }
    async function getData(){
      const all = 
        await axios.get(`${backendSrc}/result/song`, { params: { searchTerm : searchTerm } })
                .then((response) => {
                  setSongsList(response.data);
                })
      const allLyric = 
        await axios.get(`${backendSrc}/result/lyric`, { params: { searchTerm : searchTerm } })
                .then((response) => {
                  setLyricList(response.data);
                })
      const allArtists =                 
        await axios.get(`${backendSrc}/artists`, { params: { searchTerm : searchTerm } })
                .then((response) => {
                  setArtistsList(response.data);
                })
      const allSeries = 
        await axios.get(`${backendSrc}/series`, { params: { searchTerm : searchTerm } })
                .then((response) => {
                  setSeriesList(response.data);
                })
      return {all,allLyric,allArtists,allSeries}
  
  } 
  }, [ searchTerm ]);
 

  const RESULTS_SONG = songs_list.length > 0 && reallyShowList(songs_list, level)
  const RESULTS_LYRIC = lyric_list.length > 0 &&  reallyShowList(lyric_list, level)
  const RESULTS_ARTIST = artists_list.length > 0 && isArtist(artists_list, visible_artist)
  const RESULTS_SERIES = series_list.length > 0 && isSeries(series_list, visible_series)

  const ARTISTS = 
    <>
      <div className="bg-search-all">
        <h3 className="search-all" id="is-result">ศิลปิน</h3>
      </div>
      {RESULTS_ARTIST}
      {LOAD_MORE('artist', RESULTS_ARTIST, visible_artist)}
    </>

  const SERIES = 
    <>
      <div className="bg-search-all">
        <h3 className="search-all" id="is-result">ซีรีส์</h3>
      </div>
      {RESULTS_SERIES}
      {LOAD_MORE('series', RESULTS_SERIES, visible_series)}
    </>

  function SONG_LYRIC(filter, result, visible) {
    return (
    <>
        <div className="bg-search-all">
          <h3 className="search-all" id="is-result">
            {filter==='song' ? 'เพลง' : 'เนื้อเพลง'}
          </h3>
        </div>

      <div lang="jp">
        {result?.length > 0 && (
          result
          .slice(0, visible) //selected elements in an array
          .map((track, index) => {
            return ( //link to lyric page
              <Card className="lyric flex-md-row" key={index}
                //onClick={event => { navigate(LyricLink(track)); event.preventDefault(); }}
              >
                <div className="tagLevel">
                  <TagLevels levelScore={track.readability_score}/>
                </div>
                <Card.Body className="d-block">
                  {resultDetails(searchTerm, track, 'title-subtitle-song')}
                  {resultDetails(searchTerm, track, 'title-subtitle-artist')}
                  {isOnlyNameSeries(track)}
                  {filter==='lyric' &&
                    <>
                      {resultDetails(searchTerm, track, 'lyric')}
                    </>
                  }
                </Card.Body> 
              </Card>
            )
          })
        )}
      </div>
        {LOAD_MORE(filter, result, visible)}
    </>
  )}

  return (
    <React.Fragment>

    {loading ? ( 
        <Loading />
      ) : ( 
      <>
        {!level ?
          <>
            {( ((RESULTS_SONG?.length===0)||(!RESULTS_SONG)) && ((RESULTS_SONG?.length===0)||(!RESULTS_LYRIC)) 
                && !RESULTS_ARTIST && !RESULTS_SERIES ) ?
              <>
                { (searchTerm === "") ? null : <NoResult searchTerm={searchTerm}/> } 
              </>
            :
              <>
                {(RESULTS_SONG?.length>0) && SONG_LYRIC('song', RESULTS_SONG, visible_song)}
                {(RESULTS_LYRIC?.length>0) && SONG_LYRIC('lyric', RESULTS_LYRIC, visible_lyric)}
                {(RESULTS_ARTIST) && ARTISTS}
                {(RESULTS_SERIES) && SERIES}
              </>
            }
          </>
          :
          <>
            {( ((RESULTS_SONG?.length===0)||(!RESULTS_SONG)) && ((RESULTS_SONG?.length===0)||(!RESULTS_LYRIC)) ) ?
            
              <>
                { (searchTerm === "") ? null : <NoResult searchTerm={searchTerm}/> } 
              </>
            :
              <>
                {(RESULTS_SONG?.length>0) && SONG_LYRIC('song', RESULTS_SONG, visible_song)}
                {(RESULTS_LYRIC?.length>0) && SONG_LYRIC('lyric', RESULTS_LYRIC, visible_lyric)}
              </>
            }
          </>
        }

      </>
      )
    
    }
    </React.Fragment>
  )

}
