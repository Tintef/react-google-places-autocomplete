import React, { forwardRef, useImperativeHandle } from 'react';
import AsyncSelect from 'react-select/async';

import GooglePlacesAutocompleteProps, { GooglePlacesAutocompleteHandle } from './types';
import usePlacesService from './hooks/use-places-service';
import useFetchSuggestions from './hooks/use-fetch-suggestions';

const GooglePlacesAutocomplete: React.ForwardRefRenderFunction<GooglePlacesAutocompleteHandle, GooglePlacesAutocompleteProps> = (
  args: GooglePlacesAutocompleteProps,
  ref,
) : React.ReactElement => {

  const { placesService, sessionToken, setSessionToken } = usePlacesService({
    apiKey: args.apiKey ?? '',
    apiOptions: args.apiOptions ?? {},
    onLoadFailed: args.onLoadFailed ?? console.error,
  });
  const fetchSuggestions = useFetchSuggestions({
    autocompletionRequest: args.autocompletionRequest ?? {},
    debounce: args.debounce ?? 300,
    minLengthAutocomplete: args.minLengthAutocomplete ?? 0,
    placesService,
    sessionToken,
    withSessionToken: args.withSessionToken ?? false,
    suggestionsFilter: args.suggestionsFilter,
  });

  useImperativeHandle(ref, () => ({
    getSessionToken: () => {
      return sessionToken;
    },
    refreshSessionToken: () => {
      setSessionToken(new google.maps.places.AutocompleteSessionToken());
    }
  }), [sessionToken]);

  return (
    <AsyncSelect
      {...args.selectProps ?? {}}
      loadOptions={fetchSuggestions}
      getOptionValue={({ value }) => value.place_id}
    />
  );
};

export default forwardRef(GooglePlacesAutocomplete);
