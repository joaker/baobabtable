import './index.scss';
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router'
import PageLink from 'components/PageLink';

export const Nav = ({id, className, hidden= false, fixed= true}) => (
  <nav id={id} data-view-className="views/Navigation" className={cnames("navigation", className, {fixed, hidden,})}>
    <div className="container hashRoute">
      <PageLink name="Welcome"/>
      <PageLink name="Menu"/>
      <PageLink name="Gallery"/>
      <PageLink name="Reservations"/>
      <PageLink name="Contact"/>
      <PageLink name="@AbujaChef"/>
    </div>
  </nav>
);


export default Nav;
