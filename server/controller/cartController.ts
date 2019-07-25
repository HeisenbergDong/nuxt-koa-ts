import { BaseContext } from 'koa';
import { Cart } from '../entity/cart'
import md5 from 'crypto-js/md5';

export default class cartController {

  public static async createCart(ctx: BaseContext){

    if (!ctx.isAuthenticated()) {
      ctx.body = {
        code: -1,
        msg: 'please login'
      }
    } else {
      let time = Date();
      let cartNo = md5(Math.random() * 1000 + time).toString();
      let {
        params: {
          id,
          detail
        }
      } = ctx.request.body;
      let cart = new Cart({id, cartNo, time, user: ctx.session.passport.userController, detail});
      let result = await cart.save();
      if (result) {
        ctx.body = {
          code: 0,
          msg: '',
          id: cartNo
        }
      } else {
        ctx.body = {
          code: -1,
          msg: 'fail'
        }
      }
    }

  }

  public static async getCart(ctx: BaseContext){
    let {id} = ctx.request.body;
    try {
      let result = await Cart.findOne({cartNo: id});
      ctx.body = {
        code: 0,
        data: result ? result.detail[0] : {}
      }
    } catch (e) {
      ctx.body = {
        code: -1,
        data: {}
      }
    }
  }

}
