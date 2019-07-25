<template>
    <div class="page-index">
        <el-row>
            <el-col :span="5">
                <emenu/>
            </el-col>
            <el-col :span="19">
                <life/>
            </el-col>
        </el-row>
        <el-row >
            <el-col :span="24">
                <artistic/>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Emenu from '~/components/index/menu.vue';
  import Life from '~/components/index/life.vue';
  import Artistic from '~/components/index/artistic.vue';

  @Component({
    components: {
      Emenu,
      Life,
      Artistic
    }
  })
  export default class Index extends Vue {}
</script>

<style lang="scss">
    @import "@/assets/css/index/index.scss";
</style>
