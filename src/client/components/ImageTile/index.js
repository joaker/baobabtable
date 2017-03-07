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
  const {href, src, className="", caption} = defaultedProps;

  return (
    <a href={href} className="image-tile">
      <div className="image-tile-contents">
        <img src={src}/>
        <div className="browser-caption">{caption}</div>
      </div>
    </a>
  );
};
export default ImageTile;
