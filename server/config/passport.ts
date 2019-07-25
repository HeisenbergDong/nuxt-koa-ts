import passport from 'koa-passport';
import * as passportLocal from 'passport-local';
import { User } from '../entity/user';

const LocalStrategy = passportLocal.Strategy;
passport.use(new LocalStrategy(async function(username: string,password: string,done: any){
  let where = {
    username
  };
  let result = await User.findOne(where);
  if(result!=null){
    if(result.password===password){
      return done(null,result)
    }else{
      return done(null,false,'密码错误');
    }
  }else{
    return done(null,false,'用户不存在');
  }
}));

passport.serializeUser(function(user,done){
  done(null,user);
})

passport.deserializeUser(function(user,done){
  return done(null,user);
})

export default passport
