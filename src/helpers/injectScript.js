const INJECTION_STATE_NOT_YET = 'not yet';
const INJECTION_STATE_IN_PROGRESS = 'in progress';
const INJECTION_STATE_DONE = 'done';

let injectionState = INJECTION_STATE_NOT_YET;
let injectionError = null;

let onScriptLoadCallbacks = [];
let onScriptLoadErrorCallbacks = [];

// Returns a promise that resolves
//   - when the script becomes available or
//   - immediately, if the script had already been injected due to a prior call.
//
// The promise is rejected in case the injection fails (e.g. due to a network
// error).
//
// Note that only the first call of the function will actually trigger an
// injection with the provided API key, the subsequent calls will be
// resolved/rejected when the first one succeeds/fails.
const injectScript = (apiKey) => {
  switch (injectionState) {
    case INJECTION_STATE_DONE:

      return injectionError ? Promise.reject(injectionError) : Promise.resolve();

    case INJECTION_STATE_IN_PROGRESS:

      return new Promise((resolve, reject) => {
        onScriptLoadCallbacks.push(resolve);
        onScriptLoadErrorCallbacks.push(reject);
      });

    default: // INJECTION_STATE_NOT_YET

      injectionState = INJECTION_STATE_IN_PROGRESS;

      return new Promise((resolve, reject) => {
        const script = document.createElement('script');

        script.type = 'text/javascript';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.async = true;
        script.defer = true;

        const onScriptLoad = () => {
          // Resolve current promise
          resolve();
          // Resolve the pending promises in their respective order
          onScriptLoadCallbacks.forEach((cb) => cb());

          cleanup();
        };
        const onScriptLoadError = () => {
          // Reject all promises with this error
          injectionError = new Error('[react-google-places-autocomplete] Could not inject Google script');
          // Reject current promise with the error
          reject(injectionError);
          // Reject all pending promises in their respective order with the error
          onScriptLoadErrorCallbacks.forEach((cb) => cb(injectionError));

          cleanup();
        };

        // Release callbacks and unregister listeners
        const cleanup = () => {
          script.removeEventListener('load', onScriptLoad);
          script.removeEventListener('error', onScriptLoadError);
          onScriptLoadCallbacks = [];
          onScriptLoadErrorCallbacks = [];
          injectionState = INJECTION_STATE_DONE;
        };

        script.addEventListener('load', onScriptLoad);
        script.addEventListener('error', onScriptLoadError);

        document.body.appendChild(script);
      });
  }
};

export default injectScript;
