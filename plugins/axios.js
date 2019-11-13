/**
 * @description axios plugins
 *
 * */

export default  ({$axios, redirect, req, store })=>{
  if (process.client) {
    $axios.defaults.baseURL = `http://` + store.state.host;
  }else{
    $axios.defaults.baseURL = `http://` + req.headers.host;
    store.commit('setHost',req.headers.host)
  }
}
