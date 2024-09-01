type Arg = {
  autocompletionRequest?: Omit<google.maps.places.AutocompletionRequest, 'input'>;
  input: string;
  sessionToken?: google.maps.places.AutocompleteSessionToken;
}

const autocompletionRequestBuilder = ({ autocompletionRequest, input, sessionToken }: Arg): google.maps.places.AutocompletionRequest => {
  let res: google.maps.places.AutocompletionRequest = { input };

  if (autocompletionRequest) res = { ...res, ...autocompletionRequest };
  if (sessionToken) res.sessionToken = sessionToken;

  return res;
};

export default autocompletionRequestBuilder;
