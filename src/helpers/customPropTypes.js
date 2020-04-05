import PropTypes from 'prop-types';

const latLngBoundsType = (props, propName, componentName) => {
  const prop = props[propName];

  if (!prop) {
    return null;
  }

  if (Array.isArray(prop) && prop.length === 2
    && prop.every((value) => (
      Object.keys(value).length === 2
      && value.hasOwnProperty('lat') && value.hasOwnProperty('lng') // eslint-disable-line no-prototype-builtins
      && Number(value.lat) && Number(value.lng)
    ))
  ) {
    return null;
  }

  return new Error(
    `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Validation failed.`
  );
};

const componentRestrictionsType = PropTypes.shape({
  country: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
});

const latLngType = PropTypes.shape({
  lat: PropTypes.number,
  lng: PropTypes.number,
});

export const autocompletionRequestType = PropTypes.shape({
  bounds: latLngBoundsType,
  componentRestrictions: componentRestrictionsType,
  location: latLngType,
  offset: PropTypes.number,
  radius: PropTypes.number,
  types: PropTypes.arrayOf(PropTypes.string),
});

export const suggestionClassNamesType = PropTypes.shape({
  container: PropTypes.string,
  suggestion: PropTypes.string,
  suggestionActive: PropTypes.string,
});

export const suggestionStylesType = PropTypes.shape({
  container: PropTypes.object,
  suggestion: PropTypes.object,
});
