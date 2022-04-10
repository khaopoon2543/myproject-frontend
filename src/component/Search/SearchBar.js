import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from 'react-bootstrap';
import ResultSearch from "./ResultSearch";
import useIsMobile from '../useIsMobile';
import ResultData from './ResultData';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

function SearchBar({ level }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedFilter, setSelectedFilter] = useState(level==='' ? 'song': 'show')
    //const inputSearch = useRef('')
    const [typing, setTyping] = useState('')
    const screenSize = useIsMobile()

    const navigate = useNavigate ();
    const onFormSubmit = event => {
      navigate('/result='+ searchTerm , { state: { key:searchTerm, level:level } })
      event.preventDefault()
    }
    const onChangeData = event  => { 
      setSearchTerm(event.target.value);
      if (selectedFilter==='show') {
        setSelectedFilter('song')
      }
    }
    
    useEffect(() => {
      //inputSearch.current.value = searchTerm //.replaceAll(" ", "")
      const newTimer = setTimeout(() => { setTyping(searchTerm) }, 1000)
      return () => {clearTimeout(newTimer)}
    }, [searchTerm])

    //filter
    //function showALL() { setSelectedFilter('all') }
    function showLyric() { setSelectedFilter('lyric') }
    function showSong() { setSelectedFilter('song') }
    function showArtist() { setSelectedFilter('artist') }
    function showSeries() { setSelectedFilter('series') }

    function isFocus(filter) {
      if (selectedFilter === filter){
        return "focus"
      } return null
    }

    return (
      <Container style={{zoom: '90%'}}> 
        <div className="bg-search">
        <form onSubmit={onFormSubmit} className="searchbar">
          <input className="search_input"
              type="text" 
              placeholder="Let's Search!" 
              onChange={onChangeData}
              value={searchTerm}
              //ref={inputSearch}
              required
            />
          <button type="submit" className="input_icon" id={!searchTerm ? "search_icon" : "active_icon"}>
            <i className="fas fa-search"></i></button>
          {searchTerm &&
            <button type="button" className="input_icon" id="clear_icon" onClick={() => setSearchTerm('')}>
            <FontAwesomeIcon icon="fa-solid fa-xmark" /></button>
          }
        </form>
        </div>

        <br/>
        {(selectedFilter!=='spotify') ? 
          <div style={{ marginTop: 10 }}>
            <div className="filters">
              <button onClick={() => showSong()} id={isFocus('song')}>Song</button>
              <button onClick={() => showArtist()} id={isFocus('artist')}>Artist</button>
              <button onClick={() => showSeries()} id={isFocus('series')}>Series</button>
              <button onClick={() => showLyric()} id={isFocus('lyric')}>Lyric</button>
            </div>  
          </div>
          : null
        }
        
          <div style={{ marginTop: 10 }}>
            {(!level && selectedFilter==='artist' && typing) &&
              <ResultData src="artists" searchTerm={typing!=='' && typing} />   
            }
            {(!level && selectedFilter==='series' && typing) &&
              <ResultData src="series" searchTerm={typing!=='' && typing} />   
            }
            {(selectedFilter==='show' || typing) &&
              <ResultSearch searchTerm={typing!=='' && typing} filter={selectedFilter} level={!level ? null : level} />
            }
          </div>  
      
      </Container> 
    );
}
export default SearchBar;