import Router from "koa-router";
import CartController from '../controller/cartController';

const cartRouter = new Router({prefix: '/cart'});

cartRouter.post('/createCart', CartController.createCart);
cartRouter.post('/getCart', CartController.getCart);

export default cartRouter;
