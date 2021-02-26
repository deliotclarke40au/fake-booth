// import React, { useState, useRef } from "react";
// import styled from "styled-components";

// const ReturnButton = styled.button`
//   display: ${(props) => (props.buttonDisplay ? "block" : "none")};
//   position: absolute;
//   z-index: ${(props) => (props.zIndexValue ? "0" : "10")};
//   top: 25px;
//   right: 25px;
// `;

// const StyledImage = styled.img`
//   position: absolute;
//   display: block;
//   z-index: ${(props) => (props.isDisplaying ? "1" : "0")};
//   max-width: 100%;
//   height: auto;
// `;

// const StyledVideo = styled.video`
//   position: absolute;
//   display: block;
//   z-index: ${(props) => (props.isDisplaying ? "1" : "0")};
//   max-width: 100%;
//   height: auto;
// `;

// const DestinationComponent = (destinationObject = {}, handleNavigateToClick) => {
//   let { travelVid, returnVid, destinationImg, popup } = destinationObject;
//   const [buttonDisplay, setButtonDisplay] = useState(false);
//   const [videoSource, setVideoSource] = useState(travelVid);
//   const vidRef = useRef(null);
//   if (Object.keys(destinationObject).length) {

//     const toggleVideoSrc = () => {
//       if (videoSource === travelVid) {
//         setVideoSource(returnVid);
//       } else {
//         setVideoSource(travelVid);
//       }
//     };

//     return (
//       <div>
//         <ReturnButton
//           onClick={handleNavigateToClick}
//           buttonDisplay={!buttonDisplay}
//           zIndexValue={isVideoPlaying}
//         >
//           RETURN
//         </ReturnButton>
//         <StyledImage
//           src={imageSource}
//           alt="booth scene image"
//           isDisplaying={isDisplaying}
//         />
//         <StyledVideo
//           ref={vidRef}
//           controls={false}
//           autoPlay={false}
//           muted
//           src={videoSource}
//           alt="travel to video 1"
//           onEnded={() => {
//             updateIsVideoPlaying(false);
//             setButtonDisplay(!buttonDisplay);
//             updateIsDisplaying(!isDisplaying);
//             toggleVideoSrc();
//           }}
//           isDisplaying={!isDisplaying}
//         />
//       </div>
//     );
//   }
//   return null;
// };

// export default DestinationComponent;
