import "./ImageSong.css";
import { PiMusicNoteFill } from "react-icons/pi";
/* import { LazyLoadImage } from "react-lazy-load-image-component";

/* -------------- img-song search -------------- */

function songImageSearch(imageUrl) {
    let modifiedUrl = imageUrl;

    if (imageUrl.includes('300x300.jpg')) {
      modifiedUrl = imageUrl.replace('300x300.jpg', '150x150.jpg');
    } else {
      modifiedUrl = imageUrl.replace('.jpg', '-150x150.jpg');
    }

    return (
        <div className="img-song search">
          <img src={modifiedUrl} alt="track image"/>
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
          <img src={img_url} width="761" height="426" alt="track image"/>
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

/* -------------- result img track api on spotify (TitleLyrics.js) -------------- */

function isImage(trackImage) {
  if (trackImage) 
    return <img src={trackImage} alt="track image"/>
}


export { 
    songImageSearch,
    noSongImageSearch,
    songImageLyric,
    noSongImageLyric,
    isImage,
}