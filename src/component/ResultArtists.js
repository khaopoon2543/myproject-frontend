import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Col, Card, Spinner } from 'react-bootstrap';
import "./ResultSearch.css";

export default function ResultArtists(props) {
    const [artists_list, setArtistsList] = useState([])
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(30);
    const alphabet = props.alphabet;
    function loadMore() { setVisible(visible + 30) }
    const navigate = useNavigate ();

    useEffect(() => {
        axios.get("/artists" , { mode: 'cors', crossDomain: true })
          .then((response) => {
            setArtistsList(response.data);
            setLoading(!loading);
          })
          .catch(error => {
            console.log(error.response)
          });
      }, []);
    
    function filterArtists() {
      const artistsList = artists_list
        .filter((artist) => {
          if (alphabet === null) { return null } 
          else if (artist.alphabet.toLowerCase() == alphabet.toLowerCase()) { return artist }   
        })
      return artistsList
    }

    return (
      <React.Fragment>
        {loading ? ( 
          <Spinner animation="border" />
        ) : ( 
        <>
          <Col md={12}>
            {filterArtists().length > 0 ? (
            filterArtists()
            .slice(0, visible) //selected elements in an array
            .map((artist, index) => {
                return (
                <Card className='card flex-md-row flex-wrap' key={index}>
                    <Card.Body style={{textAlign: 'left'}}>
                    <button className='artist' 
                      onClick={event => { navigate( 
                        '/artists/'+ artist.artist_id,
                        { state: { artistName: artist.name } }) 
                        event.preventDefault()
                      }}
                    > <h3 className='artist' id="result-artist" style={{textAlign: 'left'}}>
                        {artist.name}
                      </h3>
                      <p className='subtitle' style={{textAlign: 'left', marginBottom: 0 }}>
                        {artist.artist_id.replace(/-/g, ' ')}
                      </p>  
                    </button>
                    </Card.Body>
                </Card>
            )})
        ) : (
          <>
          { alphabet === null && null } 
          </>
        )}

        {filterArtists().length > 10 ? //loading
          (<>
            {visible < filterArtists().length &&
              <div className="loadMore" style={{ marginTop: 20 }}>
                <button onClick={() => loadMore()}> Load More </button>
              </div>
            }
          </>)
          : null
        }
          </Col></>
      )
    
    }
    </React.Fragment>
    )


}