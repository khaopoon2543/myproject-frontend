import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Col, Card } from 'react-bootstrap';
import "./ResultSearch.css";
import useIsMobile from '../useIsMobile';
import { Loading } from "../Loading";

import { backendSrc } from "../backendSrc";
import { RiUserStarLine } from 'react-icons/ri';

const TAGARTIST = {
  fontSize:25,
  lineHeight:3,
}

export default function ResultData(props) {
    const alphabet = props.alphabet;
    const searchTerm = props.searchTerm;
    const searchAll = props.searchAll; //filter 'all' from SearchBar.js

    const src = props.src;
    const [allDataList, setDataList] = useState([])
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(!searchAll ? 30 : 8);
    function loadMore() { setVisible(visible + 30) }
    const navigate = useNavigate ();
    const screenSize = useIsMobile()

    useEffect(() => {
      if (alphabet || searchTerm) {
        setLoading(true);
        axios.get(`${backendSrc}/${src}` , { params: { alphabet : alphabet, searchTerm : searchTerm }
          })
          .then((response) => {
            setDataList(response.data);
            setLoading(false);
          })
          .catch(error => {
            console.log(error.response)
          });
      }
    }, [alphabet || searchTerm]);

    const alignItem = screenSize ? 'data flex-wrap flex-md-row d-flex justify-content-left align-items-left' //left
                    : 'data flex-wrap flex-md-row d-flex justify-content-left align-items-center' //center

    function isArtist() { 
      const show = 
        (allDataList
          .slice(0, visible) //selected elements in an array
          .map((artist, index) => {
              return (
                <Card className={alignItem} key={index} 
                  onClick={event => { navigate( '/artists/'+ artist.artist_id.replaceAll(" ","-"), 
                          { state: { artistName: artist.name } }) 
                          event.preventDefault()
                  }}
                > {!screenSize &&
                    <div className="tagLevel d-flex">
                      <p id="tag-data" style={TAGARTIST}><RiUserStarLine/></p>
                    </div>
                  }
                  <Card.Body className='d-block artist-series-data'>
                    <button id='data'> 
                      {artist.name}
                    </button>
                    <p className='subtitle'>
                      {artist.artist_id}
                    </p>  
                  </Card.Body>
                </Card>
          )})
        )
      return show
    }

    function isSeries() { 
      const show = 
        (allDataList
          .slice(0, visible) //selected elements in an array
          .map((series, index) => {
              return (
                <Card className={alignItem} key={index} 
                  onClick={event => { navigate( '/series/'+ series.series_id.replaceAll(" ","-"), 
                          { state: { seriesName: series.name, seriesType: series.type } }) 
                          event.preventDefault()
                  }}
                >
                  <div className="tagLevel d-flex">
                    <p id="tag-data">「{series.type}」</p>
                  </div>
                  <Card.Body className='artist-series-data'>
                    <button id='data'> 
                      {series.name}
                    </button>
                    <p className='subtitle'>
                      {series.series_id}
                    </p>  
                  </Card.Body>
                </Card>
          )})
        )
      return show
    }

    function showList() {
      if (src==='artists') {
        return isArtist()
      } return isSeries()
    }

    function showLoading() {
      if (alphabet) { //is Data.js (Artist or Series)
        return <Loading />
      } else { //is SearchBar.js
        return null
      }
    }

    return (
      
      <React.Fragment>
        {loading ? 
          ( 
            showLoading()
          ) : 
          ( <>
            <Col md={12}>
              {(!alphabet && allDataList.length > 0) &&
                <div className="bg-search-all">
                  <h3 className="search-all">{src.toUpperCase()}</h3>
                </div>
              }
              {allDataList.length > 0 && (
                showList()
              )}

              {(alphabet && allDataList.length>10) ? //loading
                (<> 
                  {visible<allDataList.length &&
                    (<>
                      {!searchAll ?
                        <div className="load-more">
                          <button onClick={() => loadMore()}> Load More </button>
                        </div>
                        : 
                        <div style={{textAlign: 'right'}}>
                          <button onClick={() => loadMore()}> Load More </button>
                        </div>
                      } 
                      </>)
                  }
                </>)
                : null
              }
            </Col>
          </>)
        }
      </React.Fragment>  
    ) 
}
