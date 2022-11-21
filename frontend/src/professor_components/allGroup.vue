<template>
  <div class="small-title">小組資訊</div>
  <div v-if="status === ''">
    <div v-for="GroupInfo in groupList" :key="GroupInfo.group_id">
      <button class="card" @click="changeStatus(GroupInfo)">
        小組ID:{{ GroupInfo.group_id }}<br />
        小組組長:{{ GroupInfo.leader.student_id + " "
        }}{{ GroupInfo.leader.name }}
        <div v-for="member in GroupInfo.member">
          小組組員:{{ member.student_id + " " }}{{ member.name }}
        </div>
      </button>
      <br />
    </div>
  </div>
  <group_detail v-if="status === 'group_detail'" :groupInfo="group" @backToLastPage="status=''"/>
</template>

<script>
import axios from "axios";
import group_detail from "./group_detail.vue";
export default {
  data() {
    return {
      groupList: [],
      status: "",
      group: {},
    };
  },
  components: {
    group_detail,
  },
  methods: {
    getAllGroups() {
      const path = import.meta.env.VITE_API + "get_all_group";
      axios
        .post(path, { pro_name: sessionStorage.getItem("name") })
        .then((response) => {
          this.groupList = response.data.res;
        });
    },
    changeStatus(groupInfo) {
      this.status = "group_detail";
      this.group = groupInfo;
      console.log(this.group)
    },
  },
  created() {
    this.getAllGroups();
  },
};
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  margin-top: 30px;
  margin-left: 0px;
  width: 500px;
  background-color: aliceblue;
}
</style>
