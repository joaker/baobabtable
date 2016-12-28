const Twitter = require('twitter');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = require('./src/client/constants/port');

const client = new Twitter({
	consumer_key: 'fx95oKhMHYgytSBmiAqQ',
	consumer_secret: '0zfaijLMWMYTwVosdqFTL3k58JhRjZNxd2q0i9cltls',
	access_token_key: '2305278770-GGw8dQQg3o5Vqfx9xHpUgJ0CDUe3BoNmUNeWZBg',
	access_token_secret: 'iEzxeJjEPnyODVcoDYt5MVvrg90Jx2TOetGdNeol6PeYp',
});

//CORS support
var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
  next();
};
app.use(allowCrossDomain);

// Webpack dev support with hot reloading -- development only
function installWebpackDevServer() {

  // Step 1: Create & configure a webpack compiler
  var webpack = require('webpack');
  var webpackConfig = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : './webpack.config');
  var compiler = webpack(webpackConfig);

  // Step 2: Attach the dev middleware to the compiler & the server
  app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
  }));

  // Step 3: Attach the hot middleware to the compiler & the server
  app.use(require("webpack-hot-middleware")(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
  }));
}

const mapCode = (error) => {

}


if(process.env.NODE_ENV !== "production"){
	installWebpackDevServer();
}

app.use('/', express.static('dist'));

// app.get('/', (req, res) => {
// 	res.status(200).send({
// 		data: 'Successful request',
// 	});
// });

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// dummy endpoint for posting messages
app.post('/message/:id', (req, res) => {
	const id = req.params.id;
	const body = req.body;
	console.log("body:", (body))

	const response = Object.assign({}, body);

	// echo back the response
	res.status(200).send({
		success: true,
		data: response,
	});
});

const mappedCodes = {
	ENOTFOUND: 404,
	default: 500,
};

const getCode = (error = {}) => {
	const rawCode = error.code;
	const code = mappedCodes[rawCode] || mappedCodes.default;
	return code;
}

const MOCK_PATH = process.env.MOCK_PATH;
if(MOCK_PATH){
	console.log('asking client endpoint with mock endpoint...');
	const response = require('./sample/user-search.json');
	const users = response.users;


	// Masks the real endpoint when the server is unavailable
	app.get('/twitter/user/search', (req, res) => {
		console.log('handling mock client request');
		res.status(200).send({ users, response });
	});
}

app.get('/twitter/user/search', (req, res) => {
	const username = req.query.username;

	client.get('/users/search', { q: username }, (error, users, response) => {
		if (error) {
			const code = getCode(error); // Map string status codes to integer ones
			res.status(code).send({ error });
		} else {
			res.status(200).send({ users, response });
		}
	});
});

const TwitterTagSearchStartBAK = 'https://twitter.com/i/search/typeahead.json?count=10&filters=false&q=%23'
const TwitterTagSearchEndBAK = '&result_type=topics%2Cusers&src=SEARCH_BOX';

const TwitterTagSearchStart = 'https://twitter.com/i/search/typeahead.json?count=10&filters=false&q=%23'
const TwitterTagSearchEnd = '&result_type=topics%2Cusers&src=SEARCH_BOX';
// https://api.twitter.com/1.1/search/tweets.json?q=%23freebandnames&since_id=24012619984051000&max_id=250126199840518145&result_type=mixed&count=4
const createTagSearch = (name) => `${TwitterTagSearchStart}${name}${TwitterTagSearchEnd}`;

app.get('/twitter/tag/search', (req, res) => {
	console.log('a tag search was requested')
	const tag = req.query.tag;

	console.log(`tag: ${tag}`)

	// TODO - look up likely tags.  maybe try edit distance
	const searchTagURL = createTagSearch(tag);
	const response = { topics: []};
	res.status(200).send(
		// response, // TODO uncomment this when the hash hint is available
	);
});

app.listen(port, () => {
	/* eslint-disable no-console */
	console.log(`listening on port ${port}...`);
	/* eslint-enable no-console */
});
