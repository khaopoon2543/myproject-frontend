import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form } from 'react-bootstrap';
import ResultSearch from "../component/ResultSearch";

function Search() {
    const [searchTerm, setSearchTerm] = useState([])

    const navigate = useNavigate ();
    const onFormSubmit = event => {
        navigate('/result='+ searchTerm , { state: { key:searchTerm } })
        event.preventDefault()
    }
    const onChangeData = event => { setSearchTerm(event.target.value) } 

    return (
          <Container style={{ marginTop: 50 }}>
              <Form onSubmit={onFormSubmit} className="searchbar">
                  <input className="search_input"
                    type="search" 
                    placeholder="Search..." 
                    onChange={onChangeData}
                    required
                  />
                  <button type="submit" className="search_icon"><i className="fas fa-search"></i></button>
              </Form>
              
              <Container style={{ marginTop: 10 }}>
                <ResultSearch searchTerm={searchTerm} />
              </Container>    
          </Container>
    );
}
export default Search;