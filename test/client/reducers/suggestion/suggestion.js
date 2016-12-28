
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
