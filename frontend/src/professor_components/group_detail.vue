<template>
  <div>
    <button @click="backToLastPage" class="back-bt">上一頁</button>
    <div class="card">
      小組ID:{{ group.group_id }}<br />
      小組組長:{{ group.leader.student_id + " " }}{{ group.leader.name }}
      <div v-for="member in group.member">
        小組組員:{{ member.student_id + " " }}{{ member.name }}
      </div>
    </div>
    <el-button type="success" @click="get_file(group)" class="download-bt">下載期中報告</el-button>
    <el-button type="success" @click="preview_file(group)" class="download-bt"> 預覽期中報告 </el-button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ["groupInfo"],
  data() {
    return {
      group: this.groupInfo,
    };
  },
  methods: {
    preview_file(group) {
      const path = import.meta.env.VITE_API + "get_file";
      axios
        .post(
          path,
          { group_id: group.group_id, type: "interm_report" },
          { responseType: "blob" }
        )
        .then((response) => {
          if (response.data.size != 0) {
            const binartdata = [];
            binartdata.push(response.data);
            let blob = new Blob(binartdata, { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
          } else {
            this.$message.warning("尚未上傳期中報告");
          }
        });
    },
    get_file(group) {
      const path = import.meta.env.VITE_API + "get_file";
      axios
        .post(
          path,
          { group_id: group.group_id, type: "interm_report" },
          { responseType: "blob" }
        )
        .then((response) => {
          let blob = new Blob([response.data], { type: "application/pdf" });
          let reader = new FileReader();
          let file_name = sessionStorage.getItem("group_id") + "期中報告.pdf";
          if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, file_name);
          } else {
            reader.readAsDataURL(blob, "ASCII");
            reader.onload = (e) => {
              let a = document.createElement("a");
              a.download = file_name;
              a.href = e.target.result;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            };
          }
        });
    },
    backToLastPage(){
      this.$emit('backToLastPage')
    }
  },
  created() {
    console.log(this.groupInfo);
  },
};
</script>

<style lang="scss" scoped>
@media screen{
.back-bt{
  position: absolute;
  text-align: center;
  top:20px;
  right:30px;
  width:80px;
  height:50px;
  font-size: small;
}
.card {
  position: relative;
  margin-top: 30px;
  left: 10%;
  width: 70%;
  background-color: aliceblue;
}
.download-bt{
  position: relative;
  margin-top: 2%;
}}
@media screen and (max-width: 480px){
  .back-bt{
  position: absolute;
  text-align: center;
  top:20px;
  right:30px;
  width:20%;
  height:5%;
  font-size: 10%;
}
.card {
  position: relative;
  margin-top: 15%;
  left: 5%;
  width: 70%;
  background-color: aliceblue;
  align-items: left;
}
.download-bt{
  position: relative;
  margin-top: 5%;
}
}
</style>
