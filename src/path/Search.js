import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from 'react-bootstrap';
import ResultSearch from "../component/ResultSearch";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

function Search() {
    const [searchTerm, setSearchTerm] = useState('')
    const inputSearch = useRef('')

    const navigate = useNavigate ();
    const onFormSubmit = event => {
        navigate('/result='+ searchTerm , { state: { key:searchTerm } })
        event.preventDefault()
    }
    const onChangeData = event => { setSearchTerm(event.target.value.replaceAll(" ", "")) } 

    useEffect(() => {
      inputSearch.current = searchTerm
    }, [searchTerm])

    return (
          <Container style={{ marginTop: 50, marginBottom: 50 }}>
            <h1 lang="th">ค้นหาเพลง</h1>
            <h3 lang="th">ใส่ชื่อเพลงหรือชื่อศิลปินในช่องค้นหาได้เลย!</h3>

              <form onSubmit={onFormSubmit} className="searchbar">
                  <input className="search_input"
                    type="text" 
                    placeholder="Let's Search!" 
                    onChange={onChangeData}
                    required
                  />
                  <button type="submit" className="search_icon"><i className="fas fa-search"></i></button>
              </form>
              <br/>
              {searchTerm.length > 0 && 
                <Container style={{ marginTop: 0 }}>
                  <ResultSearch searchTerm={inputSearch.current} />
                </Container> 
              }
                 
          </Container>
 
    );
}
export default Search;