<template>
  <el-container class="layout-default">
    <el-header height="197px">
      <my-header />
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
    <el-footer height="100%">
      <my-footer />
    </el-footer>
  </el-container>
</template>

<script lang="ts">

  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    components: {
      'my-header': ()=> import('~/components/public/header/index'),
      'my-footer': ()=> import('~/components/public/footer/index')
    }
  })
  export default class layout extends Vue {}

</script>
