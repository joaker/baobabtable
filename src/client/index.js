import 'styles/reset.scss';
import 'styles/base.scss';
import 'styles/theme.scss';
import 'styles/utilities.scss';
import App from './containers/App';
import * as pages from 'pages';

import {render} from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from "./store/configureStore";

// import { Router, Route, browserHistory } from 'react-router';
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

// build a store
const store = configureStore();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

render(
	<Provider store={store}>
		<Router history={history}>
	    <Route path="/" component={App}>
				<IndexRoute component={pages.Welcome}/>
				<Route path="/Welcome" component={pages.Welcome}/>				
				<Route path="/Menu" component={pages.Menu}/>
	      <Route path="/Stuff" component={pages.Stuff}/>
				<Route path="/Thangs" component={pages.Thangs}/>
			</Route>
    </Router>
	</Provider>,
	document.getElementById('anchor')
);
