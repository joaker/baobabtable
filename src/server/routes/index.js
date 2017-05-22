const routes = require('express').Router();
const fetch = require('node-fetch');
const samplePosts = require('../../../sample/user-fetch.json');
const {register} = require('../utils/mail');

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json() // create application/json parser
var urlencodedParser = bodyParser.urlencoded({ extended: false }) // create application/x-www-form-urlencoded parser

routes.get('/tiles', (req, res) => {
  const access_token = process.env.IG_ACCESS_PUBLIC;
  const url = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${access_token}`;

  return fetch(url)
      .then(res => res.json())
      .catch(e => {
        console.log('/tiles request failed... using default fetch');
        // console.log(res);
        res.json(samplePosts.data);
      })
      .then((json) => {
          console.log(json);

          const posts = json.data;
          res.json(posts);
          //
          // res.json(json);
      });

  //res.status(200).json({ message: 'Connected!' });
});

routes.post('/register', jsonParser, (req, res) => {
  console.log('registering a member...');
  const body = req.body;
  const {name, email, description} = body;
  return register({name, email, description}).then(res);
});

module.exports = routes;
