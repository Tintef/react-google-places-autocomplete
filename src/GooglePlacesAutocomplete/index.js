import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autocompletionRequestBuilder from '../utils/autocompletionRequestBuilder';
import debounce from '../utils/debounce';
import {
  autocompletionRequestType,
  suggestionClassNamesType,
  suggestionStylesType,
} from '../utils/customPropTypes';

class GooglePlacesAutocomplete extends Component {
  fetchSuggestions = debounce((value) => {
    const { autocompletionRequest } = this.props;

    this.setState({ loading: true });
    this.placesService.getPlacePredictions(
      {
        ...autocompletionRequestBuilder(autocompletionRequest),
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
      suggestions: [],
      value: props.initialValue,
    };

    this.changeActiveSuggestion = this.changeActiveSuggestion.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.clearSuggestions = this.clearSuggestions.bind(this);
    this.fetchSuggestionsCallback = this.fetchSuggestionsCallback.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.initalizeService = this.initializeService.bind(this);
    this.onSuggestionSelect = this.onSuggestionSelect.bind(this);
    this.renderInput = this.renderInput.bind(this);
    this.renderSuggestions = this.renderSuggestions.bind(this);
  }

  componentDidMount() {
    this.initalizeService();
    document.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick);
  }

  UNSAFE_componentWillReceiveProps(nextProps) { // eslint-disable-line
    if (nextProps.initialValue) {
      this.setState({ value: nextProps.initialValue });
    }
  }

  handleClick(ev) {
    const { idPrefix } = this.props;

    if (!ev.target.id.includes(`${idPrefix}-google-places-autocomplete`)) {
      this.clearSuggestions();
    }
  }

  changeValue(value) {
    this.setState({ value });

    if (value.length > 0) {
      this.fetchSuggestions(value);
    } else {
      this.setState({ suggestions: [] });
    }
  }

  initializeService() {
    if (!window.google) {
      console.error('[react-google-places-autocomplete]: Google script not loaded'); // eslint-disable-line no-console
      setTimeout(() => { this.initalizeService(); }, 1000);

      return;
    }

    if (!window.google.maps) {
      console.error('[react-google-places-autocomplete]: Google maps script not loaded'); // eslint-disable-line no-console
      setTimeout(() => { this.initalizeService(); }, 1000);

      return;
    }

    if (!window.google.maps.places) {
      console.error('[react-google-places-autocomplete]: Google maps places script not loaded'); // eslint-disable-line no-console
      setTimeout(() => { this.initializeService(); }, 1000);

      return;
    }

    this.placesService = new window.google.maps.places.AutocompleteService();
    this.setState({
      placesServiceStatus: window.google.maps.places.PlacesServiceStatus.OK,
    });
  }

  renderInput() {
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
        id: `${idPrefix}-google-places-autocomplete-input`,
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
        id={`${idPrefix}-google-places-autocomplete-input`}
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

  renderSuggestions() {
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

    if (suggestions.length === 0) {
      return null;
    }

    if (renderSuggestions) {
      return renderSuggestions(
        activeSuggestion,
        suggestions,
        this.onSuggestionSelect,
      );
    }

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
              key={suggestion.id}
              className={`${suggestionsClassNames.suggestion || 'google-places-autocomplete__suggestion'} ${activeSuggestion === index ? suggestionsClassNames.suggestionActive || 'google-places-autocomplete__suggestion--active' : ''}`}
              style={suggestionsStyles.suggestion}
              onClick={(event) => this.onSuggestionSelect(suggestion, event)}
              role="presentation"
            >
              {suggestion.description}
            </div>
          ))
        }
      </div>
    );
  }

  renderLoader() {
    const {
      loader,
    } = this.props;

    if (loader) {
      return loader;
    }

    return (
      <div className="google-places-autocomplete__suggestions-container">
        <div className="google-places-autocomplete__suggestions">
          Loading...
        </div>
      </div>
    );
  }

  onSuggestionSelect(suggestion, ev = null) {
    if (ev) {
      ev.stopPropagation();
    }

    const {
      onSelect,
    } = this.props;

    this.setState({
      activeSuggestion: null,
      suggestions: [],
      value: suggestion.description,
    });

    onSelect(suggestion);
  }

  fetchSuggestionsCallback(suggestions, status) {
    const { placesServiceStatus } = this.state;

    if (status !== placesServiceStatus) {
      // show error
    }

    this.setState({
      loading: false,
      suggestions: suggestions || [],
    });
  }

  handleKeyDown(event) {
    const { activeSuggestion, suggestions } = this.state;

    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        if (activeSuggestion !== null) {
          this.onSuggestionSelect(suggestions[activeSuggestion]);
        }
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

  clearSuggestions() {
    this.setState({
      activeSuggestion: null,
      suggestions: [],
    });
  }

  changeActiveSuggestion(direction) {
    const { suggestions: suggs } = this.state;

    if (suggs.length === 0) {
      return;
    }

    switch (direction) {
      case 1:
        this.setState(({ activeSuggestion, suggestions }) => {
          if (activeSuggestion === null || activeSuggestion === suggestions.length - 1) {
            return { activeSuggestion: 0 };
          }

          return { activeSuggestion: activeSuggestion + 1 };
        });
        break;
      case -1:
        this.setState(({ activeSuggestion, suggestions }) => {
          if (!activeSuggestion) {
            return { activeSuggestion: suggestions.length - 1 };
          }

          return { activeSuggestion: activeSuggestion - 1 };
        });
        break;
      default:
    }
  }

  render() {
    const { loading } = this.state;

    return (
      <div className="google-places-autocomplete">
        {this.renderInput()}
        {
          loading ? this.renderLoader() : this.renderSuggestions()
        }
      </div>
    );
  }
}

GooglePlacesAutocomplete.propTypes = {
  autocompletionRequest: autocompletionRequestType,
  debounce: PropTypes.number,
  initialValue: PropTypes.string,
  inputClassName: PropTypes.string,
  inputStyle: PropTypes.object,
  loader: PropTypes.node,
  onSelect: PropTypes.func,
  placeholder: PropTypes.string,
  renderInput: PropTypes.func,
  renderSuggestions: PropTypes.func,
  suggestionsClassNames: suggestionClassNamesType,
  suggestionsStyles: suggestionStylesType,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  idPrefix: PropTypes.string,
};

GooglePlacesAutocomplete.defaultProps = {
  autocompletionRequest: {},
  debounce: 300,
  initialValue: '',
  inputClassName: '',
  inputStyle: {},
  loader: null,
  onSelect: () => { },
  placeholder: 'Address',
  renderInput: undefined,
  renderSuggestions: undefined,
  suggestionsClassNames: {
    container: '',
    suggestion: '',
    suggestionActive: '',
  },
  suggestionsStyles: {
    container: {},
    suggestion: {},
  },
  required: false,
  disabled: false,
  idPrefix: '',
};

export default GooglePlacesAutocomplete;
