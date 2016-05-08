import express from 'express';
import React from 'react';
import { match, createMemoryHistory, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
// Routes
import Routes from './src/common/components/Routes';


const app = express();

/************************************************************
 *
 * Express routes for:
 *   - app.js
 *   - style.css
 *   - index.html
 *
 ************************************************************/

// Serve application file depending on environment
app.get('/app.js', (req, res) => {
  if (process.env.PRODUCTION) {
    res.sendFile(__dirname + '/build/app.js');
  } else {
    res.redirect('//' + process.env.DEV_HOST + ':' + process.env.DEV_PORT + '/build/app.js');
  }
});

// Serve aggregate stylesheet depending on environment
app.get('/style.css', (req, res) => {
  if (process.env.PRODUCTION) {
    res.sendFile(__dirname + '/build/style.css');
  } else {
    res.redirect('//' + process.env.DEV_HOST + ':' + process.env.DEV_PORT + '/build/style.css');
  }
});

const renderFullPage = (html) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>React Todo Web</title>
      <link rel="stylesheet" href="/style.css" charset="utf-8">
    </head>
    <body>
      <div id="app">${html}</div>
      <script src="/app.js"></script>
    </body>
    </html>
  `;
};


// Serve index page
app.get('*', (req, res) => {
  console.log(req.url)
  const history = createMemoryHistory(req.path);
  match({ routes: Routes, location: req.url, history: history }, (err, redirect, renderProps) => {
    console.log("hoge")
    console.log(renderProps)
    if (err) {
      res.status(500).send(err.message);
    } else if (redirect) {
      res.redirect(302, redirect.pathname + redirect.search);
    } else if (!renderProps) {
      res.status(404).send('Not found');
    } else {
      const app = <RouterContext {...renderProps}/>;
      const html = renderToString(app);
      res.send(renderFullPage(html));
    }
  });
});


/*************************************************************
 *
 * Webpack Dev Server
 *
 * See: http://webpack.github.io/docs/webpack-dev-server.html
 *
 *************************************************************/

if (!process.env.PRODUCTION) {
  const webpack = require('webpack');
  const WebpackDevServer = require('webpack-dev-server');
  const config = require('./webpack.local.config');

  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    noInfo: true,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000 // see https://github.com/webpack/webpack-dev-server/issues/155
    },
  }).listen(process.env.DEV_PORT, '::', (err, result) => {
    if (err) {
      console.log(err);
    }
  });
}


/******************
 *
 * Express server
 *
 *****************/

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Essential React listening at http://%s:%s', host, port);
});
