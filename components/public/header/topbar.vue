<template>
  <el-row :gutter="0" class="m-header">
    <el-col :span="5">
      <geo/>
    </el-col>
    <el-col :span="5">
      <user/>
    </el-col>
    <el-col :span="14">
      <nav-bar/>
    </el-col>
  </el-row>
</template>

<script lang="ts">

  import { Component, Vue } from 'vue-property-decorator';
  import Geo from './geo';
  import User from './user';
  import NavBar from './nav';

  @Component({
    components:{
      Geo,
      User,
      NavBar
    }
  })
  export default class TopBar extends Vue{

  }
</script>

<style lang="scss">
  @import "@/assets/css/public/layout.scss";
  @import "@/assets/css/public/header/index.scss";
</style>
