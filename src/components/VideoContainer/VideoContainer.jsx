import React from "react";
import PropTypes from "prop-types";

export const VideoContainer = ({
  src,
  controls,
  autoplay,
  loop,
  muted,
  poster,
  width = '100%',
  height = '100%',
  type = "mp4", // Default to "video/mp4" if no type is provided
  left = '50%',
  top = '50%',
  zIndex = 0,
}) => {
  const videoStyles = {
    position: "absolute",
    top,
    left,
    width: width,
    height: height,
    objectFit: "cover",
    transform: "translate(-50%, -50%)",
    zIndex: zIndex,
    
  };
  return (
    <video
      controls={controls}
      autoPlay={autoplay}
      loop={loop}
      muted={muted}
      poster={poster}
      width={width}
      height={height}
      style={videoStyles}>
       
      <source src={src} type={`video/${type}`} />
      Your browser does not support the video tag.
    </video>
  );
};

VideoContainer.propTypes = {
  src: PropTypes.string.isRequired,
  controls: PropTypes.bool,
  autoplay: PropTypes.string,
  loop: PropTypes.bool,
  muted: PropTypes.string,
  poster: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  type: PropTypes.string,
  left: PropTypes.string,
  top: PropTypes.string,
  zIndex: PropTypes.number,
};

export default VideoContainer;
