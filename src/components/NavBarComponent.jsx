import React, { useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";

const NavBarContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 50px;
  z-index: 10;
`;

const NavButton = styled.button`
  background: tomato;
  color: white;
  border-radius: 10px;
  padding: 1rem 0.5rem;
`;

const NavBarComponent = ({ destinations }) => {
  const { pathname } = useLocation();
  console.log(pathname, destinations);
  return useMemo(
    () => (
      <NavBarContainer>
        <nav>
          <ul>
            <li>
              {/* TODO create a return home function when this item is clicked that plays the video based on current location before directing? if user is already home disable item? */}
              <NavLink className="nav-item" activeClassName="is-active" to="/">
                Home
              </NavLink>
            </li>
            {destinations &&
              destinations.map((destination) => {
                return (
                  <li key={destination.name}>
                    <NavLink
                      className="nav-item"
                      activeClassName="is-active"
                      to={destination.name}
                    >
                      {destination.name}
                    </NavLink>
                  </li>
                );
              })}
          </ul>
        </nav>
      </NavBarContainer>
    ),
    [destinations]
  );
};

export default NavBarComponent;
