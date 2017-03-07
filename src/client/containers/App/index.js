import './index.scss';
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router';
import Nav from 'components/Nav';

export const App = ({children}) => (
  <div>
    <Nav/>
    <div className='contents'>
      <main>
      {children}
      </main>
    </div>
  </div>
);
export default App;
