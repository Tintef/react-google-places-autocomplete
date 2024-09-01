import { useDebouncedCallback } from 'use-debounce';
import { Options } from 'react-select';

import autocompletionRequestBuilder from '../helpers/autocompletion-request-builder';

type CBType = (options: Options<any>) => void;
type UseFetchSuggestionsArg = {
  autocompletionRequest?: Omit<google.maps.places.AutocompletionRequest, 'input'>;
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

    placesService.getPlacePredictions(
      autocompletionRequestBuilder({
        autocompletionRequest,
        input: value,
        sessionToken: withSessionToken && sessionToken,
      }), (suggestions) => {
        cb((suggestions || []).map(suggestion => ({ label: suggestion.description, value: suggestion })));
      },
    );
  }, debounce);

  return fetchSuggestions;
}

export default useFetchSuggestions;
