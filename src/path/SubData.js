import React, { useEffect, useState } from "react";
import axios from 'axios';
import { backendSrc } from "../component/backendSrc";
import { Loading } from "../component/Loading";

import { Container, Row, Col } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import ResultSearch from "../component/Search/ResultSearch";

function SubData() {
    const { subArtists, subSeries } = useParams();
    const [artistName, setArtistName] = useState();
    const [seriesInfo, setSeriesInfo] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      if ( subArtists ) {  
        let isMounted = true;
        setLoading(true);
        axios.get(`${backendSrc}/artists`, { params: { searchTerm : subArtists.replace(/-/g, ' '), subArtists: true } })
                  .then((response) => {
                    if(isMounted){
                      setArtistName(response.data.name);
                      setLoading(false);
                    }
                  }) 
                  return () => { isMounted = false; };
      } 
    }, [ subArtists ]);

    useEffect(() => {
      if ( subSeries ) {  
        let isMounted = true;
        setLoading(true);
        axios.get(`${backendSrc}/series`, { params: { searchTerm : subSeries.replace(/-/g, ' '), subSeries: true } })
                  .then((response) => {
                    if(isMounted){
                      setSeriesInfo(response.data);
                      setLoading(false);
                    }
                  }) 
                  return () => { isMounted = false; };
      } 
    }, [ subSeries ]);

    //if (loading) return <Loading/>
    return (
      <Container className="pages"> 
      
        {(subArtists&&artistName) &&
          <>
          <Row>
            <Col xl={4} >
              <div className="header-left">
                <div className="tag-series">
                  <Link to="/artists">
                    <span id="button-back"> ศิลปิน </span>
                  </Link>
                </div>
                <div lang="jp">
                  <h3 className="title-series"> {artistName} </h3>  
                  <span className="sub-title-series">{subArtists.replace(/-/g, ' ')}</span>
                </div>
              </div>
            </Col>
            <Col xl={8} > 
              <div className="result-search">
                <ResultSearch searchTerm={subArtists.replace(/-/g, ' ')} filter={'artist'} subArtists={artistName} />
              </div> 
            </Col>
          </Row>
          </>
        }

        {(subSeries&&seriesInfo) &&
          <>
          <Row>
            <Col xl={4} >
              <div className="header-left">
                <div className="tag-series">
                  <Link to="/series">
                    <span id="button-back"> ซีรีส์ </span>
                  </Link>
                  &nbsp;&nbsp; 
                  <span id="type" lang="jp"> {seriesInfo.type} </span>
                </div>
                <div lang="jp">
                  <h3 className="title-series"> {seriesInfo.name} </h3>  
                  <span className="sub-title-series">{subSeries.replace(/-/g, ' ')}</span>
                </div>
              </div>
            </Col>
            <Col xl={8} > 
              <div className="result-search">
                <ResultSearch searchTerm={subSeries.replace(/-/g, ' ')} filter={'series'} subSeries={true}/>
              </div> 
            </Col>
          </Row> 
          </> 
        }

      </Container>
    );
}
export default SubData;