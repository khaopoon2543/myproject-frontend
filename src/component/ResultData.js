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
              <Card className='card flex-md-row flex-wrap' key={index}>
                  <Card.Body style={{textAlign: 'left'}}>
                  <button className='artist' 
                    onClick={event => { navigate( '/artists/'+ artist.artist_id.replaceAll(" ","-"), 
                                      { state: { artistName: artist.name } }) 
                                      event.preventDefault()
                    }}
                  > <h3 className='artist' id="result-artist" style={{textAlign: 'left'}}>
                      {artist.name}
                    </h3>
                    <p className='subtitle' style={{textAlign: 'left', marginBottom: 0 }}>
                      {artist.artist_id}
                    </p>  
                  </button>
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
              <Card className='card flex-md-row flex-wrap' key={index}>
                  <Card.Body style={{textAlign: 'left'}}>
                  <button className='artist' 
                    onClick={event => { navigate( '/series/'+ series.series_id.replaceAll(" ","-"), 
                                      { state: { seriesName: series.name, seriesType: series.type } }) 
                                      event.preventDefault()
                    }}
                  > <h3 className='artist' id="result-artist" style={{textAlign: 'left'}}>
                      「{series.type}」 {series.name}
                    </h3>
                    <p className='subtitle' style={{textAlign: 'left', marginBottom: 0 }}>
                      {series.series_id}
                    </p>  
                  </button>
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

    return (
      
      <React.Fragment>
        {loading ? 
          ( 
            <Spinner animation="border" />
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
