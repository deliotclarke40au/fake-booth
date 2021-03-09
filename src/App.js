import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomeImg from './assets/Home.png';
import DestinationImg from './assets/Destination1.png';
import DestinationImg2 from './assets/Destination2.png';
import travelToVid from './assets/travel-to-1.mp4';
import returnFromVid from './assets/return-from-1.mp4';
import travelToVid2 from './assets/travel-to-2.mp4';
import returnFromVid2 from './assets/return-from-2.mp4';
import Home from './pages/Home';
import DestinationComponent from './components/DestinationComponent';
import NavBarComponent from './components/NavBarComponent';

const destination = {
  id: 'destination1',
  name: 'Destination 1',
  button: {},
  front: true,
  travelVid: travelToVid,
  returnVid: returnFromVid,
  destinationImg: DestinationImg,
  popups: {},
};

const destination2 = {
  id: 'destination2',
  name: 'Destination 2',
  button: {},
  front: true,
  travelVid: travelToVid2,
  returnVid: returnFromVid2,
  destinationImg: DestinationImg2,
  popups: {},
};

const initialState = {
  homeImage: HomeImg,
  destinations: [destination, destination2],
  modalStatus: false,
};

const App = () => {
  const [currentDest, updateCurrentDest] = useState('home');

  function selectDestination(destinationStr) {
    return initialState.destinations.find(
      (dest) => dest.name === destinationStr
    );
  }

  // rip out react router?
  // create a nav at app level and create onClicks that load the background image and cue the traveToVid to play - component swaps video itself and any return plays returnToVid?

  return (
    <>
      {/* // ? feed updateCurrentDest to Nav Buttons - Component creates a list of
      buttons based on destination names, updates currentDest with destination
      name */}
      <NavBarComponent
        destinations={initialState.destinations}
        updateCurrentDest={updateCurrentDest}
      />
      <div>
        <Home homeImage={initialState.homeImage} />
        <Switch>
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
          {initialState.destinations.map((destination) => (
            <Route key={destination.id} path={`/${destination.id}`}>
              <DestinationComponent destination={destination} />
            </Route>
          ))}
        </Switch>
      </div>
    </>
  );
};

export default App;
