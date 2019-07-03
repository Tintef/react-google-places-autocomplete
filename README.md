# React Google Places Autocomplete

React component for easily use Google Places Autocomplete

## Getting started

First, load [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/):
```html
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_API_KEY&libraries=places"></script>
```

Install the latest version:
```sh
npm install --save react-google-places-autocomplete@latest
```

Use the component!
```js
import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const Component = () => (
  <div>
    <GooglePlacesAutocomplete
      onSelect={console.log}
    />
  </div>
);

export default Component;
```
Note: this is the simplest way to use the component.

## Props


| Prop                  | Type     | Required | Default    |
|-----------------------|----------|----------|------------|
| autocompletionRequest | object   |          | {}         |
| debounce              | number   |          | 300        |
| initialValue          | string   |          | ''         |
| inputClassName        | string   |          | ''         |
| inputStyle            | object   |          | {}         |
| loader                | node     |          | null       |
| onSelect              | function |          | () => {}   |
| placeholder           | string   |          | 'Address'  |
| renderInput           | function |          | undefined  |
| renderSuggestions     | function |          | undefined  |
| suggestionsClassNames | shape    |          | `{ container: '', suggestion: '', suggestionActive: '' }` |
| suggestionsStyles     | shape    |          | `{ container: {}, suggestion: {} }` |


### autocompletionRequest

Autocompletion request object to add restrictions to the search. Let's see the shape this prop can take:

```js
autocompletionRequest = {
  bounds: Array<LatLng>,
  componentRestrictions: {
    country: String | Array<String>
  },
  location: LatLng,
  offset: Number,
  radius: Number,
  types: Array<String>,
}
```

Where:

- `LatLng` is an object like `{ lat: Number, lng: Number }`.
- bounds is an array of lenght 2, where the first value is the south west coordinate and the last one is the north east coordinate.
- country is one from [ISO 3166-1 Alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). For example, 'us', 'ca', or 'uy'. You can provide a single one, or an array of up to five country code strings.

Examples:
```js
...

  <GooglePlacesAutocomplete
    autocompletionRequest={{
      bounds: [
        { lat: 50, lng: 50 },
        { lat: 100, lng: 100 }
      ],
    }}
  />

...
```

```js
...

  <GooglePlacesAutocomplete
    autocompletionRequest={{
      componentRestrictions: {
        country: ['us', 'ca', 'uy'],
      }
    }}
  />

...
```

Note: for more information check [google documentation](https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest).

### debounce

The number of milliseconds to delay before making a call to Google Maps API.

### initialValue

Initial value for the input.

Example:
```js
...

  <GooglePlacesAutocomplete
    initialValue="Main St. 101"
  />

...
```

### inputClassName

Custom `className` for the input. Passing this prop will cause the input to ONLY use this `className` and not the one
provided by the library.

### inputStyle

Inline styles for the input.

### loader

Node to be shown when the component is calling to Google Maps API.

Example:
```js
import loader from '../assets/loader.svg';

...

  <GooglePlacesAutocomplete
    loader={<img src={loader} />}
  />

...
```

### onSelect

Function to be called when the user select one of the suggestions provided by Google Maps API.

Example:
```js
...

  <GooglePlacesAutocomplete
    onSelect={({ description }) => (
      this.setState({ address: description });
    )}
  />

...
```

### placeholder

Placeholder for the input element.

### renderInput

Custom function for customizing the input.

**Important:** do not override the `value` and `onChange` properties of the input, neither the `onBlur` or `onKeyDown`.


Example:
```js
...

  <GooglePlacesAutocomplete
    renderInput={(props) => (
      <div className="custom-wrapper">
        <input
          // Custom properties
          {...props}
        />
      </div>
    )}
  />

...
```

### renderSuggestions

Custom function for customizing the suggestions list.

Example:
```js
...

  <GooglePlacesAutocomplete
    renderSuggestions={(active, suggestions, onSelectSuggestion) => (
      <div className="suggestions-container">
        {
          suggestions.map((suggestion) => (
            <div className="suggestion">
              {suggestion.description}
            </div>
          ))
        }
      </div>
    )}
  />

...
```

### suggestionsClassNames

Custom `classNames` for the different parts of the suggestions list.

Example:
```js
{
  container: 'custom-container-classname',
  suggestion: 'custom-suggestion-classname',
  suggestionActive: 'custom-suggestions-classname--active',
}
```

Passing this prop will cause the list to ONLY use this classNames and not the ones provided by the library.

### suggestionsStyles

Inline styles for the suggestions container and for each suggestion.

Example:
```js
{
  container: {
    color: 'red',
  },
  suggestion: {
    background: 'black',
  },
}
```

## Utility Functions

* [`geocodeByAddress`](#geocode-by-address)
* [`geocodeByPlaceId`](#geocode-by-place-id)
* [`getLatLng`](#get-lat-lng)

<a name="geocode-by-address"></a>

### `geocodeByAddress` API

```js
/**
 * Returns a promise
 * @param {String} address
 * @return {Promise}
 */
geocodeByAddress(address);
```

#### address

Type: `String`,
Required: `true`

String that gets passed to Google Maps [Geocoder](https://developers.google.com/maps/documentation/javascript/geocoding)

```js
import { geocodeByAddress } from 'react-google-places-autocomplete';

// `results` is an entire payload from Google API.
geocodeByAddress('Mohali, Punjab')
  .then(results => console.log(results))
  .catch(error => console.error(error));
```

```js

Let's see the shape of results return by geocodeByAddress

results = [{
  address_components:Array<Object>,
  formatted_address: String,
  geometry: {
    bounds: LatLngBounds,
    location: LatLng,
    location_type: String,
    viewport: LatLngBounds,
  },
  place_id: String,
  types: Array<String>,
}]
```

<a name="geocode-by-place-id"></a>

### `geocodeByPlaceId` API

```js
/**
 * Returns a promise
 * @param {String} placeId
 * @return {Promise}
 */
geocodeByPlaceId(placeId);
```

#### placeId

Type: `String`,
Required: `true`

String that gets passed to Google Maps [Geocoder](https://developers.google.com/maps/documentation/javascript/geocoding)

```js
import { geocodeByPlaceId } from 'react-google-places-autocomplete';

// `results` is an entire payload from Google API.
geocodeByPlaceId('ChIJH_imbZDuDzkR2AjlbPGYKVE')
  .then(results => console.log(results))
  .catch(error => console.error(error));
```

```js

Let's see the shape of results return by gecocodeByPlaceId

results = [{
  address_components: Array<Object>,
  formatted_address: String,
  geometry: {
    bounds: LatLngBounds,
    location: LatLng,
    location_type: String,
    viewport: LatLngBounds,
  },
  place_id: String,
  types: Array<String>,
}]
```

<a name="get-lat-lng"></a>

### `getLatLng` API

```js
/**
 * Returns a promise
 * @param {Object} result
 * @return {Promise}
 */
getLatLng(result);
```

#### result

Type: `Object`
Required: `true`

One of the elements from `results` (returned from Google Maps Geocoder)

```js
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

geocodeByAddress('Mohali, Punjab')
  .then(results => getLatLng(results[0]))
  .then(({ lat, lng }) =>
    console.log('Successfully got latitude and longitude', { lat, lng })
  );
```


```js

Let's see the shape of result return by getLatLng

result = {
  lat: Number,
  lng: Number,
}
```
