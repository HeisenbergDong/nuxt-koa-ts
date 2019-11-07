<template>
  <div class="container">
    <!-- 开奖头部信息 -->
    <div class="top">
      <div>
        <img src="~/assets/img/1.jpeg" />
        <span>Viet Nam Has Noi nam phut xo so.</span>
      </div>
      <ul>
        <li>Giai doan tiep theo</li>
        <li class="date">So<span>{{ s }}</span> doan </li>
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
      <span>Mo giai thuong ky luc</span>
      <span>THem lich su.</span>
    </div>
    <div class="table">
      <div class="th">
        <div>thoi gian.</div>
        <div>soky.</div>
        <div>mo giai thuong so</div>
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
<!--      <el-pagination-->
<!--              prev-text="上一页"-->
<!--              next-text="下一页"-->
<!--              background-->
<!--              :current-page="curObj.pageNo"-->
<!--              :page-sizes="[15, 100, 200, 300, 400]"-->
<!--              :page-size="curObj.pageSize"-->
<!--              layout="prev, pager, next,sizes, jumper"-->
<!--              :total="profitTotalCount"-->
<!--              @size-change="handleProfitSizeChange"-->
<!--              @current-change="handleCurrentProfitChange"-->
<!--      ></el-pagination>-->
      <el-pagination background layout="prev, pager, next" :total="total" @current-page="getHistory"></el-pagination>
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
    total: number
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

    /*初始化界面*/
    async init(){
      const {status,data:{initValue}} = await this.$axios.get('/lottery/init',{
        params:{}
      });
      if(status == 200){
        this.t = initValue.t;
        if(this.t == '0:00'){
          this.getCurrent();
          this.getHistory(1);
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

    /*获取往期信息*/
    async getHistory(page: number){
      console.log(this.s);
      let {status,data:{total,lotteries}} = await this.$axios.get('/lottery/history',{
        params:{
          page: page - 1
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
  }

</script>

<style>
ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}
.container {
  width: 1200px;
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
.top > div {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.top > div > img {
  width: 150px;
  height: 75px;
  margin-right: 10px;
}
.top > ul > li {
  width: 160px;
}
.top > ul > li.date > span {
  color: #d83c3c;
}
.top > ul > li.countdown {
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
.top > ul > li.result {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4px;
}
.top > ul > li.result > span {
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
.th > div {
  flex: 1;
  text-align: center;
  height: 40px;
  line-height: 40px;
  border-right: 1px solid #dcdcdc;
}
.th > div:last-child {
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
.tr > div {
  flex: 1;
  text-align: center;
  height: 40px;
  line-height: 40px;
  border-right: 1px solid #dcdcdc;
}
.tr > div:last-child {
  border-right: none;
}
.tr > div.prev-result {
  display: flex;
  justify-content: center;
  align-items: center;
}
.tr > div.prev-result > span {
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
  border-radius: 10px 10px 0 0 ;
}
.title > span:last-child {
  padding: 4px 10px;
  background: blue;
  border-radius: 10px;
  cursor: pointer;
}
</style>
