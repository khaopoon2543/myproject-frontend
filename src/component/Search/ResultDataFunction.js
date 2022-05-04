import { Card } from 'react-bootstrap';
import "./ResultSearch.css";
import { RiUserStarLine } from 'react-icons/ri';

const alignItem = 'data flex-md-row'
const TAGARTIST = {
    fontSize:20,
    //lineHeight:3,
}

    function isArtist(allDataList, visible, navigate) { 
      const show = 
        (allDataList
          .slice(0, visible) //selected elements in an array
          .map((artist, index) => {
              return (
                <Card className={alignItem} key={index} 
                  onClick={event => { navigate( '/artists/'+ artist.artist_id.replaceAll(" ","-"), 
                          { state: { artistName: artist.name } }) 
                          event.preventDefault()
                  }}
                > 
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
          )})
        )
      return show
    }

    function isSeries(allDataList, visible, navigate) { 
      const show = 
        (allDataList
          .slice(0, visible) //selected elements in an array
          .map((series, index) => {
              return (
                <Card className={alignItem} key={index} 
                  onClick={event => { navigate( '/series/'+ series.series_id.replaceAll(" ","-"), 
                          { state: { seriesName: series.name, seriesType: series.type } }) 
                          event.preventDefault()
                  }}
                >
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
          )})
        )
      return show
    }


export {
    isArtist,
    isSeries
}