const { useEffect } = require('react');

function useEventTimeOut(sec, callback, event) {
  useEffect(() => {
    const id = setTimeout(callback, sec * 1000);
    return () => {
      clearInterval(id);
    };
  }, [event]);
}

export default useEventTimeOut;
