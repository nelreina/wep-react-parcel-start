require('dotenv').config();
const proxy = require('http-proxy-middleware');
const Bundler = require('parcel-bundler');
const express = require('express');

const bundler = new Bundler('src/index.html', {
  cache: true
});

const app = express();

app.use(
  '/posts',
  proxy({
    target: process.env.PROXY,
    changeOrigin: true
  })
);

app.use(bundler.middleware());

app.listen(Number(process.env.PORT));
