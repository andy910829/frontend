<template>
  <el-container>
    <el-aside class="function-list">
      <div class="title"><div class="title-word">功能列表</div></div>
      <button class="function-bt" @click="status = 'interm_report'">
        上學期評分
      </button>
      <button class="function-bt" @click="status = 'competition_apply'">
        專題競賽申請
      </button>
      <button class="function-bt" @click="status = 'groups_rating'">
        下學期評分
      </button>
      <button class="function-bt" @click="status = 'allGroups'">
        歷年專題小組
      </button>
    </el-aside>
    <el-main class="main-display">
      <div v-if="status === ''">
        <div class="bt-area">
          <div class="mb-word">功能列表</div>
          <button class="mobile-bt" @click="status = 'interm_report'">
            上學期評分
          </button>
          <button class="mobile-bt" @click="status = 'competition_apply'">
            專題競賽申請
          </button>
          <button class="mobile-bt" @click="status = 'groups_rating'">
            下學期評分
          </button>
          <button class="mobile-bt" @click="status = 'allGroups'">
            歷年專題小組
          </button>
        </div>
        <div class="small-title">小組資訊</div>
        <div v-for="GroupInfo in GroupList" :key="GroupInfo.group_id">
          <div class="card" @click="changeStatus(GroupInfo)">
            小組ID:{{ GroupInfo.group_id }}<br />
            組長:{{ GroupInfo.leader.student_id + " "
            }}{{ GroupInfo.leader.name }}
            <div v-for="member in GroupInfo.member">
              組員:{{ member.student_id + " " }}{{ member.name }}
            </div>
          </div>
          <br />
        </div>
      </div>
      <groups_rating v-if="status === 'groups_rating'" :groupinfo="GroupList" @backToLastPage="status = ''"/>
      <interm_report v-else-if="status === 'interm_report'" @backToLastPage="status = ''"/>
      <competition_apply v-else-if="status === 'competition_apply'" @backToLastPage="status = ''"/>
      <allGroups v-else-if="status === 'allGroups'" @backToLastPage="status = ''"/>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";
import groups_rating from "./groups_rating.vue";
import interm_report from "./interm_report.vue";
import allGroups from "./allGroup.vue";
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
        .post(path, { pro_name: sessionStorage.getItem("name"),token:sessionStorage.getItem("token"),act:sessionStorage.getItem("user_account")})
        .then((response) => {
          vm.GroupList = response.data.res;
        });
    },
  },
  components: {
    groups_rating,
    competition_apply,
    interm_report,
    allGroups,
  },
  created() {
    this.GetGroupInfo();
  },
};
</script>

<style scoped>
@media screen {
  .bt-area{
    display: none;
  }
  .title {
    position: relative;
    width: 100%;
    height: 10%;
    background: rgba(255, 255, 255, 1);
  }
  .title-word {
    position: relative;
    top: 20%;
    font-size: 30px;
    font-weight: 500;
  }
  .small-title {
    font-size: 30px;
    font-weight: 500;
  }
  .main-display {
    position: absolute;
    top: 10%;
    left: 20%;
    width: 80%;
    height: 90%;
    background: rgba(255, 255, 255, 0.7);
  }
  .function-bt {
    position: relative;
    margin-bottom: 10px;
    top: 5%;
    width: 100%;
    font-size: large;
  }
  .card {
    position: relative;
    margin-top: 5%;
    border-radius: 20px;
    left: 25%;
    width: 45%;
    background-color: aliceblue;
    font-size: medium;
    font-weight: 500;
  }
  .function-list {
    position: absolute;
    width: 20%;
    height: 90%;
    top: 10%;
    background: rgba(255, 255, 255, 0.5);
  }
}
@media screen and (max-width: 480px) {
  .card{
    position: relative;
    width:55%;
    left:15%;
  }
  .mb-word{
    font-size: 30px;
    font-weight: 500;
    color: black;
  }
  .small-title{
    position: relative;
    margin-top:10%;
  }
  .function-list {
    display: none;
  }
  .main-display {
    position: absolute;
    top: 7%;
    left: 0%;
    height: 93%;
    width: 100%;
    padding-bottom: 0%;
  }
  .mobile-bt {
    position: relative;
    margin-top: 5%;
    margin-left: 5%;
    height:50%;
    background-color:aliceblue;
    color: black;
  }
  .bt-area {
    display: block;
    position: relative;
    width: 100%;
    height: 50%;
  }
}
</style>
