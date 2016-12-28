
export const setSuggestions = (state, action) => {
  const {suggestions=[], suggestionIndex} = action;
  return {
    suggestions,
    suggestionIndex,
  };
};

export const setSuggestionIndex = (state, action) => {
  const {value: suggestionIndex} = action;
  return {
    suggestionIndex,
  };
}

// const isValidIndex = value => value >= 0;
// export const setCursor = (state, action) => {
//   const {selectionStart, selectionEnd} = action;
//
//   const next = {};
//
//   if(isValidIndex(selectionStart)) {
//     next.selectionStart = selectionStart;
//     next.selectionEnd;
//   };
//   return next;
// }
