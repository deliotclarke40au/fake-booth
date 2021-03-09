import React, { useEffect, useState, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

const NavBarContainer = styled.div`
  position: absolute;
  top: 25%;
  right: 50px;
  z-index: 10;
`;

const NavBar = styled.nav`
  &.navBar-enter {
    transform: translateX(200px);
    opacity: 0.1;
    transition: all 500ms ease-out 500ms;
  }
  &.navBar-enter-active {
    transform: translateX(0);
    opacity: 1;
    transition: all 500ms ease-out 500ms;
  }
  &.navBar-exit {
    transform: translateX(0);
    opacity: 1;
  }
  &.navBar-exit-active {
    transform: translateX(200px);
    opacity: 0.1;
    transition: all 500ms ease-out 500ms;
  }
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
`;

// ? default button component to to start building custom nav
const NavButton = styled(NavLink)`
  background: #135c97;
  margin-bottom: 1rem;
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  border-radius: 30px;
  padding: 1rem 1rem;
  text-align: center;
`;

const NavBarComponent = ({ destinations }) => {
  const [showNav, updateShowNav] = useState(false);
  const nodeRef = useRef(null);
  const { pathname } = useLocation();
  console.log(pathname);

  useEffect(() => {
    if (pathname === '/') {
      updateShowNav(true);
    } else {
      updateShowNav(false);
    }
  }, [pathname]);

  return (
    <NavBarContainer>
      <CSSTransition
        nodeRef={nodeRef}
        in={showNav}
        timeout={900}
        unmountOnExit
        mountOnEnter
        classNames='navBar'
      >
        <NavBar ref={nodeRef}>
          <NavList>
            {/* <NavButton>
              <NavLink className='nav-item' activeClassName='is-active' to='/'>
                Home
              </NavLink>
            </NavButton> */}
            {destinations &&
              destinations.map((destination) => {
                return (
                  <NavButton
                    key={destination.id}
                    className='nav-item'
                    activeClassName='is-active'
                    to={destination.id}
                  >
                    {destination.name}
                  </NavButton>
                );
              })}
          </NavList>
        </NavBar>
      </CSSTransition>
    </NavBarContainer>
  );
};

export default NavBarComponent;
