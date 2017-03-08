import './index.scss';
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router'
import PageLink from 'components/PageLink';
import {connect} from 'react-redux';
import Modal from './Modal';
import * as actions from 'actions/menu';

const lprops = {
  activeClassName: 'current open',
  className: 'nav',
};

const menuPath = '/Menu';
const defaultPath = '/';

export const UnconnectedNavMobile = (parentProps, {router={}}) => {
  const bh = browserHistory;
  console.log('vvv bh vvv');
  console.log(bh);
  const {toggle, open, id, className: providedClassName="", hidden= false, fixed= true, nextPath: to} = parentProps;

  const openClass = open ? 'current open' : 'closed';
  const className = cnames("navigation", "mobileOnly", "trigger", openClass, providedClassName, {fixed, hidden,});



  const linkButton = <Link to={to} {...lprops} className={className}/>;

  return (
    <div className="mobile-nav">
      <a className={className} onClick={() => toggle()}> </a>
      <Modal className={cnames("modal", openClass)}/>
    </div>
  );
};

UnconnectedNavMobile.propTypes = {
  nextPath: React.PropTypes.string,
  toggle: React.PropTypes.func,
}

UnconnectedNavMobile.contextTypes = {
  router: React.PropTypes.object,
};

const defaultLocation = {
  pathname: '/',
};
const menuLocation = {
  pathname: menuPath,
};

const getExitLocation = (locations) => {
  const returnPath = locations.filter(l => l.pathname != menuPath).slice(0,1)[0];
  const returnPathOrDefault = returnPath || defaultLocation;
  return returnPathOrDefault;
};

const mapState = ({location={}, routing={}, menu={}}) => {
  const { locations = []} = location;
  const {locationBeforeTransitions={}} = routing;

  const {open=false} = menu;

  const {pathname: currentPathname = "/"} = locationBeforeTransitions;

  const alreadyOnMenu = currentPathname === menuPath;

  console.log('current location is:', locationBeforeTransitions);
  console.log('current locations are:', locations);
  console.log('current pathname is:', currentPathname);
  console.log('alreadyOnMenu?', alreadyOnMenu);

  // debugger;

  const exitLocation = getExitLocation(locations);

  const goToMenu = !alreadyOnMenu;
  const nextLocation =  goToMenu ? menuLocation : exitLocation;
  const {pathname: nextPath} = nextLocation;
  return {
    nextPath,
    open,
  };
}

const mapDispatch = dispatch => {
  return {
    toggle: () => dispatch(actions.toggleMenu()),
  };
};

export const NavMobile = connect(mapState, mapDispatch)(UnconnectedNavMobile);

export default NavMobile;
