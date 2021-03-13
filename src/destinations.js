import HomeImg from './assets/Home.png';
import DestinationImg from './assets/Destination1.png';
import DestinationImg2 from './assets/Destination2.png';
import transitionInVid from './assets/travel-to-1.mp4';
import transitionOutVid from './assets/return-from-1.mp4';
import transitionInVid2 from './assets/travel-to-2.mp4';
import transitionOutVid2 from './assets/return-from-2.mp4';

const getPathToDestination = (destination, parent) => {
  if (!parent) {
    return [];
  }

  return Object.entries(parent?.children || {}).reduce((path, [id, node]) => {
    if (id === destination?.id) {
      return [node];
    }

    const next = getPathToDestination(destination, node);
    if (next.length) {
      return [...path, node, ...next];
    }

    return path;
  }, []);
};

export const getTransitionsBetween = (source, destination) => {
  if (source === destination) {
    return [];
  }

  return [
    ...getPathToDestination(source, destinations).reverse(),
    ...getPathToDestination(destination, destinations),
  ];
};

export const isChildOf = (parent, child) => {
  return getPathToDestination(child, parent).length > 0;
};

export const getParent = (child) => {
  const [, parent] = getPathToDestination(child, destinations).reverse();

  return parent;
};

export const destination1 = {
  id: 'destination1',
  name: 'Destination 1',
  button: {},
  transitionIn: transitionInVid,
  transitionOut: transitionOutVid,
  background: DestinationImg,
  popups: {},
};

export const destination2 = {
  id: 'destination2',
  name: 'Destination 2',
  button: {},
  transitionIn: transitionInVid2,
  transitionOut: transitionOutVid2,
  background: DestinationImg2,
  popups: {},
};

export const home = {
  id: '',
  name: 'Home',
  button: {},
  background: HomeImg,
  popups: {},
  children: {
    destination1,
    destination2,
  },
};

export const back = {
  id: 'back',
  name: 'Destination 1',
  button: {},
  transitionIn: transitionInVid,
  transitionOut: transitionOutVid,
  background: DestinationImg,
  popups: {},
};

export const destinations = {
  id: 'root',
  children: {
    home,
    back,
  },
};
