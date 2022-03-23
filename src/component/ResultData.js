import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Col, Card, Spinner } from 'react-bootstrap';
import "./ResultSearch.css";

export default function ResultData(props) {
    const [allDataList, setDataList] = useState([])
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(30);
    const alphabet = props.alphabet;
    const searchTerm = props.searchTerm;
    const src = props.src;
    function loadMore() { setVisible(visible + 30) }
    const navigate = useNavigate ();

    useEffect(() => {
      if (src==='artists') {
        axios.get("/artists" , { mode: 'cors', crossDomain: true })
          .then((response) => {
            setDataList(response.data);
            setLoading(!loading);
          })
          .catch(error => {
            console.log(error.response)
          });
      }
      if (src==='series') {
        axios.get("/series" , { mode: 'cors', crossDomain: true })
          .then((response) => {
            setDataList(response.data);
            setLoading(!loading);
          })
          .catch(error => {
            console.log(error.response)
          });
      }
    }, []);
    
    function filterData() {
      if (alphabet) {
        const dataList = allDataList
          .filter((data) => { if (data.alphabet.toLowerCase() == alphabet.toLowerCase()) { return data } })
        return dataList
      } else if (!alphabet && src==='artists') {
        const dataList = allDataList
          .filter((data) => { 
            if (searchTerm == "") { return "" } 
            else if (data.artist_id.toLowerCase().replaceAll("-", " ") == searchTerm.toLowerCase()) { return data } 
          })
        return dataList
      } else if (!alphabet && src==='series') {
        const dataList = allDataList
          .filter((data) => { 
            if (searchTerm == "") { return "" } 
            else if (data.serie_id.toLowerCase().replaceAll("-", " ") == searchTerm.toLowerCase()) { return data } 
          })
        return dataList
      }
    }

    function isArtist() { 
      const show = 
        (filterData()
          .slice(0, visible) //selected elements in an array
          .map((artist, index) => {
              return (
              <Card className='card flex-md-row flex-wrap' key={index}>
                  <Card.Body style={{textAlign: 'left'}}>
                  <button className='artist' 
                    onClick={event => { navigate( '/artists/'+ artist.artist_id, 
                                      { state: { artistName: artist.name } }) 
                                      event.preventDefault()
                    }}
                  > <h3 className='artist' id="result-artist" style={{textAlign: 'left'}}>
                      {artist.name}
                    </h3>
                    <p className='subtitle' style={{textAlign: 'left', marginBottom: 0 }}>
                      {artist.artist_id.replace(/-/g, ' ')}
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
        (filterData()
          .slice(0, visible) //selected elements in an array
          .map((series, index) => {
              return (
              <Card className='card flex-md-row flex-wrap' key={index}>
                  <Card.Body style={{textAlign: 'left'}}>
                  <button className='artist' 
                    onClick={event => { navigate( '/series/'+ series.serie_id, 
                                      { state: { seriesName: series.name } }) 
                                      event.preventDefault()
                    }}
                  > <h3 className='artist' id="result-artist" style={{textAlign: 'left'}}>
                      {series.name}
                    </h3>
                    <p className='subtitle' style={{textAlign: 'left', marginBottom: 0 }}>
                      {series.serie_id.replace(/-/g, ' ')}
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
        {loading ? ( 
          <Spinner animation="border" />
        ) : ( 
        <>
          <Col md={12}>
            {filterData().length > 0 ? (showList()) 
            : (<>{ alphabet === null && null }</>)
            }

        {filterData().length > 10 ? //loading
          (<> {visible < filterData().length &&
                <div className="loadMore" style={{ marginTop: 20 }}>
                  <button onClick={() => loadMore()}> Load More </button>
                </div>
          }</>)
        : null
        }

          </Col>
        </>
      )
    
    }
    </React.Fragment>
    )


}