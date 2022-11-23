<template>
  <div class="small-title">小組資訊</div>
  <div v-if="status === ''">
    <select class="menu" v-model="acedemicYear" @change="getAllGroups">
      <option :value="''">
        全部顯示
      </option>
      <option v-for="key in acedemicYearList" :value="key">
        {{ key }}
      </option>
    </select>
    <div v-for="GroupInfo in groupList" :key="GroupInfo.group_id">
        <button class="card" @click="changeStatus(GroupInfo)">
        小組ID:{{ GroupInfo.group_id }}<br />
        組長:{{ GroupInfo.leader.student_id + " "
        }}{{ GroupInfo.leader.name }}
        <div v-for="member in GroupInfo.member">
          組員:{{ member.student_id + " " }}{{ member.name }}<br/>
          學年度:{{GroupInfo.acedemic_year}}
        </div>
      </button>
      <br />
    </div>
  </div>
  <group_detail
    v-if="status === 'group_detail'"
    :groupInfo="group"
    @backToLastPage="status = ''"
  />
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
      acedemicYearList: [],
      acedemicYear: "",
    };
  },
  components: {
    group_detail,
  },
  methods: {
    getAllGroups() {
      const path = import.meta.env.VITE_API + "get_all_group";
      axios
        .post(path, { pro_name: sessionStorage.getItem("name"),acedemic_year:this.acedemicYear })
        .then((response) => {
          this.groupList = response.data.res;
          console.log(this.groupList)
          this.acedemicYearList=[]
          for (const key in response.data.acedemic_year) {
            this.acedemicYearList.push(key);
          }
        });
    },
    changeStatus(groupInfo) {
      this.status = "group_detail";
      this.group = groupInfo;
    }
  },
  created() {
    this.getAllGroups();
  }
};
</script>

<style lang="scss" scoped>
@media screen {
  .menu {
    position: absolute;
    right: 5%;
    top: 2%;
    height: 5%;
    width: 5%;
  }
  .card {
    position: relative;
    margin-top: 30px;
    margin-left: 0px;
    width: 500px;
    background-color: aliceblue;
  }
}
@media screen and (max-width: 480px) {
  .menu {
    position: absolute;
    width: 15%;
    height: 3%;
    right: 2%;
  }
  .card {
    position: relative;
    margin-top: 5%;
    left: 0px;
    width: 90%;
    background-color: aliceblue;
  }
}
</style>
