import * as types from "constants/action-types";
import * as suggestion from "./suggestion";
import createActionMap from "util/createActionMap";

export default createActionMap({
  [types.setSuggestionIndex]: suggestion.setSuggestionIndex,
	[types.setSuggestions]: suggestion.setSuggestions,
});
