import React from 'react';
import styled from 'styled-components';

const StyledHomeImage = styled.img`
  position: absolute;
  display: block;
  z-index: ${(props) => (props.isDisplaying ? "1" : "0")};
  max-width: 100%;
  height: auto;
`;

const Home = ({homeImage}) => {
  return (
    <div>
      <StyledHomeImage src={homeImage} />
    </div>
  );
};

export default Home;