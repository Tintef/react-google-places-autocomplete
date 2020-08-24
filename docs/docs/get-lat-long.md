---
id: get-lat-lng
title: Get Latitude and Longitude
sidebar_label: Get Latitude and Longitude
---

This functions allows to get the latitude and longitude of a geocoder result.

## Firm

```tsx
const getLatLng = (result: google.maps.GeocoderResult): Promise<any>;
```

## Usage

```js
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

geocodeByAddress('Montevideo, Uruguay')
  .then(results => getLatLng(results[0]))
  .then(({ lat, lng }) =>
    console.log('Successfully got latitude and longitude', { lat, lng })
  );
```
