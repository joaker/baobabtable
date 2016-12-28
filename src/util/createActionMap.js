export default (actionsToReducer) => (state = {}, action) => {
  	const reducer = actionsToReducer[action.type];
  	if (!reducer) {
  		return state;
  	}

    const diff = reducer(state, action);
  	const newState = {
      ...state,
      ...diff
    };

  	return newState;
};
