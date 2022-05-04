import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Modal, Card } from 'react-bootstrap';
import { PlaylistItems } from '../component/Spotify/PlaylistItems';

import { FaSpotify, FaHeadphonesAlt } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { BsPatchCheck } from 'react-icons/bs';
import { MdQueueMusic } from 'react-icons/md';

const PINK = {
    color: "var(--pink)"
}
const KASHIFY = <strong> Kashify </strong>
const KASHIFY_PINK = <strong style={PINK}> Kashify </strong>
const KASHIFY_InPINK = <strong style={PINK}> & Kashify </strong>
const SPOTIFY = <span> <FaSpotify /> Spotify </span>


function popupSuccess(show, handleClose) {
    return (
        <Modal  
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show} onHide={handleClose} 
            animation={false}
            id="popup-success"
        > 
            <Modal.Header>
                <Modal.Title className="font-bold" lang="th">
                    <BsPatchCheck id="icon-success" />
                    <br/>
                    เข้าสู่ระบบผ่าน {SPOTIFY} สำเร็จ!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div id="success-btn">
                    <button lang='th' onClick={handleClose}>
                        เริ่มใช้งาน Kashify
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

function Spotify({code}) {
  const [show, setShow] = useState(false); 
  const handleClose = () => setShow(false);

  useEffect(() => {
    if (!code) return
        setShow(true);
  }, [])

  return (
    <Container className="pages">
      <Row>
        <Col xl={4}>
          <div className="header-left" lang="th">
            <h1 className="font-bold">
                Spotify {KASHIFY_InPINK}
            </h1>
            <div className="description">
                <p>
                    เมื่อเข้าสู่ระบบผ่าน <FaSpotify /> Spotify แล้ว ก็จะสามารถใช้งานส่วนต่าง ๆ เหล่านี้ได้เลย!
                </p>
            </div>
          </div>
        </Col>

        <Col xl={8} className="text-left" lang="th">
          <div className="function-list">
            <h2 className="font-bold">
                <FaHeadphonesAlt id="icon-title"/>
                <span> Currently Playing Track</span>
            </h2>
            <div className="spotify-description" id="current">
                <Card>
                    <span> 
                        ค้นหาเพลงใน {KASHIFY_PINK} ผ่านเพลงที่กำลังเปิดอยู่บน {SPOTIFY}
                        โดยกดรูปไอคอน <FaHeadphonesAlt id="icon-headphone"/> ที่อยู่บนแถบเมนูด้านบนได้เลย!
                    </span>
                </Card>
            </div>
          </div>

          <div className="function-list">
            <h2 className="font-bold">
                <FiSearch id="icon-title"/>
                <span> Search Tracks </span>
            </h2>
            <div className="spotify-description" id="current">
                <Card>
                    <span> 
                        เมื่อเปิดเนื้อเพลงใน {KASHIFY_PINK} 
                        แล้วถ้าอยากเปิดเพลงฟังไปด้วยก็สามารถค้นหาผ่าน {SPOTIFY} และเปิดเพลงฟังกันได้เลย!
                    </span>
                </Card>
            </div>
          </div>

          <div className="function-list">
            <h2 className="font-bold">
                <MdQueueMusic id="icon-title"/>
                <span> Japanese Playlists</span>
            </h2>
            <div className="spotify-description" id="current">
                <Card>
                    <span> 
                        ถ้าไม่รู้จะฟังเพลงอะไรดี ลองเลือกเพลงใน Playlists เพลงญี่ปุ่นใน {SPOTIFY} ข้างล่างนี้ได้เลย!
                    </span>
                </Card>
            </div>
            <div className="spotify-description" id="playlist">
                {PlaylistItems.map((item, index) => {
                    return (
                    <Link to={item.url} key={index}>
                        <Card>
                            <span> 
                                <FaSpotify id="icon-spotify"/> 
                                {item.title}
                            </span>
                        </Card>
                    </Link>
                    )}
                )}
            </div>
          </div>
            
        </Col>
      </Row>
      {show && popupSuccess(show, handleClose)}
    </Container>
 
    );
}
export default Spotify;