import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import Tooltip from '../component/Tooltipp';
import PopupDict from '../component/PopupDict';
import useIsMobile from '../component/useIsMobile';
import TagLevels from "../component/TagLevels";
import { toHiragana } from 'wanakana';


function Lyric() {

  const [tokenized_list, setTokenizedList] = useState([])
  const [title, setTitle] = useState([])
  const [loading, setLoading] = useState(true);
  const { trackId, trackArtist } = useParams() 
  const [collectedWord, setCollectedWord] = useState([]); 
  const [isOpen, setIsOpen] = useState(false)
  const screenSize = useIsMobile()

  useEffect(() => {
    if ( trackId ) {
      axios.get('https://sudachi-api.herokuapp.com/lyric/'+ trackArtist + '/' + trackId , { mode: 'cors', crossDomain: true })
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
    return <Container fluid className="titleLyric">
              <h1>{title.name}</h1>
              <p>{title.artist}</p>
              <div className="tagLevel" id="title-lyric">
                <TagLevels levelScore={title.readability_score}/>
              </div>
           </Container>
  };
  function checkKatakana(surface, reading_form) {
    if (surface !== reading_form) {
      return toHiragana(reading_form, { passRomaji: true })
    } return reading_form
  }
  
  const spinner = {
      flex: 1,
      marginTop:240,
      justifyContent: 'center',
      alignItems:'center'
  }
  const inSpinner = {
      flex: 1,
      alignSelf:'center'
  }

  return (
    <div className="App">
      {loading ? ( 
        <div style={spinner}>
          <Spinner animation="border" style={inSpinner}/>
        </div>
      ) : (
        <>
        <Title />
        <Container style={{ marginBottom: 50 }} fluid="lg"> {/* marginLeft: screenSize ? 10 : 50 */}
          <Row>  
            {screenSize===false &&
              <Col md={6} lg={5} style={{ marginTop: 50 }}>
                <PopupDict dictList={collectedWord} isOpen={isOpen} />
              </Col>
              }

              <Col md={6} lg={7} style={{ marginTop: 50 }}>
                <div id="lyric">
                  {screenSize===true &&
                    <Container className="sidebar-mobile" fluid>
                      <PopupDict dictList={collectedWord} isOpen={isOpen} />
                    </Container>
                  }
                  {tokenized_list.map((word, i) => {
                    if (word.surface === '\n'){
                      return <br key={i}/>
                    }else if(word.surface === '\n\n'){
                      return <p key={i}><br/></p>
                    }else if(word.poses[0] === '名詞' && word.poses[2] === 'サ変可能' && word.dictionary_form === ''){
                      return <span key={i}>{word.surface}</span>
                    }else if(/\s/.test(word.surface)){ //check str is space?
                      return <span key={i}> </span>

                    //}else if(['助詞','助動詞','空白','補助記号','記号','代名詞','接尾辞','接頭辞'].indexOf(word.poses[0]) === -1 ){  //Value does not exists!
                    }else if(['名詞','動詞','形容詞','形状詞','連体詞','副詞','接続詞','感動詞'].includes(word.poses[0])){  //Value does exists!
                      return   <Tooltip key={i} 
                                        word={word.surface}  
                                        dic_form={word.dictionary_form} 
                                        read_form= {checkKatakana(word.surface,word.reading_form)}//reading_form
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
          </Row>
        </Container>
        </>
      )}     
    </div>
    );
    
}

export default Lyric;
