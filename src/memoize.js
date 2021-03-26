export const memoize = (func) => {
  const cache = {};
  const calledMap = {};

  return (...args) => {
    const key = JSON.stringify(args); // TODO - use a better hashing method so this scales
    let result = cache[key];

    if (!calledMap[key]) {
      calledMap[key] = true;
      cache[key] = result = func(...args);
    }

    return result;
  };
};

export default memoize;
