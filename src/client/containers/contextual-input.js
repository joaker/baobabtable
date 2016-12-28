import {connect} from 'react-redux';
import './contextual-input.scss';
import SuggestionInput from 'components/suggestion-input/index';
import {noop} from 'util/utils';
import {onTyped,} from 'actions/message';
import {
  clearSuggestions,
  previousSuggestion, nextSuggestion,
  onEnter,
  onSuggestion,
} from 'actions/suggestion';
import {sendMessage,} from 'actions/stream';
import Stream from './stream';

console.log('stream is: ', Stream);

const UnconnectedContextualInput = ({
  value,
  cursorStart,
  cursorEnd,
  suggestions,
  suggestionIndex=0,
  onSuggestion=noop,
  sendMessage=noop,
  onTyped=noop,
  previousSuggestion=noop,
  nextSuggestion=noop,
  onEnter=noop,
  clearSuggestions=noop,
}) => {
  const props = {
    value, cursorStart, cursorEnd,
    suggestions, suggestionIndex,
    onTyped, sendMessage,
    previousSuggestion, nextSuggestion,
    onEnter, clearSuggestions, onSuggestion,
  };
  return (
      <SuggestionInput {...props}>
        <Stream />
      </SuggestionInput>
  );
};

const mapStateToProps = (state) => {
  const {
    message = {},
    suggestion = {},
  } = state;

  const {text: value = "",cursorStart=0} = message;
  const {cursorEnd=cursorStart} = message;

  const {
    suggestions = [], // TODO - Immutable-this up so it won't trigger re-renders all the time
    suggestionIndex = 0,
  } = suggestion;

  return {
    value,
    suggestions,
    suggestionIndex,
    cursorStart,
    cursorEnd,
  }
};
const mapDispatchToProps = dispatch => ({
  onSuggestion: (index) => dispatch(onSuggestion(index)),
  sendMessage: () => dispatch(sendMessage()),
  onTyped: (event) => dispatch(onTyped(event)), // {value, token, start, end};
  previousSuggestion: (event) => dispatch(previousSuggestion()),
  nextSuggestion: (event) => dispatch(nextSuggestion()),
  onEnter: (event) => dispatch(onEnter()),
  clearSuggestions: (event) => dispatch(clearSuggestions()),
});

export const ContextualInput = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedContextualInput);

export default ContextualInput;
