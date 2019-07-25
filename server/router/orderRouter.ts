import Router from "koa-router";
import orderController from '../controller/orderController';

const orderRouter = new Router({prefix: '/order'});


orderRouter.post('/createOrder', orderController.createOrder);
orderRouter.post('/getOrder', orderController.getOrder);

export default orderRouter;
