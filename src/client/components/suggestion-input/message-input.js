import cnames from 'classnames';
import {noop, log} from "util/utils";
import keys from "constants/keys";
import styles from "./message-input.scss";
import CursorInput from "components/cursor-input";
import {before as beforePattern, after as afterPattern } from "constants/patterns";

export const MessageInput = ({
  className="",
  value="",
  cursorStart,
  cursorEnd,
  sendMessage=noop, // TODO set a send mechanism
  onTyped=noop,
  previousSuggestion=noop,
  nextSuggestion=noop,
  onEnter=noop,
  clearSuggestions,
  hasSuggestions=false,
}) => {

  const onInput = createOnInput(onTyped);
  const messageInputProps = {
    value,
    onInput,
    cursorStart,
    cursorEnd,
  };


  return (
      <CursorInput
        placeholder="What's on @your #mind?"
        className={cnames("message-input", className)}
        type="text"
        {...messageInputProps}
        onKeyDown={(e) => {
            const actionMap = {
              [keys.up]: previousSuggestion,
              [keys.down]: nextSuggestion,
              [keys.enter]: onEnter,
              [keys.escape]: clearSuggestions,
            };
            const key = e.which;
            const fn = actionMap[key];
            if(fn){
              fn(e);
              e.preventDefault();
            };
        }}
      />
  );
};

MessageInput.propTypes = {
  onTyped: React.PropTypes.func,
  sendMessage: React.PropTypes.func,
  cursorStart: React.PropTypes.number,
  cursorEnd: React.PropTypes.number,
  previousSuggestion: React.PropTypes.func,
  nextSuggestion: React.PropTypes.func,
  onEnter: React.PropTypes.func,
  clearSuggestions: React.PropTypes.func,
  hasSuggestions: React.PropTypes.bool,
};


const getToken = (pattern) => (value="") => {
  const matches = value.match(pattern);
  if(!matches) return "";
  return matches[0];
};


const createOnInput = (handleTyped = noop) => (e) => {
  const {target} = e;
  const {selectionStart=0} = target;
  const {selectionEnd=0} = target;
  const {value=""} = target;

  const before = value.slice(0, selectionStart);
  const after = value.slice(selectionStart);

  const beforeToken = getToken(beforePattern)(before);
  const afterToken = getToken(afterPattern)(after);

  // only include tokens that have the '@' indentifying them as user tokens
  const token = beforePattern ? (beforeToken + afterToken) : "";

  const typed = {value, token, selectionStart, selectionEnd};
  const result = handleTyped(typed);
  return result;
};

export default MessageInput;
