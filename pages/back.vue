<template>
  <div class="container">
    <div class="password">
      <span>
        <i class="hidden">站位</i>密码
      </span>
      <input type="text" class="input-item" v-model="password"/>
    </div>
    <div class="input-box">
      <span>下期号码</span>
      <div>
        <input type="text" maxlength="1" class="input-item" v-model="n1"/>
        <input type="text" maxlength="1" class="input-item" v-model="n2"/>
        <input type="text" maxlength="1" class="input-item" v-model="n3"/>
        <input type="text" maxlength="1" class="input-item" v-model="n4"/>
        <input type="text" maxlength="1" class="input-item" v-model="n5"/>
      </div>
    </div>
    <div class="random-btn" @click="updateLottery">提交</div>
  </div>
</template>

<script lang="ts">

  import { Component, Vue } from 'vue-property-decorator';

  interface Data {
    password: string,
    n1: number,
    n2: number,
    n3: number,
    n4: number,
    n5: number
  }

  @Component
  export default class back extends Vue implements Data{

    password = '';
    n1 = 0;
    n2 = 0;
    n3 = 0;
    n4 = 0;
    n5 = 0;

    async updateLottery(){
      const {status,data:{code}} = await this.$axios.post('/lottery/generate',{
          password: this.password,
          n1: this.n1,
          n2: this.n2,
          n3: this.n3,
          n4: this.n4,
          n5: this.n5
      });
      if(status == 200){
        if(code !== -1){
          alert('成功');
        }else{
          alert('失败');
        }
      }else{
        alert('网络异常');
      }
    }

  }

</script>

<style>
input {
  background: none;
  outline: none;
  border: none;
}
input:disabled {
  color: #000;
}
.container {
  width: 1200px;
  margin: 0 auto;
}
.password {
  width: 100%;
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.password .hidden {
  visibility: hidden;
}
.password > span {
  font-size: 20px;
  margin-right: 10px;
}
.password .input-item {
  width: 580px;
  height: 60px;
  font-size: 32px;
  line-height: 60px;
  text-align: center;
  border: 1px solid #dcdcdc;
  box-shadow: 0 0 10px #c2c2c2;
}
.input-box {
  width: 100%;
  padding-top: 60px;
  margin-bottom: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.input-box > span {
  font-size: 20px;
  margin-right: 10px;
}
.input-box > div {
  width: 578px;
  display: flex;
  justify-content: space-between;
}
.input-box .input-item {
  width: 80px;
  height: 80px;
  font-size: 32px;
  line-height: 80px;
  text-align: center;
  border: 1px solid #dcdcdc;
  box-shadow: 0 0 10px #c2c2c2;
}
.random-btn {
  user-select: none;
  cursor: pointer;
  width: 240px;
  height: 60px;
  box-shadow: 0 0 10px #c2c2c2;
  line-height: 60px;
  margin: 0 auto;
  text-align: center;
  font-size: 20px;
  color: #fff;
  background: #468df1;
}
</style>
