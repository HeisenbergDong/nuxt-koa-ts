export default {
  smtp:{
    get host(){
      return 'smtp.qq.com'
    },
    get user(){
      return '**@qq.com'
    },
    get pass(){
      return ''
    },
    get code(){
      return ()=>{
        return Math.random().toString(16).slice(2,6).toUpperCase()
      }
    },
    get expire(){
      return ()=>{
        return new Date().getTime()+60*60*1000
      }
    }
  }
}
