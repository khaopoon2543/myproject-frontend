import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./ResultSearch.css";
import { Card } from 'react-bootstrap';
import TagLevels from "../Levels/TagLevels";
import { Loading, LoadingIMGLevels, NoResult } from "../Loading";
import { backendSrc } from "../backendSrc";
import { reallyShowList, isOnlyNameSeries, resultDetails } from "./ResultSearchFunction"
import { songImageSearch, noSongImageSearch } from "../ImageSong/ImageSongFunction";
import useIsMobileLG from '../useIsMobileLG';
import { checkHeadFilter } from "./HeadFilterResult"

export default function ResultSearch(props) {
  
  //get props from SearchForm.js or Result.js
  const searchTerm = props.searchTerm && props.searchTerm.replace(/\s\s+/g, ' ');
  const searchArtist = props.searchArtist;
  const filter = props.filter; //all lyric song spotify
  const level = props.level; //level from SubLevel.js
  const subArtists = props.subArtists; //subArtists from SubData.js
  const subSeries = props.subSeries; //subSeries from SubData.js
  const searchAll = props.searchAll; //filter 'all' from SearchBar.js

  //console.log({searchTerm, searchArtist, filter, level, subArtists, subSeries, searchAll})
  const [songs_list, setSongsList] = useState([])
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(!searchAll ? 20 : 8);
  function loadMore() { setVisible(visible + 20) }
  const navigate = useNavigate();

  useEffect(() => {
    if ( filter && searchTerm ) {  
      let isMounted = true;
      setLoading(true);
      axios.get(`${backendSrc}/result`, {
                params: { searchTerm : searchTerm,
                          searchArtist : searchArtist,             
                          filter : filter,             
                          subArtists : subArtists
                        }
                })
                .then((response) => {
                  if(isMounted){
                    setSongsList(response.data);
                    console.log(response.data);
                    setLoading(false);
                  }
                })
                .catch(error => {
                  console.log(error.response)
                });  
                return () => { isMounted = false; };
    } 
  }, [ filter, searchTerm ]);

  useEffect(() => {
    if ( filter==='show' && level ) {
      let isMounted = true;
      setLoading(true);
      axios.get(`${backendSrc}/result` , { mode: 'cors', crossDomain: true,
                  params: { filter : filter,             
                            level : level }
                })
                .then((response) => {
                  if(isMounted){
                    setSongsList(response.data);
                    setLoading(false);
                  }
                })
                .catch(error => {
                  console.log(error.response)
                });
                return () => { isMounted = false; };
    }
  }, [ filter, level ]);
  

  const RESULTS = reallyShowList(songs_list, level)
  
  function checkFilter(filter) {
    if (filter==='song' || filter==='artist' || filter==='series') {
      return 'song'
    } else if (filter==='lyric') {
      return 'lyric'
    } 
  }
  
  const screenSize = useIsMobileLG()

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
        {(searchTerm!=="" && !subArtists && !subSeries && filter && filter!=='spotify' && RESULTS.length > 0) &&
          <div className="bg-search-all">
            <h3 className="search-all" id="is-result">
              {checkHeadFilter(checkFilter(filter))}
            </h3>
          </div>
        }

      <div lang="jp">
        {RESULTS?.length > 0 ? (
          RESULTS
          .slice(0, visible) //selected elements in an array
          .map((track, index) => {
            return ( //link to lyric page
              <Card className="lyric flex-row" key={index}
                //onClick={event => { navigate(LyricLink(track)); event.preventDefault(); }}
              >
                {track.pic ? songImageSearch(track.pic) : noSongImageSearch()}
                 
                <Card.Body className="d-block">
                  {resultDetails(searchTerm, track, 'title-subtitle-song')}

                  {(!subArtists || (track.singers?.length>0 && subArtists!==track.artist)) &&
                    <>
                    {resultDetails(searchTerm, track, 'title-subtitle-artist')}
                    </>
                  }

                  {isOnlyNameSeries(track, subSeries)}

                  {filter==='lyric' &&
                    <>
                    {resultDetails(searchTerm, track, 'lyric')}
                    </>
                  }
                </Card.Body>  
                <div className="tagLevel">
                  <TagLevels  levelScore={track.readability_score}
                              isScreenSize={screenSize}
                  />
                </div>
              </Card>
            )
          })
        ) : (
          <div lang="th">
          {(searchAll || searchTerm == "") ? null : 
            <NoResult searchTerm={searchTerm} />
          } 
          </div>
        )}
      </div>

        {(RESULTS?.length > 10)?
          (<>
            {visible < RESULTS?.length &&
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
