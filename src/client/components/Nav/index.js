import './index.scss';
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router'
import PageLink from 'components/PageLink';

export const Nav = ({id, className, hidden= false, fixed= true}) => (
  <nav id={id} data-view-className="views/Navigation" className={cnames("navigation", className, {fixed, hidden,})}>
    <div className="container hashRoute">
      <a href="#welcome">Welcome</a>
      <a href="#intro">Intro</a>
      <a href="#join">Join</a>
      <PageLink name="Gallery"/>
      <PageLink name="Contact"/>
      <PageLink name="@AbujaChef"/>
    </div>
  </nav>
);


export default Nav;
