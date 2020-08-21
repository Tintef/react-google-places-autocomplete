import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import { OptionsType, OptionTypeBase } from 'react-select';
import { useDebouncedCallback } from 'use-debounce';
import GooglePlacesAutocompleteProps, { AutocompletionRequest }from './GooglePlacesAutocomplete.types';
import injectScript from './helpers/injectScript';
import autocompletionRequestBuilder from './helpers/autocompletionRequestBuilder';

const GooglePlacesAutocomplete: React.FC<GooglePlacesAutocompleteProps> = ({
  apiKey = '',
  autocompletionRequest = {},
  debounce = 300,
  minLengthAutocomplete = 0,
  selectProps = {},
  onLoadFailed = console.error,
  withSessionToken = false,
} : GooglePlacesAutocompleteProps) : React.ReactElement => {
  const [placesService, setPlacesService] = useState<google.maps.places.AutocompleteService | undefined>(undefined);
  const [sessionToken, setSessionToken] = useState<google.maps.places.AutocompleteSessionToken | undefined>(undefined);
  const [fetchSuggestions] = useDebouncedCallback((value: string, cb: (options: OptionsType<OptionTypeBase>) => void): void => {
    if (!placesService) return cb([]);
    if (value.length < minLengthAutocomplete) return cb([]);

    const autocompletionReq: AutocompletionRequest = { ...autocompletionRequest };

    placesService.getPlacePredictions(
      autocompletionRequestBuilder(
        autocompletionReq,
        value,
        withSessionToken && sessionToken,
      ), (suggestions) => {
        cb((suggestions || []).map(suggestion => ({ label: suggestion.description, value: suggestion })));
      },
    );
  }, debounce);

  const initializeService = () => {
    if (!window.google) throw new Error('[react-google-places-autocomplete]: Google script not loaded');
    if (!window.google.maps) throw new Error('[react-google-places-autocomplete]: Google maps script not loaded');
    if (!window.google.maps.places) throw new Error('[react-google-places-autocomplete]: Google maps places script not loaded');

    setPlacesService(new window.google.maps.places.AutocompleteService());
    /* setServiceStatus(window.google.maps.places.PlacesServiceStatus.OK); */
    setSessionToken(new google.maps.places.AutocompleteSessionToken());
  }

  useEffect(() => {
    const init = async () => {
      try {
        if (apiKey) await injectScript(apiKey);
        initializeService();
      } catch (error) {
        onLoadFailed(error);
      }
    }

    init();
  }, []);

  return (
    <AsyncSelect
      {...selectProps}
      loadOptions={fetchSuggestions}
      getOptionValue={({ value }) => value.place_id}
    />
  );
};


export default GooglePlacesAutocomplete;
