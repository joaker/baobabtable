import debounce from 'debounce-promise';
import * as types from 'constants/action-types';
import * as message from "actions/message";
import * as streamActions from 'actions/stream';
import {minTokenLength, maxSuggestionCount, debounceMillis} from 'constants/search';
import {createUserSearch, createTagSearch} from 'constants/urls';

export const setSuggestions = (suggestions = []) => {
  return {
    type: types.setSuggestions,
    suggestionIndex:0,
    suggestions,
  }
};
export const clearSuggestions = () => setSuggestions(); // convenience method

const symbols = [
  '@',
  // '#' // TODO: uncomment when the hash hint is available
];

const isSymbolToken = token => token && token.length > minTokenLength && symbols.includes(token[0]);

const noResults = {users:[]};
const getSuggestions = (searchURL, token) => {
  if(!token) return Promise.resolve(false);
  return fetch(searchURL).then(res => res.json());
}

const getSuggestionsDebounced = debounce(getSuggestions, debounceMillis, {leading: false});

const tokenTypeToSearchCreator = {
  user: createUserSearch,
  tag: createTagSearch,
  default: (x) => "",
}

const tokenTypeToResultsPath = {
  user: 'users',
  tag: 'topics',
};

export const updateSuggestions = () => {
  return (dispatch, getState) => {
    const s = getState() || {};
    const {message = {}} = s;
    const {token = {}, tokenType = 'none'} = message;
    if(!isSymbolToken(token)) return dispatch(setSuggestions());
    const creator = tokenTypeToSearchCreator[tokenType] || tokenTypeToSearchCreator.default;
    const searchURL = creator(token);
    return getSuggestionsDebounced(searchURL, token).then(results => {
      if(!results){
        return false;
      }
      const path = tokenTypeToResultsPath[tokenType];
      const suggestions = results[path].slice(0, maxSuggestionCount);
      return dispatch(setSuggestions(suggestions));
    })
  };
};

export const setSuggestionIndex = (value=0) => {
  return {
    type: types.setSuggestionIndex,
    value,
  };
};

export const updateSuggestionIndex = (suggestedIndex) => {
  return (dispatch, getState) => {
    const s = getState() || {};
    const {messages = {}} = s;
    const {suggestion={}} = s;
    const {suggestions=[]} = suggestion;

    const itemCount = (suggestions.length > 0) ? suggestions.length : 1;

    const mod = Math.min(maxSuggestionCount, itemCount);

    const nextIndex = suggestedIndex % mod;
    return dispatch(setSuggestionIndex(nextIndex));
  };
}

const getSuggestionIndex = (getState) => {
  const s = getState() || {};
  const {suggestion = {}} = s;
  const {suggestionIndex=0} = suggestion;
  return suggestionIndex;
}

export const previousSuggestion = () => {
  return (dispatch, getState) => {
    const suggestionIndex = getSuggestionIndex(getState);
    return dispatch(updateSuggestionIndex(suggestionIndex - 1));
  };
};

export const nextSuggestion = () => {
  return (dispatch, getState) => {
    const suggestionIndex = getSuggestionIndex(getState);
    return dispatch(updateSuggestionIndex(suggestionIndex + 1));
  };
};

export const onEnter = () => {
  return (dispatch, getState) => {

    const state = getState();
    const {suggestion: suggestionState={},} = state;
    const {suggestions = []} = suggestionState;

    const hasSuggestions = suggestions.length > 0;
    if(hasSuggestions){
      return dispatch(acceptCurrentSuggestion());
    }

    dispatch(streamActions.sendMessage());

  };
};

export const acceptCurrentSuggestion = () => {
  return (dispatch, getState) => {

    const state = getState();
    const {message: messageState={}, suggestion: suggestionState={}} = state
    const {text = "", token="", selectionStart, selectionEnd} = messageState;
    const {suggestionIndex, suggestions=[]} = suggestionState;

    // no valid index?  leave.
    if (!(suggestionIndex>=0) || suggestionIndex >= suggestions.length) {
      console.log(`accepted suggestion was not found for index <${suggestionIndex}>`);
      return;
    }

    const acceptedSuggestion = suggestions[suggestionIndex];
    const {screen_name=""} = acceptedSuggestion;
    const handle = screen_name ? `@${screen_name}` : "";

    // the current token must start before the current index
    const searchStart = Math.max(0, selectionStart - token.length);

    // find the start of the token
    const tokenStart = text.indexOf(token, searchStart) || 0;
    const tokenEnd = tokenStart + token.length;

    const nextText = text.slice(0, tokenStart) + handle + text.slice(tokenEnd);
    const nextCursor = tokenStart + handle.length;

    console.log('message actions: ', message);
    dispatch(message.setCursor(nextCursor, nextCursor));
    dispatch(message.setText(nextText));
    dispatch(clearSuggestions());
  };
};

export const onSuggestion = (index) => {
  return (dispatch, getState) => {
    dispatch(setSuggestionIndex(index));  // update the suggestion index
    return dispatch(acceptCurrentSuggestion()); // accept the suggestion at the newly set index
  }
}
