---
id: geocode-by-address
title: Geocode by Address
sidebar_label: Geocode by Address
---

This functions allows to get results by an address using [Google Maps Geocoder](https://developers.google.com/maps/documentation/javascript/geocoding).

## Firm

```tsx
const geocodeByAddress = (address: string): Promise<google.maps.GeocoderResult[]>;
```

## Usage

```js
import { geocodeByAddress } from 'react-google-places-autocomplete';

geocodeByAddress('Montevideo, Uruguay')
  .then(results => console.log(results))
  .catch(error => console.error(error));
```
