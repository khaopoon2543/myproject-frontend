import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ResultSearch from "./ResultSearch";
import ResultData from './ResultData';

import { FiSearch } from 'react-icons/fi';
import { HiOutlineX } from 'react-icons/hi';
import { PLSMoreThreeChars } from '../Loading';

function SearchBar({ level }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedFilter, setSelectedFilter] = useState(level==='' ? 'all': 'show')
    const [typing, setTyping] = useState('')

    const navigate = useNavigate ();
    const onFormSubmit = event => {
      navigate('/result='+ searchTerm , { state: { key:searchTerm, level:level } })
      event.preventDefault()
    }
    const onChangeData = event  => { 
      setSearchTerm(event.target.value);
      if (selectedFilter==='show') {
        setSelectedFilter('all')
      }
    }
    
    useEffect(() => {
      const newTimer = setTimeout(() => { setTyping(searchTerm) }, 1000)
      return () => {clearTimeout(newTimer)}
    }, [searchTerm])

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
    function isCharMoreThree(typing) {
      if (typing && typing.length < 3){
        return null
      } return typing
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
            <FiSearch/></button>
          {searchTerm &&
            <button type="button" className="input_icon" id="clear_icon" onClick={() => setSearchTerm('')}>
            <HiOutlineX/></button>
          }
        </form>
        </div>

        <br/>
        {(selectedFilter!=='spotify') ? 
          <div className="filters">
            <button onClick={() => showAll()} id={isFocus('all')}>All</button>
            <button onClick={() => showSong()} id={isFocus('song')}>Song</button>
            <button onClick={() => showArtist()} id={isFocus('artist')}>Artist</button>
            <button onClick={() => showSeries()} id={isFocus('series')}>Series</button>
            <button onClick={() => showLyric()} id={isFocus('lyric')}>Lyric</button>
          </div>  
          : null
        }
        
          <div style={{ marginTop: 10 }}>

          {isCharMoreThree(typing)!==null ?
            <>
            {(!level && selectedFilter==='artist' && typing) && 
              <ResultData src="artists" searchTerm={typing} />   
            }
            {(!level && selectedFilter==='series' && typing) &&
              <ResultData src="series" searchTerm={typing} />   
            }
            {(selectedFilter!=='all' && (selectedFilter==='show' || typing)) &&
              <ResultSearch searchTerm={typing} filter={selectedFilter} level={!level ? null : level} />
            }

            {(selectedFilter==='all' && typing) &&
            <>
              <ResultSearch searchTerm={typing} filter={'song'} level={!level ? null : level} searchAll={true}/>
              <>
              {!level && 
                <>
                <ResultData src="artists" searchTerm={typing} searchAll={true}/>  
                <ResultData src="series" searchTerm={typing} searchAll={true}/> 
                </>
              }
              </>
              <ResultSearch searchTerm={typing} filter={'lyric'} level={!level ? null : level} searchAll={true}/>  
            </>
            }
            </>
            :
            <PLSMoreThreeChars />
          }

          </div>  
      
      </div> 
    );
}
export default SearchBar;