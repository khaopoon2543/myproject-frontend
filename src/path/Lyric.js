import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';


function TrackParams() {
  let { trackId } = useParams();
  return <h1>{trackId}</h1>;
}

function Lyric() {

  const [tokenized_list, setTokenizedList] = useState([])
  const [map_dic, setMapDic] = useState([])
  const { trackId } = useParams() 

    useEffect(() => {
      if ( trackId ) {
        axios.get('/lyric/'+ trackId)
          .then((response) => {
            setTokenizedList(response.data.tokenized_list);
            setMapDic(response.data.map_dic);
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

              <p>
                {tokenized_list.map((word, index) => {
                  if (word.surface === '\n'){
                    return <span key={index}><br /></span>
                  }else if(word.surface === '\n\n'){
                    return <span key={index}><br /><br /></span>
                  }else{
                    return  <span key={index}>
                              {word.surface}
                            </span>
                  }
                })}
              </p> 
              
              <br/>
              
              <p>
                {map_dic.map((dict_list, index) => {
                  if (dict_list != null){
                    return <span key={index}>
                            {dict_list[1]}
                           </span>
                  }else{
                    return <span key={index}><br /><br /></span>
                    
                  }
                })
                }
              </p> 

            </Row>
          </Container>

        </div>
    );
    
}

export default Lyric;
