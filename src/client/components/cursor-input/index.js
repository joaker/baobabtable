import './index.scss';

export class CursorInput extends React.PureComponent {
  render(){
    const props = {...this.props};
    delete props.cursorStart; // Remove the cursor, which is only used by component did update
    delete props.cursorEnd; // Remove the cursor, which is only used by component did update


    const {maxLength: maxCharacterCount=0, value=""} = props;
    const characterCount = (maxCharacterCount && value && value.length) || 0;
    const charactersRemaining = Math.max(maxCharacterCount - characterCount, 0);

    const stateNames = cnames("characters-remaining", { "display-character-limit": maxCharacterCount, "character-limit-reached": !charactersRemaining});

    return (
      <div className={cnames("cursor-input", props.className, stateNames)}>
        <input {...props} className="cursor-inner-inner"/>
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

CursorInput.propTypes = {
  onInput: React.PropTypes.func,
  sendMessage: React.PropTypes.func,
  cursorStart: React.PropTypes.number,
  cursorEnd: React.PropTypes.number,
};


const shouldUpdateCursor = (cursor, lastCursor) => {
  const noCursorSet = !cursor && cursor;
  if(noCursorSet) return false;

  const cursorHasChanged = cursor === lastCursor;
  return cursorHasChanged;
}
const isCursorIndex = index => index>=0;



export default CursorInput;
