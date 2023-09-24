import YouTube from "react-youtube";

function VideoPlayer({ setHasLoaded, videoId }) {
  // Once the YouTube package (react-youtube) has loaded
  // tell the thumbnail it is no longer needed.
  // Play the video.
  const _onReady = (event) => {
    setHasLoaded(true);
    event.target.playVideo();
  };
  const opts = {
    height: '720',
    width: '1280',
    playerVars: {
      autoplay: 0,
      rel: 0,
    },
  };

  return (
    <YouTube
      videoId={videoId}
      onReady={_onReady}
      opts={opts}
      //className={videoInner}
      iframeClassName="video-frame"
    />
  );
};

function OldVideoPlayer({videoId}) { 
  return  (
          <div>
            <iframe
                className="video-frame"
                src={"https://www.youtube.com/embed/"+ videoId +"?loop=1&playlist=" + videoId} 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                width="1280"
                height="720"
                //frameborder="0"
                allowFullScreen
            >
            </iframe>
          </div>
          )
}

export default VideoPlayer;