const SCRIPT_ID = 'react-google-places-autocomplete';

const injectScript = (apiKey) => {
  if (document.getElementById(SCRIPT_ID)) return;

  const script = document.createElement('script');

  script.id = SCRIPT_ID;
  script.type = 'text/javascript';
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;

  document.body.appendChild(script);
};

export default injectScript;
