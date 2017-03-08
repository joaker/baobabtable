import './index.scss';
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router'

const baseProps = {
  activeClassName: 'current',
  className: 'nav',
};


export const PageLink = (props={}) => {
  const {index, name} = props;
  const {to=`/${name}`} = props;
  const className = cnames("noselect", props.className)

  const linkProps = {
    ...baseProps,
    className,
  }

  const pageLink = index ? (
    <IndexLink to={to} {...linkProps}>{name}</IndexLink>
  ) : (
    <Link to={to} {...linkProps}>{name}</Link>
  );
  return pageLink;
};

export default PageLink;
