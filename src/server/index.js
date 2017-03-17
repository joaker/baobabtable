const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = require('../client/constants/port');
const routes = require('./routes');
const path = require('path');
const join = path.join;

const rootDir = join(__dirname, '..', '..');
const distDir = join(rootDir, 'dist');


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
  var webpackConfig = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : '../../webpack.config');
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



if(process.env.NODE_ENV !== "production"){
	installWebpackDevServer();
}

app.use(routes);

app.use('/', express.static(distDir));
app.use(bodyParser.urlencoded({ extended: false }))


app.use(bodyParser.json()); // parse application/json


const mappedCodes = {
	ENOTFOUND: 404,
	default: 500,
};


app.use(function(req, res, next){
  if (req.accepts('html')) {
    res.sendFile(join(distDir, 'index.html'));
    return;
  }
});


app.listen(port, () => {
	/* eslint-disable no-console */
	console.log(`listening on port ${port}...`);
	/* eslint-enable no-console */
});
