import './index.scss';
import {onResize} from "on-resize/react";
import resize from './resize';

// A text component that accepts the cursor start and end locations
// By default, will draw focus after mounting
class UnwrappedCursorInput extends React.PureComponent {
  render(){
    const props = {...this.props};
    const {adjustor = e => e} = props;
    delete props.adjustor;
    delete props.cursorStart; // Remove the cursor, which is only used by component did update
    delete props.cursorEnd; // Remove the cursor, which is only used by component did update


    const {maxLength: maxCharacterCount=0, value=""} = props;
    const characterCount = (maxCharacterCount && value && value.length) || 0;
    const charactersRemaining = Math.max(maxCharacterCount - characterCount, 0);

    const stateNames = cnames("characters-remaining", { "display-character-limit": maxCharacterCount, "character-limit-reached": !charactersRemaining});
    return (
      <div className={cnames("cursor-input", props.className, stateNames)}>
        <textarea rows="1" {...props} className="cursor-inner-inner" onChange={adjustor}/>
        <div title="Messages are limited to 140 characters" className={cnames("characters-remaining")}>
          <div>{charactersRemaining} remaining</div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const {pullsFocus = true} = this.props;
    if (pullsFocus) { // pull the focus to the input after start
      ReactDOM.findDOMNode(this).focus();
    }
  }

  componentDidUpdate({lastCursor}) {
    const {cursorStart, cursorEnd} = this.props;
    if(!shouldUpdateCursor(cursorStart, lastCursor)) return;

    const elem = ReactDOM.findDOMNode(this);
    if(isCursorIndex(cursorStart)) elem.selectionStart = cursorStart; // move the selection start to the cursor;
    if(isCursorIndex(cursorEnd)) elem.selectionEnd = cursorEnd; // move the selection end to the cursor;
  }
}

UnwrappedCursorInput.propTypes = {
  onInput: React.PropTypes.func,
  sendMessage: React.PropTypes.func,
  cursorStart: React.PropTypes.number,
  cursorEnd: React.PropTypes.number,
  adjustor: React.PropTypes.func,
};

// Wrap in a component that triggers re-renders after resizing
const ResizingCursorInput = onResize()(UnwrappedCursorInput);

// Injects an adjustor that modifies the column values on the fly
export const CursorInput = (props = {})=> {
  const {onChange} = props;
  const adjustor = createAdjustor(onChange);
  return <ResizingCursorInput {...props} adjustor={adjustor}/>
};

// Test - has the cursor location changed?
const shouldUpdateCursor = (cursor, lastCursor) => {
  const noCursorSet = !cursor && cursor;
  if(noCursorSet) return false;

  const cursorHasChanged = cursor === lastCursor;
  return cursorHasChanged;
}

// Is the value a valid cursor index?
const isCursorIndex = index => index>=0;

// A fake target element
const dummyTarget = {style: { height: 0, scrollHeight: 0}};

const extractNumber = (token="") => {
  const numberStrings = token.match( /\d+/g);
  if(!numberStrings) return 0;

  const numbers = numberStrings.map(parseInt);
  const first = numbers.slice(0,1)[0];
  const result = first || 0;
  return result;
}

const getComputedStyles = elem => prop => {
  const result = window.getComputedStyle(elem, null).getPropertyValue(prop);
  return result;
};

const createGetValue = computedStyles => (...parts) => {
  const fullName = parts.join('-');
  const val = computedStyles(fullName);
  return val;
};

const getVerticalTotal = (element, properties=[]) => {
  if(!element) return 0;

  const styles = getComputedStyles(element);
  const getValue = createGetValue(styles);

  const vtotal = verticals.reduce((memo, property) => {
    const topString = getValue(property, 'top');
    const bottomString = getValue(property, 'bottom');

    const top = extractNumber(topString);
    const bottom = extractNumber(bottomString);

    const vertical = top + bottom;
    return memo + vertical;
  }, 0);

  return vtotal;
};

const verticals = [
  'padding',
];

// Adjustor factory
const createAdjustor = (next = e => e) => (e={}) => {
  const { target = dummyTarget } = e;
  resize(target,verticals);
  next(e);
};



export default CursorInput;
