import React, { useEffect, useState } from "react";
import axios from 'axios';
import { backendSrc } from "../backendSrc";

export default function Tooltip(props) {
    const word = props.word
    const dic_form = props.dic_form
    const read_form = props.read_form
    const poses = props.poses
    const tokenizedList = { word : word, dic_form : dic_form, read_form : read_form, poses : poses }
    const [dataDic, setDataDic] = useState({dict: null, token: null})

    const [isActive, setActive] = useState('');

    function handClick() {
        if (isActive === '') {
            setActive('active');
        } else {
            setActive('');
        }
    }

    useEffect(() => {
        if ( word ) {
            let isMounted = true;

            axios.get(`${backendSrc}/dict` , { mode: 'cors', crossDomain: true,
                params: {   word : word,
                            dic_form : dic_form,             
                            read_form : read_form,             
                            poses : poses } //list
            })
            .then((response) => {
                if(isMounted){
                    setDataDic({dict: response.data, token: tokenizedList}); //send to PopupDict
                } 
            })
            .catch(error => {
              console.log(error.response)
            });
            return () => { isMounted = false; };

    }}, [ word ]);

    function IsDict() {
        if (dataDic.dict && dataDic.dict.length > 0) {
            return (<button className={`pink-text`} 
                        onClick={() => {props.onOpen(dataDic); props.isOpen(true);}}>
                        {word}       
                    </button>)

        }   return ( <span>{word}</span> )        
    }
  
    return (
        IsDict()
    );
}


