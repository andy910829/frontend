<template >
  <el-container class="loginbox">
    <el-header class="login-head">修改密碼</el-header>
    <el-main>
      <input type="password" name="pwd" v-model="pwd" @keydown.enter="register_check" class="inputbox"
        placeholder="新密碼" />
      <input type="password" name="pwd" v-model="pwd2" @keydown.enter="register_check" class="inputbox"
        placeholder="請再次確認密碼" />
      <div>
        <el-button class="mg-tp" @click="register_check" type="success">確認修改</el-button>
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
      pwd2: '',
      type: ''
    }
  },
  methods: {
    register_check() {
      if (this.pwd != this.pwd2) {
        this.$message.warning("請再次確認你的密碼")
      }
      else if (this.pwd.length < 8) {
        this.$message.warning("密碼長度不得於8個字")

      }
      else {
        const path = import.meta.env.VITE_API+'reset_password'   // 透過這個路徑傳回後端
        axios.post(path, { act: this.act, pwd: window.sha256(this.pwd )}) // 傳回後端axios.get(回傳路徑,回傳參數)
          .then(response => {
            this.code = response.data.reset
            if (this.code) {
              this.$message.success("密碼修改成功")
              this.$emit("reset_succeeded")
            }
          })            // 把後端回復的結果帶入前端的變數     
          .catch(error => {
            console.log(error)
          })
      }
    },
    check() {
      this.type = sessionStorage.getItem("type")
      if (this.type != "resetpd") {
        this.$router.push("/")
      }
      else {
        this.act = sessionStorage.getItem("user_account")
      }
    }
  },
  created() {
    this.check()
  }
}
</script>
  
<style scoped>
.mg-tp {
  margin-top: 10px;
}

.inputbox {
  border-radius: 20px;
  margin-bottom: 16px;
  text-align: center;
  width: 230px;
  height: 27px;
}

.loginbox {
  border-radius: 20px;
  display: flex;
  background-color: white;
  height: 52%;
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
  margin-bottom: 12%;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.3);
}
</style>