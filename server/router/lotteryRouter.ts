import Router from "koa-router";
import LotteryController from '../controller/lotteryController';

const lotteryRouter = new Router({prefix: '/lottery'});

lotteryRouter.get('/history', LotteryController.getHistory);
lotteryRouter.get('/current', LotteryController.getCurrent);
lotteryRouter.get('/init', LotteryController.init);
lotteryRouter.get('/schedule', LotteryController.schedule);
lotteryRouter.get('/update', LotteryController.update);

export default lotteryRouter;
