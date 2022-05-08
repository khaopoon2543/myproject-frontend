import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Modal, Card } from 'react-bootstrap';
import { PlaylistItems } from '../component/Spotify/PlaylistItems';

import { FaSpotify, FaHeadphonesAlt } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { BsPatchCheck } from 'react-icons/bs';
import { MdQueueMusic } from 'react-icons/md';
import { VscCircleFilled } from 'react-icons/vsc';

const PINK = {
    color: "var(--pink)"
}
const KASHIFY_PINK = <strong style={PINK}> & Kashify </strong>
const KASHIFY = <span className="font-semi-bold"> Kashify </span>
const SPOTIFY = <span className="font-semi-bold"><FaSpotify/> Spotify </span>


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
                <Modal.Title className="font-bold">
                    <BsPatchCheck id="icon-success" />
                    <br/>
                    เข้าสู่ระบบผ่าน {SPOTIFY} สำเร็จ!
                </Modal.Title>
                <br/>
                <div id="success-btn">
                    <button onClick={handleClose}>
                        เริ่มใช้งาน Kashify
                    </button>
                </div>
                <br/>
            </Modal.Header>
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
        <Col xl={5} xxl={4}>
          <div className="header-left">
            <h1 className="font-bold">
                Spotify {KASHIFY_PINK}
            </h1>
            <div className="description">
                <h5 className="underline">
                    เข้าสู่ระบบแล้วทำอะไรได้บ้าง ?
                </h5>
                <p>
                    เมื่อเข้าสู่ระบบผ่าน {SPOTIFY} แล้ว ก็จะสามารถใช้งานส่วนต่าง ๆ ทั้งหมดเหล่านี้จาก {SPOTIFY} ได้เลย!
                </p>
            </div>
          </div>
        </Col>

        <Col xl={7} xxl={8}>
          <div className="text-left spotify">

            <div className="description">
                <h5 className="underline">
                    <FaHeadphonesAlt id="icon-title"/>
                    <span> Currently Playing Track</span>
                </h5>
                <Card>
                    <p> 
                    ค้นหาเพลงใน {KASHIFY} ผ่านเพลงที่กำลังเปิดอยู่บน {SPOTIFY}
                    โดยกดรูปไอคอน <FaHeadphonesAlt id="icon-headphone"/> ที่อยู่บนแถบเมนูด้านบนได้เลย!
                    </p>
                </Card>
            </div>

            <div className="description">
                <h5 className="underline">
                    <FiSearch id="icon-title"/>
                    <span> Search Tracks </span>
                </h5>
                <Card> 
                    <p>
                    เมื่อเปิดเนื้อเพลงใน {KASHIFY} 
                    แล้วถ้าอยากเปิดเพลงฟังไปด้วยก็สามารถค้นหาผ่าน {SPOTIFY} และเปิดเพลงฟังกันได้เลย!
                    </p>
                </Card>
            </div>

            <div className="description">
                <h5 className="underline">
                    <MdQueueMusic id="icon-title"/>
                    <span> Japanese Playlists</span>
                </h5>
                <Card>
                    <p> 
                    ถ้าไม่รู้จะฟังเพลงอะไรดี เราเตรียมมาให้แล้ว! ลองเลือกเพลงภาษาญี่ปุ่นใน Playlists ของ {SPOTIFY} ข้างล่างนี้ได้เลย!
                    </p>
                </Card>
                <Card>
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
                </Card>
            </div>
          </div>   
        </Col>
      </Row>
      {show && popupSuccess(show, handleClose)}
    </Container>
 
    );
}
export default Spotify;