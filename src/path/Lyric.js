import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

function TrackParams() {
  let { trackId } = useParams();
  return <h1>{trackId}</h1>;
}

function Lyric() {

  const [tokenized_list, setTokenizedList] = useState([])
  const { trackId, trackArtist } = useParams() 

    useEffect(() => {
      if ( trackId ) {
        axios.get('/lyric/'+ trackArtist + '/' + trackId , { mode: 'cors', crossDomain: true })
          .then((response) => {
            setTokenizedList(response.data);
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          });
      }
    }, [ trackId ]);

    return (
        <div className="App">

          <Container style={{ marginTop: 50 }}>
            <Row> 

              <TrackParams />
              <hr></hr>

              <Col md={6} >
                
              <p id="lyric">
                {tokenized_list.map((word, i) => {
                  if (word.surface_form === '\n'){
                    return <span key={i}><br /></span>
                  }else if(word.surface_form === '\n\n'){
                    return <span key={i}><br /><br /></span>
                  }else if('名詞' === word.pos && word.basic_form === '*'){
                    return <span key={i}>{word.surface_form}</span>

                  }else if(['助詞','助動詞','空白','補助記号','記号'].indexOf(word.pos) === -1 ){  //Value does not exists!
                        return  <span key={i} className='pink-text'>
                                  {word.surface_form}
                                </span>
                  }else{
                        return  <span key={i}>
                                  {word.surface_form}
                                </span>
                  } 
                })}
              </p> 
              </Col>
              
              <br/>
              
              

            </Row>
          </Container>

        </div>
    );
    
}

export default Lyric;
