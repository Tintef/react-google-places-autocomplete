import { useDebouncedCallback } from 'use-debounce';
import { Options } from 'react-select';

import { AutocompletionRequest } from '../types';
import autocompletionRequestBuilder from '../helpers/autocompletion-request-builder';

type CBType = (options: Options<any>) => void;
type UseFetchSuggestionsArg = {
  autocompletionRequest: AutocompletionRequest;
  debounce: number;
  minLengthAutocomplete: number;
  placesService?: google.maps.places.AutocompleteService;
  sessionToken?: google.maps.places.AutocompleteSessionToken;
  withSessionToken: boolean;
}

const useFetchSuggestions = (arg: UseFetchSuggestionsArg): ((value: string, cb: CBType) => void) => {
  const {
    autocompletionRequest,
    debounce,
    minLengthAutocomplete,
    placesService,
    sessionToken,
    withSessionToken,
  } = arg;

  const [fetchSuggestions] = useDebouncedCallback((value: string, cb: CBType): void => {
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

  return fetchSuggestions;
}

export default useFetchSuggestions;
