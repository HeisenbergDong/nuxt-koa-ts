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
    let lotteries = await Lottery.find({ s }).limit(5);
    if(lotteries.length === 0){
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
  }

  public static async getHistory (ctx: BaseContext) {
    let { page } = ctx.query;
    try {
      let total = await Lottery.find().count();
      let lotteries = await Lottery.find().skip(page * 12)
        .limit(12)
        .sort({'s':-1});
      ctx.body = {
        code: 0,
        total,
        lotteries
      }
    }catch (e) {
      ctx.body = {
        code: -1,
        total:0,
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
        lottery: {}
      }
    }
  }


  public static async initAll (ctx: BaseContext) {

    let date:Date = new Date();
    let year = date.getFullYear();
    let month = (date.getMonth() + 1) >=10? (date.getMonth() + 1) : "0" + (date.getMonth() + 1);
    let day = date.getDate() >=10 ? date.getDate() : "0" + date.getDate();
    let minutes = 4 - date.getMinutes()%5;
    let seconds:number = 59 - date.getSeconds();
    let second = seconds < 10 ? '0' + seconds : '' + seconds;
    let s:string = year.toString() + month.toString() + day.toString();
    let t = minutes + ':' + second;
    let initValue = {
      s:s + '10000',
      minutes,
      seconds,
      t
    };

    let lotteries = await Lottery.find().sort({'s':-1}).limit(1);
    if(lotteries.length !== 0){
      initValue = {
        s: lotteries[0].s,
        minutes,
        seconds,
        t
      }
    }

    ctx.body = {
      code: 0,
      initValue
    }
  }
}
