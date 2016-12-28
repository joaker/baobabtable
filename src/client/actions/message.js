import * as types from 'constants/action-types';
import {updateSuggestions} from "actions/suggestion";
import {symbolToTokenType} from 'constants/patterns';
export const setText = (value="") => {
  return {
    type: types.setText,
    value,
  };
};

const getTokenType = (token) => {
  const symbol = token.slice(0,1);
  const tt = symbolToTokenType[symbol] || '';
  return tt;
};

export const setToken = (value) => {
  const tokenType = getTokenType(value);
  return {
    type: types.setToken,
    tokenType,
    value,
  };
};

export const setCursor = (cursorStart, cursorEnd) => {
  return {
    type: types.setCursor,
    value: {
      cursorStart,
      cursorEnd,
    },
  };
};

export const onTyped = (params) => (dispatch, getState) =>{
  const {value="", token="", selectionStart=0, selectionEnd=0} = params;
  dispatch(setText(value)); // update the value
  dispatch(setToken(token)); // update the token we are matching
  dispatch(setCursor(selectionStart, selectionEnd)); // update the cursor
  return dispatch(updateSuggestions());
};
