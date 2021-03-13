---
id: exposed-methods
title: Exposed Methods
sidebar_label: Exposed Methods
---

```tsx
type GooglePlacesAutocompleteHandle = {
  getSessionToken: () => google.maps.places.AutocompleteSessionToken | undefined,
  refreshSessionToken: () => void,
}
```

## Usage

In order to access the exposed methods you need to create a ref to the component:

```js
import React, { useRef } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const Component = () => {
  const rgpa = useRef(null);
  const refresh = () => {
    if (rgpa && rgpa.current) {
      rgpa.current.refreshSessionToken();
    }
  }

  return (
    <div>
      <GooglePlacesAutocomplete ref={useRef} />
      <button
        ref={rgpa}
        onClick={refresh}
      >
        Refresh session token
      </button>
    </div>
  );
}

export default Component;
```

## `getSessionToken`

This function retrieves the current `sessionToken` being used.


## `refreshSessionToken`

This function allows you to refresh the `sessionToken` being used.


**Note:** the componente does not refresh the `sessionToken`, so you will need to handle that yourself.
