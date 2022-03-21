import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Spinner } from 'react-bootstrap';
import ResultSearch from "./ResultSearch";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

function SearchBar({ level }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedFilter, setSelectedFilter] = useState('all')
    //const inputSearch = useRef('')
    const [typing, setTyping] = useState('')

    const navigate = useNavigate ();
    const onFormSubmit = event => {
        navigate('/result='+ searchTerm , { state: { key:searchTerm, level:level } })
        event.preventDefault()
    }
    const onChangeData = event  => { 
      setSearchTerm(event.target.value);
    } 
    
    useEffect(() => {
      //inputSearch.current.value = searchTerm //.replaceAll(" ", "")
      const newTimer = setTimeout(() => {
        setTyping(searchTerm)
      }, 500)
      return () => {clearTimeout(newTimer)}

    }, [searchTerm])

    function showResultSubLevel() {
      if (searchTerm==='') {
        return 'show' 
      } return selectedFilter
    }

    //filter
    function showALL() { setSelectedFilter('all') }
    function showLyric() { setSelectedFilter('lyric') }
    function showSong() { setSelectedFilter('song') }
    function showArtist() { setSelectedFilter('artist') }
    console.log(selectedFilter)
    function isFocus(filter) {
      if (selectedFilter === filter){
        return "focus"
      } return null
    }

    return (
      <>
        <form onSubmit={onFormSubmit} className="searchbar">
          <input className="search_input"
              type="text" 
              placeholder="Let's Search!" 
              onChange={onChangeData}
              //ref={inputSearch}
              required
            />
            <button type="submit" className="search_icon"><i className="fas fa-search"></i></button>
        </form>

        <br/>
        {(selectedFilter !== 'spotify') ? 
          <Container style={{ marginTop: 10 }}>
            <div className="filters">
              <button onClick={() => showALL()} id={isFocus('all')}>Song・Artist</button>
              <button onClick={() => showSong()} id={isFocus('song')}>Song</button>
              <button onClick={() => showArtist()} id={isFocus('artist')}>Artist</button>
              <button onClick={() => showLyric()} id={isFocus('lyric')}>Lyric</button>
            </div>  
          </Container>
          : null
        }
        
          <Container style={{ marginTop: 10 }}>
            <ResultSearch searchTerm={typing!=='' && typing} filter={!level ? selectedFilter : showResultSubLevel()} level={!level ? null : level} />
          </Container>  
      
      </> 
    );
}
export default SearchBar;