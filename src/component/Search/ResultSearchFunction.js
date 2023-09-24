import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
import "./ResultSearch.css";
import { MdMusicNote } from "react-icons/md";
import { LyricLink, SeriesLink, ArtistLink } from "../linkPath";

  function checkFeat(titleName) { //選んでくれてありがとう。 feat. 榎本虎太朗(花江夏樹)・瀬戸口雛(麻倉もも)
    const re = new RegExp('^(.+).(feat..+)', 'i'), matches = titleName.match(re);
    if (matches) {
      var titleList = titleName.match(re)
      return titleList
    } else {
      return titleName
    }
  }
  //test Regex
  function findWordAndNeighbours(searchTerm, lyric) {
    if (searchTerm == "" || !lyric) {
        return false;
    } else {
        var re = new RegExp('((?:^|[\r\n]|\\S+[\\b\\s]?)' + searchTerm + '(?:$|[\r\n]|[\\b\\s]?\\S+))', 'i'),
        matches = lyric.match(re);
        if (matches) {
          var foundWords = lyric.match(re)[0].split(/\s+/),
              foundFragment = foundWords.join(' ');
              return foundFragment
        }
    }
  }

  function checkLevel(levelScore) {
    if (6.5 <= levelScore || levelScore <= 0.4) {
      return 'no-level'
    } else if (0.5 <= levelScore && levelScore <= 1.49) {
        return 'very-difficult'
    } else if (1.5 <= levelScore && levelScore <= 2.49) {
        return 'difficult'
    } else if (2.5 <= levelScore && levelScore <= 3.49) {
        return 'slightly-difficult'
    } else if (3.5 <= levelScore && levelScore <= 4.49) {
        return 'so-so'
    } else if (4.5 <= levelScore && levelScore <= 5.49) {
        return 'easy'
    }
    return 'very-easy'
  }
 
  function reallyShowList(songs_list, level) {
    const tracksList = songs_list
      .filter((track) => {
        if (level) { 
          if (checkLevel(track.readability_score) === level) { return track } 
          else { return null }
        } 
        else { return track }
      })
    const arrTracksList = tracksList || [];
    return arrTracksList
  }

  function isOnlyNameSeries(track, subSeries) { //filter Series    
    if (track.series_info && track.series) {
      return (
          <div className="artist-series">
              <span id="sub-data">{track.series_info.type} </span>
              {!subSeries ? 
                <Link to={SeriesLink(track.series.id)}>
                  <button id='artist'>
                    {track.series_info.name} &nbsp; 
                  </button>
                </Link>
              
              : //subSeries === true
                <span id="sub-data">{track.series_info.name}</span>
              }
              <span id="sub-data"> {track.series.theme}</span>
          </div>
        )
    } else if (track.series && track.series.name) { 
        return ( 
          <div className="artist-series">
            <span id="sub-data">{track.series.name}</span>
          </div>
        )
    }  return null 
        //if change filter from another to 'series' & searchTerm no result in 'series'
        //then app NOT setState(setSongsList) in useEffect!!
  }

  function resultDetails(searchTerm, track, type) {
    if (type==='title-subtitle-song') { //----------------------- title-subtitle-song ----------------------- //
      const resultTitle = track.name && checkFeat(track.name)
      const isFeat = resultTitle instanceof Array
      if (isFeat) {
        return (
          <>
          <Link to={LyricLink(track)}>
            <button className='title' id="song"> 
              <h3 className='title' id="song">{resultTitle[1]}</h3> 
            </button>
          </Link>
          &nbsp;<span id="sub-data">{resultTitle[2]}</span>
          </>
        )
      } else {
        return(
          <Link to={LyricLink(track)}>
            <button className='title' id="song"> 
              <h3 className='title' id="song">{track.name}</h3> 
            </button>
          </Link>
        )
      }
    } else if (type==='title-subtitle-artist') { //----------------------- title-subtitle-artist ----------------------- //
      return(
        <div className="artist-series">
          <span id="sub-data">歌手 </span>
          <Link to={ArtistLink(track.artist_id)}>
            <button id='artist'> 
              {track.artist}
            </button> 
          </Link>
        </div>
      )
    } else if (type==='lyric') { //----------------------- lyric ----------------------- //
      let isTermInLyric = findWordAndNeighbours(searchTerm, track.lyric)
      if (!track.lyric && !isTermInLyric) return
      return(
        searchTerm &&
        <div className='subtitle' id='lyric'>
          <MdMusicNote id="icon-lyric"/>
          <Highlighter
            highlightClassName='highlight'
            searchWords={[searchTerm]}
            autoEscape={true}
            textToHighlight={isTermInLyric}
            > {isTermInLyric} 
          </Highlighter>
        </div>
      )
    }
  }

export {
    findWordAndNeighbours,
    checkLevel,
    reallyShowList,
    isOnlyNameSeries,
    resultDetails,  
}