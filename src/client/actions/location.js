import * as types from 'constants/action-types';
export function changeLocation (value = '/') {
  return {
    type: types.changeLocation,
    value,
  };
}

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
export const updateLocation = ({ dispatch }) => {
  return (nextLocation) => {
    return dispatch(changeLocation(nextLocation))
  };
}
