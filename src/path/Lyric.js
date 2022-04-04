import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Tooltip from '../component/Tooltipp';
import PopupDict from '../component/PopupDict';
import useIsMobile from '../component/useIsMobile';
import TagLevels from "../component/TagLevels";
import { LoadingIMG } from "../component/Loading";
import { toHiragana, isJapanese } from 'wanakana';
import { SearchSpotify } from '../component/SpotifyLink'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

function Lyric({user}) {

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

  function checkFeat(titleName) { //選んでくれてありがとう。 feat. 榎本虎太朗(花江夏樹)・瀬戸口雛(麻倉もも)
    const re = new RegExp('^(.+).(feat..+)', 'i'), matches = titleName.match(re);
    if (matches) {
      var titleList = titleName.match(re)
      return titleList
    } else {
      return titleName
    }
  }
  const resultTitle = title.name && checkFeat(title.name)

  function Title() {
    return <Container className="titleLyric" fluid>
            <Container className="text-left">
            {resultTitle instanceof Array ? //if return titleList (is feat. in title)
              <>
              <h1 className="font-semi-bold">{resultTitle[1]}</h1>
              <h6 className="font-light">{resultTitle[2]}</h6>
              </>
            : 
              <h1 className="font-semi-bold">{title.name}</h1>
            }
            <h6 className="font-light">{title.artist}</h6>
            </Container>

            <Container className="items-center" style={{marginTop:20}}>
                <div className="tagLevel" id="title-lyric">
                  <TagLevels levelScore={title.readability_score}/>
                </div>
                {user &&
                  <SearchSpotify title={resultTitle[1]} trackArtist={trackArtist} trackId={trackId}/>
                }    
            </Container>
          </Container>
  };
  function checkKatakana(surface, reading_form) {
    if (surface !== reading_form) {
      return toHiragana(reading_form, { passRomaji: true })
    } return reading_form
  }

  function mixPrefix(tokenized_list, i) {
    if (tokenized_list[i].poses[0]==='接頭辞') {
      return null
    } else if (i!==0 && tokenized_list[i-1].poses[0]==='接頭辞') {
      return tokenized_list[i-1].surface + tokenized_list[i].surface
    } else {
      return tokenized_list[i].surface
    }
  }
  function isPrefix(tokenized_list, i) {
    if (i!==0 && tokenized_list[i-1].poses[0]==='接頭辞') {
      return tokenized_list[i-1].dictionary_form + tokenized_list[i].dictionary_form
    } else {
      return tokenized_list[i].dictionary_form
    }
  }
  
  return (
    <div className="App">
      {loading ? ( 
            <LoadingIMG />
      ) : (
        <>
        <Title />
        <Container style={{ marginBottom: 50 }} fluid="sm"> {/* marginLeft: screenSize ? 10 : 50 */}
          <Row>  
            {screenSize===false &&
              <Col md={6} xl={4} style={{ marginTop: 50 }}>
                <PopupDict dictList={collectedWord} isOpen={isOpen} />
              </Col>
            }

              <Col md={6} xl={8} style={{ marginTop: 50 }}>
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
                      return <><br key={i}/><br/></>
                    }else if(word.poses[0] === '空白'){
                      return <span key={i}>&nbsp;</span>
                    }else if(!isJapanese(word.surface)){
                        return <span key={i}>{word.surface}</span>
                    }else if(/\s/.test(word.surface)){ //check str is space?
                      return <span key={i}>&nbsp;</span>

                    //}else if(['助詞','助動詞','空白','補助記号','記号','代名詞','接尾辞','接頭辞'].indexOf(word.poses[0]) === -1 ){  //Value does not exists!
                    }else if(['名詞','動詞','形容詞','形状詞','連体詞','副詞','接続詞','感動詞','接頭辞','接尾辞'].includes(word.poses[0]) 
                              && word.surface != parseInt(word.surface, 10) ){  //Value does exists!
                      return   <Tooltip key={i} 
                                        word={word.surface}  
                                        dic_form={word.dictionary_form} 
                                        read_form= {toHiragana(word.reading_form, { passRomaji: true })}//reading_form
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
