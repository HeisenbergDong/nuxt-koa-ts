import { BaseContext } from 'koa';
import axios from '../config/axios';
import { User } from "../entity/user";
import redisConfig from '../config/redis';
import Passport from '../config/passport';
import Email from '../config/email';
import nodeMailer from 'nodemailer';

export default class OrderController {

  public static async signUp (ctx: BaseContext) {

    const {username, password, email, code} = ctx.request.body;

    if (code) {
      const saveCode = await redisConfig.hget(`nodemail:${username}`, 'code');
      const saveExpire = await redisConfig.hget(`nodemail:${username}`, 'expire');
      if (code === saveCode) {
        if (new Date().getTime() - Number(saveExpire) > 0) {
          ctx.body = {
            code: -1,
            msg: '验证码已过期，请重新尝试'
          };
          return false
        }
      } else {
        ctx.body = {
          code: -1,
          msg: '请填写正确的验证码'
        }
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '请填写验证码'
      }
    }
    let user = await User.find({username})
    if (user.length) {
      ctx.body = {
        code: -1,
        msg: '已被注册'
      };
      return
    }
    let nuser = await User.create({username, password, email})
    if (nuser) {
      let res = await axios.post('/users/signin', {username, password})
      if (res.data && res.data.code === 0) {
        ctx.body = {
          code: 0,
          msg: '注册成功',
          user: res.data.user
        }
      } else {
        ctx.body = {
          code: -1,
          msg: 'error'
        }
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '注册失败'
      }
    }

  }

  public static async signIn (ctx:any, next:any) {

    return Passport.authenticate('local', function(err, user, info, status) {
      if (err) {
        ctx.body = {
          code: -1,
          msg: err
        }
      } else {
        if (user) {
          ctx.body = {
            code: 0,
            msg: '登录成功',
            user
          }
          return ctx.login(user)
        } else {
          ctx.body = {
            code: 1,
            msg: info
          }
        }
      }
    })(ctx, next)

  }

  public static async verify (ctx: BaseContext) {
    let username = ctx.request.body.username;
    const saveExpire = await redisConfig.hget(`nodemail:${username}`, 'expire');
    if (saveExpire && new Date().getTime() - Number(saveExpire) < 0) {
      ctx.body = {
        code: -1,
        msg: '验证请求过于频繁，1分钟内1次'
      }
      return false
    }
    let transporter = nodeMailer.createTransport({
      service: 'qq',
      auth: {
        user: Email.smtp.user,
        pass: Email.smtp.pass
      }
    })
    let ko = {
      code: Email.smtp.code(),
      expire: Email.smtp.expire(),
      email: ctx.request.body.email,
      user: ctx.request.body.username
    }
    let mailOptions = {
      from: `"认证邮件" <${Email.smtp.user}>`,
      to: ko.email,
      subject: '《慕课网高仿美团网全栈实战》注册码',
      html: `您在《慕课网高仿美团网全栈实战》课程中注册，您的邀请码是${ko.code}`
    }
    await transporter.sendMail(mailOptions, (error: any, info: any) => {
      if (error) {
        return console.log(error)
      } else {
        redisConfig.hmset(`nodemail:${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email)
      }
    })
    ctx.body = {
      code: 0,
      msg: '验证码已发送，可能会有延时，有效期1分钟'
    }
  }

  public static async logOut (ctx: BaseContext) {
    await ctx.logout();
    if (!ctx.isAuthenticated()) {
      ctx.body = {
        code: 0
      }
    } else {
      ctx.body = {
        code: -1
      }
    }
  }

  public static async getUser (ctx: BaseContext) {
    if (ctx.isAuthenticated()) {
      const {username, email} = ctx.session.passport.user
      ctx.body={
        user:username,
        email
      }
    }else{
      ctx.body={
        user:'',
        email:''
      }
    }
  }

}
