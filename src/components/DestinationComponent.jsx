import React, { useEffect, useState  } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const ReturnButton = styled.button`
  background: #135c97;
  margin-bottom: 1rem;
  color: #fff;
  cursor: pointer;
  font-weight: bold;
  border-radius: 30px;
  border: none;
  padding: 1rem 1rem;
  text-align: center;
  position: absolute;
  z-index: 10;
  top: 25px;
  right: 25px;
  outline: none;
`;

const DestinationBackground = styled.img`
  position: absolute;
  max-width: 100%;
`;

const TransitionVideo = styled.video`
  position: absolute;
  display: block;
  max-width: 100%;
`;

const DestinationComponent = ({ destination }) => {
  let { travelVid, returnVid, destinationImg  } = destination;
  const [videoSource, setVideoSource] = useState(travelVid);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const history = useHistory();

  function navigateHome() {
    setVideoSource(returnVid);
  }

  return (
    <div>
      <TransitionVideo
        preload="auto"
        playbackRate={3}
        autoPlay
        muted
        src={videoSource}
        onLoadedData={() => setIsTransitioning(true)}
        onEnded={() => {
          if (videoSource === returnVid) {
            history.goBack();
            return;
          }

          setIsTransitioning(false);
        }}
      />
      <DestinationBackground src={destinationImg} hidden={isTransitioning} />
      <ReturnButton onClick={navigateHome} hidden={isTransitioning}>BACK</ReturnButton>
    </div>
  );
};

export default DestinationComponent;
