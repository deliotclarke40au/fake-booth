import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const ReturnButton = styled.button`
  background: #135c97;
  margin-bottom: 1rem;
  color: #fff;
  font-weight: bold;
  border-radius: 30px;
  border: none;
  padding: 1rem 1rem;
  text-align: center;
  display: ${(props) => (props.isDisplaying ? 'block' : 'none')};
  position: absolute;
  z-index: ${(props) => (props.isDisplaying ? '10' : '0')};
  top: 25px;
  right: 25px;
`;

const StyledImage = styled.img`
  position: absolute;
  display: ${(props) => (props.isDisplaying ? 'block' : 'none')};
  z-index: ${(props) => (props.isDisplaying ? '1' : '0')};
  max-width: 100%;
  height: auto;
`;

const StyledVideo = styled.video`
  position: absolute;
  display: block;
  z-index: ${(props) => (props.isDisplaying ? '1' : '0')};
  max-width: 100%;
  height: auto;
`;

const DestinationComponent = ({ destination }) => {
  let { travelVid, returnVid, destinationImg, popups } = destination;
  const [buttonDisplay, setButtonDisplay] = useState(true);
  const [videoSource, setVideoSource] = useState(travelVid);
  const [isDisplaying, updateIsDisplaying] = useState(true);
  const [isVideoPlaying, updateIsVideoPlaying] = useState(false);
  const [returnPlay, setReturnPlay] = useState(false);
  const vidRef = useRef(null);
  const history = useHistory();

  function startNavigateHomeVideo() {
    setReturnPlay(true);
    updateIsDisplaying(!isDisplaying);
    vidRef.current.play();
  }

  function startNavigateToVideo() {
    vidRef.current.play();
    updateIsVideoPlaying(true);
  }

  function returnHome() {
    history.push('/');
  }

  const toggleVideoSrc = () => {
    if (videoSource === travelVid) {
      setVideoSource(returnVid);
    }
  };

  useEffect(() => {
    startNavigateToVideo();
  }, []);

  return (
    <div>
      <StyledVideo
        ref={vidRef}
        src={videoSource}
        isDisplaying={isDisplaying}
        muted
        onEnded={() => {
          if (returnPlay) {
            returnHome();
          }
          updateIsVideoPlaying(false);
          updateIsDisplaying(!isDisplaying);
          setButtonDisplay(!buttonDisplay);
          toggleVideoSrc();
        }}
      />
      <StyledImage src={destinationImg} isDisplaying={!isDisplaying} />
      <ReturnButton
        onClick={startNavigateHomeVideo}
        isDisplaying={!isDisplaying}
      >
        BACK
      </ReturnButton>
    </div>
  );
};

export default DestinationComponent;
