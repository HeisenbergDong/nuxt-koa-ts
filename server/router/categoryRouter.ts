import Router from "koa-router";
import CategoryController from '../controller/categoryController';

const categoryRouter = new Router({prefix: '/category'});

categoryRouter.get('/getCrumbs', CategoryController.getCrumbs);

export default categoryRouter;
