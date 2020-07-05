import * as React from "react";

interface latLng {
  lat: number;
  lng: number;
}

interface autocompletionRequestType {
  bounds?: [latLng, latLng];
  componentRestrictions?: { country: string | string[] };
  location?: latLng;
  offset?: number;
  radius?: number;
  types?: string[];
}

interface suggestionType {
  description: string;
  id: string;
  matches_substrings: { length: number, offest: number }[];
  place_id: string;
  reference: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
    main_text_matched_substrings: { length: number, offset: number }[];
  };
  terms: { offset: number, value: string }[];
  types: string[];
}

interface GooglePlacesAutocompleteProps {
  apiKey?: string;
  autocompletionRequest?: autocompletionRequestType;
  debounce?: number;
  disabled?: boolean;
  displayFromSuggestionSelected?: (suggestion: suggestionType) => JSX.Element | string;
  idPrefix?: string;
  initialValue?: string;
  inputClassName?: string;
  inputStyle?: object;
  loader?: JSX.Element;
  minLengthAutocomplete?: number;
  onLoadFailed?: (error: Error) => void;
  onSelect?: (selection: any) => void;
  placeholder?: string;
  renderInput?: (props: any) => JSX.Element;
  renderSuggestions?: (activeSuggestion: number, suggestions: Array<suggestionType>, onSelectSuggestion: (selection: any, event: any) => void) => JSX.Element;
  required?: boolean;
  suggestionsClassNames?: {
    container?: string,
    suggestion?: string,
    suggestionActive?: string,
  };
  suggestionsStyles?: {
    container?: object,
    suggestion?: object,
  };
  withSessionToken?: boolean;
}

interface geocodeResult {
  address_components: object[];
  formatted_address: string;
  geometry: {
    location: latLng,
    viewport: { northeast: latLng, southwest: latLng },
  };
  place_id: string;
  types: string[];
}

declare function geocodeByAddress(address: string): Promise<geocodeResult[]>;
declare function getLatLng(result: object): Promise<latLng>;
declare function geocodeByPlaceId(placeId: string): Promise<geocodeResult[]>;

export {
  geocodeByAddress,
  getLatLng,
  geocodeByPlaceId,
  autocompletionRequestType,
  suggestionType,
};
export default class GooglePlacesAutocomplete extends React.Component<GooglePlacesAutocompleteProps, any> { }
