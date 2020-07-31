import React from 'react';
import PropTypes from 'prop-types';
import injectScript from '../helpers/injectScript';
import autocompletionRequestBuilder from '../helpers/autocompletionRequestBuilder';
import debounce from '../helpers/debounce';
import {
  autocompletionRequestType,
  suggestionClassNamesType,
  suggestionStylesType,
} from '../helpers/customPropTypes';

class GooglePlacesAutocomplete extends React.Component {
  fetchSuggestions = debounce((value) => {
    // If initialization fails, there's nothing to do
    if (!this.placesService) return;

    const { autocompletionRequest, withSessionToken } = this.props;
    const { sessionToken } = this.state;

    const autocompletionReq = { ...autocompletionRequest };
    if (withSessionToken && sessionToken) autocompletionReq.sessionToken = sessionToken;

    this.setState({ loading: true });
    this.placesService.getPlacePredictions(
      {
        ...autocompletionRequestBuilder(autocompletionReq),
        input: value,
      },
      this.fetchSuggestionsCallback,
    );
  }, this.props.debounce); // eslint-disable-line react/destructuring-assignment

  constructor(props) {
    super(props);

    this.state = {
      activeSuggestion: null,
      loading: false,
      placesServiceStatus: null,
      sessionToken: null,
      suggestions: [],
      value: props.initialValue,
    };
  }

  async componentDidMount() {
    const { apiKey, onLoadFailed } = this.props;

    try {
      if (apiKey) {
        await injectScript(apiKey);
      }

      this.initializeService();
      document.addEventListener('click', this.handleClick);
    } catch (error) {
      onLoadFailed(error);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick);
  }

  UNSAFE_componentWillReceiveProps(nextProps) { // eslint-disable-line
    const { initialValue } = this.props;

    if (nextProps.initialValue !== initialValue) {
      this.setState({ value: nextProps.initialValue });
    }
  }

  initializeService = () => {
    if (!window.google) { throw new Error('[react-google-places-autocomplete]: Google script not loaded'); }
    if (!window.google.maps) { throw new Error('[react-google-places-autocomplete]: Google maps script not loaded'); }
    if (!window.google.maps.places) { throw new Error('[react-google-places-autocomplete]: Google maps places script not loaded'); }

    this.placesService = new window.google.maps.places.AutocompleteService();
    this.setState({
      placesServiceStatus: window.google.maps.places.PlacesServiceStatus.OK,
    });
    this.generateSessionToken();
  }

  generateSessionToken = () => {
    const sessionToken = new google.maps.places.AutocompleteSessionToken();
    this.setState({ sessionToken });
  }

  handleClick = (ev) => {
    const { idPrefix } = this.props;

    if (!ev.target.id.includes(`${idPrefix}-google-places-autocomplete`)) {
      this.clearSuggestions();
    }
  }

  changeValue = (value) => {
    const { minLengthAutocomplete } = this.props;
    this.setState({ value });

    if (value.length > minLengthAutocomplete) {
      this.fetchSuggestions(value);
    } else {
      this.setState({ suggestions: [] });
    }
  }

  onSuggestionSelect = (suggestion, ev = null) => {
    if (ev) ev.stopPropagation();

    const { displayFromSuggestionSelected, onSelect } = this.props;

    this.setState({
      activeSuggestion: null,
      suggestions: [],
      value: displayFromSuggestionSelected(suggestion),
    });

    this.generateSessionToken();
    onSelect(suggestion);
  }

  fetchSuggestionsCallback = (suggestions, status) => {
    const { placesServiceStatus } = this.state;

    if (status !== placesServiceStatus) {
      // show error
    }

    this.setState({
      loading: false,
      suggestions: suggestions || [],
    });
  }

  handleKeyDown = (event) => {
    const { activeSuggestion, suggestions } = this.state;

    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        if (activeSuggestion !== null) this.onSuggestionSelect(suggestions[activeSuggestion]);
        break;
      case 'ArrowDown':
        this.changeActiveSuggestion(1);
        break;
      case 'ArrowUp':
        this.changeActiveSuggestion(-1);
        break;
      case 'Escape':
        this.clearSuggestions();
        break;
      default:
    }
  }

  clearValue = () => {
    this.setState({ value: '' });
    this.clearSuggestions();
  }

  clearSuggestions = () => {
    this.setState({
      activeSuggestion: null,
      suggestions: [],
    });
  }

  changeActiveSuggestion(direction) {
    const { suggestions: suggs } = this.state;

    if (suggs.length === 0) return;

    switch (direction) {
      case 1:
        this.setState(({ activeSuggestion, suggestions }) => {
          if (activeSuggestion === null || activeSuggestion === suggestions.length - 1) return { activeSuggestion: 0 };

          return { activeSuggestion: activeSuggestion + 1 };
        });
        break;
      case -1:
        this.setState(({ activeSuggestion, suggestions }) => {
          if (!activeSuggestion) return { activeSuggestion: suggestions.length - 1 };

          return { activeSuggestion: activeSuggestion - 1 };
        });
        break;
      default:
    }
  }

  onHoverOverSuggestion = (index) => {
    const { suggestions } = this.state;

    if (suggestions.length === 0) return;

    this.setState({ activeSuggestion: index });
  }

  renderInput = () => {
    const {
      state: {
        value,
      },
      props: {
        idPrefix,
        inputClassName,
        inputStyle,
        placeholder,
        renderInput,
        required,
        disabled,
      },
    } = this;

    if (renderInput) {
      return renderInput({
        autoComplete: 'off',
        id: `${idPrefix ? `${idPrefix}-` : ''}react-google-places-autocomplete-input`,
        value,
        onChange: ({ target }) => this.changeValue(target.value),
        onKeyDown: this.handleKeyDown,
        type: 'text',
        placeholder,
        required,
        disabled,
      });
    }

    return (
      <input
        autoComplete="off"
        className={inputClassName || 'google-places-autocomplete__input'}
        id={`${idPrefix ? `${idPrefix}-` : ''}react-google-places-autocomplete-input`}
        onChange={({ target }) => this.changeValue(target.value)}
        onKeyDown={this.handleKeyDown}
        placeholder={placeholder}
        style={inputStyle}
        type="text"
        value={value}
        required={required}
        disabled={disabled}
      />
    );
  }

  renderLoader = () => {
    const {
      loader,
    } = this.props;

    if (loader) return loader;

    return (
      <div className="google-places-autocomplete__suggestions-container">
        <div className="google-places-autocomplete__suggestions">
          Loading...
        </div>
      </div>
    );
  }

  renderSuggestions = () => {
    const {
      state: {
        activeSuggestion,
        suggestions,
      },
      props: {
        idPrefix,
        renderSuggestions,
        suggestionsClassNames,
        suggestionsStyles,
      },
    } = this;

    if (renderSuggestions) {
      return renderSuggestions(
        activeSuggestion,
        suggestions,
        this.onSuggestionSelect,
      );
    }

    if (suggestions.length === 0) return null;

    return (
      <div
        id={`${idPrefix}-google-places-suggestions-container`}
        className={suggestionsClassNames.container || 'google-places-autocomplete__suggestions-container'}
        style={suggestionsStyles.container}
      >
        {
          suggestions.map((suggestion, index) => (
            <div
              id={`${idPrefix}-google-places-autocomplete-suggestion--${index}`}
              key={suggestion.place_id}
              className={`${suggestionsClassNames.suggestion || 'google-places-autocomplete__suggestion'} ${activeSuggestion === index ? suggestionsClassNames.suggestionActive || 'google-places-autocomplete__suggestion--active' : ''}`}
              style={suggestionsStyles.suggestion}
              onClick={(event) => this.onSuggestionSelect(suggestion, event)}
              onMouseEnter={() => this.onHoverOverSuggestion(index)}
              role="presentation"
            >
              {suggestion.description}
            </div>
          ))
        }
      </div>
    );
  }

  render() {
    const { loading } = this.state;

    return (
      <div className="google-places-autocomplete">
        {this.renderInput()}
        {loading ? this.renderLoader() : this.renderSuggestions()}
      </div>
    );
  }
}

GooglePlacesAutocomplete.propTypes = {
  apiKey: PropTypes.string,
  autocompletionRequest: autocompletionRequestType,
  debounce: PropTypes.number,
  disabled: PropTypes.bool,
  displayFromSuggestionSelected: PropTypes.func,
  idPrefix: PropTypes.string,
  initialValue: PropTypes.string,
  inputClassName: PropTypes.string,
  inputStyle: PropTypes.object,
  loader: PropTypes.node,
  minLengthAutocomplete: PropTypes.number,
  onLoadFailed: PropTypes.func,
  onSelect: PropTypes.func,
  placeholder: PropTypes.string,
  renderInput: PropTypes.func,
  renderSuggestions: PropTypes.func,
  required: PropTypes.bool,
  suggestionsClassNames: suggestionClassNamesType,
  suggestionsStyles: suggestionStylesType,
  withSessionToken: PropTypes.bool,
};

GooglePlacesAutocomplete.defaultProps = {
  apiKey: '',
  autocompletionRequest: {},
  debounce: 300,
  disabled: false,
  displayFromSuggestionSelected: (suggestion) => (suggestion.description),
  idPrefix: '',
  initialValue: '',
  inputClassName: '',
  inputStyle: {},
  loader: null,
  minLengthAutocomplete: 0,
  onLoadFailed: console.error, // eslint-disable-line no-console
  onSelect: () => { },
  placeholder: 'Address...',
  renderInput: undefined,
  renderSuggestions: undefined,
  required: false,
  suggestionsClassNames: {
    container: '',
    suggestion: '',
    suggestionActive: '',
  },
  suggestionsStyles: {
    container: {},
    suggestion: {},
  },
  withSessionToken: false,
};

export default GooglePlacesAutocomplete;
