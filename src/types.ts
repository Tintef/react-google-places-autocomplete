import { LoaderOptions } from '@googlemaps/js-api-loader';
import { GroupBase } from 'react-select';
import { AsyncProps } from 'react-select/async';

export type GooglePlacesAutocompleteHandle = {
  getSessionToken: () => google.maps.places.AutocompleteSessionToken | undefined;
  refreshSessionToken: () => void;
}

export interface LatLng {
  lat: number;
  lng: number;
}

export interface AutocompletionRequest {
  locationRestriction?: [LatLng, LatLng];
  componentRestrictions?: { country: string | string[] };
  locationBias?: LatLng;
  locationBiasRadius?: number;
  offset?: number;
  radius?: number;
  types?: string[];
}

export type Option = {
  label: string;
  value: any;
};

export default interface GooglePlacesAutocompleteProps {
  apiKey?: string;
  apiOptions?: Partial<LoaderOptions>;
  autocompletionRequest?: AutocompletionRequest;
  debounce?: number;
  minLengthAutocomplete?: number;
  onLoadFailed?: (error: Error) => void;
  selectProps?: AsyncProps<Option, false, GroupBase<Option>>;
  withSessionToken?: boolean;
  suggestionsFilter?: (suggestions: google.maps.places.AutocompletePrediction[]) => google.maps.places.AutocompletePrediction[];
  locationBias?: LatLng;
  locationBiasRadius?: number;
}
