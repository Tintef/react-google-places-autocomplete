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
