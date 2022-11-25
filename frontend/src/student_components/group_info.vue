<template>
  <div class="title">小組資訊</div>
  <div class="card">
    <div>小組ID:{{ group_info.group_id }}</div>
    <div>小組組長:{{ group_info.leader.student_id+" " }}{{ group_info.leader.name }}</div>
    <div v-for="member in group_info.member">
      小組組員:{{ member.student_id + " " }}{{ member.name }}
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      group_info: {},
      count: 0,
    };
  },
  methods: {
    get_group_info() {
      const path = import.meta.env.VITE_API + "group_info";
      axios
        .get(path, { params: { group_id: sessionStorage.getItem("group_id") } })
        .then((response) => {
          this.group_info = response.data.group_info;
          console.log(this.group_info);
          this.count = response.data.group_info.member.length;
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
  .card {
    position: relative;
    margin-top: 5%;
    border-radius: 20px;
    left: 27.5%;
    width: 40%;
    background-color: aliceblue;
    font-size: medium;
    font-weight: 500;
  }
  .title {
    font-size: 35px;
    font-weight: 900;
  }

  .display-groupinfo {
    display: flex;
    position: relative;
    top: 30px;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    font-size: large;
    font-weight: 500;
    height: 50px;
    width: 50%;
    left: 25%;
    background-color: aliceblue;
  }
}
@media screen and (max-width: 480px) {
  .title {
    font-size: 35px;
    font-weight: 500;
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
}
</style>
