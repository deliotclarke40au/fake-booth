import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeImg from "./assets/Home.png";
import DestinationImg from "./assets/Destination1.png";
import travelToVid from "./assets/travel-to-1.mp4";
import returnFromVid from "./assets/return-from-1.mp4";
import Home from "./pages/Home";
import DestinationComponent from "./components/DestinationComponent";
import NavBarComponent from "./components/NavBarComponent";

const destination = {
  name: "destination1",
  button: {},
  travelVid: travelToVid,
  returnVid: returnFromVid,
  destinationImg: DestinationImg,
  popups: {},
};

const initialState = {
  homeImage: HomeImg,
  destinations: [destination],
  modalStatus: false,
};

const App = () => {
  function startNavigateHomeVideo() {}
  const [currentDest, updateCurrentDest] = useState("home");

  function selectDestination(destinationStr) {
    return initialState.destinations.find(dest => dest.name === destinationStr);
  }

  // rip out react router?
  // create a nav at app level and create onClicks that load the background image and cue the traveToVid to play - component swaps video itself and any return plays returnToVid?

  return (
    <Router>
      {/* // ? feed updateCurrentDest to Nav Buttons - Component creates a list of
      buttons based on destination names, updates currentDest with destination
      name */}
      <NavBarComponent
        destinations={initialState.destinations}
        updateCurrentDest={updateCurrentDest}
      />
      <div>
        <Switch>
          <Route exact path="/">
            <Home homeImage={initialState.homeImage} />
          </Route>
          {/* {
            // ? i think this will actually work! - onEnded after toggleVid on returnPlay resets currentDest to 'home'
            currentDest && currentDest === "home" ? (
              <Home homeImage={initialState.homeImage} />
            ) : (
              <DestinationComponent
                destination={selectDestination(currentDest)}
                updateCurrentDest={updateCurrentDest}
              />
            )
          } */}

          {initialState.destinations &&
            initialState.destinations.map((destination) => {
              return (
                <Route key={destination.name} path={`/${destination.name}`}>
                  <DestinationComponent destination={destination} />
                </Route>
              );
            })}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
