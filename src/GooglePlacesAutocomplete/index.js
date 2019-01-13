import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from '../utils';
import './index.css';

class GooglePlacesAutocomplete extends Component {
  fetchSuggestions = debounce((value) => {
    this.setState({ loading: true });
    this.placesService.getPlacePredictions(
      {
        input: value,
      },
      this.fetchSuggestionsCallback,
    );
  }, this.props.debounce);

  constructor(props) {
    super(props);

    this.state = {
      activeSuggestion: null,
      loading: false,
      placesServiceStatus: null,
      suggestions: [],
      value: '',
    };

    this.changeValue = this.changeValue.bind(this);
    this.changeActiveSuggestion = this.changeActiveSuggestion.bind(this);
    this.clearSuggestions = this.clearSuggestions.bind(this);
    this.fetchSuggestionsCallback = this.fetchSuggestionsCallback.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.initalizeService = this.initializeService.bind(this);
    this.onSuggestionSelect = this.onSuggestionSelect.bind(this);
    this.renderInput = this.renderInput.bind(this);
    this.renderSuggestions = this.renderSuggestions.bind(this);
  }

  componentDidMount() {
    this.initalizeService();
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
    const { debug } = this.props;

    if (!window.google) {
      console.error('[react-google-places-autocomplete]: Google script not loaded');
      if (!debug) {
        setTimeout(() => { this.initalizeService(); }, 1000);
      }

      return;
    }

    if (!window.google.maps.places) {
      console.error('[react-google-places-autocomplete]: Google maps places script not loaded');
      if (!debug) {
        setTimeout(() => { this.initializeService(); }, 1000);
      }

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
        inputClassName,
        inputStyle,
      },
    } = this;

    return (
      <input
        className={inputClassName || 'google-places-autocomplete__input'}
        style={inputStyle}
        value={value}
        onChange={({ target }) => this.changeValue(target.value)}
        type="text"
        onKeyDown={this.handleKeyDown}
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
        suggestionsClassNames,
        suggestionsStyles,
      },
    } = this;

    if (suggestions.length === 0) {
      return null;
    }

    return (
      <div
        className={suggestionsClassNames.container || 'google-places-autocomplete__suggestions-container'}
        style={suggestionsStyles.container}
      >
        {
          suggestions.map((suggestion, index) => (
            <div
              key={suggestion.id}
              className={`${suggestionsClassNames.suggestion || 'google-places-autocomplete__suggestion'} ${activeSuggestion === index ? suggestionsClassNames.suggestionActive || 'google-places-autocomplete__suggestion--active' : ''}`}
              style={suggestionsStyles.suggestion}
              onClick={() => this.onSuggestionSelect(suggestion)}
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
        Loading...
      </div>
    );
  }

  onSuggestionSelect(suggestion) {
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
        console.log('Enteeeer');
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
          loading ? (
            this.renderLoader()
          ) : (
            this.renderSuggestions()
          )
        }
      </div>
    );
  }
}

GooglePlacesAutocomplete.propTypes = {
  debounce: PropTypes.number,
  debug: PropTypes.bool,
  inputClassName: PropTypes.string,
  inputStyle: PropTypes.object,
  loader: PropTypes.node,
  onSelect: PropTypes.func,
  suggestionsClassNames: PropTypes.shape({
    container: PropTypes.string,
    suggestion: PropTypes.string,
  }),
  suggestionsStyles: PropTypes.shape({
    container: PropTypes.object,
    suggestion: PropTypes.object,
  }),
};

GooglePlacesAutocomplete.defaultProps = {
  debounce: 300,
  debug: false,
  inputClassName: '',
  inputStyle: '',
  loader: null,
  onSelect: () => {},
  suggestionsClassNames: {
    container: '',
    suggestion: '',
  },
  suggestionsStyles: {
    container: {},
    suggestion: {},
  },
};

export default GooglePlacesAutocomplete;
