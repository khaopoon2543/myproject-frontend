import { useNavigate } from "react-router-dom";

function SearchSpotify({title, trackArtist, trackId}) {
    const navigate = useNavigate();
    
    return (
        <div className="banner" id="spotify-search">
            <button onClick={ (event) => {
                navigate('/spotify/'+ trackArtist + '/' + trackId,
                { state: {  trackName:title.name, 
                            trackArtist:title.artist,
                            trackArtistId:trackArtist.replace(/-/," ")
                } })
                event.preventDefault()
                }}
            >
                <div className="items-left">
                    <img alt='spotify search' src={require("../images/Spotify_Icon_RGB_White.png")}></img>
                    SEARCH SPOTIFY 
                </div>
            </button> 
        </div>
    )
}

export {
    SearchSpotify
}