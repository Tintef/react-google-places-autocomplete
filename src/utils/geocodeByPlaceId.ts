const geocodeByPlaceId = (placeId: string): Promise<google.maps.GeocoderResult[]> => {
  const geocoder = new window.google.maps.Geocoder();
  const { OK } = window.google.maps.GeocoderStatus;

  return new Promise((resolve, reject) => {
    geocoder.geocode(
      { placeId },
      (
        results: google.maps.GeocoderResult[],
        status: google.maps.GeocoderStatus,
      ) => {
        if (status !== OK) {
          return reject(status);
        }
        return resolve(results);
      });
  });
};

export default geocodeByPlaceId;
