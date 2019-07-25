<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png" alt="美团">
      </el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <el-input v-model="search" placeholder="搜索商家或地点" @focus="doFocus" @blur="doBlur" @input="doInput"/>
          <button class="el-button el-button--primary"><i class="el-icon-search"/></button>
          <dl v-if="IsHotPlace" class="hotPlace">
            <dt>热门搜索</dt>
            <dd v-for="(item,idx) in $store.state.hotPlace.slice(0,5)" :key="idx">
              <a :href="'/products?keyword='+encodeURIComponent(item.name)">{{ item.name }}</a>
            </dd>
          </dl>
          <dl v-if="IsSearchList" class="searchList">
            <dd v-for="(item,idx) in searchList" :key="idx">
              <a :href="'/products?keyword='+encodeURIComponent(item.name)">{{ item.name }}</a>
            </dd>
          </dl>
        </div>
        <p class="suggest">
          <a v-for="(item,idx) in $store.state.hotPlace.slice(0,5)" :key="idx" :href="'/products?keyword='+encodeURIComponent(item.name)">{{ item.name }}</a>
        </p>
        <ul class="nav">
          <li><nuxt-link to="/" class="takeout">美团外卖</nuxt-link></li>
          <li><nuxt-link to="/" class="movie">猫眼电影</nuxt-link></li>
          <li><nuxt-link to="/" class="hotel">美团酒店</nuxt-link></li>
          <li><nuxt-link to="/" class="apartment">民宿/公寓</nuxt-link></li>
          <li><nuxt-link to="/" class="business">商家入驻</nuxt-link></li>
        </ul>
      </el-col>
      <el-col :span="6" class="right">
        <ul class="security">
          <li><i class="refund"/><p class="txt">随时退</p></li>
          <li><i class="single"/><p class="txt">不满意免单</p></li>
          <li><i class="overdue"/><p class="txt">过期退</p></li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">

import _ from 'lodash';
import { Component, Vue } from 'vue-property-decorator';

interface Data {
  search: string,
  isFocus: boolean,
  hotPlace: Array<string>,
  searchList: Array<string>
}

@Component
export default class SearchBar extends Vue implements Data{

  search = '';
  isFocus = false;
  hotPlace = [];
  searchList = [];

  get IsHotPlace(){
    return this.isFocus&&!this.search;
  }

  get IsSearchList(){
    return this.isFocus&&this.search;
  }

  doFocus(){
    this.isFocus=true;
  }

  doBlur(){
    let self=this;
    setTimeout(function(){
      self.isFocus=false;
    },200);
  }

  doInput(){
    _.debounce(async ()=>{
      let self=this;
      let city=self.$store.state.position.city.replace('市','');
      self.searchList=[];
      let {status,data:{top}}=await self.$axios.get('/search/top',{
        params:{
          input:self.search,
          city
        }
      });
      self.searchList=top.slice(0,10);
    },300);
  }
}
</script>

<style lang="css">
</style>
