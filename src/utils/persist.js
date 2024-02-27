const persist = {
  get: (key) => {
    JSON.parse(sessionStorage.getItem(key));
  },
  set: (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
};
export default persist;
