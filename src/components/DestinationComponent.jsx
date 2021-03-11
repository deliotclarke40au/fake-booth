import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { isChildOf, getTransitionsBetween } from '../destinations';
import styled from 'styled-components';

const Background = styled.img`
  position: absolute;
  width: 100%;
`;

const Transition = styled.video`
  position: absolute;
  width: 100%;
`;

const GoBack = styled.button`
  background: #135c97;
  margin-bottom: 1rem;
  color: #fff;
  cursor: pointer;
  font-weight: bold;
  border-radius: 30px;
  border: none;
  padding: 1rem 1rem;
  text-align: center;
  position: absolute;
  top: 25px;
  right: 25px;
  outline: none;
`;

const DestinationComponent = ({ destination, nextDestination }) => {
  const history = useHistory();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const _transition = useRef(null);
  const _destination = useRef(null);

  useEffect(() => {
    if (!nextDestination) {
      return;
    }

    const doTransitions = async () => {
      setIsTransitioning(true);
      const transitions = getTransitionsBetween(destination, nextDestination);
      await transitions
        .map((t, i) => ({
          transition:
            !transitions[i + 1] || isChildOf(transitions[i + 1], t)
              ? t.transitionIn
              : t.transitionOut,
          background: transitions[i + 1]
            ? transitions[i + 1].background
            : t.background,
        }))
        .filter(({ transition }) => transition)
        .reduce(async (doTransition, { background, transition }) => {
          await doTransition;

          _transition.current.src = transition;
          await _transition.current.play();
          _destination.current.src = background;

          return new Promise(
            (onTransitionEnded) =>
              (_transition.current.onended = onTransitionEnded)
          );
        }, Promise.resolve());
      setIsTransitioning(false);

      history.push(`/${nextDestination.id}`);
    };

    doTransitions();
  }, [destination, history, nextDestination]);

  return (
    <>
      <Background ref={_destination} src={destination.background} />
      <GoBack hidden={isTransitioning}>BACK</GoBack>
      <Transition ref={_transition} muted />
    </>
  );
};

export default DestinationComponent;
