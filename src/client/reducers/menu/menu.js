
export const setMenu = (state, action) => {
  const { value : open = false } = action;
  return {
    open,
  };
};
