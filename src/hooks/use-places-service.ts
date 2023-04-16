import { useEffect, useState } from 'react'
import { Loader, LoaderOptions } from '@googlemaps/js-api-loader';

type UsePlacesServiceArgs = {
  apiKey?: string;
  apiOptions?: Partial<LoaderOptions>;
  onLoadFailed?: (error: Error) => void;
}

type UsePlacesServiceRes = {
  placesService?: google.maps.places.AutocompleteService;
  sessionToken?: google.maps.places.AutocompleteSessionToken;
  setSessionToken: React.Dispatch<google.maps.places.AutocompleteSessionToken>;
}

const usePlacesService = (args: UsePlacesServiceArgs): UsePlacesServiceRes => {
  const { apiKey, apiOptions, onLoadFailed } = args;

  const [placesService, setPlacesService] = useState<google.maps.places.AutocompleteService | undefined>(undefined);
  const [sessionToken, setSessionToken] = useState<google.maps.places.AutocompleteSessionToken | undefined>(undefined);

  const initializeService = () => {
    if (!window.google) throw new Error('[react-google-places-autocomplete]: Google script not loaded');
    if (!window.google.maps) throw new Error('[react-google-places-autocomplete]: Google maps script not loaded');
    if (!window.google.maps.places) throw new Error('[react-google-places-autocomplete]: Google maps places script not loaded');

    setPlacesService(new window.google.maps.places.AutocompleteService());
    setSessionToken(new google.maps.places.AutocompleteSessionToken());
  }

  useEffect(() => {
    const init = async () => {
      if (!apiKey) return;

      try {
        if ( !window.google || !window.google.maps || !window.google.maps.places ) {
          await new Loader({ apiKey, ...{ libraries: ['places'], ...apiOptions }}).load();
        }
        initializeService();
      } catch (error) {
        if (typeof onLoadFailed === 'function') onLoadFailed(error);
      }
    }

    if (apiKey) init();
    else initializeService();
  }, []);


  return { placesService, sessionToken, setSessionToken };
}

export default usePlacesService;
