import * as types from 'constants/action-types';
export function setTiles (value = []) {
  return {
    type: types.setTiles,
    value,
  };
};

export function selectTile (value = null) {
  return {
    type: types.selectTile,
    value,
  };
};

export function deselectTile () {
  return selectTile();
};

export const fetchTiles = () => (dispatch) => {
  return fetch('/tiles').then(res => res.json()).then(posts => {
    const urls = posts.map(p => {
      const postURL = p.images.standard_resolution.url;
      return postURL;
    });
    const result = dispatch(setTiles(urls));
    return Promise.resolve(result);
  });
};
