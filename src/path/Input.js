import React, { useState } from "react";
import { Container, Form, Modal } from 'react-bootstrap';
import { MdMusicNote } from 'react-icons/md';
import Lyric from "./Lyric";


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

  return (
    <Container className="pages" id="input-btn">

        <div className="text-left">
          <h1 className="font-bold">
              แปลงเนื้อเพลงเอง <MdMusicNote/>         
          </h1>
          <h5 className="font-semi-bold"> นำเนื้อเพลงมาใส่ทางด้านล่าง กดปุ่ม "แปลงเนื้อเพลง" แล้วไปเรียนรู้คำศัพท์กันได้เลย!</h5> 
          <h6 className="gray-text font-semi-bold"> *ในหน้า "แปลงเนื้อเพลง" ไม่ได้เป็นการเพิ่มเนื้อเพลงลงในฐานข้อมูลของ Kashify แต่อย่างใด โดยระบบจะแปลงเนื้อเพลงที่ผู้ใช้นำมาใส่ให้สามารถดูคำหมายของคำศัพท์ในเนื้อเพลงได้เท่านั้น</h6> 
        </div>

        <br/>

        <Form onSubmit={onFormSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" rows={3} onChange={onChangeData} style={{height:"200px"}}/>
          </Form.Group>
          <div className="filters">
            <button type="submit" id="process-lyric-btn">
              แปลงเนื้อเพลง
            </button>
          </div>
        </Form>

        {inputLyric && <Lyric inputLyric={inputLyric} />}

    </Container>
    
 
    );
}
export default Input;