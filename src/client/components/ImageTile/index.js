import './index.scss';

const defaults = {
  href: '/recipes/best-apricot-dijon-chicken-thighs-couscous-recipe',
  src: 'https://images.theyellowtable.com/best-apricot-dijon-chicken-thighs-couscous-recipe-sq.jpg?w=271&amp;q=45',
  caption: 'Fear is the mind killer',
};

export const ImageTile = (props) => {

  const defaultedProps = {
    ...defaults,
    ...props,
  };
  const {href, src, className="", caption, onClick: selector} = defaultedProps;
  return (
    <a href={src} className="image-tile" onClick={e => {
      if(selector){
        selector(src);
        e.preventDefault(); // skip the href
      }
    }}>
      <div className="image-tile-contents">
        <div className="image-wrapper"><img src={src}/></div>
        <div><div className="browser-caption">{caption}</div></div>
      </div>
    </a>
  );
};
export default ImageTile;
