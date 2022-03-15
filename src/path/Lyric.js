import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Spinner, Card } from 'react-bootstrap';
import Tooltip from '../component/Tooltipp';
import PopupDict from '../component/PopupDict';

function Lyric() {

  const [tokenized_list, setTokenizedList] = useState([])
  const [title, setTitle] = useState([])
  const [loading, setLoading] = useState(true);
  const { trackId, trackArtist } = useParams() 
  const [collectedWord, setCollectedWord] = useState([]); 
  const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
      if ( trackId ) {
        axios.get('/lyric/'+ trackArtist + '/' + trackId , { mode: 'cors', crossDomain: true })
          .then((response) => {
            setTokenizedList(response.data.tokenized_list);
            setTitle(response.data.title);
            setLoading(!loading);
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          });
      }
    }, [ trackId ]);

    function Title() {
      return  <div>
                <h1>{title.name}</h1>
                <p>{title.artist}</p>
                <p>{trackId} {trackArtist}</p>
              </div>
    };
    //console.log(collectedWord);
 
  return (
    <div className="App">
      <Container style={{ marginTop: 50, marginBottom: 50 }}>
      
          {loading ? ( 
            <Spinner animation="border" />
          ) : (

            <Row>
              <Title /><hr></hr>
              <Col md={7}>

                <div id="lyric">
                  {tokenized_list.map((word, i) => {
                    if (word.surface === '\n'){
                      return <span key={i}><br /></span>
                    }else if(word.surface === '\n\n'){
                      return <span key={i}><br/><br/></span>
                    }else if(word.poses[0] === '名詞' && word.poses[2] === 'サ変可能' && word.dictionary_form === ''){
                      return <span key={i}>{word.surface}</span>
                    }else if(/\s/.test(word.surface)){ //check str is space?
                      return <span key={i}> </span>

                    //}else if(['助詞','助動詞','空白','補助記号','記号','代名詞','接尾辞','接頭辞'].indexOf(word.poses[0]) === -1 ){  //Value does not exists!
                    }else if(['名詞','動詞','形容詞','形容動詞','連体詞','副詞','接続詞','感動詞'].includes(word.poses[0])){  //Value does exists!
                      return   <Tooltip key={i} 
                                        word={word.surface}  
                                        dic_form={word.reading_form} 
                                        read_form={word.dictionary_form} //reading_form
                                        poses={word.poses}
                                        onOpen={collectedWord => setCollectedWord(collectedWord)}
                                        isOpen={isOpen => setIsOpen(isOpen)}            
                                    />
                    }else{
                          return  <span key={i}>
                                    {word.surface}
                                  </span>
                    } 
                  })}
                </div> 
              </Col>
              <br/>
              { isOpen && <Col md={5}>
                            <div className="sidebar">
                              <PopupDict dictList={collectedWord} isOpen={isOpen} />
                            </div>
                          </Col>
              }
            </Row>

          )}
     
      </Container>
    </div>
    );
    
}

export default Lyric;
