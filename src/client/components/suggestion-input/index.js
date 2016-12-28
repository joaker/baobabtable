import cnames from 'classnames';
import {noop, log} from "util/utils";
import SuggestionList from "./list";
import MessageInput from "./message-input";
import styles from "./index.scss";

export const SuggestionInput = ({
  className="",
  value="",
  cursorStart,
  cursorEnd,
  onSuggestion=(suggestion, index) => {},
  sendMessage=noop, // TODO set a send mechanism
  onTyped=noop,
  suggestions=[],
  suggestionIndex=0,
  previousSuggestion=noop,
  nextSuggestion=noop,
  onEnter=noop,
  clearSuggestions=noop,
  children,

}) => {
  const inputProps = {
    value,
    cursorStart,
    cursorEnd,
    sendMessage,
    onTyped,
    previousSuggestion,
    nextSuggestion,
    onEnter,
    clearSuggestions,
    children,
    hasSuggestions: (suggestions.length > 0),
  };

  const suggestionProps = {
    suggestions,
    onSuggestion,
    suggestionIndex,
    previousSuggestion,
    nextSuggestion,
  };

  const empty = !value;
  return (
    <div className={cnames('suggestion-input', {className,}, styles['suggestion-input'])}>
      <div className="message-box">
        <MessageInput
          {...inputProps}
        />
        <a className={cnames("send-button", {disabled: empty})} onClick={() => sendMessage()}>Send</a>
      </div>
      <div className="context-area">
        <SuggestionList {...suggestionProps}/>
        {children}
      </div>
    </div>
  );
};

SuggestionInput.propTypes = {
  value: React.PropTypes.string,
  cursorStart: React.PropTypes.number,
  cursorEnd: React.PropTypes.number,
  suggestions: React.PropTypes.array.isRequired,
  onSuggestion: React.PropTypes.func.isRequired,
  onTyped: React.PropTypes.func,
  suggestionIndex: React.PropTypes.number,
  previousSuggestion: React.PropTypes.func,
  nextSuggestion: React.PropTypes.func,
  onEnter: React.PropTypes.func,
  clearSuggestions: React.PropTypes.func,
  children: React.PropTypes.any,
};

export default SuggestionInput;
