import { LoaderOptions } from '@googlemaps/js-api-loader';
import { Props, OptionTypeBase } from 'react-select';

export type GooglePlacesAutocompleteHandle = {
  getSessionToken: () => google.maps.places.AutocompleteSessionToken | undefined;
  refreshSessionToken: () => void;
}

export interface LatLng {
  lat: number;
  lng: number;
}

export interface AutocompletionRequest {
  bounds?: [LatLng, LatLng];
  componentRestrictions?: { country: string | string[] };
  location?: LatLng;
  offset?: number;
  radius?: number;
  types?: string[];
  fields?: string[];
}

export default interface GooglePlacesAutocompleteProps {
  apiKey?: string;
  apiOptions?: Partial<LoaderOptions>;
  autocompletionRequest?: AutocompletionRequest;
  debounce?: number;
  minLengthAutocomplete?: number;
  onLoadFailed?: (error: Error) => void;
  selectProps?: Props<OptionTypeBase>;
  withSessionToken?: boolean;
}
