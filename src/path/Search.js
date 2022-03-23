import { Container } from 'react-bootstrap';
import SearchBar from "../component/SearchBar";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

function Search() {

    return (
        <Container style={{ marginTop: 50, marginBottom: 50 }}>
          <h1 lang="th" className="font-bold">ค้นหาเพลง <FontAwesomeIcon icon="fa-solid fa-music" /></h1>
          <h4 lang="th">ใส่ชื่อเพลงหรือชื่อศิลปินในช่องค้นหาได้เลย!</h4>
          
          <div style={{ marginTop: 30 }}>
            <SearchBar />
          </div>

        </Container>
 
    );
}
export default Search;