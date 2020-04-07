const geocodeByAddress = (address) => {
  const geocoder = new window.google.maps.Geocoder();
  const { OK } = window.google.maps.GeocoderStatus;

  return new Promise((resolve, reject) => {
    geocoder.geocode({ address }, (results, status) => {
      if (status !== OK) {
        return reject(status);
      }
      return resolve(results);
    });
  });
};

const getLatLng = (result) => new Promise((resolve, reject) => {
  try {
    const latLng = {
      lat: result.geometry.location.lat(),
      lng: result.geometry.location.lng(),
    };
    return resolve(latLng);
  } catch (e) {
    return reject(e);
  }
});

const geocodeByPlaceId = (placeId) => {
  const geocoder = new window.google.maps.Geocoder();
  const { OK } = window.google.maps.GeocoderStatus;

  return new Promise((resolve, reject) => {
    geocoder.geocode({ placeId }, (results, status) => {
      if (status !== OK) {
        return reject(status);
      }
      return resolve(results);
    });
  });
};

export {
  geocodeByAddress,
  getLatLng,
  geocodeByPlaceId,
};
