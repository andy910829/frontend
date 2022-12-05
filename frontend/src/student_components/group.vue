<template>
      <el-container class="selectbox">
        <el-header class="box-head">選項</el-header>
        <el-main>
          <div v-if="status === 'check'" class="title">請確認你的身分是組長，<br/>再創建組別<br/>
          <el-button type="success" @click="create_group">是</el-button>
          <el-button type="danger" @click="status=''">否</el-button>
        </div>
          <div v-else>
            <div>如果你是組長，請創建組別</div>
            <el-button class="left-bt" @click="status='check'" type="primary">創建組別</el-button><br />
            <div>如果你是組員，請加入你的組別</div>
            <el-button class="left-bt" @click="find_group"  type="primary">加入組別</el-button><br />
          </div>
        </el-main>
      </el-container>
</template>
  
<script>
import axios from 'axios'

export default {
  data() {
    return {
      status:"",
      group:""
    }
  },
  methods: {
    create_group() {
      const path = import.meta.env.VITE_API+'create_group'
      axios.post(path, { act: sessionStorage.getItem("user_account"), pwd : sessionStorage.getItem("user_password")})
        .then(
          response => {
            if (response.data.res) {
              sessionStorage.setItem("user_identity", "group_leader")
              sessionStorage.setItem("group_id", sessionStorage.getItem("student_id"))
              window.alert("創建組別成功，小組編號為你的學號")
              this.$emit("havegroup")
            }

          }
        )
    },
    check_login() {
      if (sessionStorage.getItem("user_type") != "student") {
        this.$router.push("/")
      }
    },
    find_group(){
      this.$emit("findgroup")
    }
  },
  created() {           //進入這個頁面時優先執行
    this.check_login()
  }
}
</script>
  
<style scoped>
.box-head {
  margin-top: 20px;
  font-size: 25px;
  font-weight: 600;
}

.selectbox {
  border-radius: 20px;
  display: flex;
  background-color: white;
  height: 60%;
  width: 25%;
  top: 50%;
  left: 50%;
  position: absolute;
  background: rgba(255, 255, 255, 0.5);
  transform: translate(-50%, -50%);
}
.title {
  position: relative;
  text-align: center;
  font-size: 25px;
  font-weight: 500;
}
.left-bt {
  border-radius: 20px;
  margin-top: 40px;
  height: 50px;
  margin-bottom: 40px;
  background-color: rgb(140, 42, 165);
}
</style>
  