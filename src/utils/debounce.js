/* eslint-disable */

const debounce = (callback, timeout) => {
  let d, e;
  return function () {
    function helper() {
      d = null, e = callback.apply(thisRef, argumentsRef);
    }
    const thisRef = this, argumentsRef = arguments;
    return clearTimeout(d), d = setTimeout(helper, timeout), !d && (e = callback.apply(thisRef, argumentsRef)), e;
  }
};

export default debounce;
