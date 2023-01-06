<template>
  <el-container>
      <el-aside class="function-list">
          <div class="title">功能列表</div>
          <button class="function-bt" @click="status ='set_acedemic_year'">新增學年度</button>
          <button class="function-bt" @click="status ='set_account'">新增/刪除帳號</button>
      </el-aside>
      <el-main class="main-display">
        <set_acedemic_year v-if="status === 'set_acedemic_year'"/>
        <set_account v-if="status === 'set_account'"/>
      </el-main>
  </el-container>
</template>

<script>
import set_acedemic_year from "../admin_components/set_acedemic_year.vue"
import set_account from "../admin_components/set_account.vue"

export default {
data(){
  return{
      status:""
  }
},
components:{
  set_acedemic_year,
  set_account
}
}
</script>

<style scoped>
.title {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width:100%;
  height:10%;
  font-size: 35px;
  font-weight: 800;
  background: rgba(255, 255, 255, 1);
}

.function-bt {
  position: relative;
  margin-bottom: 10px;
  top: 100px;
  width: 100%;
  font-size: large;
}
.main-display{
  position: absolute;
  top:10%;
  left:20%;
  width:80%;
  height:90%;
  background:  rgba(255, 255, 255, 0.7);
}
.function-list {
  position: absolute;
  width:20%;
  height: 90%;
  top: 10%;
  background: rgba(255, 255, 255, 0.5);
}
</style>