import React, { useEffect, useState } from "react";
import { Card, Spinner } from 'react-bootstrap';

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
  const mapDict = dictList.dict && dictList.dict.length > 0 ? 
    dictList.dict.slice(0, 5).map((dict, i) => {
      return (
            <Card key={i}>
              <Card.Body>
                <Card.Title>
                  {dictList.token.word} <br/>
                  {isReadForm(dictList)} {dict.Type.join(' / ')} <ruby>漢字<rt>かんじ</rt></ruby>

                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {dictList.token.dic_form} ( {dict.Yomikata} )
                </Card.Subtitle>
                <Card.Text>
                    EN : {dict.English} <br/>
                    TH : {dict.Thai} <br/>
                </Card.Text>
              </Card.Body>
            </Card>
      )
    }) : <p>;-;</p>; 

    return (
      isOpen ?
        <>
          {mapDict}
        </>
      : <Spinner animation="border" />
     
    );
}


