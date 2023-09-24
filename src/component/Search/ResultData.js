import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Col } from 'react-bootstrap';
import "./ResultSearch.css";
import { Loading } from "../Loading";
import { backendSrc } from "../backendSrc";
import { isArtist, isSeries } from "./ResultDataFunction";
import { checkHeadFilter } from "./HeadFilterResult";

export default function ResultData(props) {
    const alphabet = props.alphabet;
    const searchTerm = props.searchTerm;
    const searchAll = props.searchAll; //filter 'all' from SearchBar.js
    const spotify = props.spotify; //'spotify' from ResultAllModal.js //if search result in kashify from current listen Spotify

    const src = props.src;
    const [allDataList, setDataList] = useState([])
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(!searchAll ? 30 : 8);
    function loadMore() { setVisible(visible + 30) }
    //console.log({searchTerm, alphabet, searchAll})

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        axios.get(`${backendSrc}/${src}` , { params: { alphabet : alphabet, searchTerm : searchTerm, spotify : spotify }
          })
          .then((response) => {
            if(isMounted){
              setDataList(response.data);
              setLoading(false);
            } 
          })
          .catch(error => {
            console.log(error.response)
          });
          return () => { isMounted = false; };
    }, [alphabet, searchTerm]);

    function showList() {
      if (src==='artists') {
        return isArtist(allDataList, visible)
      } return isSeries(allDataList, visible)
    }

    function showLoading() {
      if (alphabet) { //is Data.js (Artist or Series)
        return <Loading />
      } else { //is SearchBar.js
        return null
      }
    }

    return (
      
      <React.Fragment>
        {loading ? 
          ( 
            showLoading()
          ) : 
          ( 
          <>
            <Col md={12}>
              {(!alphabet && allDataList.length > 0 && !props.spotify) &&
                <div className="bg-search-all">
                  <h3 className="search-all" id="is-result">
                    { src==="artists" ? 
                      checkHeadFilter('artist') : checkHeadFilter('series')
                    }
                  </h3>
                </div>
              }

              <div lang="jp">
                {allDataList.length > 0 && (
                  showList()
                )}
              </div>

              {(alphabet && allDataList.length>10) ? //loading
                (<> 
                  {visible<allDataList.length &&
                    <div className="load-more">
                      <button onClick={() => loadMore()}> Load More </button>
                    </div>
                  }
                </>)
                : null
              }
            </Col>
          </>
          )
        }
      </React.Fragment>  
    ) 
}
