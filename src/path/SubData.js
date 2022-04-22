import { Container, Row, Col } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router-dom';
import ResultSearch from "../component/Search/ResultSearch";

function SubData() {
    const { state } = useLocation();
    const { artistName, seriesName, seriesType } = state;
    const { subArtists, subSeries } = useParams();

    return (
        <Container className="pages"> 
        <Row>
        {artistName ?
          <>
          <Col xl={4} >
            <div className="header-left">
              <h2>{artistName}</h2>
              <p className='subtitle' id="sub-data">
                <strong>{subArtists.replace(/-/g, ' ')}</strong>
              </p> 
              <br/>
            </div>
          </Col>
          <Col xl={8} > 
            <div style={{ marginTop: 0 }}>
              <ResultSearch searchTerm={subArtists.replace(/-/g, ' ')} filter={'artist'} subArtists={artistName} />
            </div> 
          </Col>
          </>
        : 
          <>
          <Col xl={4} >
            <div className="header-left">
              <div className="tagLevel d-flex">
                <h4 id="tag-data">「{seriesType}」</h4>
              </div>
              <h2> {seriesName} </h2>  
              <p className='subtitle' id="sub-data">
                <strong>{subSeries.replace(/-/g, ' ')}</strong>
              </p>
              <br/>
            </div>
          </Col>
          <Col xl={8} > 
            <div style={{ marginTop: 0 }}>
              <ResultSearch searchTerm={subSeries.replace(/-/g, ' ')} filter={'series'} subSeries={seriesName}/>
            </div> 
          </Col>
          </> 
        }
        </Row> 
        </Container>
    );
}
export default SubData;