import { BaseContext } from 'koa';
import { Cart } from '../entity/cart';
import { Order } from '../entity/order';
import md5 from 'crypto-js/md5';

export default class OrderController {

  public static async createOrder (ctx: BaseContext) {

    let {id, price, count} = ctx.request.body;
    let time = Date();
    let orderID = md5(Math.random() * 1000 + time).toString();
    if (!ctx.isAuthenticated()) {
      ctx.body = {
        code: -1,
        msg: 'please login'
      }
    } else {
      let findCart: any = await Cart.findOne({cartNo: id});
      let order = new Order({
        id: orderID,
        user: ctx.session.passport.userController,
        time,
        total: price * count,
        images: findCart.detail[0].imgs,
        name: findCart.detail[0].name,
        status: 0
      });
      try {
        let result = await order.save();
        if (result) {
          await findCart.remove();
          ctx.body = {
            code: 0,
            id: orderID
          }
        } else {
          ctx.body = {
            code: -1
          }
        }
      } catch (e) {
        ctx.body = {
          code: -1
        }
      }
    }

  }

  public static async getOrder (ctx: BaseContext) {

    if (!ctx.isAuthenticated()) {
      ctx.body = {
        code: -1,
        list: [],
        msg: 'please login'
      }
    } else {
      try {
        let result = await Order.find();
        if (result) {
          ctx.body = {
            code: 0,
            list: result
          }
        } else {
          ctx.body = {
            code: -1,
            list: []
          }
        }
      } catch (e) {
        ctx.body = {
          code: -1,
          list: []
        }
      }
    }

  }

}
