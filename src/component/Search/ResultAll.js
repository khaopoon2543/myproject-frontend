import React, { useState } from "react";
import ResultSearch from "./ResultSearch";
import ResultSearchAll from "./ResultSearchAll";
import ResultData from './ResultData';
import { PLSMoreThreeChars, NoResult } from '../Loading';

function ResultAll(props) {
    const {typing, selectedFilter, level} = props;

    return (
      <div style={{ marginTop: 10 }}>

          {(typing || selectedFilter==='show') &&
            <>
            {selectedFilter==='artist' && 
              <ResultData src="artists" searchTerm={typing} />   
            }
            {selectedFilter==='series' &&
              <ResultData src="series" searchTerm={typing} />   
            }
            {(selectedFilter!=='all') &&
              <ResultSearch searchTerm={typing} filter={selectedFilter} level={!level ? null : level}/>
            }

            {selectedFilter==='all' &&
            <>
              <ResultSearchAll searchTerm={typing} level={!level ? null : level}/>
            </>
            }
            </>
          }

      </div>  
    );
}
export default ResultAll;