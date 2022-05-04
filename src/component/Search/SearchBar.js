import React, { useEffect, useState } from "react";
import ResultAll from './ResultAll';

import { FiSearch } from 'react-icons/fi';
import { HiOutlineX } from 'react-icons/hi';

function SearchBar({ level }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedFilter, setSelectedFilter] = useState(!level ? '': 'show')
    const [typing, setTyping] = useState('')

    const onFormSubmit = event => {
      if (selectedFilter==='') {
        setSelectedFilter('all')
      }
      setTyping(searchTerm)
      event.preventDefault()
    }
    const onChangeData = event  => { 
      if (typing) { setTyping('') }
      setSearchTerm(event.target.value);

      if (selectedFilter==='show') { //SubLevels.js if user search --> filter'all'
        setSelectedFilter('all')
      }
    }
    
    //useEffect(() => {
      //const newTimer = setTimeout(() => { setTyping(searchTerm) }, 2000)
      //return () => {clearTimeout(newTimer)}
    //}, [searchTerm])

    //filter
    //function showALL() { setSelectedFilter('all') }
    function showLyric() { setSelectedFilter('lyric') }
    function showSong() { setSelectedFilter('song') }
    function showArtist() { setSelectedFilter('artist') }
    function showSeries() { setSelectedFilter('series') }
    function showAll() { setSelectedFilter('all') }

    function isFocus(filter) {
      if (selectedFilter === filter){
        return "focus"
      } return null
    }

    return (
      <div> 
        <div className="bg-search">
        <form onSubmit={onFormSubmit} className="searchbar">
          <input className="search_input"
              type="text" 
              placeholder="Let's Search!" 
              onChange={onChangeData}
              value={searchTerm}
              required
            />
          <button type="submit" className="input_icon" id={!searchTerm ? "search_icon" : "active_icon"}>
            <FiSearch/>
          </button>
          {searchTerm &&
            <>
            <button type="button" className="input_icon" id="clear_icon" onClick={() => setSearchTerm('')}>
              <HiOutlineX/>
            </button>
            </>
          }
        </form>
        </div>

        <br/>
          <div className="filters">
            <button onClick={() => showAll()} id={isFocus('all')}>All</button>
            <button onClick={() => showSong()} id={isFocus('song')}>Song</button>
            <button onClick={() => showArtist()} id={isFocus('artist')}>Artist</button>
            <button onClick={() => showSeries()} id={isFocus('series')}>Series</button>
            <button onClick={() => showLyric()} id={isFocus('lyric')}>Lyric</button>
          </div>  

        {(searchTerm||selectedFilter==='show') &&
          <ResultAll typing={typing} selectedFilter={selectedFilter} level={level}/>
        }

      </div> 
    );
}
export default SearchBar;