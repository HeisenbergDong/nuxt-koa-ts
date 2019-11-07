import { MutationTree, ActionTree } from "vuex";

interface RootState {
  position: {},
  menu: Array<string>,
  hotPlace: Array<string>
}

export const state = (): RootState => ({
  position: {},
  menu: [],
  hotPlace: []
});

export const mutations: MutationTree<any> = {
  // setPosition(state, position: object): void {
  //   state.position = position;
  // },
  // setMenu(state, menu: Array<string>): void{
  //   state.menu = menu;
  // },
  // setHotPlace(state, hotPlace: object): void {
  //   state.hotPlace = hotPlace;
  // }
};

export const actions: ActionTree<RootState, RootState> = {

    nuxtServerInit({ commit }, context) {
      // const { status: positionStatus, data: { province, city } } = await context.app.$axios.get('/geo/getPosition');
      // commit('setPosition', positionStatus===200?{city,province}:{city:'',province:''});
      // const {status:menuStatus, data:{ menu }} = await context.app.$axios.get('geo/getMenu');
      // commit('setMenu',menuStatus===200?menu:[]);
      // const {status:hotPlaceStatus,data:{result}}=await context.app.$axios.get('/search/hotPlace',{
      //   params:{
      //     city: context.app.store.state.position.city.replace('市','')
      //   }
      // });
      // commit('setHotPlace',hotPlaceStatus===200?result:[]);
      context.app.$axios.get('/lottery/schedule');
    }

};
