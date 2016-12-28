import Suggestion from "./suggestion";

const SuggestionList = ({suggestions, onSuggestion, suggestionIndex}) => {
  const elements = suggestions.map((suggestion, index) => {
    const className = (index===suggestionIndex) ? "selected" : "";
    return (<Suggestion key={index} className={className}
      suggestion={suggestion}
      onClick={(e) => onSuggestion(index)}
    />);
  });

  return (<div className="suggestions">
    {elements}
  </div>);
};

// https://facebook.github.io/react/docs/typechecking-with-proptypes.html
SuggestionList.propTypes = {
  suggestions: React.PropTypes.array.isRequired,
  onSuggestion: React.PropTypes.func.isRequired,
};

export default SuggestionList;
