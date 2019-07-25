import Router from "koa-router";
import SearchController from '../controller/searchController';

const searchRouter = new Router({prefix: '/search'});

searchRouter.get('/top', SearchController.getTop);
searchRouter.get('/hotPlace', SearchController.hotPlace);
searchRouter.get('/resultsByKeywords', SearchController.resultsByKeywords);
searchRouter.get('/getProducts', SearchController.getProducts);

export default searchRouter;
