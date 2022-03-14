import React, { useEffect, useState } from "react";
import { Col, Card, Alert, OverlayTrigger } from 'react-bootstrap';

export default function PopupDict({ dictList }) {
  
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
    dictList.dict.slice(0, 2).map((dict, i) => {
      return (
            <Card style={{ width: '100%' }} key={i}>
              <Card.Body>
                <Card.Title>
                  {isReadForm(dictList)} {dict.Type.join(' / ')}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  ( {dict.Yomikata} )
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
        <div>
          {mapDict}
        </div>    
    );
}


