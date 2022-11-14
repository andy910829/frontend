<template >
  <el-container class="loginbox">
    <el-header class="login-head">創建帳號</el-header>
    <el-main>
      <input type="text"  v-model="name" @keydown.enter="register_check" class="inputbox"
        placeholder="姓名" />
      <input type="text"  v-model="phonenumber" @keydown.enter="register_check" class="inputbox"
        placeholder="電話" />
      <input type="text"  v-model="advisor" @keydown.enter="register_check" class="inputbox"
        placeholder="指導教授" /><br/>
      <div>t <input class="emailinputbox" type="text" v-model="act" @keydown.enter="register_check" placeholder="學號" />@ntut.org.tw</div>
      <input type="password"  v-model="pwd" @keydown.enter="register_check" class="inputbox"
        placeholder="密碼" />
      <input type="password"  v-model="pwd2" @keydown.enter="register_check" class="inputbox"
        placeholder="請再次確認密碼" />
      <div>
        <el-button class="mg-tp" :loading=loading @click="register_check" type="success">註冊</el-button>
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
            loading: false,
            act: "",
            act2:"",
            pwd: "",
            pwd2: "",
            advisor: "",
            phonenumber: "",
            name: "",
            code: ""
        };
    },
    methods: {
        register_check() {
            this.act2 = "t"+this.act+"@ntut.org.tw"
            this.loading = true;
            if (this.pwd != this.pwd2) {
                window.alert("Please confirm your password again");
                this.loading = false;
            }
            else if (this.pwd.length < 8) {
                window.alert("密碼長度不得小於8個字");
                this.loading = false;
            }
            else {
                sessionStorage.setItem("user_account", this.act2);
                sessionStorage.setItem("user_password", this.pwd);
                sessionStorage.setItem("name", this.name);
                sessionStorage.setItem("phonenumber", this.phonenumber);
                sessionStorage.setItem("advisor", this.advisor);
                const path = import.meta.env.VITE_API+'register'; // 透過這個路徑傳回後端
                axios.post(path, { act: this.act2, pwd: window.sha256(this.pwd) }) // 傳回後端axios.get(回傳路徑,回傳參數)
                    .then(response => {
                    this.code = response.data.code;
                    if (this.code) {
                        sessionStorage.setItem("check", this.code);
                        sessionStorage.setItem("type", "register");
                        this.$emit("verification");
                    }
                    else {
                        window.alert("帳號已創建或是錯誤的email");
                        this.$emit("already_signup");
                    }
                }) // 把後端回復的結果帶入前端的變數     
                    .catch(error => {
                    console.log(error);
                });
            }
        }
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
  height: 30px;
}
.emailinputbox {
  border-radius: 20px;
  margin-bottom: 16px;
  text-align: center;
  width: 100px;
  height: 30px;
}

.loginbox {
  border-radius: 20px;
  display: flex;
  background-color: white;
  height: 60%;
  width: 30%;
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
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.3);
}
</style>