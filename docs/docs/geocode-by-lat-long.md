---
id: geocode-by-lat-lng
title: Geocode by Latitude and Longitude
sidebar_label: Geocode by Latitude and Longitude
---

This functions allows to get results by it's coordinates (latitude and longitude) using [Google Maps Geocoder](https://developers.google.com/maps/documentation/javascript/geocoding).

## Firm

```tsx
const geocodeByLatLng= (latLng: LatLng): Promise<google.maps.GeocoderResult[]> => {
```

## Usage

```js
import { geocodeByLatLng } from 'react-google-places-autocomplete';

geocodeByLatLng({ lat: -34.9011, lng: -56.1645 })
  .then(results => console.log(results))
  .catch(error => console.error(error));
```
