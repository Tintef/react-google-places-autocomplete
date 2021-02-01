<p align="center">
  <a href="https://tintef.github.io/react-google-places-autocomplete" target="_blank">
    <img width="250"src="https://raw.githubusercontent.com/tintef/react-google-places-autocomplete/master/docs/static/img/logo.svg">
  </a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/react-google-places-autocomplete">
    <img src="https://img.shields.io/npm/v/react-google-places-autocomplete.svg"/>
    <img src="https://img.shields.io/npm/dm/react-google-places-autocomplete.svg"/>
  </a>
  <a href="https://travis-ci.org/tintef/react-google-places-autocomplete">
    <img src="https://www.travis-ci.com/Tintef/react-google-places-autocomplete.svg?branch=master" />
  </a>
  <a href="https://packagequality.com/#?package=react-google-places-autocomplete">
    <img src="https://npm.packagequality.com/shield/react-google-places-autocomplete.svg"/>
  </a>
  <a href="https://www.npmjs.com/package/react-google-places-autocomplete">
    <img src="https://img.shields.io/npm/l/react-google-places-autocomplete.svg" alt="License">
  </a>
</p>


# React Google Places Autocomplete

React component for easily use Google Places Autocomplete


## Getting started

Install the latest version:
```sh
npm install --save react-google-places-autocomplete
  or
yarn add react-google-places-autocomplete
```

Use the component!
```js
import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const Component = () => (
  <div>
    <GooglePlacesAutocomplete
      apiKey="****"
    />
  </div>
);

export default Component;
```

**Coming from v2? Check the [migration guide](https://tintef.github.io/react-google-places-autocomplete/docs/v2-to-v3)**

## Documentation

[**Read The Docs**](https://tintef.github.io/react-google-places-autocomplete)

## How to contribute?

1. Fork this repo
2. Clone your fork
3. Code 🤓
4. Test your changes

    For this, I like to use [yalc](https://github.com/whitecolor/yalc), as it allows to emulate the process of using npm/yarn.

    1. Install [yalc](https://github.com/whitecolor/yalc)
    2. Build project with `yarn build` or `npm run build`
    3. Publish the package with yalc: `yalc publish`
    4. Add the package to your test project `yalc add react-google-places-automocomplete`
    5. If needed, to update the package on your test project: `yalc update react-google-places-autocomplete`


5. Submit a PR!


<br />
<br />
<p align="center">
  Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
</p>