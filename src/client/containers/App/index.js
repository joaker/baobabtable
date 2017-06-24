import './index.scss';
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router';
import Nav from 'components/Nav';
import NavMobile from 'components/Nav/Mobile';

export const App = (props) => {
  const {children} = props;
  return (
    <div>
      <Nav/>
      <NavMobile/>
      <div className='contents'>
        <main>
          {children}
        </main>
      </div>
    </div>
  );
};
export default App;
