import { BaseContext } from 'koa';
import { Lottery } from '../entity/lottery';

export default class LotteryController {

  public static async generate (ctx: BaseContext) {

    let { sequence } = ctx.request.body;
    let day:Date = new Date();
    let year = day.getFullYear();
    let month = (day.getMonth() + 1) >=10? (day.getMonth() + 1) : "0" + (day.getMonth() + 1);
    let date = day.getDate() >=10 ? day.getDate() : "0" + day.getDate();
    let hours = day.getHours() >=10 ? day.getHours() : "0" + day.getHours();
    let minutes = day.getMinutes() >=10 ? day.getMinutes() : "0" + day.getMinutes();
    let seconds = day.getSeconds() >=10 ? day.getSeconds() : "0" + day.getSeconds();
    let currentDate = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;
    let d = currentDate.toString();
    let s = year.toString() + month.toString() + date.toString() + sequence.toString();
    let n1 = Math.floor(Math.random()*10);
    let n2 = Math.floor(Math.random()*10);
    let n3 = Math.floor(Math.random()*10);
    let n4 = Math.floor(Math.random()*10);
    let n5 = Math.floor(Math.random()*10);

    let lottery = new Lottery({
      d,
      s,
      n1,
      n2,
      n3,
      n4,
      n5
    });
    try {
      let result = await lottery.save();
      if (result) {
        ctx.body = {
          code: 0,
          result:result
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

  public static async getHistory (ctx: BaseContext) {
    let { page } = ctx.query;
    try {
      let lotteries = await Lottery.find().skip(page * 12)
        .limit(12)
        .sort({'s':-1});
      ctx.body = {
        code: 0,
        lotteries
      }
    }catch (e) {
      ctx.body = {
        code: -1,
        lotteries: []
      }
    }
  }

  public static async getCurrent (ctx: BaseContext) {
    let { sequence } = ctx.query;
    let day:Date = new Date();
    let year:number = day.getFullYear();
    let month = (day.getMonth() + 1) >=10? (day.getMonth() + 1) : "0" + (day.getMonth() + 1);
    let date = day.getDate() >=10 ? day.getDate() : "0" + day.getDate();
    let s = year.toString() + month.toString() + date.toString() + sequence;
    try {
      let lottery = await Lottery.findOne({ s });
      ctx.body = {
        code: 0,
        lottery
      }
    }catch (e) {
      ctx.body = {
        code: -1,
        result: {}
      }
    }
  }

  public static async initAll (ctx: BaseContext) {
    let date:Date = new Date();
    let minutes = (date.getMinutes()%5 === 5&&date.getSeconds()===0) ? 5:4 - date.getMinutes()%5;
    let seconds = 60 - date.getSeconds();
    ctx.body = {
      code: 0,
      initValue: {
        minutes,
        seconds
      }
    }
  }
}
