import React, { useEffect, useState } from "react";
import axios from 'axios';
import { backendSrc } from "../component/backendSrc";
import { Link } from "react-router-dom";
import { RiUserStarLine } from 'react-icons/ri';
import { MdMovie } from 'react-icons/md';


function TopLists({open}) {

  const [seriesTopLists, setSeriesTopLists] = useState([]); 
  const [artistsTopLists, setArtistsTopLists] = useState([]); 

  useEffect(() => {
    if (open) {
    axios.get(`${backendSrc}/toplists`)
      .then(response => {
        setSeriesTopLists(response.data[0].series); 
        setArtistsTopLists(response.data[1].artists); 
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }, [ open ])

  function ARTISTS(artistsTopLists) {
      if (artistsTopLists.length > 0) {
        return (
            artistsTopLists.map((item, index) => {
                return (
                    <Link to={`/artists/${item.artist_id.replaceAll(" ","-")}`} key={index}>
                        <button id='artist' className="top-lists"> 
                            {item.name}
                        </button> 
                    </Link>
                )
            })
        )
      }
  }
  function SERIES(seriesTopLists) {
    if (seriesTopLists.length > 0) {
      return (
        seriesTopLists.map((item, index) => {
              return (
                  <Link to={`/series/${item.series_id.replaceAll(" ","-")}`} key={index}>
                      <button id='artist' className="top-lists"> 
                          {item.name}
                      </button> 
                  </Link>
              )
          })
      )
    }
}


  if (!open) return null
  return (

    <div>
        <div className="description" id="search">

            <h5 className="underline"><RiUserStarLine/> ศิลปินยอดนิยม </h5>
            <div id="search" style={{marginBottom: 20}}>
                <div className="artist-series">
                    {ARTISTS(artistsTopLists)}
                </div>
            </div>

            <h5 className="underline"><MdMovie /> ซีรีส์ยอดนิยม </h5> 
            <div id="search">
                <div className="artist-series">
                    {SERIES(seriesTopLists)}
                </div>
            </div>

        </div>
    </div>
 
    );
}
export default TopLists;