<template>
  <div class="container">
    <!-- 开奖头部信息 -->
    <div class="top">
      <div>
        <img src="~/assets/img/1.jpeg" />
        <span></span>
      </div>
      <ul>
        <li>당기 행운의 숫자</li>
        <li class="date">제  <span>{{ s }}</span>  기간 </li>
        <li class="countdown">{{ t }}</li>
        <li class="result">
          <span>{{ n1 }}</span>
          <span>{{ n2 }}</span>
          <span>{{ n3 }}</span>
          <span>{{ n4 }}</span>
          <span>{{ n5 }}</span>
        </li>
      </ul>
    </div>
    <!-- 往期开奖信息 -->
    <div class="title">
      <span>왕기 행운의 숫자</span>
      <span>행운5.</span>
    </div>
    <div class="table">
      <div class="th">
        <div>개상 시간</div>
        <div>기간</div>
        <div>행운수</div>
      </div>
      <div class="tr" v-for="(lottery,idx) in lotteries" :key="idx">
        <div>{{lottery.d}}</div>
        <div>{{lottery.s}}</div>
        <div class="prev-result">
          <span>{{lottery.n1}}</span>
          <span>{{lottery.n2}}</span>
          <span>{{lottery.n3}}</span>
          <span>{{lottery.n4}}</span>
          <span>{{lottery.n5}}</span>
        </div>
      </div>
    </div>
    <!-- 分页器 -->
    <div class="pagination">
      <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="getHistory"
              :current-page="currentPage"
              :page-sizes="[12, 24, 48, 96]"
              :page-size="pageSize"
              layout="prev, pager, next"
              :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">

  import { Component, Vue } from 'vue-property-decorator';
  interface Data {
    t: string,
    s: string,
    n1: number,
    n2: number,
    n3: number,
    n4: number,
    n5: number,
    lotteries: Array,
    total: number,
    currentPage: number,
    pageSize: number
  }

  @Component
  export default class Gambling extends Vue implements Data{

    t = "";
    s = "";
    n1 = 0;
    n2 = 0;
    n3 = 0;
    n4 = 0;
    n5 = 0;
    lotteries = [];
    total=1;
    currentPage=1;
    pageSize=12;

    /*初始化界面*/
    async init(){
      const {status,data:{initValue}} = await this.$axios.get('/lottery/init',{
        params:{}
      });
      if(status == 200){
        this.t = initValue.t;
        if(this.t == '0:00'){
          this.getCurrent();
          this.getHistory(this.currentPage);
        }
      }else{
        this.t = "";
        this.s = "";
      }
    }

    /*获取当期信息*/
    async getCurrent(){
      const {status,data:{lottery}} = await this.$axios.get('/lottery/current',{
        params:{
        }
      });
      if(status === 200 && lottery != null){
        this.t = lottery.t;
        this.s = lottery.s;
        this.n1 = lottery.n1;
        this.n2 = lottery.n2;
        this.n3 = lottery.n3;
        this.n4 = lottery.n4;
        this.n5 = lottery.n5;
      }else{
        this.n1 = 0;
        this.n2 = 0;
        this.n3 = 0;
        this.n4 = 0;
        this.n5 = 0;
      }
    }

    async handleSizeChange(pageSize:number){
      this.pageSize = pageSize;
    }


    /*获取往期信息*/
    async getHistory(currentPage: number){
      let {status,data:{total,lotteries}} = await this.$axios.get('/lottery/history',{
        params:{
          currentPage: currentPage - 1
        }
      });
      if(status === 200){
        this.lotteries = lotteries;
        this.total = total;
      }else{
        this.lotteries = [];
      }
    }

    /*倒计时*/
    async mounted(){
      this.init();
      this.getCurrent();
      this.getHistory(1);

      setInterval(()=>{
        this.init();
      },1000)
    }

    pageNo: number;
  }

</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  ul,
  li {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  @media screen and (min-width:900px) {
    .container {
      width: 100%;
      margin: 0 auto;
    }

    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 30px;
      background: url("~assets/img/2.jpeg") no-repeat;
      background-size: cover;
      color: #fff;
    }

    .top>div {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    .top>div>img {
      width: 150px;
      height: 75px;
      margin-right: 10px;
    }

    .top>ul>li {
      width: 160px;
    }

    .top>ul>li.date>span {
      color: #d83c3c;
    }

    .top>ul>li.countdown {
      height: 34px;
      line-height: 34px;
      margin-top: 4px;
      background: #fff;
      border: 2px solid #d83c3c;
      color: #000;
      font-size: 24px;
      text-align: center;
      font-weight: bold;
    }

    .top>ul>li.result {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 4px;
    }

    .top>ul>li.result>span {
      width: 20px;
      height: 20px;
      background: #fff;
      border-radius: 50%;
      color: #000;
      text-align: center;
      line-height: 20px;
      font-weight: bold;
      margin: 0 4px;
    }

    .table {
      border: 1px solid #dcdcdc;
    }

    .th {
      display: flex;
      background: #f0f0f0;
      border-bottom: 1px solid #dcdcdc;
    }

    .th>div {
      flex: 1;
      text-align: center;
      height: 40px;
      line-height: 40px;
      border-right: 1px solid #dcdcdc;
    }

    .th>div:last-child {
      border-right: none;
    }

    .tr {
      display: flex;
      background: #fff;
      border-bottom: 1px solid #dcdcdc;
    }

    .tr:nth-of-type(2n + 1) {
      background: #f0f0f0;
    }

    .tr:last-child {
      border-bottom: none;
    }

    .tr>div {
      flex: 1;
      text-align: center;
      height: 40px;
      line-height: 40px;
      border-right: 1px solid #dcdcdc;
    }

    .tr>div:last-child {
      border-right: none;
    }

    .tr>div.prev-result {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .tr>div.prev-result>span {
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      border-radius: 50%;
      background: #fff;
      border: 1px solid #468df1;
      color: #000;
      font-weight: bold;
      margin: 0 4px;
    }

    .pagination {
      display: flex;
      margin: 20px 0;
      justify-content: center;
    }

    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      background: #468df1;
      color: #fff;
      padding: 0 10px;
      margin-top: 20px;
      border-radius: 10px 10px 0 0;
    }

    .title>span:last-child {
      padding: 4px 10px;
      background: blue;
      border-radius: 10px;
      cursor: pointer;
    }
  }

  @media screen and (max-width: 480px) {
    .el-main {
      padding: 5px;
    }
    .container {
      width: 100%;
    }
    .top {
      display: flex;
      flex-direction: column;
    }
    .top > div {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }
    .top > div > img {
      width: 100%;
      height: 130px;
      margin-bottom: 4px;
    }
    .top > ul {
      margin-top: 4px;
      background: #468df1;
      background-size: cover;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #fff;
      padding: 10px;
    }
    .top > ul > li.countdown {
      width: 120px;
      height: 30px;
      line-height: 30px;
      color: #000;
      font-weight: bold;
      text-align: center;
      margin-bottom: 4px;
    }
    .top > ul > li.result {
      margin-bottom: 4px;
    }
    .top > ul > li.result > span {
      width: 20px;
      height: 20px;
      display: inline-block;
      border: 2px solid #468df1;
      border-radius: 50%;
      color: #000;
      text-align: center;
      line-height: 20px;
    }
    .title {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      background: #468df1;
      font-size: 16px;
      border-radius: 8px 8px 0 0;
      margin-top: 10px;
      height: 30px;
      line-height: 30px;
    }
    .table > .th {
      display: flex;
      flex-direction: row;
      height: 30px;
      line-height: 30px;
      background: #f0f0f0;
    }
    .table > .th > div {
      flex: 1;
      text-align: center;
      font-size: 12px;
    }
    .table > .tr {
      display: flex;
      flex-direction: row;
      min-height: 30px;
      padding: 4px 0;
      background: #fff;
    }
    .table > .tr > div {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-size: 12px;
    }
    .table > .tr:nth-of-type(2n + 1) {
      background: #f0f0f0;
    }
    .pagination {
      display: flex;
      margin: 20px 0;
      justify-content: center;
    }
  }
</style>
