<template>
  <h2 style="color: black">小組資訊</h2>
  <button class="lastpage-bt" @click="backToLastPage">上一頁</button>
  <select v-if="status === ''" class="menu" v-model="acedemicYear" @change="getAllGroups">
      <option :value="''">全部顯示</option>
      <option v-for="key in acedemicYearList" :value="key">
        {{ key }}
      </option>
    </select>
  <div v-if="status === ''" class="scrollbar-space">
      <el-scrollbar class="scrollbar">
        <div v-for="GroupInfo in groupList" :key="GroupInfo.group_id">
          <button class="card" @click="changeStatus(GroupInfo)">
            學年度:{{ GroupInfo.acedemic_year }}<br />
            小組ID:{{ GroupInfo.group_id }}<br />
            組長:{{ GroupInfo.leader.student_id + " "
            }}{{ GroupInfo.leader.name }}
            <div v-for="member in GroupInfo.member">
              組員:{{ member.student_id + " " }}{{ member.name }}<br />
            </div>
          </button>
          <br />
        </div>
      </el-scrollbar>
  </div>
  <group_detail
    v-if="status === 'group_detail'"
    :groupInfo="group"
    @backToAllGroupPage="status = ''"
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
    backToLastPage() {
      this.$emit("backToLastPage");
    },
    getAllGroups() {
      const path = import.meta.env.VITE_API + "get_all_group";
      axios
        .post(path, {
          pro_name: sessionStorage.getItem("name"),
          acedemic_year: this.acedemicYear,
          token: sessionStorage.getItem("token"),
          act: sessionStorage.getItem("user_account"),
        })
        .then((response) => {
          this.groupList = response.data.res;
          this.acedemicYearList = [];
          for (const key in response.data.acedemic_year) {
            this.acedemicYearList.push(key);
          }
        });
    },
    changeStatus(groupInfo) {
      this.status = "group_detail";
      this.group = groupInfo;
    },
  },
  mounted() {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.backToLastPage, false);
    }
  },
  destroyed() {
    window.removeEventListener("popstate", this.backToLastPage, false);
  },
  created() {
    this.getAllGroups();
  },
};
</script>

<style lang="scss" scoped>
@media screen {
  .scrollbar-space{
    position: relative;
    height:85%;
  }
  .scrollbar {
    display: block;
    height: 100%;
  }
  .lastpage-bt {
    display: none;
  }
  .menu {
    position: absolute;
    right: 5%;
    top: 2%;
    height: 5%;
    width: 5%;
  }
  .card {
    position: relative;
    margin-top: 3%;
    margin-left: 0px;
    width: 500px;
    background-color: aliceblue;
  }
}
@media screen and (max-width: 480px) {
  .scrollbar {
    display: block;
    height: 100%;
  }
  .menu {
    position: absolute;
    width: 50px;
    height: 25px;
    right: 7%;
  }
  .card {
    position: relative;
    margin-top: 5%;
    left: 0px;
    width: 95%;
    background-color: aliceblue;
  }
  .lastpage-bt {
    display: block;
    position: absolute;
    font-size: 10px;
    top: 2.5%;
    left: 0%;
    width: 15%;
    height: 7%;
    background-color: aliceblue;
    color: black;
  }
}
</style>
