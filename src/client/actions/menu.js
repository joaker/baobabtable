import * as types from 'constants/action-types';

export const setMenu = (value=false) => {
  return {
    type: types.setMenu,
    value,
  };
};

export const openMenu = () => setMenu(true);
export const closeMenu = () => setMenu(false);
export const toggleMenu = () => (dispatch, getState) => {
  const state = getState();
  const {menu = {}} = state;
  const {open: isOpen} = menu;
  const nextState = isOpen ? closeMenu() : openMenu();
  dispatch(nextState);
};
