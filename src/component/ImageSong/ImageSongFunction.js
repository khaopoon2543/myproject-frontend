import "./ImageSong.css";
import { PiMusicNoteFill } from "react-icons/pi";
import { LazyLoadImage } from "react-lazy-load-image-component";

/* -------------- img-song search -------------- */

function songImageSearch(pic_url) {
    return (
        <div className="img-song search">
          <LazyLoadImage  src={pic_url} alt="TRACK-IMAGE"/>
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
          <LazyLoadImage src={img_url} width="761" height="426" alt="TRACK-IMAGE"/>
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
    return <LazyLoadImage src={trackImage} alt="TRACK-IMAGE"/>
}


export { 
    songImageSearch,
    noSongImageSearch,
    songImageLyric,
    noSongImageLyric,
    isImage,
}