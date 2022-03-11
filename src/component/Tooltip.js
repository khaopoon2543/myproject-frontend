import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Button, Popover, OverlayTrigger } from 'react-bootstrap';

export default function Tooltip({word, dic_form, read_form, poses}) {

    const [dict_list, setDictList] = useState([])
    useEffect(() => {
        if ( word ) {
            axios.get('/dict' , { mode: 'cors', crossDomain: true,
                params: { 
                    word : word,
                    dic_form : dic_form,             
                    read_form : read_form,             
                    poses : poses //list         
                } 
            })
            .then((response) => {
              setDictList(response.data);
              //console.log(response.data)
            })
            .catch(error => {
              console.log(error.response)
            });
        }
    }, [ word ]);

    function isReadForm(read_form, dic_form) {
        if (!read_form) {
            return dic_form
        }else {
            return read_form
        }
    }

    function IsDict() {
        if (dict_list.length > 0) {
            const popover = (
                <Popover id="popover-basic">
                    <Popover.Header as="h3">{isReadForm(read_form, dic_form)} {dict_list[0].Type.join(' / ')}</Popover.Header>
                    <Popover.Body>
                        {dic_form} ( {dict_list[0].Yomikata} ) <br/>
                        EN : {dict_list[0].English} <br/>
                        TH : {dict_list[0].Thai} <br/>
                    </Popover.Body>
                </Popover>
            )
            return (
                <OverlayTrigger placement="top" overlay={popover}>
                    <span className="pink-text">{word}</span>
                </OverlayTrigger>
            )
        }   return (
                <span>{word}</span>
            )        
    }
  
    return (
        IsDict()
    );
}


