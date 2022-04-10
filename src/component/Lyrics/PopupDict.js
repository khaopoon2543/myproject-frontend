import { Card } from 'react-bootstrap';
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
        text.push(<span key={i}>({i}) {foundWords[i].replace(/\,$/,'')} <br/></span>);
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
            <Card key={i} id="dict">
              <Card.Body>
                <Card.Title className="mb-2"> 
                  <span className="font-semi-bold black-text"> {dict.Kanji} </span> 
                  {dict.Kanji!==dict.Yomikata && <span>({dict.Yomikata})</span>}
                  
                  <div className="tagPos">{splitPos(dict.Type)}</div>
                </Card.Title>
            
                <div lang="th" id="dictTh" className="font-semi-bold mb-1">
                  {dict.Thai}
                </div>
                <div lang="th" id="dictEn">
                  {splitDictEng(dict.English)}
                </div>
              </Card.Body>
            </Card>
      )
    }) : <p>;-;</p>; 

    return (
      isOpen ?
        <>
        <div className="sidebar">
          <div id="header" className="d-flex justify-content-left align-items-center">
            <h4 style={{ marginLeft: 10, marginRight: 10 }}>{dictList.token.word}</h4>
            {isReadForm(dictList)!==null ?
              <h5 className="font-light">({isReadForm(dictList)})</h5>
            : null }
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
            <h4>ความหมายคำศัพท์</h4>
          </div>
          <div className="scroll" id="no-scroll">  
            <Card id="dict">  
              <Card.Body className="font-semi-bold">    
                <span>
                  ลองเลือกคำศัพท์ที่
                  <button className="pink-text font-semi-bold black-text">
                    &nbsp;ขีดเส้นใต้&nbsp;
                  </button>
                  แล้วเรียนรู้ความหมายของคำศัพท์ได้เลย!
                </span>
              </Card.Body> 
            </Card>
          </div>
        </div> 
        </>
    );
}


