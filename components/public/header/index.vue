<template>
    <div class="m-header">
        <el-row>
            <el-col>
                <top-bar/>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <search-bar/>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">

    import { Component, Vue } from 'vue-property-decorator';
    import TopBar from './topbar';
    import SearchBar from './searchbar';

    @Component({
        components:{
            TopBar,
            SearchBar
        }
    })
    export default class MyHeader extends Vue {}
</script>

<style lang="scss">
    @import '@/assets/css/public/header/index.scss';
</style>
