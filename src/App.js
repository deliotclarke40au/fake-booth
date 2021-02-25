import "./App.css";
import React, { useState, useRef } from "react";
import HomeImg from "./assets/Home.png";
import DestinationImg from "./assets/Destination1.png";
import travelToVid from "./assets/travel-to-1.mp4";
import returnFromVid from "./assets/return-from-1.mp4";
import styled from "styled-components";
import DesinationComponent from "./components/DestinationComponent";

const destination = {
  name: "destination1",
  button: {},
  travelVid: travelToVid,
  returnVid: returnFromVid,
  destinationImg: DestinationImg,
  popup: {},
};

const initialState = {
  userLocation: "home",
  destinations: [destination],
  modalStatus: false,
};

const StyledHomeImage = styled.img`
  position: absolute;
  display: block;
  z-index: ${(props) => (props.isDisplaying ? "1" : "0")};
  max-width: 100%;
  height: auto;
`;

const StyledVideo = styled.video`
  position: absolute;
  display: block;
  z-index: ${(props) => (props.isDisplaying ? "1" : "0")};
  max-width: 100%;
  height: auto;
`;

const StartButton = styled.button`
  display: ${(props) => (props.buttonDisplay ? "block" : "none")};
  position: absolute;
  z-index: ${(props) => (props.zIndexValue ? "0" : "10")};
  top: 25px;
  left: 25px;
`;

const ReturnButton = styled.button`
  display: ${(props) => (props.buttonDisplay ? "block" : "none")};
  position: absolute;
  z-index: ${(props) => (props.zIndexValue ? "0" : "10")};
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

  const handleNavigateToClick = (e) => {
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
      <StartButton
        onClick={handleNavigateToClick}
        buttonDisplay={buttonDisplay}
        zIndexValue={isVideoPlaying}
      >
        START
      </StartButton>
      <StyledHomeImage
        src={imageSource}
        alt="booth scene image"
        isDisplaying={isDisplaying}
      />
      {initialState.destinations &&
        initialState.destinations.map((destination) => (
          <DesinationComponent
            destinationObj={destination}
            handleNavigateToClick={handleNavigateToClick}
          />
        ))}
    </div>
  );
};

export default App;
