<template >
  <el-container class="loginbox">
    <el-header class="login-head">登入</el-header>
    <el-main>
      <div v-if="status === 'login_account'">
        <input class="inputbox" type="text" @keydown.enter="get_account" v-model="act" placeholder="輸入帳號" />
        <div>
          <el-button @click="get_account" class="mg-bt" type="success">繼續</el-button><br />
          <el-button @click="register" type="primary" class="mg-bt">註冊</el-button>
          <div class="flex justify-space-between mb-4 flex-wrap gap-4"><br>
            <el-button @click="forgetpd" class="fgpd-bt" text> 忘記密碼? </el-button>
          </div>
        </div>
        <!--v-model='act'用來把使用者的輸入值傳到act變數中-->
      </div>
      <div v-else-if="status === 'login_password'">
        <input type="password" v-model="pwd" @keydown.enter="check_pwd_login" class="inputbox2" placeholder="輸入密碼" /><br/>
        <el-button @click="check_pwd_login" class="mg-bt" type="success">登入</el-button><br />
      </div>
    </el-main>
  </el-container>
</template>

<script>
import axios from 'axios'  //負責前後端溝通  
//import HelloWorld from './HelloWorld.vue'  //引入需要用到的子組件

export default {
  data() {
    return {
      act: '',
      pwd: '',
      status: 'login_account',
      user_status : ''
    }
  },
  methods: {
    get_account() {
      const path = import.meta.env.VITE_API + 'login' // 透過這個路徑傳回後端
      axios.post(path, { act: this.act, type: 'account' }) // 傳回後端axios.get(回傳路徑,回傳參數)
        .then(response => {
          if(response.data.user){
            this.user_status = response.data.user
            if (this.user_status === "false") {
                sessionStorage.setItem("user_account",this.act)
                this.setpd()
              }   // 儲存登入帳號的身分
              else if (this.user_status===true){
                this.status = 'login_password'
              }
            }
          else{
            this.$message.warning("帳號不存在")
          }
        })
    },
    register() {
      //sessionStorage.setItem("type", "register")
      this.$emit("register")
    },
    forgetpd() {
      sessionStorage.setItem("type", "forgetpd")
      this.$emit('forgetpd')
    },
    setpd() {
      sessionStorage.setItem("type", "setpd")
      this.$emit('forgetpd')
    },
    check_pwd_login() {
      const path = import.meta.env.VITE_API+'login' // 透過這個路徑傳回後端
      axios.post(path, { act: this.act, type: 'password',pwd: window.sha256(this.pwd) }) // 傳回後端axios.get(回傳路徑,回傳參數)
      .then(
        response=>{
          if (response.data.user != "") {
            sessionStorage.setItem("user_account", response.data.user.account)
            sessionStorage.setItem("user_type", response.data.user.type)
            sessionStorage.setItem("name",response.data.user.name)
            sessionStorage.setItem("token",response.data.user.token)
            if (response.data.user.type === 'student') {
                sessionStorage.setItem("group_id", response.data.user.group_id)
                sessionStorage.setItem("user_identity", response.data.user.user_identity)
                sessionStorage.setItem("student_id",response.data.user.student_id)
              }
           this.$router.push("login_success")
          }
          else{
            this.$message.warning("密碼錯誤")
          }
          }
      )
    }
  }
}
</script>

<style scoped>
@media screen{
.mg-bt {
  margin-bottom: 16px;
}
.mg-bt:hover{
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.8);
}

.fgpd-bt {
  background-color: transparent;
  border-width: 0;
  outline: none;
}
.fgpd-bt:hover{
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.8);
}

.inputbox {
  border-radius: 20px;
  margin-bottom: 30px;
  text-align: center;
  width: 80%;
  height: 27px;
}
.inputbox2{
  border-radius: 20px;
  margin-top: 20px;
  margin-bottom: 50px;
  text-align: center;
  width: 80%;
  height: 27px;
}

.loginbox {
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

.login-head {
  display: flex;
  height: 25%;
  border-radius: 20px 20px 0 0;
  text-align: center;
  font-size: 35px;
  font-weight: 900;
  top: 0px;
  margin-bottom: 10%;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.3);
}}

@media screen and (max-width:480px){
  .mg-bt {
  margin-bottom: 16px;
}
.mg-bt:hover{
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.8);
}

.fgpd-bt {
  background-color: transparent;
  border-width: 0;
  outline: none;
}
.fgpd-bt:hover{
  box-shadow: 10;
}

.inputbox {
  border-radius: 20px;
  margin-bottom: 30px;
  text-align: center;
  width: 80%;
  height: 27px;
}
.inputbox2{
  border-radius: 20px;
  margin-top: 20px;
  margin-bottom: 50px;
  text-align: center;
  width: 80%;
  height: 27px;
}

.loginbox {
  border-radius: 20px;
  display: flex;
  background-color: white;
  height: 50%;
  width: 90%;
  top: 50%;
  left: 50%;
  position: absolute;
  background: rgba(255, 255, 255, 0.5);
  transform: translate(-50%, -50%);
}

.login-head {
  display: flex;
  height: 25%;
  border-radius: 20px 20px 0 0;
  text-align: center;
  font-size: 35px;
  font-weight: 900;
  top: 0px;
  margin-bottom: 10%;
  justify-content: center;
  align-items: center;
  color: black;
  background-color: rgba(255, 255, 255, 0.3);
}
}
</style>