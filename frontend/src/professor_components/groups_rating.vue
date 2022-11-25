<template>
  <h2>小組評分</h2>
  <select class="menu" v-model="semester">
    <option value="last_score">上學期</option>
    <option value="next_score">下學期</option>
  </select>
  <div v-for="GroupInfo in GroupList" :key="GroupInfo.group_id">
    <div class="card">
      <br />
      <div class="group-info">
        <div class="box-title">小組ID:{{ GroupInfo.group_id }}
        </div>
        組長:{{ GroupInfo.leader.student_id + " " }}{{ GroupInfo.leader.name }}
        <input
          v-if="semester === 'last_score'"
          placeholder="分數"
          class="score-box"
          v-model="GroupInfo.leader.last_score"
        />
        <input
          v-else-if="semester === 'next_score'"
          placeholder="分數"
          class="score-box"
          v-model="GroupInfo.leader.next_score"
        />
      </div>
      <div v-for="member in GroupInfo.member" class="group-info">
        組員:{{ member.student_id + " " }}{{ member.name }}
        <input
          v-if="semester === 'last_score'"
          placeholder="分數"
          class="score-box"
          v-model="member.last_score"
        />
        <input
          v-if="semester === 'next_score'"
          placeholder="分數"
          class="score-box"
          v-model="member.next_score"
        />
      </div>
      <input
        v-if="semester === 'next_score'"
        class="comment-box"
        v-model="GroupInfo.comment"
        placeholder="評語"
      />
      <br/>
      <el-button
          class="send-bt"
          type="warning"
          @click="returnScore(GroupInfo)"
          >送出</el-button
        >
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
  .menu {
    position: absolute;
    right: 50px;
    width: 70px;
    height: 40px;
    top: 2%;
  }
  .comment-box {
    position: relative;
    left: 0px;
    text-align: center;
    width: 60%;
    height: 50px;
    margin-top: 3%;
  }
  .group-info {
    position: relative;
    text-align: left;
    height:100%;
    left: 7%;
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
    left: 27%;
    width: 40%;
    border-radius: 15px;
  }
  .send-bt {
    position: relative;
    border-radius: 20px;
    left: 0%;
    margin-top:3%;
  }
  .score-box {
    position: absolute;
    text-align: center;
    left: 40%;
    width: 10%;
    margin-left: 30%;
  }
}

@media screen and (max-width: 480px) {
  .menu {
    position: absolute;
    right: 2%;
    width: 70px;
    height: 40px;
    top: 2%;
  }
  .comment-box {
    position: relative;
    margin-top:10px;
    left: 10px;
    text-align: center;
    width: 58%;
    height: 30px;
  }
  .group-info {
    position: relative;
    text-align: left;
    left: 0%;
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
    border-radius: 15px;
  }
  .send-bt {
    position: relative;
    border-radius: 20px;
    left: 5%;
    margin-top: 10px;
  }
  .score-box {
    position: absolute;
    text-align: center;
    left: 55%;
    width: 20%;
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
