import { BaseContext } from 'koa';
// import axios from '../config/axios';
// import sign from '../config/sign';
import { Category } from '../entity/category';

export default class categoryController {

  public static async getCrumbs(ctx: BaseContext) {

    let result = await Category.findOne({city: ctx.query.city.replace('市', '') || '北京'});
    ctx.status = 200;
    if (result) {
      ctx.body = {
        areas: result.areas,
        types: result.types
      }
    } else {
      ctx.body = {
        areas: [],
        types: []
      }
    }

    // let { status, data: { areas, types } } = await axios.get('http://cp-tools.cn/categroy/crumbs', {
    //   params: {
    //     city: ctx.query.city.replace('市', '') || "北京",
    //     sign
    //   }
    // })
    // ctx.body = {
    //   areas: status === 200 ? areas : [],
    //   types: status === 200 ? types : []
    // }
  }

}
