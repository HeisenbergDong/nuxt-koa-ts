import { BaseContext } from 'koa';
// import sign from '../config/sign';
// import axios from '../config/axios';
import { Menu } from '../entity/menu';

export default class CityController {
  public static async getMenu (ctx: BaseContext) {

    const result = await Menu.findOne();
    ctx.status = 200;
    ctx.body = {
      menu: result==null?result:result.menu
    }

    // let {status, data: {
    //   menu
    // }} = await axios.get(`http://cp-tools.cn/geo/menu?sign=${sign}`);
    // if (status === 200) {
    //   ctx.body = {
    //     menu
    //   }
    // } else {
    //   ctx.body = {
    //     menu: []
    //   }
    // }

  }
}
