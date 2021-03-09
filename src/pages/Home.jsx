import React from 'react';
import styled from 'styled-components';

const StyledHomeImage = styled.img`
  position: absolute;
  display: block;
  max-width: 100%;
  z-index: 0;
`;

const Home = ({homeImage}) => {
  return (
    <div>
      <StyledHomeImage src={homeImage} />
    </div>
  );
};

export default Home;