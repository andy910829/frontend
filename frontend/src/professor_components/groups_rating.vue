<template>
  <h2>小組評分</h2>
  <button class="lastpage-bt" @click="backToLastPage">上一頁</button>
  <select class="menu" v-model="semester">
    <option value="last_score">上學期</option>
    <option value="next_score">下學期</option>
  </select>
  <el-scrollbar class="scrollbar">
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
        @input="nextchangeFromInput($event, 'comment')"
        placeholder="評語"
      />
      <br />
      <div class="card-side">
        <div class="card-side-components">
        <div class="word-mb">姓名</div>
        <span class="word">原始分數</span>
        <span class="word">修改分數</span> 
        <div class="name">{{ GroupInfo.leader.name }}</div>
        <div v-if="semester === 'last_score'" class="lastside-score">
          {{ GroupInfo.leader.last_score }}
          <input
            placeholder="分數"
            class="leaderscore-box"
            @input="lastchangeFromInput($event, GroupInfo.leader.name)"
          />
          <div v-for="member in GroupInfo.member" class="member-area">
            <span class="member-name">{{ member.name }}</span>
            {{ member.last_score }}
            <input
              placeholder="分數"
              class="memberscore-box"
              @input="lastchangeFromInput($event, member.name)"
            />
          </div>
          <el-button
              class="lastsend-bt"
              type="warning"
              @click="returnScore(GroupInfo)"
              >送出</el-button
            >
        </div>
        <div v-else-if="semester === 'next_score'" class="nextside-score">
          {{ GroupInfo.leader.next_score }}
          <input
            placeholder="分數"
            class="leaderscore-box"
            @input="nextchangeFromInput($event, GroupInfo.leader.name)"
          />
          <div v-for="member in GroupInfo.member" class="member-area">
            <span class="member-name">{{ member.name }}</span>
            {{ member.next_score }}
            <input
              placeholder="分數"
              class="memberscore-box"
              @input="nextchangeFromInput($event, member.name)"
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
      groupAns:{},
      groupsScore: [],
      semester: "last_score",
    };
  },
  methods: {
    GetGroupInfo() {
      const vm = this;
      const path = import.meta.env.VITE_API + "GetGroupInfo_Pro";
      axios
        .post(path, { pro_name: sessionStorage.getItem("name") })
        .then((response) => {
          vm.GroupList = response.data.res;
        });
    },
    lastchangeFromInput(event,name) {
      let res={
        score_type:'last_score',
        [name]:event.target.value
      }
      this.groupAns = Object.assign(this.groupAns, res);
    },
    nextchangeFromInput(event,name) {
      let res={
        score_type:'next_score',
        [name]:event.target.value
      }
      this.groupAns = Object.assign(this.groupAns, res);
    },
    backToLastPage() {
      this.$emit("backToLastPage");
    },
    returnScore(groupinfo) {
      console.log(this.groupAns)
      const path = import.meta.env.VITE_API + "set_score";
      axios
        .post(path, {
          group_id: groupinfo.group_id,
          res: this.groupAns,
          pro_name: sessionStorage.getItem("name"),
        })
        .then((response) => {
          if (response.data.res === true) {
            this.$message.success("成績修改成功");
            this.GetGroupInfo();
            this.groupAns = {};
          }
        });
    },
  },
  created(){
    this.GetGroupInfo()
  }
};
</script>

<style lang="scss" scoped>
@media screen {
  .member-name{
    display: none;
  }
  .name{
    display:none
  }
  .word-mb{
    display:none;
  }
  .member-area{
    display: block;
    position: relative;
    margin-top: 0%;
  }
  .card-side-components{
    position: relative;
    text-align: left;
    top:20%;
    height:20%;
  }
  .lastside-score {
    position: relative;
    margin-left: 20%;
    margin-top: 10%;
  }
  .nextside-score {
    position: relative;
    margin-left: 15%;
    top: 15%;
  }
  .word {
    position: relative;
    font-size: medium;
    font-weight: 500;
    padding-right: 0%;
    margin-left: 10%;
    width:40%;
    top: 20%;
    left:0%;
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
    margin-top: 10%;
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
    margin-top: 10%;
    margin-left: 40%;
    width: 20%;
  }
  .memberscore-box {
    position: relative;
    text-align: center;
    top:5%;
    margin-top: 0%;
    margin-left: 40%;
    width: 20%;
  }
}

@media screen and (max-width: 480px) {
  .member-area{
    display: block;
    position: relative;
    margin-top: 0%;
  }
  .nextside-score{
    display: block;
    position: relative;
    margin-top: 0%;
    margin-left:15%;
    top:0%;
    left:30%;
  }
  .comment-box{
    position: relative;
    width:70%;
    height:30px;
    left:0%;
    margin-bottom: 5%;
  }
  .scrollbar {
    display: block;
    height: 90%;
  }
  .card-side-components{
    display: block;
    position: relative;
  }
  .nextsend-bt{
    display: block;
    position: relative;
    margin-top:5%;
    left:-8%;
  }
  .lastsend-bt{
    display: block;
    position: relative;
    margin-top:3%;
    left:-10%;
  }
  .memberscore-box{
    display: block;
    position: absolute;
    margin-left:35%;
  }
  .leaderscore-box{
    display: block;
    position: absolute;
    top:0%;
    margin-top: 0%;
    margin-left: 35%;
  }
  .member-name{
    display: block;
    position: absolute;
    left:-40%;
  }
  .name {
    display: block;
    position: absolute;
    left: 10%;
  }
  .lastside-score{
    display: block;
    position: relative;
    margin-top: 0%;
    margin-left:15%;
    top:0%;
    left:30%;
  }
  .card-side-components{
    position: relative;
    text-align: left;
    top:20%;
    height:20%;
  }
  .word-mb{
    display: block;
    position: absolute;
    font-size: medium;
    font-weight: 500;
    left: 10%;
  }
  .lastpage-bt{
    display: block;
    position: absolute;
    font-size: 5px;
    top: 2.5%;
    left: 0%;
    width: 15%;
    height: 7%;
  }
  .word{
    position: relative;
    top: 0%;
    left: 22.5%;
    margin-left: 15%;
  }
  .group-info{
    position: relative;
    margin-right: 0%;
    left:20%;
    width:100%;
  }
  .card{
    position: relative;
    padding: 0%;
    width:90%;
    left:5%;
    padding-bottom: 0%;
  }
  .card-side{
    position: relative;
    border-radius: 0px 0px 20px 20px;
    width:100%;
    left:0%;
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
