<template>
  <h2>上學期評分</h2>
  <button class="lastpage-bt" @click="backToLastPage">上一頁</button>
  <el-scrollbar class="scrollbar">
    <div v-for="GroupInfo in GroupList" :key="GroupInfo.group_id">
      <div class="card">
        <div class="word">
          小組ID:{{ GroupInfo.group_id }}
          <br />
          組長:{{ GroupInfo.leader.student_id + " " }}{{ GroupInfo.leader.name
          }}<br />
        </div>
        <div v-for="member in GroupInfo.member" class="word">
          組員:{{ member.student_id + " " }}{{ member.name }}
        </div>
        <el-button
          type="primary"
          @click="get_file(GroupInfo)"
          class="download-bt"
          >下載期中報告</el-button
        >
        <el-button
          type="primary"
          @click="preview_file(GroupInfo)"
          class="download-bt"
        >
          預覽期中報告
        </el-button>
        <div class="card-left">
          <div class="card-left-components">
            <div class="left-word-mb">姓名</div>
            <span class="left-word">原始分數 </span>
            <span class="left-word"> 修改分數 </span>
            <div class="name">{{ GroupInfo.leader.name }}</div>
            <div class="left-score">
              {{ GroupInfo.leader.last_score + " "
              }}<input
                class="input-box"
                @input="changeFromInput($event, GroupInfo.leader.name)"
              />
            </div>
            <div v-for="member in GroupInfo.member" class="left-score">
              <span class="member-name">{{ member.name }}</span>
              {{ member.last_score }}
              <input
                class="input-box"
                @input="changeFromInput($event, member.name)"
              />
            </div>
          </div>
          <el-button
            class="submit-bt"
            @click="intermReportScore(GroupInfo.group_id)"
            type="warning"
            >送出</el-button
          >
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      status: "",
      GroupList: [],
      scoreResult: {},
    };
  },
  methods: {
    backToLastPage() {
      this.$emit("backToLastPage");
    },
    changeFromInput(event, name) {
      let res = {
        score_type: "last_score",
        [name]:
          event.target.value.length < 2
            ? "0" + event.target.value
            : event.target.value,
      };
      this.scoreResult = Object.assign(this.scoreResult, res);
    },
    GetGroupInfo() {
      const path = import.meta.env.VITE_API + "GetGroupInfo_Pro";
      axios
        .post(path, { pro_name: sessionStorage.getItem("name"),token:sessionStorage.getItem("token"), act:sessionStorage.getItem("user_account")})
        .then((response) => {
          this.GroupList = response.data.res;
        });
    },
    preview_file(group) {
      const path = import.meta.env.VITE_API + "get_file";
      axios
        .post(
          path,
          { group_id: group.group_id, type: "interm_report",token:sessionStorage.getItem("token"),act:sessionStorage.getItem('user_account')},
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
            this.$message.warning("尚未上傳期中報告");
          }
        });
    },
    get_file(group) {
      const path = import.meta.env.VITE_API + "get_file";
      axios
        .post(
          path,
          { group_id: group.group_id, type: "interm_report",token:sessionStorage.getItem("token"),act:sessionStorage.getItem('user_account')},
          { responseType: "blob" }
        )
        .then((response) => {
          let blob = new Blob([response.data], { type: "application/pdf" });
          let reader = new FileReader();
          let file_name = sessionStorage.getItem("group_id") + "期中報告.pdf";
          console.log(response.data.res)
          if(!response.data.res){
            this.$message.warning('尚未上傳期中報告')
          }
          else if (window.navigator.msSaveOrOpenBlob) {
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
    intermReportScore(groupId) {
      const path = import.meta.env.VITE_API + "set_score";
      axios
        .post(path, {
          pro_name: sessionStorage.getItem("name"),
          res: this.scoreResult,
          group_id: groupId,
          token:sessionStorage.getItem("token")
        })
        .then((response) => {
          if (response.data.res === true) {
            this.$message.success("修改成功");
            this.GetGroupInfo();
            this.scoreResult = {};
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
    this.GetGroupInfo();
  },
};
</script>

<style lang="scss" scoped>
@media screen {
  .lastpage-bt {
    display: none;
  }
  .left-word {
    position: relative;
    margin-left: 10%;
  }
  .left-score {
    position: relative;
    margin-left: 20%;
  }
  .submit-bt {
    position: relative;
    top: 25%;
    left: 30%;
  }
  .input-box {
    position: relative;
    width: 10%;
    text-align: center;
    margin-left: 40%;
  }
  .card-left-components {
    position: relative;
    margin-left: 0%;
    top: 20%;
  }
  .card-left {
    position: absolute;
    border-radius: 0px 20px 20px 0px;
    background-color: rgb(160, 214, 234);
    top: 0%;
    left: 70%;
    height: 100%;
    width: 30%;
  }
  .card {
    position: relative;
    margin-top: 3%;
    border-radius: 20px;
    left: 20%;
    width: 55%;
    background-color: aliceblue;
    font-size: medium;
    font-weight: 500;
    text-align: left;
  }
  .download-bt {
    position: relative;
    margin-top: 2%;
    margin-left: 10%;
  }
  .word {
    position: relative;
    margin-left: 15%;
  }
  .member-name {
    display: none;
  }
  .name {
    display: none;
  }
  .left-word-mb {
    display: none;
  }
}
@media screen and (max-width: 480px) {
  .scrollbar {
    display: block;
    height: 90%;
  }
  .member-name {
    display: block;
    position: absolute;
    left: -58%;
  }
  .name {
    display: block;
    position: absolute;
    left: 5%;
  }
  .lastpage-bt {
    display: block;
    position: absolute;
    font-size: 10px;
    top: 2.5%;
    left: 0%;
    width: 15%;
    height: 7%;
  }
  .submit-bt {
    position: relative;
    top: 25%;
    left: 37.5%;
  }
  .word {
    position: relative;
    left: 10%;
  }
  .card-left-components {
    position: relative;
    margin-left: 5%;
    top: 5%;
  }
  .left-word {
    position: relative;
    top: 0%;
    left: 22.5%;
    margin-left: 10%;
  }
  .left-word-mb {
    display: block;
    position: absolute;
    left: 5%;
  }
  .left-score {
    position: relative;
    margin-left: 40%;
  }
  .download-bt {
    position: relative;
    width: 40%;
    font-size: 10px;
    margin-left: 10%;
  }
  .card-left {
    position: relative;
    border-radius: 0px 0px 20px 20px;
    background-color: rgb(160, 214, 234);
    margin-top: 10%;
    left: -13.5%;
    height: 50%;
    width: 127%;
  }
  .word {
    position: relative;
    margin-left: 0%;
  }
  .card {
    position: relative;
    margin-top: 5%;
    border-radius: 20px 20px 20px 20px;
    left: 5%;
    width: 70%;
    height: 70%;
    padding-bottom: 0%;
    background-color: aliceblue;
    font-size: medium;
    font-weight: 500;
  }
}
</style>
