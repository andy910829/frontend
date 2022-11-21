<template>
  <el-container>
    <el-aside class="function-list">
      <div class="title">功能列表</div>
      <button class="function-bt" @click="status = 'groups_rating'">
        小組評分
      </button>
      <button class="function-bt" @click="status = 'competition_apply'">
        專題競賽申請
      </button>
      <button class="function-bt" @click="status = 'interm_report'">
        期中報告
      </button>
      <button class="function-bt" @click="status = 'allGroups'">
        歷年專題小組
      </button>
    </el-aside>
    <el-main class="main-display">
      <div v-if="status === ''">
        <div class="small-title">小組資訊</div>
        <div v-for="GroupInfo in GroupList" :key="GroupInfo.group_id">
          <div class="card" @click="changeStatus(GroupInfo)">
            小組ID:{{ GroupInfo.group_id }}<br />
            小組組長:{{ GroupInfo.leader.student_id + " "
            }}{{ GroupInfo.leader.name }}
            <div v-for="member in GroupInfo.member">
              小組組員:{{ member.student_id + " " }}{{ member.name }}
            </div>
          </div>
          <br />
        </div>
      </div>
      <groups_rating v-if="status === 'groups_rating'" :groupinfo="GroupList"/>
      <interm_report v-else-if="status === 'interm_report'" />
      <competition_apply v-else-if="status === 'competition_apply'" />
      <allGroups  v-else-if="status === 'allGroups'"/>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";
import groups_rating from "./groups_rating.vue";
import interm_report from "./interm_report.vue";
import allGroups from "./allGroup.vue"
import competition_apply from "./competition_apply.vue";
export default {
  data() {
    return {
      status: "",
      GroupList: [],
    };
  },
  methods: {
    GetGroupInfo() {
      const vm = this;
      const path = import.meta.env.VITE_API + "GetGroupInfo_Pro";
      axios
        .post(path, { pro_name: sessionStorage.getItem("name") })
        .then((response) => {
          vm.GroupList = response.data.res;
        });
    },
  },
  components: {
    groups_rating,
    competition_apply,
    interm_report,
    allGroups
  },
  created() {
    this.GetGroupInfo();
  },
};
</script>

<style scoped>
.title {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 10%;
  font-size: 35px;
  font-weight: 800;
  background: rgba(255, 255, 255, 1);
}
.small-title{
  font-size: 30px;
  font-weight: 500;
}
.function-bt {
  position: relative;
  margin-bottom: 10px;
  top: 100px;
  width: 100%;
  font-size: large;
}
.main-display {
  position: absolute;
  top: 10%;
  left: 20%;
  width: 80%;
  height: 90%;
  background: rgba(255, 255, 255, 0.7);
}
.card {
  position: relative;
  margin-top: 30px;
  margin-left: 280px;
  width: 500px;
  background-color: aliceblue;
}
.function-list {
  position: absolute;
  width: 20%;
  height: 90%;
  top: 10%;
  background: rgba(255, 255, 255, 0.5);
}
</style>
