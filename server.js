const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = require('./src/client/constants/port');

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


const mappedCodes = {
	ENOTFOUND: 404,
	default: 500,
};

// app.route('/me').get(function(req, res){
//
// res.sendFile(__dirname+'/public/html/contacts.html')
//
//
// })

app.use(function(req, res, next){
  if (req.accepts('html')) {
    res.sendFile(__dirname+'/dist/index.html');
    return;
  }

});


app.listen(port, () => {
	/* eslint-disable no-console */
	console.log(`listening on port ${port}...`);
	/* eslint-enable no-console */
});
