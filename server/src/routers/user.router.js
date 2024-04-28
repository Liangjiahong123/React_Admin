const KoaRouter = require('@koa/router');

const userRouter = new KoaRouter({ prefix: '/users' });

module.exports = userRouter;
