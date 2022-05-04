import { Container, Row, Col } from 'react-bootstrap';
import { useLocation, useParams, Link } from 'react-router-dom';
import ResultSearch from "../component/Search/ResultSearch";

function SubData() {
    const { state } = useLocation();
    const { artistName, seriesName, seriesType } = state;
    const { subArtists, subSeries } = useParams();

    return (
      <Container className="pages"> 
        
        {artistName ?
          <>
          <Row>
          <Col xl={4} >
            <div className="header-left">
              <div className="tag-series">
                <Link to="/artists">
                  <span lang="th" id="button-back"> ศิลปิน </span>
                </Link>
              </div>
              <div className="title-series">
                <h3> {artistName} </h3>  
              </div>
              <div className="sub-title-series">
                <span>{subArtists.replace(/-/g, ' ')}</span>
              </div>
            </div>
          </Col>
          <Col xl={8} > 
            <div>
              <ResultSearch searchTerm={subArtists.replace(/-/g, ' ')} filter={'artist'} subArtists={artistName} />
            </div> 
          </Col>
          </Row>
          </>
        : 
          <>
          <Row>
          <Col xl={4} >
            <div className="header-left">
              <div className="tag-series">
                <Link to="/series">
                  <span lang="th" id="button-back"> ซีรีส์ </span>
                </Link>
                &nbsp;&nbsp; 
                <span id="type"> {seriesType} </span>
              </div>
              <div className="title-series">
                <h3> {seriesName} </h3>  
              </div>
              <div className="sub-title-series">
                <span>{subSeries.replace(/-/g, ' ')}</span>
              </div>
            </div>
          </Col>
          <Col xl={8} > 
            <div className="result-search">
              <ResultSearch searchTerm={subSeries.replace(/-/g, ' ')} filter={'series'} subSeries={seriesName}/>
            </div> 
          </Col>
          </Row> 
          </> 
        }
      </Container>
    );
}
export default SubData;