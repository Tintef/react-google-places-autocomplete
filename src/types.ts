import { LoaderOptions } from "@googlemaps/js-api-loader";
import { GroupBase } from "react-select";
import { AsyncProps } from "react-select/async";

export type GooglePlacesAutocompleteHandle = {
    getSessionToken: () =>
        | google.maps.places.AutocompleteSessionToken
        | undefined;
    refreshSessionToken: () => void;
};

export interface LatLng {
    lat: number;
    lng: number;
}

export interface LatLngLiteral {
    latDegrees: number;
    lngDegrees: number;
}

export interface LatLngBoundsLiteral {
    east: number;
    north: number;
    south: number;
    west: number;
}

export interface LatLngBounds {
    sw: LatLng | LatLngLiteral | LatLngBounds | LatLngBoundsLiteral;
    ne: LatLng | LatLngLiteral;
}

export interface AutocompletionRequest {
    bounds?: [LatLng, LatLng];
    componentRestrictions?: { country: string | string[] };
    location?: LatLng;
    locationBias?: LatLng | LatLngLiteral | LatLngBoundsLiteral | string;
    locationRestriction?: LatLngBounds | LatLngBoundsLiteral;
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
}
