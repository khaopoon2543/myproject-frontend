import { Card } from 'react-bootstrap';

export default function PopupDict({ dictList, isOpen }) {
  
  function isReadForm(dictList) {
    const read_form = dictList.token.read_form
    const dic_form = dictList.token.dic_form
    if (!read_form) {
        return dic_form
    }else {
        return read_form
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
                <Card.Title className="mb-4"> 
                  <span className="font-semi-bold black-text"> {dict.Kanji} </span> 
                  <span>({dict.Yomikata})</span>
                </Card.Title>
                <Card.Subtitle className="mb-2" id="tagPos">
                  <p>{splitPos(dict.Type)}</p>
                </Card.Subtitle>
                <Card.Text lang="th" id="dictTh" className="font-semi-bold">
                  {dict.Thai}
                </Card.Text>
                <Card.Text lang="th" id="dictEn" className="font-semi-bold">
                  {splitDictEng(dict.English)}
                </Card.Text>
              </Card.Body>
            </Card>
      )
    }) : <p>;-;</p>; 

    return (
      isOpen ?
        <>
        <div className="sidebar">
          <div id="header" className="d-flex justify-content-left align-items-center">
            <h1 style={{ marginLeft: 10, marginRight: 10 }}>{dictList.token.word}</h1>
            <h3 className="font-light">({isReadForm(dictList)})</h3>
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
            <h2>ความหมายคำศัพท์</h2>
          </div>
          <div className="scroll"> 
            <Card>  
              <Card.Body>    
                <Card.Title className="mb-2 font-semi-bold"> 
                  <span>ลองเลือกคำที่</span>
                  <button className="pink-text font-semi-bold black-text">ขีดเส้นใต้</button>
                  <span>แล้วเรียนรู้ความหมายของคำศัพท์ได้เลย!</span>
                </Card.Title>
              </Card.Body> 
            </Card>
          </div>
        </div> 
        </>
    );
}


