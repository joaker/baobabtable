import './index.scss';
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router'

const lprops = {
  activeClassName: 'current',
  className: 'nav',
};


export const PageLink = (props) => {
  const {index, name} = props;
  const {to=`/${name}`} = props;
  const pageLink = index ? (
    <IndexLink to={to} {...lprops}>{name}</IndexLink>
  ) : (
    <Link to={to} {...lprops}>{name}</Link>
  );
  return pageLink;
};

export default PageLink;
