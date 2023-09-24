import "./ImageSong.css";
import { PiMusicNoteFill } from "react-icons/pi";

/* -------------- img-song search -------------- */

function songImageSearch(pic_url) {
    return (
        <div className="img-song search">
          <img src={pic_url} loading="lazy"/>
        </div>
    );
  }
function noSongImageSearch() {
    return (
        <div className="no-img search">
          <PiMusicNoteFill/>
        </div>
    );
}

/* -------------- img-song lyric -------------- */

function songImageLyric(img_url) { // width="761" height="426"
    // const img_url="https://www.lyrical-nonsense.com/wp-content/uploads/2022/08/HoneyWorks-Kawaii-ne-tte-Iwarechatta-feat-Juri-Hattori-Ayane-Sakura.jpg"
    return (
        <div className="img-song lyric">
          <img src={img_url} width="761" height="426" loading="lazy"/>
        </div>
    );
  }
function noSongImageLyric() {
      return (
          <div className="no-img lyric">
            <PiMusicNoteFill/>
          </div>
      );
}

/* -------------- img-song search (TitleLyrics.js) -------------- */

function isImage(trackImage) {
  if (trackImage) 
    return <img src={trackImage} alt="song image"/>
}


export { 
    songImageSearch,
    noSongImageSearch,
    songImageLyric,
    noSongImageLyric,
    isImage,
}