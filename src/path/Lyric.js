import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import "../component/Lyrics/Lyrics.css"
import { Container, Row, Col } from 'react-bootstrap';
import Tooltip from '../component/Lyrics/Tooltip';
import PopupDict from '../component/Lyrics/PopupDict';
import { LoadingIMG } from "../component/Loading";
import { toHiragana, isJapanese } from 'wanakana';
import { BiFontSize } from 'react-icons/bi';
import useIsMobileLG from '../component/useIsMobileLG';
import { backendSrc } from "../component/backendSrc";
import TitleLyrics from "../component/Lyrics/TitleLyrics";
import YouTube from 'react-youtube';

function Lyric({inputLyric}) {
  const { trackId, trackArtist } = useParams() 
  const [tokenized_list, setTokenizedList] = useState([])
  const [titleInfo, setTitleInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [collectedWord, setCollectedWord] = useState([]); 
  const [isOpen, setIsOpen] = useState(false);
  const screenSize = useIsMobileLG();
  const [fontSize, setFontSize] = useState(screenSize ? 16 : 18);

  const [videoVisible, setVideoVisible] = useState(false);

  useEffect(() => {
    //let timeOut = setTimeout(() => setLoading(false), 3000);

    if ( trackId && trackArtist ) {
      let isMounted = true;
      console.log('start fetching...');
      setLoading(true);

      //https://sudachi-api.herokuapp.com/lyric/
      axios.get(`${backendSrc}/lyric/`+ trackArtist + '/' + trackId , { mode: 'cors', crossDomain: true })
            .then((response) => {
              setTokenizedList(response.data.tokenized_list);
            })
            .then(() => {
              if(isMounted){
                console.log('finish fetching lyrics!');
                setLoading(false)
                setIsOpen(false) //open dict
                //clearTimeout(timeOut);
              } 
            })
            .catch(error => { console.log(error) });

      axios.get(`${backendSrc}/result/info`, { params: {  songId : trackId.replace(/-/g, ' '),
                                                          artistId : trackArtist.replace(/-/g, ' ')
                                                        } })
            .then((response) => {
              if(isMounted){
                setTitleInfo(response.data && response.data[0]);
                console.log(response.data[0])
              }
            }) 

      return () => { isMounted = false; };
    }
  }, [trackId, trackArtist]);

  useEffect(() => {
    if ( inputLyric ) {
      let isMounted = true;
      console.log('start tokenize...');
      setLoading(true);

      axios.get(`${backendSrc}/lyric`, { params: { lyric:inputLyric }})
            .then((response) => {
              setTokenizedList(response.data.tokenized_list);
            })
            .then(() => {
              if(isMounted){
                console.log('finish fetching lyrics!');
                setLoading(false)
              } 
            })
            .catch(error => { console.log(error) });

      return () => { isMounted = false; };
    }
  }, [inputLyric]);

  function buttonChangeSize() {
    return (
      <div className="filters" id="size" lang="jp">
        <span id='icon'><BiFontSize/></span>
        <button onClick={() => setFontSize(fontSize-2)}>
            -
        </button>
        <span> {fontSize} px </span>
        <button onClick={() => setFontSize(fontSize+2)}>
            +
        </button>
      </div>
    )
  }
  
  if (loading) return <LoadingIMG />
  return (
    <div lang="jp">
      {!inputLyric && 
        <TitleLyrics  titleInfo={titleInfo}
                      trackArtist={trackArtist}
                      setVideoVisible={videoVisible => setVideoVisible(videoVisible)}
                      isOpenVideo={videoVisible}
        />
      }
        <Container style={{ marginBottom: 50 }} fluid="sm"> {/* marginLeft: screenSize ? 10 : 50 */}
          <Row>  
            {screenSize===false &&
              <Col lg={6} xl={5} style={{ marginTop: 50 }}>
                <div className="sidebar" id={videoVisible ? 'is-mv' : ''}>
                  <PopupDict dictList={collectedWord} isOpen={isOpen} />
                </div>
              </Col>
            }

              <Col lg={6} xl={7} style={{ marginTop: 50 }}>
                {screenSize===true &&
                  <div className="sidebar sidebar-mobile" id={videoVisible ? 'is-mv' : ''}>
                    <PopupDict dictList={collectedWord} isOpen={isOpen} />
                  </div>
                }
                <div className="btn-on-lyric">
                  {buttonChangeSize()}
                </div>
                <br/>

                <div id="lyric" style={{ fontSize: fontSize }}>
                  {(tokenized_list && tokenized_list.length>0) &&
                    tokenized_list.map((word, i) => {
                    if (word.surface === '\n'){
                      return <div key={i}></div>
                    }else if((word.surface === '\n\n') || (word.surface === '\n\n\n')){
                      return <div key={i}><br/></div>
                    }else if(word.poses[0] === '空白'){
                      return <span key={i}>&nbsp;</span>
                    }else if(!isJapanese(word.dictionary_form)){ //change to dictionary_form //ex FLY HIGH!! 艱難(かんなん)
                        return <span key={i}>{word.surface}</span>
                    }else if(/\s/.test(word.surface)){ //check str is space?
                      return <span key={i}>&nbsp;</span>

                    //}else if(['助詞','助動詞','空白','補助記号','記号','代名詞','接尾辞','接頭辞'].indexOf(word.poses[0]) === -1 ){  //Value does not exists!
                    }else if(['名詞','動詞','形容詞','形状詞','連体詞','副詞','接続詞','感動詞','代名詞','接尾辞','接頭辞'].includes(word.poses[0]) 
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
    </div>
    ); 
}

export default Lyric;
