<template>
  <div class="m-menu">
    <dl class="nav" @mouseleave="mouseLeave">
      <dt>全部分类</dt>
      <dd v-for="(item,idx) in $store.state.menu" :key="idx" @mouseenter="doEnter">
        <i :class="item.type" />{{ item.name }}<span class="arrow" />
      </dd>
    </dl>
    <div v-if="kind" class="detail" @mouseenter="doSover" @mouseleave="doSout">
      <template v-for="(item,idx) in curDetail.child">
        <h4 :key="idx">{{ item.title }}</h4>
        <span v-for="v in item.child" :key="v">{{ v }}</span>
      </template>
    </div>
  </div>
</template>

<script lang="ts">

  import { Component, Vue } from 'vue-property-decorator';

  interface Data {
    _timer: number,
    kind: string,
    menu: Array<Menu>
  }

  interface Menu {
    type: string,
    name: string,
    child: Array<Child>
  }

  interface Child {
    title: string,
    child: Array<string>
  }

  @Component
  export default class Menu extends Vue implements Data {
    _timer: number = 0;
    kind: string = '';
    menu: Array = [{
      type:'food',
      name:'美食',
      child:[{
        title:'美食',
        child:['代金券','甜点饮品','火锅','自助餐','小吃快餐']
      }]
    },{
      type:'takeout',
      name:'外卖',
      child:[{
        title:'外卖',
        child:['美团外卖']
      }]
    },{
      type:'hotel',
      name:'酒店',
      child:[{
        title:'酒店星级',
        child:['经济型','舒适/三星','高档/四星','豪华/五星']
      }]
    }];

    get curDetail(){
      return this.$store.state.menu.filter(item => item.type===this.kind)[0];
    }

    mouseLeave(){
      this._timer = setTimeout(() => {
        this.kind=''
      },150);
    }
    doEnter(e){
      this.kind=e.target.querySelector('i').className;
    }

    doSover(){
      clearTimeout(this._timer);
    }

    doSout(){
      this.kind='';
    }
  }
</script>

<style lang="css">
</style>
