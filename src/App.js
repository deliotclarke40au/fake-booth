import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import HomeImg from "./assets/Home.png";
import DestinationImg from "./assets/Destination1.png";
import travelToVid from "./assets/travel-to-1.mp4";
import returnFromVid from "./assets/return-from-1.mp4";
import styled from "styled-components";
import DestinationComponent from "./components/DestinationComponent";
import NavBarComponent from "./components/NavBarComponent";

const destination = {
  name: "destination1",
  button: {},
  travelVid: travelToVid,
  returnVid: returnFromVid,
  destinationImg: DestinationImg,
  popup: {},
};

const initialState = {
  homeImage: HomeImg,
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

const App = () => {

  return (
      <Router>
        <NavBarComponent destinations={initialState.destinations} />
        <div>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
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

const Home = () => {
  return (
    <div>
      <StyledHomeImage src={HomeImg} />
    </div>
  );
};

export default App;
