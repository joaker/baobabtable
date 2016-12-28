import 'styles/reset.scss';
import 'styles/base.scss';
import 'styles/theme.scss';
import 'styles/utilities.scss';

import {render} from 'react-dom';
import {Provider} from 'react-redux';
import App from './containers/App';
import configureStore from "./store/configureStore";

const store = configureStore();

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('anchor')
);
