const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const setupRouters = require('../routers');

const app = new Koa();

app.use(bodyParser());
setupRouters(app);

module.exports = app;
