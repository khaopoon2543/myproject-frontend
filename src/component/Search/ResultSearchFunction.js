import Highlighter from "react-highlight-words";
import "./ResultSearch.css";
import { MdMusicNote } from "react-icons/md"

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
    if (0.5 <= levelScore && levelScore <= 1.49) {
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

  function isOnlyNameSeries(track, navigate, subSeries) { //filter Series    
    if (track.series_info && track.series) {
      return (
          <div className="artist-series">
              <span id="sub-data">{track.series_info.type} 「 </span>
              {!subSeries ? 
                <button id='artist'
                  onClick={event => { navigate('/series/'+ track.series.id.replaceAll(" ","-"), 
                  { state: { seriesName: track.series_info.name, seriesType: track.series_info.type } }) 
                  event.preventDefault()}}
                > {track.series_info.name} &nbsp; 
                </button>
              
              : //subSeries === true
                <span id="sub-data">{track.series_info.name} &nbsp;</span>
              }
              <span id="sub-data"> 」 {track.series.theme}</span>
          </div>
        )
    } else if (track.series && track.series.name) { 
        return ( <><br/><span id="sub-data">{track.series.name}</span></>)
    }  return null 
        //if change filter from another to 'series' & searchTerm no result in 'series'
        //then app NOT setState(setSongsList) in useEffect!!
  }

  function resultDetails(searchTerm, track, type, navigate) {
    if (type==='title-subtitle-song') { //----------------------- title-subtitle-song ----------------------- //
      return(
        <>
        <button className='title' id="song" 
          onClick={event => { navigate("/lyric/" + track.artist_id.replaceAll(" ","-") + '/' + track.song_id.replaceAll(" ","-")) 
          event.preventDefault()}}
        > <h3 className='title' id="song">{track.name}</h3> 
        </button>
        </>
      )
    } else if (type==='title-subtitle-artist') { //----------------------- title-subtitle-artist ----------------------- //
      const artist_id = track.artist_id
      const artist = track.artist
      return(
        <div className="artist-series">
          <span id="sub-data">歌手 </span>
          <button id='artist'
            onClick={event => { navigate("/artists/"+ artist_id.replaceAll(" ","-"),
            { state: { artistName: artist } }) 
            event.preventDefault()}}
          > {artist}
          </button> 
        </div>
      )
    } else if (type==='lyric') { //----------------------- lyric ----------------------- //
      if (!track.lyric) return
      return(
        searchTerm &&
        <span className='subtitle' id='lyric'>
          <MdMusicNote id="icon-lyric"/>
          <Highlighter
            highlightClassName='highlight'
            searchWords={[searchTerm]}
            autoEscape={true}
            textToHighlight={findWordAndNeighbours(searchTerm, track.lyric)}
            > {findWordAndNeighbours(searchTerm, track.lyric)} 
          </Highlighter>
        </span>
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