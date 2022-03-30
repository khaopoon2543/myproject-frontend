import { Container } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router-dom';
import ResultSearch from "../component/ResultSearch";

function SubData() {
    const { state } = useLocation();
    const { artistName, seriesName, seriesType } = state;
    const { subArtists, subSeries } = useParams();

    return (
        <Container style={{ marginTop: 50, marginBottom: 50 }}>  
        {artistName ?
          <>
          <h1>{artistName}</h1>  
          <div className="tagLevel" id="title-lyric">
            <p className='subtitle' id="sub-data">
              {subArtists.replace(/-/g, ' ')}
            </p> 
          </div> 
          <Container style={{ marginTop: 30 }}>
            <ResultSearch searchTerm={artistName} filter={'artist'} subArtists={true} />
          </Container> 
          </>
        : 
          <>
          <h4>「{seriesType}」</h4>
          <h1> {seriesName} </h1>  
          <div className="tagLevel" id="title-lyric">
            <p className='subtitle' id="sub-data">
              {subSeries.replace(/-/g, ' ')}
            </p>
          </div>   
          <Container style={{ marginTop: 30 }}>
            <ResultSearch searchTerm={seriesName} filter={'series'} subSeries={true}/>
          </Container> 
          </> 
        }
        </Container>
    );
}
export default SubData;