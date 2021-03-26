import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { memoize } from '../memoize';
import {
  isChildOf as _isChildOf,
  getTransitionsBetween as _getTransitionsBetween,
  getParent as _getParent,
} from '../destinations';
import styled from 'styled-components';

const Background = styled.img`
  position: absolute;
  width: 100%;
`;

const Transition = styled.video`
  pointer-events: none;
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

const getParent = memoize(_getParent);
const isChildOf = memoize(_isChildOf);
const getTransitionsBetween = memoize(_getTransitionsBetween);

const DestinationComponent = ({
  destination,
  nextDestination,
  onChangeDestination,
}) => {
  const history = useHistory();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const parent = getParent(destination);

  const _transition = useRef(null);
  const _destination = useRef(null);

  useEffect(() => {
    if (!nextDestination || nextDestination?.id === destination?.id) {
      return;
    }

    const doTransitions = async () => {
      setIsTransitioning(true);
      const transitions = getTransitionsBetween(destination, nextDestination);
      await transitions
        .map((t, i) => {
          const next = transitions[i + 1];
          if (next) {
            return {
              transition: isChildOf(next, t) ? t.transitionOut : t.transitionIn,
              background: next.background,
            };
          }

          const prev = transitions[i - 1];
          return {
            transition: isChildOf(prev, t) ? t.transitionIn : t.transitionOut,
            background: t.background,
          };
        })
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
  }, [history, destination, nextDestination]);

  return (
    <>
      <Background ref={_destination} src={destination.background} />
      {parent && (
        <GoBack
          hidden={isTransitioning}
          onClick={() => onChangeDestination(parent)}
        >
          BACK
        </GoBack>
      )}
      <Transition ref={_transition} muted />
    </>
  );
};

export default DestinationComponent;
