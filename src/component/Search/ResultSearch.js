import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from 'axios';
import { Card } from 'react-bootstrap';
import "./ResultSearch.css";
import TagLevels from "../Levels/TagLevels";
import { Loading, LoadingIMGLevels, NoResult } from "../Loading";
import { backendSrc } from "../backendSrc";
import { reallyShowList, isOnlyNameSeries, resultDetails  } from "./ResultSearchFunction"

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
  function loadMore() { setVisible(visible + 10) }
  const navigate = useNavigate();

  useEffect(() => {
    if ( filter && searchTerm ) {  
      setLoading(true);
      axios.get(`${backendSrc}/result`, { mode: 'cors', crossDomain: true,
                params: { searchTerm : searchTerm,
                          searchArtist : searchArtist,             
                          filter : filter,             
                          subArtists : subArtists
                        }
                })
                .then((response) => {
                  setSongsList(response.data);
                  //console.log(response.data)
                  setLoading(false);
                })
                .catch(error => {
                  console.log(error.response)
                });  
    } 
  }, [ filter, searchTerm ]);

  useEffect(() => {
    if ( filter==='show' && level ) {
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
  }, [ filter, level ]);
  

  const RESULTS = reallyShowList(songs_list, level)
          
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
        {(searchTerm!=="" && filter && filter!=='artist' && filter!=='series' && filter!=='spotify' && RESULTS.length > 0) &&
          <div className="bg-search-all">
            <h3 className="search-all" id="is-result">{filter.toUpperCase()}</h3>
          </div>
        }

        {RESULTS?.length > 0 ? (
          RESULTS
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

                  {(!subArtists || (track.singers?.length>0 && subArtists!==track.artist)) &&
                    <><br/>
                    {resultDetails(searchTerm, track, 'title-subtitle-artist', navigate)}
                    </>
                  }

                  {isOnlyNameSeries(track, navigate, subSeries)}

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
        ) : (
          <>
          {(searchAll || searchTerm == "") ? null : 
            <NoResult searchTerm={searchTerm} />
          } 
          </>
        )}

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
