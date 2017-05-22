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

const createDefaultTile = (url) => {
  return {
    images: {
      standard_resolution:
        url,
    }
  }
}
const defaultTileURLs = [];
const defaultTileCount = 20;
for(let i =0; i < defaultTileCount; i++){ defaultTileURLs.push('http://fake-address'); }
const fetchDefaultTiles = (dispatch) => err => {
  return defaultTileURLs.map(createDefaultTile);
};

const getImageURL = (p) => (p && p.images && p.images.standard_resolution && p.images.standard_resolution.url) || '';
const getText = (p) => (p && p.caption && p.caption.text) || '';
const shorten = (text='') => {
  const index = text.indexOf("\n");
  if(text < 0) return text;

  const short = text.slice(0, index);
  return short;
};

export const fetchTiles = () => (dispatch) => {
  return fetch('/tiles')
    .then(res => res.json())
    .catch(fetchDefaultTiles)
    .then(posts => {
      const metaimages = posts
        .map(p => ({
          url: getImageURL(p),
          description: shorten(getText(p))//.slice(0,20),
        }))
        .filter(p => p.url)
        // .map(p => {
        //   const postURL = p.images.standard_resolution.url;
        //   return postURL;
        // });
      const result = dispatch(setTiles(metaimages));
      return Promise.resolve(result);
    });
};
