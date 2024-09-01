import { LoaderOptions } from '@googlemaps/js-api-loader';
import { GroupBase } from 'react-select';
import { AsyncProps } from 'react-select/async';

export type GooglePlacesAutocompleteHandle = {
  getSessionToken: () => google.maps.places.AutocompleteSessionToken | undefined;
  refreshSessionToken: () => void;
}

export type Option = {
  label: string;
  value: any;
};

export default interface GooglePlacesAutocompleteProps {
  apiKey?: string;
  apiOptions?: Partial<LoaderOptions>;
  autocompletionRequest?: Omit<google.maps.places.AutocompletionRequest, 'input'>;
  debounce?: number;
  minLengthAutocomplete?: number;
  onLoadFailed?: (error: Error) => void;
  selectProps?: AsyncProps<Option, false, GroupBase<Option>>;
  withSessionToken?: boolean;
}
