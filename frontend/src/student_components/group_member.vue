<template>
  <el-container>
    <el-aside class="function-list">
        <div class="title">小組資訊</div>
        <el-scrollbar class="scrollbar">
        <div class="display-groupinfo">小組ID:{{ group_info.group_id }}</div>
        <div class="display-groupinfo">小組組長:{{ leaderName }}</div>
        <li v-for="member in group_info.member" class="display-groupinfo">
          小組組員:{{ member.student_id }}--{{ member.name }}
        </li>
      </el-scrollbar>
    </el-aside>
    <el-main class="main-display">
      <timeline class="time-line" />
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";
import timeline from "../student_components/timeline.vue";

export default {
  data() {
    return {
      group_info: {},
      leaderName: "",
    };
  },
  components: {
    timeline,
  },
  methods: {
    get_group_info() {
      const path = import.meta.env.VITE_API + "group_info";
      axios
        .post(path, {group_id: sessionStorage.getItem("group_id"),act:sessionStorage.getItem("user_account"),token:sessionStorage.getItem('token') })
        .then((response) => {
          this.group_info = response.data.group_info;
          this.leaderName = this.group_info.leader.name;
        });
    },
  },
  created() {
    this.get_group_info();
  },
};
</script>

<style scoped>
@media screen {
    .scrollbar {
    display: block;
    position: relative;
    top:10%;
    height: 65%;
  }
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

  .main-display {
    position: absolute;
    top: 10%;
    left: 20%;
    width: 80%;
    height: 90%;
    background: rgb(255, 255, 255, 0.7);
  }

  .function-list {
    position: absolute;
    width: 20%;
    height: 90%;
    top: 10%;
    background: rgba(255, 255, 255, 1);
  }

  .display-groupinfo {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    margin-top: 15%;
    font-size: large;
    font-weight: 500;
    height: 50px;
    width: 100%;
    background-color: aliceblue;
  }
}
@media screen and (max-width: 480px) {
  .scrollbar {
    display: block;
    position: relative;
    top:20%;
    height: 65%;
  }
  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 10%;
    width: 80%;
    height: 15%;
    font-size: 20px;
    font-weight: 800;
    color: black;
    background: rgba(255, 255, 255, 1);
  }
  .function-list {
    position: absolute;
    width: 100%;
    height: 57%;
    top: 7%;
    background: rgba(255, 255, 255, 0.7);
  }
  .main-display {
    position: absolute;
    top: 64%;
    left: 0%;
    width: 100%;
    height: 36%;
    background: rgb(255, 255, 255, 0.7);
  }
  .display-groupinfo {
    display: flex;
    position: relative;
    top: 15%;
    left: 10%;
    align-items: center;
    justify-content: center;
    margin-top: 5%;
    font-size: large;
    font-weight: 500;
    height: 50px;
    width: 80%;
    color: rgb(0, 0, 0);
    background-color:aliceblue;
  }
  .time-line {
    position: absolute;
    left: 30%;
  }
}
</style>
