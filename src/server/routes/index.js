const routes = require('express').Router();
const fetch = require('node-fetch');

routes.get('/tiles', (req, res) => {
  const access_token = process.env.IG_ACCESS_PUBLIC;
  const url = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${access_token}`;

  fetch(url)
      .then(res => res.json())
      .then((json) => {
          console.log(json);

          const posts = json.data;
          res.json(posts);
          //
          // res.json(json);
      }).catch(e => {
        res.status(501).err(e);
      });

  //res.status(200).json({ message: 'Connected!' });
});

module.exports = routes;
