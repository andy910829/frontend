<template>
  <h2>期中報告</h2>
  <div v-for="GroupInfo in GroupList" :key="GroupInfo.group_id">
    <div class="card">
      小組ID:{{ GroupInfo.group_id }}<br />
      組長:{{ GroupInfo.leader.student_id + " " }}{{ GroupInfo.leader.name }}
      <div v-for="member in GroupInfo.member">
        組員:{{ member.student_id + " " }}{{ member.name }}
      </div>
      <el-button type="primary" @click="get_file(group)" class="download-bt"
        >下載期中報告</el-button
      >
      <el-button
        type="primary"
        @click="preview_file(group)"
        class="download-bt"
      >
        預覽期中報告
      </el-button>
    </div>
    <br />
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      status: "",
      GroupList: [],
    };
  },
  methods: {
    GetGroupInfo() {
      const path = import.meta.env.VITE_API + "GetGroupInfo_Pro";
      axios
        .post(path, { pro_name: sessionStorage.getItem("name") })
        .then((response) => {
          this.GroupList = response.data.res;
        });
    },
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
            const binarydata = [];
            binarydata.push(response.data);
            let blob = new Blob(binarydata, { type: "application/pdf" });
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
  },
  created() {
    this.GetGroupInfo();
  },
};
</script>

<style lang="scss" scoped>
@media screen {
  .card {
    position: relative;
    margin-top: 3%;
    border-radius: 20px;
    left: 25%;
    width: 45%;
    background-color: aliceblue;
    font-size: medium;
    font-weight: 500;
  }
  .download-bt {
    position: relative;
    margin-top: 2%;
  }
}
@media screen and (max-width: 480px) {
  .card {
    position: relative;
    margin-top: 3%;
    border-radius: 20px;
    left: 2.5%;
    width: 70%;
    background-color: aliceblue;
    font-size: medium;
    font-weight: 500;
  }
  .download-bt {
    display: none;
  }
}
</style>
