import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, DropdownButton, Dropdown } from 'react-bootstrap';
import { Loading, NoLoginSpotify } from "../component/Loading";
import useIsMobile from '../component/useIsMobile';
import ResultAllModal from '../component/Search/ResultAllModal';

import axios from 'axios';
import { backendSrc } from "../component/backendSrc";

import { FiSearch } from 'react-icons/fi';
import { BsPlayCircleFill } from 'react-icons/bs';
import { FaSpotify } from 'react-icons/fa';

import { PlaylistItems } from '../component/Spotify/PlaylistItems';
import { VscCircleFilled } from 'react-icons/vsc';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';


const KASHIFY = <span className="font-semi-bold"> Kashify </span>
const SPOTIFY = <span className="font-semi-bold"><FaSpotify/> Spotify </span>

const btnDetail = 
  <div className="description" id="btn-detail" lang="th"> 
    <p className="radius">
      <div className="d-flex align-items-center" style={{marginBottom: '10px'}}>
        <BsPlayCircleFill style={{fontSize: '40px'}}/> &nbsp;&nbsp;
        เปิดเพลงฟังบน &nbsp; {SPOTIFY}
      </div>
      <div className="d-flex align-items-center">
        <button className="icon" id="search-kashify"><FiSearch /></button> &nbsp;&nbsp;
        ค้นหาเพลงใน &nbsp; {KASHIFY}
      </div>
    </p>
  </div>

function Playlist (){

    const [playlists, setPlaylists] = useState([]);
    const [playlistsInfo, setPlaylistsInfo] = useState({})
    const [loading, setLoading] = useState(false);
    const { codePlaylist } = useParams();
    const screenSize = useIsMobile()

    const [isOpen, setIsOpen] = useState(false);

    const [keySearch, setKeySearch] = useState({}); 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
      let isMounted = true;
      setLoading(true);
      axios.get(`${backendSrc}/playlists` , { params: { code : codePlaylist }
        })
        .then((response) => {
          if(isMounted){
            setPlaylists(response.data.tracks);
            setPlaylistsInfo(response.data);
            setLoading(false);
          } 
        })
        .catch(error => {
          console.log(error.response)
        });
        return () => { isMounted = false; };
    }, [codePlaylist]);


   const buttonOpenSpotify = 
      <div id="spotify-btn">
        <button  id="spotify-search" lang="th">
          <FaSpotify className="spotify-icon"/>
          Open Playlist on Spotify 
        </button> 
      </div>

  const PLAYLISTS = 
    <div className="description">
      <div className="spotify">
          <p className="radius" id="playlist">
              {PlaylistItems.map((item, index) => {
                  return (
                  <Link to={item.url} key={index}>
                      <span className="font-semi-bold pink-link"> 
                          <VscCircleFilled id="icon-spotify"/> 
                          {item.title}
                      </span>
                  </Link>
                  )}
              )}
          </p>
      </div>
    </div>

  const TITLE_DROPDOWN = <h2 className="font-bold" style={{marginBottom:0}}>  <FaSpotify /> Spotify Playlists </h2>

  return (
    <Container className="pages">
      <Row>
        <Col xl={5} xxl={4}>
          <div className="header-left">
            <div className="d-flex align-items-center">
              {TITLE_DROPDOWN} &nbsp;&nbsp;
              <button onClick={() => setIsOpen(!isOpen)} className="font-semi-bold">
                ALL
                {!isOpen ? 
                  <TiArrowSortedDown  className="icon-playlists"/>
                  : <TiArrowSortedUp  className="icon-playlists"/>
                }
              </button> 
            </div>   

            {isOpen && PLAYLISTS}
   
            <div lang="jp">
              <div className="title-series"> 
                <h3>
                  {playlistsInfo.name} 
                </h3>
              </div>
              
              {btnDetail}
              
            </div>
          </div>
          
        </Col>

        <Col xl={7} xxl={8}>

          {loading ? (          
            <Loading />
          ) : ( 
          <div  lang="jp">
           
              {playlists.map((track, i) => {
                return (
                  <Card key={i} className='spotify'>
                      <Card.Body>

                        <Row className="items-center">
                          <Col xxs={9} xs={10} md={10}>
                            <div className="d-flex justify-content-left align-items-center">
                              <Card.Img src={track.image} alt=''></Card.Img>
                              <Container className="d-block">
                                <Card.Title>{track.name}</Card.Title>
                                <Card.Text>{track.artists}</Card.Text> 
                              </Container>
                            </div>
                          </Col> 

                          <Col xxs={3} xs={2} md={2}>
                              <div className="d-flex justify-content-end align-items-center"
                                style={(screenSize) ? { zoom: '80%' } : { zoom: '100%' }}>
                                <Card.Link href={track.url} target="blank" style={{marginRight:10}}>
                                  <BsPlayCircleFill className="icon"/>  
                                </Card.Link>
                            
                                <button id="search-kashify"
                                  onClick={ () => {
                                    setKeySearch({name:track.name, 
                                                  artists:track.artists,
                                                  image:track.image
                                                });
                                    handleShow();
                                }}>
                                  <FiSearch /> 
                                </button>
                              </div>
                          </Col>
                        </Row> 

                      </Card.Body>
                  </Card>        
                )
              })} 
          </div>   
          )}

        </Col>

        {keySearch &&
            <ResultAllModal  dataTrack={keySearch} show={show} handleClose={handleClose} openResult={true} />
        }

      </Row>
    </Container>
  );
}

export default Playlist;
