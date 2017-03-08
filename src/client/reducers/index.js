import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import message from "reducers/message";
import suggestion from "reducers/suggestion";
import stream from "reducers/stream";
import location from "reducers/location";
import menu from "reducers/menu";

export default combineReducers({
  message,
  suggestion,
  stream,
  routing,
  location,
  menu,
});
