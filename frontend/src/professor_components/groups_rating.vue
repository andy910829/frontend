<template>
  <h2 style="color:black">下學期評分</h2>
  <button class="lastpage-bt" @click="backToLastPage">上一頁</button>
  <el-scrollbar class="scrollbar">
    <div v-for="GroupInfo in GroupList" :key="GroupInfo.group_id">
      <div class="card">
        <br />
        <div class="group-info">
          <div class="box-title">小組ID:{{ GroupInfo.group_id }}</div>
          組長:{{ GroupInfo.leader.student_id + " "
          }}{{ GroupInfo.leader.name }}
        </div>
        <div v-for="member in GroupInfo.member" class="group-info">
          組員:{{ member.student_id + " " }}{{ member.name }}
        </div>
        <div class="group-info" v-if="GroupInfo.competition.competition_topics">
          {{ "專題競賽題目:" + GroupInfo.competition.competition_topics }}
        </div>
        <div class="group-info" v-else>
          {{ "專題競賽題目:" + "未上傳題目" }}
        </div>
        <div class="group-info">
          YouTube連結:<a
            v-bind:href="GroupInfo.competition.YT_link"
            target="_blank"
            >連結點我</a
          >
        </div>
        <div>
          <el-button
            type="primary"
            @click="get_file(GroupInfo)"
            class="download-bt"
            >下載專題競賽報告</el-button
          >
          <el-button
            type="primary"
            @click="preview_file(GroupInfo)"
            class="download-bt"
          >
            預覽專題競賽報告
          </el-button>
        </div>
        <textarea
          class="comment-box"
          v-model="GroupInfo.comment"
          @input="nextchangeFromInput($event, 'comment')"
          placeholder="評語"
        ></textarea>
        <br />
        <div class="card-side">
          <div class="card-side-components">
            <div class="word-mb">姓名</div>
            <span class="word">原始分數</span>
            <span class="word">修改分數</span>
            <div class="name">{{ GroupInfo.leader.name }}</div>
            <div class="nextside-score">
              {{ GroupInfo.leader.next_score }}
              <input
                placeholder="分數"
                class="leaderscore-box"
                @input="nextchangeFromInput($event, GroupInfo.leader.student_id)"
              />
              <div v-for="member in GroupInfo.member" class="member-area">
                <span class="member-name">{{ member.name }}</span>
                {{ member.next_score }}
                <input
                  placeholder="分數"
                  class="memberscore-box"
                  @input="nextchangeFromInput($event, member.student_id)"
                />
              </div>
              <el-button
                class="nextsend-bt"
                type="warning"
                @click="returnScore(GroupInfo)"
                >送出</el-button
              >
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  </el-scrollbar>
</template>

<script>
import axios from "axios";

export default {
  props: ["groupinfo"],
  data() {
    return {
      GroupList: this.groupinfo,
      groupAns: {},
    };
  },
  methods: {
    get_file(group) {
      const path = import.meta.env.VITE_API + "get_file";
      axios
        .post(
          path,
          {
            group_id: group.group_id,
            type: "competition_report",
            token: sessionStorage.getItem("token"),
            act: sessionStorage.getItem("user_account"),
          },
          { responseType: "blob" }
        )
        .then((response) => {
          let blob = new Blob([response.data], { type: "application/pdf" });
          let reader = new FileReader();
          let file_name =
          group.group_id + "專題競賽報告.pdf";
          if (response.data.size === 0) {
            this.$message.warning("尚未上傳專題競賽報告");
          } else if (window.navigator.msSaveOrOpenBlob) {
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
    preview_file(group) {
      const path = import.meta.env.VITE_API + "get_file";
      axios
        .post(
          path,
          {
            group_id: group.group_id,
            type: "competition_report",
            token: sessionStorage.getItem("token"),
            act: sessionStorage.getItem("user_account"),
          },
          { responseType: "blob" }
        )
        .then((response) => {
          if (response.data.size != 0) {
            const binarydata = [];
            ƒ;
            binarydata.push(response.data);
            let blob = new Blob(binarydata, { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
          } else {
            this.$message.warning("尚未上傳專題競賽報告");
          }
        });
    },
    GetGroupInfo() {
      const path = import.meta.env.VITE_API + "GetGroupInfo_Pro";
      axios
        .post(path, {
          pro_name: sessionStorage.getItem("name"),
          token: sessionStorage.getItem("token"),
          act: sessionStorage.getItem("user_account"),
        })
        .then((response) => {
          this.GroupList = response.data.res;
        });
    },
    nextchangeFromInput(event, name) {
      let res = {
        score_type: "next_score",
        [name]:
          event.target.value.length < 2
            ? "0" + event.target.value
            : event.target.value,
      };
      this.groupAns = Object.assign(this.groupAns, res);
    },
    backToLastPage() {
      this.$emit("backToLastPage");
    },
    returnScore(groupinfo) {
      const path = import.meta.env.VITE_API + "set_score";
      axios
        .post(path, {
          group_id: groupinfo.group_id,
          res: this.groupAns,
          pro_name: sessionStorage.getItem("name"),
          token: sessionStorage.getItem("token"),
          act:sessionStorage.getItem('user_account')
        })
        .then((response) => {
          if (response.data.res === true) {
            this.GroupList = response.data.res2
            this.groupAns = {};
            this.$message.success("成績修改成功");
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
  .download-bt {
    position: relative;
    margin-top: 3%;
    left: -16%;
  }
  .member-name {
    display: none;
  }
  .name {
    display: none;
  }
  .word-mb {
    display: none;
  }
  .member-area {
    display: block;
    position: relative;
    margin-top: 0%;
  }
  .card-side-components {
    position: relative;
    text-align: left;
    top: 5%;
    height: 20%;
  }
  .nextside-score {
    position: relative;
    margin-left: 22.5%;
    top: 15%;
    margin-top: 5%;
    font-size: medium;
    font-weight: 500;
  }
  .word {
    position: relative;
    font-size: medium;
    font-weight: 500;
    padding-right: 0%;
    margin-left: 13%;
    width: 40%;
    top: 20%;
    left: 0%;
  }
  .card-side {
    position: absolute;
    background-color: rgb(158, 195, 229);
    border-radius: 0px 20px 20px 0px;
    width: 30%;
    height: 100%;
    top: 0%;
    left: 70%;
  }
  .lastpage-bt {
    display: none;
  }
  .comment-box {
    position: relative;
    left: -15%;
    text-align: center;
    width: 60%;
    height: 50px;
    margin-top: 3%;
  }
  .group-info {
    position: relative;
    text-align: left;
    font-size: large;
    font-weight: 500;
    height: 100%;
    left: 13%;
    width: 70%;
  }
  .box-title {
    position: relative;
    left: 0%;
    font-size: large;
    font-weight: 600;
    margin-bottom: 5%;
  }
  .card {
    position: relative;
    background-color: aliceblue;
    left: 17%;
    width: 60%;
    border-radius: 20px;
    padding-top: 0%;
    padding-bottom: 1%;
  }
  .nextsend-bt {
    position: relative;
    border-radius: 20px;
    left: 20%;
    margin-top: 35%;
  }
  .leaderscore-box {
    position: relative;
    text-align: center;
    margin-top: 8%;
    margin-left: 40%;
    width: 20%;
  }
  .memberscore-box {
    position: relative;
    text-align: center;
    top: 5%;
    margin-top: 0%;
    margin-left: 40%;
    width: 20%;
  }
  .scrollbar {
    display: block;
    height: 85%;
  }
}

@media screen and (max-width: 480px) {
  .download-bt {
    position: relative;
    left: 0%;
  }
  .member-area {
    display: block;
    position: relative;
    margin-top: 0%;
  }
  .nextside-score {
    display: block;
    position: relative;
    width: 60%;
    margin-top: 0%;
    margin-left: 15%;
    top: 0%;
    left: 30%;
  }
  .comment-box {
    position: relative;
    width: 70%;
    height: 30px;
    left: 0%;
    margin-bottom: 5%;
  }
  .scrollbar {
    display: block;
    height: 90%;
  }
  .nextsend-bt {
    display: block;
    position: relative;
    margin-top: 5%;
    left: -8%;
  }
  .memberscore-box {
    display: block;
    position: absolute;
    margin-left: 55%;
  }
  .leaderscore-box {
    display: block;
    position: absolute;
    top: 0%;
    margin-top: 0%;
    margin-left: 55%;
  }
  .member-name {
    display: block;
    position: absolute;
    left: -61%;
  }
  .name {
    display: block;
    position: absolute;
    left: 8%;
    font-size: 105%;
  }
  .card-side-components {
    position: relative;
    text-align: left;
    top: 20%;
    height: 20%;
    color:black;
  }
  .word-mb {
    display: block;
    position: absolute;
    font-size: medium;
    font-weight: 500;
    left: 10%;
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
  .word {
    position: relative;
    top: 0%;
    left: 22.5%;
    margin-left: 15%;
  }
  .group-info {
    position: relative;
    margin-right: 0%;
    left: 20%;
    width: 80%;
    color: black;
  }
  .card {
    position: relative;
    padding: 0%;
    width: 90%;
    left: 5%;
    padding-bottom: 0%;
  }
  .card-side {
    position: relative;
    border-radius: 0px 0px 20px 20px;
    width: 100%;
    left: 0%;
  }
}
</style>

<!-- <template>
    <div
        v-for="groupInfo in groupList"
        :key="groupInfo.group_id"
    >
        <div class="card">
            小組ID:{{ groupInfo.group_id }}<br />
            小組組長:{{ groupInfo.leader.student_id + ' '}}{{ groupInfo.leader.name }}
            <div v-for="member in groupInfo.member">
                小組組員:{{ member.student_id + ' ' }}{{ member.name }}
            </div>
        </div>
        <br />
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue'

const groupList = ref([]);

function getGroupInfo() {
    const path = import.meta.env.VITE_API + 'GetGroupInfo_Pro';
    axios.post(path, { pro_name: sessionStorage.getItem('name')})
        .then((response) => {
            groupList.value = response.data.res;
            //this.count = this.GetGroupInfo.member.length
    });
}

getGroupInfo();
</script>

<style lang="scss" scoped>
.card {
    position: relative;
    left: 280px;
    width: 500px;
    background-color: aliceblue;
}
</style> -->