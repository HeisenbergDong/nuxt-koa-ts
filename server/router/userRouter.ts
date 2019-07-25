import Router from "koa-router";
import UserController from '../controller/userController';

const userRouter = new Router({prefix: '/user'});

userRouter.post('/signUp', UserController.signUp);
userRouter.post('/signIn', UserController.signIn);
userRouter.post('/verify', UserController.verify);
userRouter.get('/logOut', UserController.logOut);
userRouter.get('/getUser', UserController.getUser);

export default userRouter;
