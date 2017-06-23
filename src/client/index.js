import 'styles/reset.scss';
import 'styles/base.scss';
import 'styles/theme.scss';
import 'styles/utilities.scss';
import App from './containers/App';
import * as pages from 'pages';

import {render} from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from "./store/configureStore";
import {updateLocation} from 'actions/location';

// import { Router, Route, browserHistory } from 'react-router';
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

const unsyncedHistory = browserHistory;


// build a store
const store = configureStore();


// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(unsyncedHistory, store)

unsyncedHistory.listen(updateLocation(store));


render(
	<Provider store={store}>
		<Router history={history}>
	    <Route path="/" component={App}>
				<IndexRoute component={pages.Welcome}/>
				<Route path="/Welcome" component={pages.Welcome}/>
				<Route path="/Intro" component={pages.Intro}/>
				<Route path="/Gallery" component={pages.Gallery}/>
				<Route path="/Join" component={pages.Join}/>
				<Route path="/Submitted" component={pages.Submitted}/>
	      <Route path="/Stuff" component={pages.Stuff}/>
				<Route path="/Thangs" component={pages.Thangs}/>
			</Route>
    </Router>
	</Provider>,
	document.getElementById('anchor')
);
