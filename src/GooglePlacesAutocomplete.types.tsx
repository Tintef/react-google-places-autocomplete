import { Props, OptionTypeBase } from 'react-select';

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
}

export interface ApiOptions {
  language?: string;
  region?: string;
}

export default interface GooglePlacesAutocompleteProps {
  apiKey?: string;
  apiOptions?: ApiOptions;
  autocompletionRequest?: AutocompletionRequest;
  debounce?: number;
  minLengthAutocomplete?: number;
  onLoadFailed?: (error: Error) => void;
  selectProps?: Props<OptionTypeBase>;
  withSessionToken?: boolean;
}
