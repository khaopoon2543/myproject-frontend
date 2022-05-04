import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../component/Lyrics/Lyrics.css"
import { Container, Row, Col } from 'react-bootstrap';
import Tooltip from '../component/Lyrics/Tooltip';
import PopupDict from '../component/Lyrics/PopupDict';
import TagLevels from "../component/Levels/TagLevels";
import { LoadingIMG } from "../component/Loading";
import { toHiragana, isJapanese } from 'wanakana';
import { checkSpecialChars } from '../component/Spotify/checkSpecialChars'
import { BiFontSize } from 'react-icons/bi';
import { FaSpotify } from 'react-icons/fa';
import ResultSpotify from '../component/Spotify/ResultSpotify';
import useIsMobileLG from '../component/useIsMobileLG';

function Lyric({user, spotifyApi}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [tokenized_list, setTokenizedList] = useState([])
  const [title, setTitle] = useState([])
  const [loading, setLoading] = useState(true);
  const { trackId, trackArtist } = useParams() 
  const [collectedWord, setCollectedWord] = useState([]); 
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState('');
  const screenSize = useIsMobileLG();

  const timeOut = setTimeout(() => {setLoading(false);}, 3000);

  useEffect(() => {
    if ( trackId && trackArtist ) {
      setLoading(true)
      getLyric()
      
    async function getLyric() {
      const lyric = 
        await axios.get('https://sudachi-api.herokuapp.com/lyric/'+ trackArtist + '/' + trackId , { mode: 'cors', crossDomain: true })
            .then((response) => {
              setTokenizedList(response.data.tokenized_list);
              setTitle(response.data.title);
            })
            .catch(error => { console.log(error) });

      console.log('finish fetching lyrics!');
      clearTimeout(timeOut)
      return lyric
    }}

  }, [trackId, trackArtist]);

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
           <Container fluid="md">
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

            <Container className="items-center" id="readability" style={{marginTop:20}}>
              <span>Text Readability Level :&nbsp;&nbsp;</span>
              <div className="tagLevel" id="title-lyric">
                <TagLevels levelScore={title.readability_score}/>
              </div>
            </Container>
            <Container className="items-center" id="readability">
              <span>Readability Score :&nbsp;&nbsp;</span>
              <span>{title.readability_score}</span>      
            </Container>
            {resultTitle instanceof Array ?
              buttonSearchSpotify(resultTitle[1])
              :buttonSearchSpotify(title.name)
            }
          </Container>
          </Container>
  };

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

  function isFocus(filter) {
    if (fontSize === filter){
      return "focus"
    } return null
  }
  function buttonChangeSize() {
    return (
      <div className="filters">
        <span id='icon'><BiFontSize/></span>
        <button onClick={() => setFontSize('font-small')} id={isFocus('font-small')} 
          className="btn-font-small">
            Aa
        </button>
        <button onClick={() => setFontSize('font-mid')} id={isFocus('font-mid')} 
          className="btn-font-mid">
            Aa
        </button>
        <button onClick={() => setFontSize('font-big')} id={isFocus('font-big')}
          className="btn-font-big">
            Aa
        </button>
      </div>
    )
  }

  function buttonSearchSpotify(searchTitle) {
    if (user) { return (
      <>
      <Container id="spotify-btn">
        <button onClick={handleShow} id="spotify-search">
          <FaSpotify className="spotify-icon"/>
          Search on Spotify 
        </button> 
      </Container>
      {show &&
      <ResultSpotify spotifyApi={spotifyApi} show={show} handleClose={handleClose}
        trackName={checkSpecialChars(searchTitle)}
        trackNameReal={title.name}
        trackArtist={title.artist}
        trackArtistId={trackArtist.replace(/-/," ")}
      />
      }
      </>
    )}
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
              <Col lg={6} xl={5} style={{ marginTop: 50 }}>
                <PopupDict dictList={collectedWord} isOpen={isOpen} />
              </Col>
            }

              <Col lg={6} xl={7} style={{ marginTop: 50 }}>
                {screenSize===true &&
                  <div className="sidebar-mobile">
                    <PopupDict dictList={collectedWord} isOpen={isOpen} />
                  </div>
                }
                <div className="btn-on-lyric">
                  {buttonChangeSize()}
                  <hr/>
                </div>
                <br/>
                <div id="lyric" className={fontSize}>
                  {(tokenized_list && tokenized_list.length>0) &&
                    tokenized_list.map((word, i) => {
                    if (word.surface === '\n'){
                      return <div key={i}></div>
                    }else if(word.surface === '\n\n'){
                      return <div key={i}><br/></div>
                    }else if(word.poses[0] === '空白'){
                      return <span key={i}>&nbsp;</span>
                    }else if(!isJapanese(word.surface)){
                        return <span key={i}>{word.surface}</span>
                    }else if(/\s/.test(word.surface)){ //check str is space?
                      return <span key={i}>&nbsp;</span>

                    //}else if(['助詞','助動詞','空白','補助記号','記号','代名詞','接尾辞','接頭辞'].indexOf(word.poses[0]) === -1 ){  //Value does not exists!
                    }else if(['名詞','動詞','形容詞','形状詞','連体詞','副詞','接続詞','感動詞'].includes(word.poses[0]) 
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
