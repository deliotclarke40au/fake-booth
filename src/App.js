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
      <NavBarComponent
        destinations={appState.destinations}
        onNavigate={setNextDestination}
      />
      <Switch>
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
