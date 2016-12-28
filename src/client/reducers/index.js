import { combineReducers } from 'redux'

import message from "reducers/message";
import suggestion from "reducers/suggestion";
import stream from "reducers/stream";

export default combineReducers({
  message,
  suggestion,
  stream,
});
