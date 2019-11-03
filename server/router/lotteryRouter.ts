import Router from "koa-router";
import LotteryController from '../controller/lotteryController';

const lotteryRouter = new Router({prefix: '/lottery'});

lotteryRouter.post('/generate', LotteryController.generate);
lotteryRouter.get('/history', LotteryController.getHistory);
lotteryRouter.get('/current', LotteryController.getCurrent);
lotteryRouter.get('/init', LotteryController.initAll);

export default lotteryRouter;
