<template>
  <el-container>
      <el-aside class="function-list">
          <div class="title">功能列表</div>
          <button class="function-bt" @click="status = 'group_info'">小組資訊</button>
          <button class="function-bt" @click="status ='competition_apply'">專題競賽申請</button>
          <button class="function-bt" @click="status = 'interm_report'">期中報告</button>
      </el-aside>
      <el-main class="main-display">
        <group_info v-if="status === 'group_info'"/>
        <interm_report v-if="status === 'interm_report'"/>
        <competition_apply v-if="status === 'competition_apply'"/>
      </el-main>
  </el-container>
</template>

<script>
import group_info from './group_info.vue'
import interm_report from './interm_report.vue'
import competition_apply from './competition_apply.vue'
export default {
data(){
  return{
      status:""
  }
},
components:{
  group_info,
  competition_apply,
  interm_report
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