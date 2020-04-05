import * as React from "react";

declare module 'react-google-places-autocomplete' {
    const geocodeByAddress: any;
    const geocodeByPlaceId: any;
    const getLatLng: any;
    
    export { geocodeByAddress, geocodeByPlaceId, getLatLng }
    export default class GooglePlacesAutocomplete extends React.Component<any> { }    
}
