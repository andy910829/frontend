<template>
  <div v-if="status === ''">
  <div v-for="GroupInfo in GroupList" :key="GroupInfo.group_id" >
    <button class="card" @click="changeStatus(GroupInfo)">
      小組ID:{{ GroupInfo.group_id }}<br />
      小組組長:{{ GroupInfo.leader.student_id + " "
      }}{{ GroupInfo.leader.name }}
      <div v-for="member in GroupInfo.member">
        小組組員:{{ member.student_id + " " }}{{ member.name }}
      </div>
    </button>
    <br />
  </div>
</div>
<div v-else-if="status==='rating'">
    <rating :groupinfo="groupInfo" @back="status=''"/>
  </div>
</template>

<script>
import axios from "axios";
import rating from './rating.vue'

export default {
  data() {
    return {
      GroupList: [],
      count: 0,
      status:'',
      groupInfo:{}
    };
  },
  components:{
    rating
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
    changeStatus(GroupInfo){
      this.status='rating';
      this.groupInfo=GroupInfo;
    }
  },
  created() {
    this.GetGroupInfo();
  },
};
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  margin-top: 30px;
  width: 500px;
  background-color: aliceblue;
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