<template >
  <el-container class="loginbox">
    <el-header v-if="type === 'forgetpd'" class="login-head">忘記密碼</el-header>
    <el-header v-if="type === 'setpd'" class="login-head">驗證Email</el-header>
    <el-main>
      <input class="inputbox" type="text" v-model="email" @keydown.enter="login_check" placeholder="請輸入您的email" />
      <!--v-model='act'用來把使用者的輸入值傳到act變數中-->
      <div>
        <el-button class="mg-tp" :loading=loading @click="login_check" type="primary">submit</el-button>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      loading: false,
      email: "",
      code: "",
      type:""
    }
  },
  methods: {
    login_check() {
      this.loading = true
      const path = import.meta.env.VITE_API+'forgetpd_verify'
      axios.post(path, { act: this.email })
        .then(response => {
          if (response.data.code) {
            sessionStorage.setItem("user_account", this.email)
            this.$emit("forgetpd_verify")
          }
          else {
            window.alert("帳號不存在")
            this.$emit("verify_false")
          }
        }
        )
    }
  },
  created(){
    this.type = sessionStorage.getItem("type")
    this.email=sessionStorage.getItem("user_account")
    if(this.type == 'setpd'){
      this.login_check()
    }
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