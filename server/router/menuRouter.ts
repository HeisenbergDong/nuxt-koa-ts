import Router from "koa-router";
import MenuController from '../controller/menuController';

const menuRouter = new Router({prefix: '/geo'});

menuRouter.get('/getMenu', MenuController.getMenu);

export default menuRouter;
