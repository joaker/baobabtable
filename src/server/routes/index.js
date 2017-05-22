const routes = require('express').Router();
const fetch = require('node-fetch');
const samplePosts = require('../../../sample/user-fetch.json');

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

module.exports = routes;
