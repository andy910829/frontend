<template>
  <div class="title">小組評分</div>
  <select class="menu" v-model="semester">
    <option value="last_score">上學期</option>
    <option value="next_score">下學期</option>
  </select>
  <div v-for="GroupInfo in GroupList" :key="GroupInfo.group_id">
    <div class="card">
      <div class="box-title">
        小組ID:{{ GroupInfo.group_id
        }}<el-button
          class="send-bt"
          type="warning"
          @click="returnScore(GroupInfo)"
          >送出</el-button
        >
      </div>
      <br />
      <div class="group-info">
        小組組長:{{ GroupInfo.leader.student_id + " "
        }}{{ GroupInfo.leader.name }}
          <input
            v-if="semester==='last_score'"
            placeholder="分數"
            class="score-box"
            v-model="GroupInfo.leader.last_score"
          />
          <input
            v-else-if="semester==='next_score'"
            placeholder="分數"
            class="score-box"
            v-model="GroupInfo.leader.next_score"
          />
      </div>
      <div v-for="member in GroupInfo.member" class="group-info">
        小組組員:{{ member.student_id + " " }}{{ member.name }}
          <input
          v-if="semester==='last_score'"
            placeholder="分數"
            class="score-box"
            v-model="member.last_score"
          />
          <input
          v-if="semester==='next_score'"
            placeholder="分數"
            class="score-box"
            v-model="member.next_score"
          />
      </div>
      <br />
      <input
        v-if="semester === 'next_score'"
        class="comment-box"
        v-model="GroupInfo.comment"
        placeholder="評語"
      />
    </div>
    <br />
  </div>
</template>

<script>
import axios from 'axios';

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
      const path = import.meta.env.VITE_API + 'set_score'
      axios.post(path,{group_info:groupInfo,pro_name:sessionStorage.getItem('name')}).then(
        response=>{
          if(response.data.res === true){
            this.$message.success('成績修改成功')
          }
        }
      )
    },
  },
};
</script>

<style lang="scss" scoped>
.menu {
  position: absolute;
  right: 50px;
  width: 70px;
  height: 40px;
}
.comment-box {
  position: relative;
  left: 0px;
  text-align: center;
  width: 450px;
  height: 50px;
}
.group-info {
  position: relative;
  text-align: left;
}
.box-title {
  position: relative;
  text-align: left;
  left: 0px;
  font-size: large;
  font-weight: 500;
}
.title {
  font-size: 30px;
  font-weight: 500;
}
.card {
  position: relative;
  background-color: aliceblue;
  margin-top: 20px;
  left: 260px;
  width: 500px;
  border-radius: 15px;
}
.send-bt {
  position: relative;
  border-radius: 20px;
  margin-left: 290px;
}
.score-box {
  position: absolute;
  text-align: center;
  left: 250px;
  width: 40px;
  margin-left: 50px;
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
