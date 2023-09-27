import React, { useState } from "react";
import { Container, Form, Row, Col } from 'react-bootstrap';
import { PiNotePencilBold } from 'react-icons/pi';
import Lyric from "./Lyric";
import "./Input.css";


function Input() {

  const [lyric, setLyric] = useState("")
  const [inputLyric, setInputLyric] = useState("")
  //For Result vesion Modal
  //const [show, setShow] = useState(false);
  //const handleClose = () => setShow(false);
  // handleShow = () => setShow(true);

  const onFormSubmit = event => {
    setInputLyric(lyric);
    //handleShow();
    event.preventDefault();
  }
  const onChangeData = event  => { 
    setLyric(event.target.value);
  }

  const STYLE_TEXTAREA = {
    height:"300px", 
    background: 'rgba(255, 255, 255, 0.766)',
    borderRadius: 10,
    border: '2px solid var(--pinkPastel)',
  }

  return (
    <Container className="pages" id="input-btn">
      <Row>
        <Col xl={5} xxl={5}>
          <div className="header-left">

            <h1 className="font-bold">
                แปลงเนื้อเพลงเอง <PiNotePencilBold/>         
            </h1>

            <div className="description">
              <h5 className="underline"> แปลงเนื้อเพลงเองยังไง ?</h5>
              <p className="font-semi-bold pink-text"> นำเนื้อเพลงมาใส่ในกล่องข้อความแล้วกดปุ่ม "แปลงเนื้อเพลง" จากนั้นก็ไปเรียนรู้คำศัพท์จากเนื้อเพลงกันได้เลย!</p> 
              <p className="radius pink-text"> *** ในหน้า "แปลงเนื้อเพลง" ไม่ได้เป็นการเพิ่มเนื้อเพลงลงในฐานข้อมูลของ Kashify แต่อย่างใด โดยระบบจะแปลงเนื้อเพลงที่ผู้ใช้นำมาใส่ให้สามารถดูคำหมายของคำศัพท์ในเนื้อเพลงได้เท่านั้น</p> 
            </div>

          </div>
        </Col>

        <Col xl={7} xxl={7}>
          <Form onSubmit={onFormSubmit} className="input-lyric">
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Control as="textarea" rows={3} onChange={onChangeData} style={STYLE_TEXTAREA}/>
            </Form.Group>
            <div className="process-lyric-btn">
              <button type="submit">
                แปลงเนื้อเพลง
              </button>
            </div>
          </Form>
        </Col>

        {inputLyric && <Lyric inputLyric={inputLyric} />}

      </Row>
    </Container>
    
 
    );
}
export default Input;