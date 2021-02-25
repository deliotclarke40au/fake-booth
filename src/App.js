import "./App.css";
import React, { useState, useRef } from "react";
import HomeImg from "./assets/Home.png";
import DestinationImg from "./assets/Destination1.png";
import travelToVid from "./assets/travel-to-1.mp4";
import returnFromVid from "./assets/return-from-1.mp4";
import styled from "styled-components";

const StyledImage = styled.img`
  position: absolute;
  display: block;
  z-index: ${props => props.isDisplaying ? '1' : '0'};
  max-width: 100%;
  height: auto;
`;

const StyledVideo = styled.video`
  position: absolute;
  display: block;
  z-index: ${props => props.isDisplaying ? '1': '0'};
  max-width: 100%;
  height: auto;
`;

const StartButton = styled.button`
  display: ${(props) => (props.buttonDisplay ? "block" : "none")};
  position: absolute;
  z-index: ${props => props.zIndexValue ? '0' : '10'};
  top: 25px;
  left: 25px;
`;

const ReturnButton = styled.button`
  display: ${(props) => (props.buttonDisplay ? "block" : "none")};
  position: absolute;
  z-index: ${props => props.zIndexValue ? '0' : '10'};
  top: 25px;
  right: 25px;
`;

const App = () => {
  const [buttonDisplay, setButtonDisplay] = useState(true);
  const [videoSource, setVideoSource] = useState(travelToVid);
  const [imageSource, setImageSource] = useState(HomeImg);
  const [isDisplaying, updateIsDisplaying] = useState(true);
  const [isVideoPlaying, updateIsVideoPlaying] = useState(false);
  const vidRef = useRef(null);

  const handleNavigationClick = (e) => {
    e.preventDefault();
    updateIsDisplaying(!isDisplaying);
    toggleImageSrc();
    vidRef.current.play();
    updateIsVideoPlaying(true);
  };

  const toggleImageSrc = () => {
    if (imageSource === HomeImg) {
      setImageSource(DestinationImg);
    } else {
      setImageSource(HomeImg);
    }
  };

  const toggleVideoSrc = () => {
    if (videoSource === travelToVid) {
      setVideoSource(returnFromVid);
    } else {
      setVideoSource(travelToVid);
    }
  };

  return (
    <div className="App">
      <StartButton onClick={handleNavigationClick} buttonDisplay={buttonDisplay} zIndexValue={isVideoPlaying}>
        START
      </StartButton>
      <ReturnButton onClick={handleNavigationClick} buttonDisplay={!buttonDisplay} zIndexValue={isVideoPlaying}>
        RETURN
      </ReturnButton>
      <StyledImage src={imageSource} alt="booth scene image" isDisplaying={isDisplaying}/>
      <StyledVideo
        ref={vidRef}
        controls={false}
        autoPlay={false}
        muted
        src={videoSource}
        alt="travel to video 1"
        onEnded={() => {
          updateIsVideoPlaying(false);
          setButtonDisplay(!buttonDisplay);
          updateIsDisplaying(!isDisplaying);
          toggleVideoSrc();
        }}
        isDisplaying={!isDisplaying}
      />
      <video />
    </div>
  );
};

export default App;
