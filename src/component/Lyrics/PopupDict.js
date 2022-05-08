import { Card, Col, Row } from 'react-bootstrap';
import { isKatakana, isHiragana } from 'wanakana';

export default function PopupDict({ dictList, isOpen }) {
  
  function isReadForm(dictList) {
    const surface = dictList.token.word
    const read_form = dictList.token.read_form
    const dic_form = dictList.token.dic_form
    if (!read_form) {
        return dic_form
    }else if (isKatakana(surface) || isHiragana(surface)) {
        return null
    }else {
      return read_form //isKanji --> show read_form
    }
  }
  //<ruby>漢字<rt>かんじ</rt></ruby>
  function splitDictEng(dictEng) {
    if (dictEng === null) { return null }
    const re = new RegExp('[(][0-9]+[)]', 'i')
    const matches = dictEng.match(re)
    if (matches) {
      let foundWords = dictEng.split(re)
      let text = [];
      for (let i=1; i<foundWords.length; i++) {
        text.push(<span key={i}>({i}) {foundWords[i].replace(/\,$/,'')}</span>);
      }
      return text
    } return dictEng
  }
  function splitPos(dictPos) {
    let text = []
    dictPos.map((word,i) => {
      text.push(<span key={i}>{word}</span>);
    })
    return text
  }
  
  const mapDict = dictList.dict && dictList.dict.length > 0 ? 
    dictList.dict.slice(0, 5).map((dict, i) => {
      return (
            <Card key={i} id={(i!==(dictList.dict.length-1)) ? "dict" : "last-dict"}>
              <Card.Body>
                <Row>
                <Col xs={6} md={5}>
                  <Card.Title> 
                    <div className="head-each-word">
                      <span id="kanji">{dict.Kanji}</span>
                      <br/>
                      {dict.Kanji!==dict.Yomikata && 
                        <span id="read-form">{dict.Yomikata}</span>
                      }
                    </div>
                    <div className="tagPos">
                      {splitPos(dict.Type)}
                    </div>
                  </Card.Title>
                </Col>
                <Col xs={6} md={7}>
                  <div lang="th" id="dictTh" className="font-semi-bold">
                    {dict.Thai}
                  </div>
                  <div id="dictEn">
                    {splitDictEng(dict.English)}
                  </div>
                </Col>
                </Row>
              </Card.Body>
            </Card>
      )
    }) : <p>;-;</p>; 

    return (
      isOpen ?
        <>
        <div className="sidebar">
          <div id="header">
            <h4 id="head-word">{dictList.token.word}</h4>
            {isReadForm(dictList)!==null &&
              <h4 className="gray-text">({isReadForm(dictList)})</h4>
            }
          </div>
          <div className="scroll">       
            {mapDict}
          </div>
        </div> 
        </>
      : 
        <>
        <div className="sidebar" lang="th">
          <div id="header">
            <h4 id="head-word">ความหมายคำศัพท์</h4>
          </div>
          <div className="scroll" id="no-scroll">  
            <Card id="last-dict">  
              <Card.Body className="black-text">    
                <span>
                  เลือกคำศัพท์ที่
                  <button className="pink-text font-semi-bold black-text">
                    &nbsp;ขีดเส้นใต้&nbsp;
                  </button>
                  แล้วเรียนรู้ความหมายของคำศัพท์กันได้เลย!
                </span>
                <hr/>
                <span>
                  ถ้าคำศัพท์ยังกดดูความหมายไม่ได้ อาจจะต้องรอโหลดข้อมูลสักครู่นะคับ
                </span>
              </Card.Body> 
            </Card>
          </div>
        </div> 
        </>
    );
}


