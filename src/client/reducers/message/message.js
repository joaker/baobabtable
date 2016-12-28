
export const setText = (state, action) => {
  const {value:text=""} = action;
  return {
    text,
  };
};

export const setToken = (state, {value:token="", tokenType=""}) => {
  return {
    token,
    tokenType,
  };
};

export const setCursor = (state, action) => {
  const {value={}} = action;
  const {cursorStart = 0} = value;
  const {cursorEnd = cursorStart} = value;

  return {
    cursorStart,
    cursorEnd,
  };
};
