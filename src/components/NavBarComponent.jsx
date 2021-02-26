import React from "react";
import { NavLink } from "react-router-dom";
import styled from 'styled-components';

const NavBarContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 50px;
  z-index: 10;
`;

const NavBarComponent = () => {
  return (
    <NavBarContainer>
      <nav>
        <ul>
          <li>
            <NavLink className="nav-item" activeClassName="is-active" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className="nav-item"
              activeClassName="is-active"
              to="/destination1"
            >
              First Destination
            </NavLink>
          </li>
        </ul>
      </nav>
    </NavBarContainer>
  );
};

export default NavBarComponent;
