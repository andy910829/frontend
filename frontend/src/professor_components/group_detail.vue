<template>
  <div>
    <button class="lastpage-bt" @click="backToLastPage">上一頁</button>
    <div class="card">
      <li class="word">小組ID:{{ group.group_id }}</li>
      <li class="word">
        組長:{{ group.leader.student_id + " " }}{{ group.leader.name }}
      </li>
      <li v-for="member in group.member" class="word">
        組員:{{ member.student_id + " " }}{{ member.name }}
      </li>
      <li class="word">
        YouTube連結:<a v-bind:href="group.competition.YT_link" target="_blank"
          >連結點我</a
        >
      </li>
      <li class="word" v-if="group.competition.competition_topics">
        專題競賽題目:{{group.competition.competition_topics}}
      </li>
      <li class="word" v-else>
        專題競賽題目:{{"未上傳題目"}}
      </li>
      <el-button type="primary" @click="get_file(group)" class="download-bt"
        >下載專題競賽報告</el-button
      >
      <el-button
        type="primary"
        @click="preview_file(group)"
        class="download-bt"
      >
        預覽專題競賽報告
      </el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["groupInfo"],
  data() {
    return {
      group: this.groupInfo,
    };
  },
  methods: {
    backToLastPage() {
      this.$emit("backToAllGroupPage");
    },
    preview_file(group) {
      const path = import.meta.env.VITE_API + "get_file";
      axios
        .post(
          path,
          { group_id: group.group_id, type: "competition_report",token:sessionStorage.getItem("token"),act:sessionStorage.getItem('user_account')},
          { responseType: "blob" }
        )
        .then((response) => {
          if (response.data.size != 0) {
            const binarydata = [];
            binarydata.push(response.data);
            let blob = new Blob(binarydata, { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
          } else {
            this.$message.warning("尚未上傳專題競賽報告");
          }
        });
    },
    get_file(group) {
      const path = import.meta.env.VITE_API + "get_file";
      axios
        .post(
          path,
          { group_id: group.group_id, type: "competition_report",token:sessionStorage.getItem("token"),act:sessionStorage.getItem('user_account')},
          { responseType: "blob" }
        )
        .then((response) => {
          let blob = new Blob([response.data], { type: "application/pdf" });
          let reader = new FileReader();
          let file_name =
            sessionStorage.getItem("group_id") + "專題競賽報告.pdf";
          if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, file_name);
          } else {
            reader.readAsDataURL(blob, "ASCII");
            reader.onload = (e) => {
              let a = document.createElement("a");
              a.download = file_name;
              a.href = e.target.result;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            };
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
};
</script>

<style lang="scss" scoped>
@media screen {
  .lastpage-bt {
    display: block;
    position: absolute;
    text-align: center;
    top: 20px;
    right: 30px;
    width: 7%;
    height: 7%;
    font-size: small;
  }
  .word {
    font-size: large;
    font-weight: 500;
    text-align: left;
    margin-left: 25%;
  }
  .card {
    position: relative;
    margin-top: 30px;
    left: 27%;
    width: 40%;
    background-color: aliceblue;
    text-align: left;
  }
  .download-bt {
    position: relative;
    margin-top: 2%;
    margin-left: 16%;
  }
}
@media screen and (max-width: 480px) {
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
  .word {
    font-size: medium;
    font-weight: 500;
    text-align: left;
    margin-left: 15%;
  }
  .card {
    position: relative;
    margin-top: 15%;
    left: 2.5%;
    width: 75%;
    background-color: aliceblue;
    align-items: left;
  }
  .download-bt {
    display: none;
  }
}
</style>
