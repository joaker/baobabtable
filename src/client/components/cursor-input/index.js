


export class CursorInput extends React.PureComponent {
  render(){
    const props = {...this.props};
    delete props.cursorStart; // Remove the cursor, which is only used by component did update
    delete props.cursorEnd; // Remove the cursor, which is only used by component did update
    return (
      <input {...props}/>
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
