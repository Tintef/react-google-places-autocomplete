import React, { forwardRef, useImperativeHandle, useCallback } from 'react';
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
  });

  // Create combined loadOptions function
  const combinedLoadOptions = useCallback((inputValue: string, callback: (options: any[]) => void) => {
    const customSuggestions = args.customSuggestions || [];
    
    // Fetch Google Places suggestions
    fetchSuggestions(inputValue, (googleSuggestions: any[]) => {
      // Combine custom suggestions with Google suggestions
      const combinedSuggestions = [
        ...customSuggestions,
        ...googleSuggestions
      ];
      
      callback(combinedSuggestions);
    });
  }, [fetchSuggestions, args.customSuggestions]);

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
      loadOptions={combinedLoadOptions}
      getOptionValue={({ value }) => value.place_id}
    />
  );
};

export default forwardRef(GooglePlacesAutocomplete);
