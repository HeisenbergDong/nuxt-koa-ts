import Koa from 'koa';
import config from '../nuxt.config';
import bodyParser from 'koa-bodyparser';
import consola from 'consola';
import mongoose from 'mongoose';
import mongooseConfig from './config/mongo';
import passport from './config/passport';
import positionRouter from './router/positionRouter';
import menuRouter from './router/menuRouter';
import cartRouter from './router/cartRouter';
import categoryRouter from './router/categoryRouter';
import orderRouter from './router/orderRouter';
import searchRouter from './router/searchRouter';
import userRouter from './router/userRouter';
import LotteryRouter from './router/lotteryRouter';

const app = new Koa();
const { Nuxt, Builder } = require('nuxt');


config.dev = !(app.env === 'production');
mongoose.connect(mongooseConfig.dbs,{ useNewUrlParser:true });

app.use(bodyParser());
app.use(passport.initialize());
app.use(passport.session());

async function start() {
    // Instantiate nuxt.js
    const nuxt = new Nuxt(config);

    const {
        host = process.env.HOST || '127.0.0.1',
        port = process.env.PORT || 3000
    } = nuxt.options.server;

    // Build in development
    if (config.dev) {
        const builder = new Builder(nuxt);
        await builder.build();
    } else {
        await nuxt.ready();
    }

    app.use(positionRouter.routes()).use(positionRouter.allowedMethods());
    app.use(menuRouter.routes()).use(menuRouter.allowedMethods());
    app.use(cartRouter.routes()).use(cartRouter.allowedMethods());
    app.use(categoryRouter.routes()).use(categoryRouter.allowedMethods());
    app.use(orderRouter.routes()).use(orderRouter.allowedMethods());
    app.use(searchRouter.routes()).use(searchRouter.allowedMethods());
    app.use(userRouter.routes()).use(userRouter.allowedMethods());
    app.use(LotteryRouter.routes()).use(LotteryRouter.allowedMethods());

    app.use((ctx: any) => {
        ctx.status = 200; // koa defaults to 404 when it sees that status is unset
        ctx.respond = false; // Bypass Koa's built-in response handling
        ctx.req.ctx = ctx; // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
        return new Promise((resolve, reject) => {
            ctx.res.on('close', resolve);
            ctx.res.on('finish', resolve);
            nuxt.render(ctx.req, ctx.res, (promise: any) => {
                // nuxt.render passes a rejected promise into callback on error.
                promise.then(resolve).catch(reject);
            })
        })
    });

    app.listen(port, host);
    consola.ready({
        message: `Server listening on http://${host}:${port}`,
        badge: true
    });
}

start();
