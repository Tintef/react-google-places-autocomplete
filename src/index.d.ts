import * as React from "react";

interface latLng {
  lat: number;
  lng: number;
}

interface autocompletionRequest {
  bounds?: [latLng];
  componentRestrictions?: { country: string | [string] };
  location?: latLng;
  offset?: number;
  radius?: number;
  types?: [string];
}

interface GooglePlacesAutocompleteProps {
  apiKey?: string;
  autocompletionRequest?: autocompletionRequest;
  debounce?: number;
  disabled?: boolean;
  idPrefix?: string;
  initialValue?: string;
  inputClassName?: string;
  inputStyle?: object;
  loader?: JSX.Element;
  onSelect?: (selection: any) => void;
  placeholder?: string;
  renderInput?: (props: any) => JSX.Element;
  renderSuggestions?: (activeSuggestion: number, suggestions: Array<any>, onSelectSuggestion: (selection: any, event: any) => void) => JSX.Element;
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
  address_components: [object];
  formatted_address: string;
  geometry: {
    bounds: [latLng],
    location: latLng,
    location_type: string,
    viewport: [latLng],
  };
  place_id: [string];
  types: [string];
}

declare function geocodeByAddress(address: string): Promise<[geocodeResult]>;
declare function getLatLng(result: object): Promise<latLng>;
declare function geocodeByPlaceId(placeId: string): Promise<[geocodeResult]>;

export { geocodeByAddress, getLatLng, geocodeByPlaceId };
export default class GooglePlacesAutocomplete extends React.Component<GooglePlacesAutocompleteProps, any> { }
