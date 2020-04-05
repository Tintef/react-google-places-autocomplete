export default (autocompletionRequest) => {
  const res = { ...autocompletionRequest };

  if (autocompletionRequest.bounds) {
    res.bounds = new google.maps.LatLngBounds(...autocompletionRequest.bounds);
  }

  if (autocompletionRequest.location) {
    res.location = new google.maps.LatLng(autocompletionRequest.location);
  }

  return res;
};
