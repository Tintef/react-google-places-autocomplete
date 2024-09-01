const getLatLng = (result: google.maps.GeocoderResult): Promise<google.maps.LatLng> => (
  new Promise((resolve, reject) => {
    try {
      const latLng = new google.maps.LatLng({
        lat: result.geometry.location.lat(),
        lng: result.geometry.location.lng(),
      });
      return resolve(latLng);
    } catch (e) {
      return reject(e);
    }
  })
);

export default getLatLng;
