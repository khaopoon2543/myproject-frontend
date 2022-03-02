import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Form } from 'react-bootstrap';
import ResultSearch from "../component/ResultSearch";

function Search() {

    const [searchTerm, setSearchTerm] = useState([])

    const navigate = useNavigate ();
    const onFormSubmit = event => {
        navigate('/result='+ searchTerm , { state: { key:searchTerm} })
        event.preventDefault()
    }
    const onChangeData = event => { setSearchTerm(event.target.value)} 


    return (

        <div className="App">
          <Container style={{ marginTop: 50 }}>
              <Form onSubmit={onFormSubmit}>
                  <Form.Label>Search</Form.Label>
                  <Form.Control 
                    type="search" 
                    placeholder="Search" 
                    onChange={onChangeData}
                    required
                  /><br />
                  <Button type="submit">Search</Button>
              </Form> 
              <ResultSearch searchTerm={searchTerm} />

          </Container>
        </div>
    );

}

export default Search;
