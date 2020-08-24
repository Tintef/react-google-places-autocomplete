---
id: geocode-by-place-id
title: Geocode by Place ID
sidebar_label: Geocode by Place ID
---

This functions allows to get result by a place id using [Google Maps Geocoder](https://developers.google.com/maps/documentation/javascript/geocoding).

## Firm

```tsx
const geocodeByPlaceId = (placeId: string): Promise<google.maps.GeocoderResult[]>;
```

## Usage

```js
import { geocodeByPlaceId } from 'react-google-places-autocomplete';

geocodeByPlaceId('ChIJH_imbZDuDzkR2AjlbPGYKVE')
  .then(results => console.log(results))
  .catch(error => console.error(error));
```
