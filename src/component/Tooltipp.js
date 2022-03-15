import React, { useEffect, useState } from "react";
import axios from 'axios';

export default function Tooltip(props) {

    const word = props.word
    const dic_form = props.dic_form
    const read_form = props.read_form
    const poses = props.poses
    
    const [dataDic, setDataDic] = useState({dict: null, token: null})
    const [isActive, setActive] = useState(false);

    const tokenizedList = { word : word, dic_form : dic_form, read_form : read_form, poses : poses }
    useEffect(() => {
        if ( word ) {
            axios.get('/dict' , { mode: 'cors', crossDomain: true,
                params: {   word : word,
                            dic_form : dic_form,             
                            read_form : read_form,             
                            poses : poses } //list
            })
            .then((response) => {
                setDataDic({dict: response.data, token: tokenizedList});
            })
            .catch(error => {
              console.log(error.response)
            });
    }}, [ word ]);

    //useEffect(_=>{
        //props.onOpen(dataDic);
    //}, [ dataDic ]);

    function IsDict() {
        if (dataDic.dict && dataDic.dict.length > 0) {
            
            return (
                    <div className={`pink-text ${isActive ? "active" : null}`} 
                        onMouseOver={() => {props.onOpen(dataDic); props.isOpen(true);}}
                        onClick={() => setActive(!isActive)}
                    >
                        <span>{word}</span>
                    </div>
            )
        }   return (
                <span>{word}</span>
            )        
    }
  
    return (
        IsDict()
    );
}


