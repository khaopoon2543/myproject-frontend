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
      //if (typing) { setTyping('') }
      if (selectedFilter==='') { setSelectedFilter('all') }
      if (selectedFilter==='show') { //SubLevels.js if user search --> filter'all'
        setSelectedFilter('all')
      }
      setSearchTerm(event.target.value);
    }
    
    useEffect(() => {
      let isMounted = true;
      if (!isMounted) return null;
      let newTimer = setTimeout(() => { setTyping(searchTerm); }, 2000);
      return () => { isMounted = false; clearTimeout(newTimer); }
    }, [searchTerm])

    //filter
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
              placeholder="ใส่คำค้นหาที่ต้องการได้เลย!" 
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

        <div className="filters">
          <button onClick={() => showAll()} id={isFocus('all')}>ทั้งหมด</button>
          <button onClick={() => showSong()} id={isFocus('song')}>เพลง</button>
          <button onClick={() => showArtist()} id={isFocus('artist')}>ศิลปิน</button>
          <button onClick={() => showSeries()} id={isFocus('series')}>ซีรีส์</button>
          <button onClick={() => showLyric()} id={isFocus('lyric')}>เนื้อเพลง</button>
        </div>  

        {(typing||selectedFilter==='show') &&
          <ResultAll typing={typing} selectedFilter={selectedFilter} level={level}/>
        }

      </div> 
    );
}
export default SearchBar;