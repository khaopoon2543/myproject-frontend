import { useNavigate } from "react-router-dom";
import { FaSpotify } from 'react-icons/fa';

function SearchSpotify({title, trackArtist, trackId}) {
    const navigate = useNavigate();

    function checkSpecialChars(sentences) {
        const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        const specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,.";
        if (format.test(sentences)) {
          for (var i = 0; i < specialChars.length; i++) {
            sentences = sentences.replace(new RegExp("\\" + specialChars[i], "g"), "");
          }
          return sentences;
        }
        return sentences;
      }
    
    return (
        <div className="banner" id="spotify-btn">
            <button onClick={ (event) => {
                navigate('/spotify/'+ trackArtist + '/' + trackId,
                { state: {  trackName:checkSpecialChars(title.name), 
                            trackNameReal:title.name, 
                            trackArtist:title.artist,
                            trackArtistId:trackArtist.replace(/-/," ")
                } })
                event.preventDefault()
                }}
                id="spotify-search"
            >
                <FaSpotify className="spotify-icon"/>
                SEARCH SPOTIFY 
            </button> 
        </div>
    )
}

export {
    SearchSpotify
}