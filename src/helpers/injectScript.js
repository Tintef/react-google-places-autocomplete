const SCRIPT_ID = 'react-google-places-autocomplete';

export const injectScript = (apiKey) => {
  const script = document.createElement('script');

  script.id = SCRIPT_ID;
  script.type = 'text/javascript';
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;

  document.body.appendChild(script);
};

export const removeScript = () => {
  const script = document.getElementById(SCRIPT_ID);
  document.body.removeChild(script);
};
