import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Col, Card, Spinner } from 'react-bootstrap';
import "./ResultSearch.css";

export default function ResultData(props) {
    const alphabet = props.alphabet;
    const searchTerm = props.searchTerm;
    const src = props.src;
    const [allDataList, setDataList] = useState([])
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(30);
    function loadMore() { setVisible(visible + 30) }
    const navigate = useNavigate ();

    useEffect(() => {
      if (alphabet || searchTerm) {
        setLoading(true);
        axios.get(`/${src}` , { mode: 'cors', crossDomain: true,
                    params: { alphabet : alphabet, searchTerm : searchTerm }
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
    

    function isArtist() { 
      const show = 
        (allDataList
          .slice(0, visible) //selected elements in an array
          .map((artist, index) => {
              return (
                <Card className='data flex-wrap flex-md-row' key={index} 
                  onClick={event => { navigate( '/artists/'+ artist.artist_id.replaceAll(" ","-"), 
                          { state: { artistName: artist.name } }) 
                          event.preventDefault()
                  }}
                > <div className="tagLevel d-flex">
                    <p id="tag-data" style={{fontSize:20}}>{artist.alphabet}</p>
                  </div>
                  <Card.Body>
                    <button className='artist' id='data'> 
                      <span className='artist' id="result-data">
                        {artist.name}
                      </span>
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
                <Card className='data flex-wrap flex-md-row' key={index} 
                  onClick={event => { navigate( '/series/'+ series.series_id.replaceAll(" ","-"), 
                          { state: { seriesName: series.name, seriesType: series.type } }) 
                          event.preventDefault()
                  }}
                >
                  <div className="tagLevel d-flex">
                    <p id="tag-data">「{series.type}」</p>
                  </div>
                  <Card.Body>
                    <button className='artist' id='data'> 
                      <span className='artist' id="result-data">
                          {series.name}
                      </span>
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
        return (<Spinner animation="border" />)
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
              {allDataList.length > 0 ? (showList()) 
              : (<>{ alphabet === null && null }</>)
              }

              {allDataList.length > 10 ? //loading
                (<> {visible < allDataList.length &&
                      <div className="loadMore" style={{ marginTop: 20 }}>
                        <button onClick={() => loadMore()}> Load More </button>
                      </div>
                }</>)
                : null
              }
            </Col>
          </>)
        }
      </React.Fragment>  
    ) 
}
