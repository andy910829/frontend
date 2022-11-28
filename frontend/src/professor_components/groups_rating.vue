<template>
  <h2>小組評分</h2>
  <button class="lastpage-bt" @click="backToLastPage">上一頁</button>
  <select class="menu" v-model="semester">
    <option value="last_score">上學期</option>
    <option value="next_score">下學期</option>
  </select>
  <div v-for="GroupInfo in GroupList" :key="GroupInfo.group_id">
    <div class="card">
      <br />
      <div class="group-info">
        <div class="box-title">小組ID:{{ GroupInfo.group_id }}</div>
        組長:{{ GroupInfo.leader.student_id + " " }}{{ GroupInfo.leader.name }}
      </div>
      <div v-for="member in GroupInfo.member" class="group-info">
        組員:{{ member.student_id + " " }}{{ member.name }}
      </div>
      <input
        v-if="semester === 'next_score'"
        class="comment-box"
        v-model="GroupInfo.comment"
        placeholder="評語"
      />
      <br />
      <div class="card-side">
        <span class="word">原始分數</span>
        <span class="word">修改分數</span> 
        <div v-if="semester === 'last_score'" class="lastside-score">
          {{ GroupInfo.leader.last_score }}
          <input
            placeholder="分數"
            class="leaderscore-box"
            v-model="GroupInfo.leader.last_score"
          />
          <div v-for="member in GroupInfo.member">
            {{ member.last_score }}
            <input
              placeholder="分數"
              class="memberscore-box"
              v-model="member.last_score"
            />
            <el-button
              class="lastsend-bt"
              type="warning"
              @click="returnScore(GroupInfo)"
              >送出</el-button
            >
          </div>
        </div>
        <div v-else-if="semester === 'next_score'" class="nextside-score">
          {{ GroupInfo.leader.next_score }}
          <input
            placeholder="分數"
            class="leaderscore-box"
            v-model="GroupInfo.leader.next_score"
          />
          <div v-for="member in GroupInfo.member">
            {{ member.next_score }}
            <input
              placeholder="分數"
              class="memberscore-box"
              v-model="member.next_score"
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
    <br />
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["groupinfo"],
  data() {
    return {
      GroupList: this.groupinfo,
      groupsScore: [],
      semester: "last_score",
    };
  },
  methods: {
    backToLastPage() {
      this.$emit("backToLastPage");
    },
    returnScore(groupInfo) {
      const path = import.meta.env.VITE_API + "set_score";
      axios
        .post(path, {
          group_info: groupInfo,
          pro_name: sessionStorage.getItem("name"),
        })
        .then((response) => {
          if (response.data.res === true) {
            this.$message.success("成績修改成功");
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@media screen {
  .lastside-score {
    position: relative;
    margin-left: 20%;
    top: 20%;
  }
  .nextside-score {
    position: relative;
    margin-left: 20%;
    top: 15%;
  }
  .word {
    display: block;
    position: relative;
    font-size: medium;
    font-weight: 500;
    margin-left: 10%;
    top: 20%;
  }
  .card-side {
    position: absolute;
    background-color: rgb(158, 195, 229);
    border-radius: 0px 20px 20px 0px;
    width: 30%;
    height: 100%;
    top: 0%;
    left: 70%;
    text-align: left;
  }
  .lastpage-bt {
    display: none;
  }
  .menu {
    position: absolute;
    right: 50px;
    width: 70px;
    height: 40px;
    top: 2%;
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
    left: 7%;
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
  }
  .lastsend-bt {
    position: relative;
    border-radius: 20px;
    left: 15%;
    margin-top: 15%;
  }
  .nextsend-bt {
    position: relative;
    border-radius: 20px;
    left: 20%;
    margin-top: 20%;
  }
  .leaderscore-box {
    position: relative;
    text-align: center;
    margin-top: 25%;
    margin-left: 40%;
    width: 20%;
  }
  .memberscore-box {
    position: relative;
    text-align: center;
    margin-top: 0%;
    margin-left: 40%;
    width: 20%;
  }
}

@media screen and (max-width: 480px) {
  .lastpage-bt {
    display: block;
    position: absolute;
    font-size: 5px;
    top: 2.5%;
    left: 0%;
    width: 15%;
    height: 7%;
  }
  .menu {
    position: absolute;
    right: 6%;
    width: 17%;
    height: 5%;
    top: 2%;
  }
  .comment-box {
    position: relative;
    margin-top: 10px;
    left: 10px;
    text-align: center;
    width: 58%;
    height: 30px;
  }
  .group-info {
    position: relative;
    text-align: left;
    left: 0%;
    font-size: medium;
  }
  .box-title {
    position: relative;
    font-size: large;
    font-weight: 500;
    margin-bottom: 5%;
  }
  .card {
    position: relative;
    background-color: aliceblue;
    left: 0%;
    width: 80%;
    border-radius: 20px;
    font-size: small;
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
