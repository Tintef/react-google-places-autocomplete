---
id: props
title: Props
sidebar_label: Props
---

```tsx
interface GooglePlacesAutocompleteProps {
  apiKey?: string;                               // default: ''
  autocompletionRequest?: AutocompletionRequest; // default: { }
  debounce?: number;                             // default: 300
  minLengthAutocomplete?: number;                // default: 0
  onLoadFailed?: (error: Error) => void;         // default: console.error
  selectProps?: SelectProps;                     // default: { }
  withSessionToken?: boolean;                    // default: false
}
```

Where `SelectProps` are the ones accepted by [react-select](https://react-select.com/props).


## `apiKey`

If this parameter is passed, the component will inject the [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/) usign this `apiKey`. So there's no need to manually add the `script` tag to yout HTML document.


## `autocompletionRequest`

Autocompletion request object to add restrictions to the search. Let's see the shape this prop can take:

```tsx
interface LatLng {
  lat: number;
  lng: number;
}

interface AutocompletionRequest {
  bounds?: [LatLng, LatLng];
  componentRestrictions?: { country: string | string[] };
  location?: LatLng;
  offset?: number;
  radius?: number;
  types?: string[];
}
```

Here's an example on how to use it:

```jsx
<GooglePlacesAutocomplete
  autocompletionRequest={{
    bounds: [
      { lat: 50, lng: 50 },
      { lat: 100, lng: 100 }
    ],
    componentRestrictions: {
    country: ['us', 'ca', 'uy'],
    }
  }}
/>
```

**Note:** for more information check [google documentation](https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest).


## `debounce`

The number of milliseconds to delay before making a call to Google Maps API.


## `minLengthAutocomplete`

Defines a minimum number of characters needed on the input in order to make requests to the Google's API.


## `onLoadFailed`

Function to be called when the injection of the [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/) fails due to network error.

For example:
```jsx
<GooglePlacesAutocomplete
  onLoadFailed={(error) => (
    console.error("Could not inject Google script", error);
  )}
/>
```

## `selectProps`

As this component uses [react-select](https://react-select.com) under the hood, this prop accepts everything that's accepted by it. You can check [react-select props here](https://react-select.com/props).

For example, a really common use would be to use it as a controlled input:
```jsx
const [value, setValue] = useState(null);

<GooglePlacesAutocomplete
  selectProps={{
    value,
    onChange: setValue,
  }}
/>
```

## `withSessionToken`

If this prop is set to `true`, the component will handle changing the `sessionToken` on every session. To learn more about how this works refer to [Google Places Session Token docs](https://developers.google.com/places/web-service/session-tokens).
