import { BaseContext } from 'koa';
import sign from '../config/sign';
import axios from '../config/axios';
import { Poi } from '../entity/poi';

export default class SearchController {

  public static async getTop(ctx: BaseContext) {

    try {
      let top = await Poi.find({
        'name': new RegExp(ctx.query.input),
        city: ctx.query.city
      });
      ctx.body = {
        code: 0,
        top: top.map(item => {
          return {
            name: item.name,
            type: item.type
          }
        }),
        type: top.length ? top[0].type : ''
      }
    } catch (e) {
      console.info(e);
      ctx.body = {
        code: -1,
        top: []
      }
    }

    // let {status, data: {
    //   top
    // }} = await axios.get(`http://cp-tools.cn/search/top`, {
    //   params: {
    //     input: ctx.query.input,
    //     city: ctx.query.city,
    //     sign
    //   }
    // });
    // ctx.body = {
    //   top: status === 200 ? top : []
    // }

  }

  public static async hotPlace (ctx: BaseContext) {

    let city = ctx.store ? ctx.store.position.city : ctx.query.city;
    try {
      let result = await Poi.find({
        city,
        type: ctx.query.type || '景点'
      }).limit(10);

      ctx.body = {
        code: 0,
        result: result.map(item => {
          return {
            name: item.name,
            type: item.type
          }
        })
      }
    } catch (e) {
      ctx.body = {
        code: -1,
        result: []
      }
    }

    // let city = ctx.store ? ctx.store.geo.position.city : ctx.query.city;
    // let {status, data: {
    //   result
    // }} = await axios.get(`http://cp-tools.cn/search/hotPlace`, {
    //   params: {
    //     sign,
    //     city
    //   }
    // });
    // ctx.body = {
    //   result: status === 200 ? result : []
    // }

  }

  public static async resultsByKeywords (ctx: BaseContext) {

    const {city, keyword} = ctx.query;
    let {
      status,
      data: {
        count,
        pois
      }
    } = await axios.get('http://cp-tools.cn/search/resultsByKeywords', {
      params: {
        city,
        keyword,
        sign
      }
    });
    ctx.body = {
      count: status === 200 ? count : 0,
      pois: status === 200 ? pois : []
    }

  }

  public static async getProducts (ctx: BaseContext) {

    let keyword = ctx.query.keyword || '旅游';
    let city = ctx.query.city || '北京';
    let {
      status,
      data: {
        product,
        more
      }
    } = await axios.get('http://cp-tools.cn/search/products', {
      params: {
        keyword,
        city,
        sign
      }
    });
    if (status === 200) {
      ctx.body = {
        product,
        more: ctx.isAuthenticated() ? more: [],
        login: ctx.isAuthenticated()
      }
    }else{
      ctx.body = {
        product: {},
        more: ctx.isAuthenticated() ? more: [],
        login: ctx.isAuthenticated()
      }
    }

  }

}
