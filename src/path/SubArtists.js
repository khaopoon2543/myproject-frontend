import { Container } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router-dom';
import ResultSearch from "../component/ResultSearch";

function SubArtists() {
    const { state } = useLocation();
    const { artistName } = state;
    const { subArtists } = useParams();

    return (
        <Container style={{ marginTop: 50, marginBottom: 50 }}>  
        
          <h1>{artistName}</h1>  
          <p className='subtitle' id="sub-artist">{subArtists.replace(/-/g, ' ')}</p>  

          <Container style={{ marginTop: 30 }}>
            <ResultSearch searchTerm={artistName} filter={'artist'} subArtists={true} />
          </Container> 

        </Container>
    );
}
export default SubArtists;