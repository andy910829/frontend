<template>
  <el-container>
    <el-header class="title">申請加入名單</el-header>
    <button class="lastpage-bt" @click="backToLastPage">上一頁</button>
    <el-main>
      <li v-for="apply in apply_list" class="apply-list">
        學號:{{ apply.id }} 姓名:{{ apply.name }}
        <el-button
          type="success"
          @click="(ans = 'accept'), ans_apply(apply)"
          class="btn"
          >允許</el-button
        >
        <el-button
          type="danger"
          @click="(ans = 'reject'), ans_apply(apply)"
          class="btn"
          >拒絕</el-button
        >
      </li>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      apply_list: [],
      asn: "",
    };
  },
  methods: {
    backToLastPage() {
      this.$emit("backToLastPage");
    },
    get_apply() {
      const path = import.meta.env.VITE_API + "find_apply";
      axios
        .post(path, {
          act: sessionStorage.getItem('user_account'),
          group_id: sessionStorage.getItem("group_id"),
          type: "get_apply",
          token:sessionStorage.getItem("token")
        })
        .then((response) => {
          this.apply_list = response.data.res;
        });
    },
    ans_apply(apply) {
      const path = import.meta.env.VITE_API + "find_apply";
      axios
        .post(path, {
          act : sessionStorage.getItem("user_account"),
          group_id: sessionStorage.getItem("group_id"),
          type: this.ans,
          student_id: apply,
          token:sessionStorage.getItem("token")
        })
        .then((response) => {
          if (response.data.res === true) {
            let position = this.apply_list.indexOf(apply);
            this.apply_list.splice(position, 1);
            this.$message.success("已接受申請");
          } else if (response.data.res === "false") {
            let position = this.apply_list.indexOf(apply);
            this.apply_list.splice(position, 1);
            this.$message.warning("已拒絕申請");
          }
        });
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
    this.get_apply();
  },
};
</script>

<style lang="scss" scoped>
@media screen {
  .lastpage-bt {
    display: none;
  }
  .apply-list {
    margin-bottom: 10px;
  }

  .title {
    font-size: 35px;
    font-weight: 900;
  }
}
@media screen and (max-width: 480px) {
  .title{
    color: black;
    font-size: 30px;
    font-weight: 500;
  }
  .apply-list {
    position: relative;
    text-align: left;
    padding: 0px;
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
  .btn {
    position: relative;
    width: 13%;
  }
}
</style>
