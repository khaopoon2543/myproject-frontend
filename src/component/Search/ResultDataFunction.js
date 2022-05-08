import { Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import "./ResultSearch.css";
import { RiUserStarLine } from 'react-icons/ri';
import { SeriesLink, ArtistLink } from "../linkPath";

const alignItem = 'data flex-md-row'
const TAGARTIST = { fontSize:20 }

  function isArtist(allDataList, visible) { 
    const show = 
      allDataList
          .slice(0, visible) //selected elements in an array
          .map((artist, index) => {
              return (
                <Link key={index} to={ArtistLink(artist.artist_id)}> 
                  <Card className={alignItem}>
                    <div className="tagLevel">
                      <p id="tag-data" style={TAGARTIST}><RiUserStarLine/></p>
                    </div>
                    <Card.Body className='d-block artist-series-data'>
                      <button id='data'> 
                        {artist.name}
                      </button>
                      <p className='subtitle'>
                        {artist.artist_id}
                      </p>  
                    </Card.Body>
                  </Card>
                </Link>
          )})
    const really_show =     
        <div lang="jp">
          {show}
        </div>
    return really_show
  }

  function isSeries(allDataList, visible) { 
    const show = 
      allDataList
          .slice(0, visible) //selected elements in an array
          .map((series, index) => {
              return (
                <Link key={index} to={SeriesLink(series.series_id)}>
                  <Card className={alignItem}>
                    <div className="tagLevel">
                      <p id="tag-data">「{series.type}」</p>
                    </div>
                    <Card.Body className='artist-series-data'>
                      <button id='data'> 
                        {series.name}
                      </button>
                      <p className='subtitle'>
                        {series.series_id}
                      </p>  
                    </Card.Body>
                  </Card>
                </Link>
          )})
    const really_show =     
      <div lang="jp">
          {show}
      </div>
    return really_show
  }


export {
    isArtist,
    isSeries
}