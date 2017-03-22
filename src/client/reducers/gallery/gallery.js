
export const setTiles = ({tiles=[]}, {value=[]}) => {
  return {
    tiles: value,
  };
};

export const selectTile = ({}, {value}) => {
  return {
    selected: value,
  }
};
