<template >
    <el-container class="loginbox">
      <el-header class="login-head">尋找組別</el-header>
      <el-main>
        <div>
          <input class="inputbox" type="text" @keydown.enter="find_group" v-model="find_group_id" placeholder="輸入小組ID"/><br>
          <button class="confirm-bt" @click="find_group">申請加入</button>
        </div>
      </el-main>
    </el-container>
  </template>
  
  <script>
  import axios from 'axios'  //負責前後端溝通  
  
  export default {
    data() {
      return {
        find_group_id:""
      }
    },
    methods: {
      find_group(){
        const path = import.meta.env.VITE_API+'find_group'
        axios.post(path,{student_id:sessionStorage.getItem("student_id"),group_id:this.find_group_id})
        .then(
          response=>{
            console.log(response.data.res)
            if(response.data.res != "" && response.data.res != 'null'){
              window.alert("申請成功請等待組長審核通過")
            }
            else if(response.data.res === ""){
              window.alert("申請已經遞交，請耐心等待組長審核通過")
            }
            else{
              window.alert("請重新確認組別ID")             
            }
          }
        )
      }
    }

  }
  </script>
  
  <style scoped>
  
  .inputbox {
    border-radius: 20px;
    margin-top: 5px;
    text-align: center;
    width: 230px;
    height: 30px;
  }
  
  .loginbox {
    border-radius: 20px;
    display: flex;
    background-color: white;
    height: 45%;
    width: 25%;
    top: 50%;
    left: 50%;
    position: absolute;
    background: rgba(255, 255, 255, 0.5);
    transform: translate(-50%, -50%);
  }
  .confirm-bt {
  border-radius: 20px;
  margin-top: 35px;
  height: 45px;
  margin-bottom: 40px;
  background-color: rgb(140, 42, 165);
}
  .login-head {
    display: flex;
    height: 25%;
    border-radius: 20px 20px 0 0;
    text-align: center;
    font-size: 35px;
    font-weight: 900;
    margin-bottom: 10%;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.3);
  }
  </style>