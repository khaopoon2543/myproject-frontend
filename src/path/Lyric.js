import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
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
import { IoLogoYoutube } from 'react-icons/io5';
import useIsMobileLG from '../component/useIsMobileLG';
import { ArtistLink, SeriesLink } from "../component/linkPath";
import { backendSrc } from "../component/backendSrc";

function Lyric({inputLyric}) {
  const [tokenized_list, setTokenizedList] = useState([])
  const [title, setTitle] = useState([])
  const [titleInfo, setTitleInfo] = useState([]);

  const [loading, setLoading] = useState(true);
  const { trackId, trackArtist } = useParams() 
  const [collectedWord, setCollectedWord] = useState([]); 
  const [isOpen, setIsOpen] = useState(false);
  const screenSize = useIsMobileLG();
  const [fontSize, setFontSize] = useState(screenSize ? 16 : 18);


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
              setTitle(response.data.title);
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

  function isSingers(titleInfo) {
    let text = []
      titleInfo.singers.map((singer, i) => {
        text.push(
          <>
          {singer.id ?
            <Link to={ArtistLink(singer.id)} key={i}>
              <button id="singer">{singer.name}</button>
            </Link>
          : 
            <button id="singer" className="no-id" key={i}>{singer.name}</button>
          }
          </>
        );
      })
      return text
  }
  function isSeries(titleInfo) {
      return (
        <>
          <span id="head">
            {titleInfo.series_info.type} 
            <span id="pink">{titleInfo.series.theme}</span>
          </span>
          <Link to={SeriesLink(titleInfo.series.id)}>
              <button id="artist">{titleInfo.series_info.name}</button>
          </Link>
     
        </>
      )
  }

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
    return (
      <Container className="titleLyric" fluid>
        <Container fluid="md">
          <Container className="text-left">
            {resultTitle instanceof Array ? //if return titleList (is feat. in title)
              <>
                <h1 className="font-semi-bold">{resultTitle[1]}</h1>
                <h5 className="font-semi-light">{resultTitle[2]}</h5>
              </>
            : 
                <h1 className="font-semi-bold">{title.name}</h1>
            }
            <div className="info" style={{marginTop: 20}}>
              <span id="head" lang="th">ศิลปิน</span>
              <Link to={ArtistLink(trackArtist)}>
                <button id="artist">{title.artist}</button>
              </Link>
              {(titleInfo.singers?.length>0) &&  
                isSingers(titleInfo)
              }
            </div> 

            {titleInfo.series_info && 
              <div className="info">
                { isSeries(titleInfo) }
              </div>
            }

            <div className="info" id="readability">
              <span lang="th" id="head">
                ความยากง่าย 
                <span id="pink">{title.readability_score}</span>
              </span>
              <div className="tagLevel" id="title-lyric">
                <TagLevels levelScore={title.readability_score}/>
              </div>
            </div>
            
          </Container>
            
          {resultTitle instanceof Array ?
                  buttonSearchSpotify(resultTitle[1])
                  :buttonSearchSpotify(title.name)
          }
      </Container>
    </Container>
    )
  };

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

  function buttonSearchSpotify(searchTitle) {
    const title = checkSpecialChars(searchTitle)
    const artist_id = trackArtist.replace(/-/," ")
    return (
      <Container className="info text-left" id="search">
       <div className="d-flex align-items-center">
        <span id="head" lang="th">ค้นหาเพลง</span>
        <div id="spotify-btn">
          <a href={`https://open.spotify.com/search/${title}%20${artist_id}`} target="_blank" rel="noopener nore">
          <button id="spotify-search" lang="th">
            <FaSpotify className="spotify-icon"/>
            Spotify 
          </button> 
          </a>
        </div>
        <div id="spotify-btn">
          <a href={`https://www.youtube.com/results?search_query=${title}%20${artist_id}`} target="_blank" rel="noopener nore">
          <button id="spotify-search" lang="th">
            <IoLogoYoutube className="spotify-icon"/>
            Youtube 
          </button> 
          </a>
        </div>
       </div>
      </Container>
    )
  }
  
  if (loading) return <LoadingIMG />
  return (
    <div lang="jp">
      {!inputLyric && <Title />}
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
