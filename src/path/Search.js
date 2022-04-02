import { Container, Row, Col } from 'react-bootstrap';
import SearchBar from "../component/SearchBar";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

function Search() {

  return (
    <Container style={{ marginTop: 50, marginBottom: 50 }}>
      <Row>

        <Col xl={3}>
          <h1 lang="th" className="font-bold">ค้นหาเพลง <FontAwesomeIcon icon="fa-solid fa-music" /></h1>
          <h5 lang="th">ใส่ชื่อเพลงหรือชื่อศิลปินในช่องค้นหาได้เลย!</h5>
        </Col>

        <Col xl={9}> 
          <div>
            <SearchBar />
          </div>
        </Col>

      </Row>
    </Container>
 
    );
}
export default Search;