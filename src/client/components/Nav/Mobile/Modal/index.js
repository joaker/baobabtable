import './index.scss';
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router'
import PageLink from 'components/PageLink';
import {connect} from 'react-redux';
import * as actions from 'actions/menu';


export const RawModal = ({id, className, close, toggle}) => (
  <nav id={id} className={cnames("modal", className)}>
    <div className="routes" onClick={() => close()}>
      <a href="/#welcome">Welcome</a>
      <a href="/#intro">Intro</a>
      <a href="/#join">Join</a>
      <PageLink name="Gallery"/>
      <PageLink name="Contact"/>
      <PageLink name="@AbujaChef"/>
    </div>
  </nav>
);
RawModal.propTypes = {
  close: React.PropTypes.func,
  toggle: React.PropTypes.func,
};

const mapState = state => ({});
const mapDispatch = dispatch => ({
  close: () => dispatch(actions.closeMenu()),
  toggle: () => dispatch(actions.toggleMenu()),
});

export const Modal = connect(mapState, mapDispatch)(RawModal);
export default Modal;
