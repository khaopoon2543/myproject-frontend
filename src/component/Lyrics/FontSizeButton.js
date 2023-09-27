// ButtonChangeSize.js
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { PiBookOpenTextFill, PiMinusBold, PiPlusBold, PiMusicNotesFill } from 'react-icons/pi';

function FontSizeButton({ fontSizeDict, setFontSizeDict, fontSize, setFontSize }) {
  return (
    <div className="tab-change-size" lang="jp">
      <Row>
        <Col xs={12} md={6} lg={12} xl={6}>
          <div className="btn-change-size vocab">
            <span id='icon'><PiBookOpenTextFill/></span>
            <span id='topic' lang="th"> คำศัพท์ </span>
            <button onClick={() => setFontSizeDict(fontSizeDict-2)}>
                <PiMinusBold/>
            </button>
            <span> {fontSizeDict} px </span>
            <button onClick={() => setFontSizeDict(fontSizeDict+2)}>
                <PiPlusBold/>
            </button>
          </div>
        </Col>
        <Col xs={12} md={6} lg={12} xl={6}>
          <div className="btn-change-size lyric">
            <span id='icon'><PiMusicNotesFill/></span>
            <span id='topic' lang="th"> เนื้อเพลง </span>
            <button onClick={() => setFontSize(fontSize-2)}>
                <PiMinusBold/>
            </button>
            <span> {fontSize} px </span>
            <button onClick={() => setFontSize(fontSize+2)}>
                <PiPlusBold/>
            </button>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default FontSizeButton;
