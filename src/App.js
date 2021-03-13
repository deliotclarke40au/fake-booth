import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { home, destination1, destination2 } from './destinations';
import DestinationComponent from './components/DestinationComponent';
import NavBarComponent from './components/NavBarComponent';

const appState = {
  destinations: [home, destination1, destination2],
  modalStatus: false,
};

const App = () => {
  const [nextDestination, setNextDestination] = useState();

  return (
    <>
      {/* // ? feed updateCurrentDest to Nav Buttons - Component creates a list of
      buttons based on destination names, updates currentDest with destination
      name */}
      <NavBarComponent
        destinations={appState.destinations}
        onNavigate={setNextDestination}
      />
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
        {appState.destinations.map((destination) => (
          <Route exact key={destination.id} path={`/${destination.id}`}>
            <DestinationComponent
              destination={destination}
              nextDestination={nextDestination}
              onChangeDestination={setNextDestination}
            />
          </Route>
        ))}
      </Switch>
    </>
  );
};

export default App;
