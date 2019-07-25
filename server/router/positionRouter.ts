import Router from "koa-router";
import PositionController from '../controller/positionController';

const positionRouter = new Router({prefix: '/geo'});

positionRouter.get('/getPosition', PositionController.getPosition);
positionRouter.get('/getProvince', PositionController.getProvince);
positionRouter.get('/province/:id', PositionController.getProvinceCity);
positionRouter.get('/getCity', PositionController.getCity);
positionRouter.get('/hotCity', PositionController.hotCity);

export default positionRouter;
