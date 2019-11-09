import { BaseContext } from 'koa';
import { Lottery } from '../entity/lottery';
import { scheduleJob, Recurrence, RecurrenceRule } from "node-schedule";
import redisConfig from '../config/redis';

export default class LotteryController {

  public static async schedule(){
    redisConfig.hmset(`pass`, 'word', 'HgXy55555');
    let rule:RecurrenceRule = new RecurrenceRule();
    let time:Recurrence[] = [0,5,10,15,20,25,30,35,40,45,50,55];
    rule.minute = time;
    scheduleJob(rule,async ()=>{
      let sequence:number = 10000 + new Date().getHours()*12 + Math.ceil(new Date().getMinutes()/5);
      console.log(sequence);
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
      await lottery.save();
    });
  }

  public static async getHistory (ctx: BaseContext) {
    let { currentPage } = ctx.query;
    let day:Date = new Date();
    let year = day.getFullYear();
    let month = (day.getMonth() + 1) >=10? (day.getMonth() + 1) : "0" + (day.getMonth() + 1);
    let date = day.getDate() >=10 ? day.getDate() : "0" + day.getDate();
    let s = year.toString() + month.toString() + date.toString() + 19999;
    let lotteries = await Lottery.find().sort({'s':-1}).limit(2);
    if(lotteries.length === 2){
      s = lotteries[0].s;
    }
    try {
      let total = await Lottery.find().count();
      let lotteries = await Lottery.find({s:{$ne:s}}).skip(currentPage * 12)
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
    let day:Date = new Date();
    let year = day.getFullYear();
    let month = (day.getMonth() + 1) >=10? (day.getMonth() + 1) : "0" + (day.getMonth() + 1);
    let date = day.getDate() >=10 ? day.getDate() : "0" + day.getDate();
    let hours = day.getHours() >=10 ? day.getHours() : "0" + day.getHours();
    let minutes = day.getMinutes() >=10 ? day.getMinutes() : "0" + day.getMinutes();
    let seconds = day.getSeconds() >=10 ? day.getSeconds() : "0" + day.getSeconds();
    let currentDate = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;
    let d = currentDate.toString();
    let s = year.toString() + month.toString() + date.toString() + 10000;
    let lottery = new Lottery({
      d,
      s,
      n1: 0,
      n2: 0,
      n3: 0,
      n4: 0,
      n5: 0
    });
    try {
      let lotteries = await Lottery.find().sort({'s':-1}).limit(2);
      if(lotteries.length === 1){
        lottery = lotteries[0];
      }else if(lotteries.length === 2){
        lottery = lotteries[1];
      }
      ctx.body = {
        code: 0,
        lottery
      }
    }catch (e) {
      ctx.body = {
        code: -1,
        lottery
      }
    }
  }


  public static async init (ctx: BaseContext) {

    let date:Date = new Date();
    let minutes = 4 - date.getMinutes()%5;
    let seconds:number = 59 - date.getSeconds();
    let second = seconds < 10 ? '0' + seconds : '' + seconds;
    let t = minutes + ':' + second;
    let initValue = {
      t
    };

    let lotteries = await Lottery.find().sort({'s':-1}).limit(1);
    if(lotteries.length !== 0){
      initValue = {
        t
      }
    }

    ctx.body = {
      code: 0,
      initValue
    }
  }

  public static async updateLottery (ctx: BaseContext) {
    let { password,n1,n2,n3,n4,n5 } = ctx.request.body;
    const pw = await redisConfig.hget(`pass`, 'word');
    console.log(pw)
    if(password == pw){
      try {
        let lotteries = await Lottery.find().sort({'s':-1}).limit(1);
        if(lotteries.length === 1){
          let s = lotteries[0].s;
          Lottery.update({s}, {$set : {n1,n2,n3,n4,n5}},function(err:boolean, res:object){
            if (err) {
              console.log("Error:" + err);
            }
            else {
              console.log("Res:" + res);
            }
          })
        }
        ctx.body = {
          code: 0
        }
      }catch (e) {
        ctx.body = {
          code: -1
        }
      }
    }else{
      ctx.body = {
        code: -1
      }
    }
  }
}
