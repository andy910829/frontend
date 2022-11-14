<template >
  <el-container class="loginbox">
    <el-header class="login-head">驗證碼</el-header>
    <el-main>
      <input class="inputbox" type="text" v-model="user_code" @keydown.enter="login_database" placeholder="請輸入驗證碼" />
      <!--v-model='act'用來把使用者的輸入值傳到act變數中-->
      <div>
        <el-button class="mg-tp" @click="login_database" type="primary">submit</el-button>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      status:'',
      user_code: "",
      act: "",
      pwd: ""
    }
  },
  methods: {
    check() {
      if (!sessionStorage.getItem("check")) {   //檢查account有沒有值,沒有的話返回login
        this.$router.push("/")
      }
      else if (sessionStorage.getItem('type')==='register'){  //註冊專用
        this.act = sessionStorage.getItem("user_account")
        this.pwd = sessionStorage.getItem("user_password")
      }
    },
    login_database() {
      this.loading = true
      const path1=import.meta.env.VITE_API+'verify'
      axios.post(path1,{'act':sessionStorage.getItem('user_account'),user_code:this.user_code})
      .then(
      response=>{
        this.status=response.data.res
        console.log(this.status)
      if (this.status==true && sessionStorage.getItem('type') === "forgetpd") {
        sessionStorage["type"] = "resetpd"
        this.$emit("reset_verification_succeeded")
      }
      else if (this.status==true && sessionStorage.getItem('type') === "setpd") {
        sessionStorage["type"] = "resetpd"
        this.$emit("reset_verification_succeeded")
      }
      else if (this.status==true && sessionStorage.getItem('type') === "register") {
        const path2 = import.meta.env.VITE_API+'create_account'
        axios.post(path2, { act: this.act, pwd: window.sha256(this.pwd),name:sessionStorage.getItem('name'),
        phonenumber:sessionStorage.getItem('phonenumber'), advisor:sessionStorage.getItem('advisor')})
          .then(response => {
            if (response.data.status) {
              window.alert("帳號創建成功")
              this.$emit("create_verification_succeeded")
            }
          }
        )
      }
      else if(this.status==='false'){
        this.$message.warning("驗證碼錯誤")
        this.loading = false
      }
      else {
        this.$message.warning("驗證碼已過期")
        this.loading = false
      }
        }
      )
    }
  },

  created() {           //進入這個頁面時優先執行
    this.check()
  }
}
</script>

  
<style scoped>
.mg-tp {
  height: 35px;
  margin-top: 30px;
}

.inputbox {
  border-radius: 20px;
  margin-bottom: 16px;
  text-align: center;
  width: 225px;
  height: 35px;
}

.loginbox {
  border-radius: 20px;
  display: flex;
  background-color: white;
  height: 42%;
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
}
</style>