const persist = {
  get: (key) => {
    return JSON.parse(sessionStorage.getItem(key));
  },
  set: (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
};
export default persist;
