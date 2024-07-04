import React from "react";
import PropTypes from "prop-types";

export const VideoContainer = ({
  src,
  controls,
  autoplay,
  loop,
  muted,
  poster,
  width,
  height,
  type = "mp4", // Default to "video/mp4" if no type is provided
  zIndex = 0,
}) => {
  const videoStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "100%",
    height: "100%",
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
  autoplay: PropTypes.bool,
  loop: PropTypes.bool,
  muted: PropTypes.bool,
  poster: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  type: PropTypes.string,
};

export default VideoContainer;
