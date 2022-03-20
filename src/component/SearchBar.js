import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from 'react-bootstrap';
import ResultSearch from "./ResultSearch";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

function SearchBar({ level }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedFilter, setSelectedFilter] = useState('all')
    const inputSearch = useRef('')

    const navigate = useNavigate ();
    const onFormSubmit = event => {
        navigate('/result='+ searchTerm , { state: { key:searchTerm, level:level } })
        event.preventDefault()
    }
    const onChangeData = event => { setSearchTerm(event.target.value) } 
    
    useEffect(() => {
      inputSearch.current.value = searchTerm //.replaceAll(" ", "")
    }, [searchTerm])

    return (
      <>
        <form onSubmit={onFormSubmit} className="searchbar">
          <input className="search_input"
              type="text" 
              placeholder="Let's Search!" 
              onChange={onChangeData}
              ref={inputSearch}
              required
            />
            <button type="submit" className="search_icon"><i className="fas fa-search"></i></button>
        </form>
        <br/>
        {searchTerm.length > 0 && 
          <Container style={{ marginTop: 0 }}>
            <ResultSearch searchTerm={inputSearch.current.value} filter={selectedFilter} level={!level ? null : level} />
          </Container> 
        }         
      </> 
    );
}
export default SearchBar;