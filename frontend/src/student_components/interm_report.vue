<template>
  <el-container>
    <el-header class="title">期中報告繳交</el-header>
    <button class="lastpage-bt" @click="backToLastPage">上一頁</button>
    <el-main>
      <el-upload
        type="file"
        :auto-upload="false"
        drag
        :action="action"
        :on-exceed="exceed"
        :on-remove="remove"
        :multiple="false"
        @change="upload_file"
        :limit="1"
        accept="application/pdf"
      >
        <div class="el-upload__text">
          請先將檔案拖到此處，或<em>點選上傳</em>
        </div>
        <div class="el-upload__tip" slot="tip">
          只能上傳pdf檔案，一次只能上傳一個檔案
        </div>
      </el-upload>
      <el-button type="primary" @click="get_file" class="bt"
        >下載期中報告</el-button
      >
      <el-button type="primary" @click="preview_file" class="bt"
        >預覽期中報告</el-button
      >
      <el-button type="warning" @click="submit_file" class="sm-bt"
        >上傳</el-button
      >
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      param: new FormData(),
      file: "",
    };
  },
  methods: {
    backToLastPage() {
      this.$emit("backToLastPage");
    },
    get_file() {
      const path = import.meta.env.VITE_API + "get_file";
      axios
        .post(
          path,
          {
            group_id: sessionStorage.getItem("group_id"),
            type: "interm_report",
            token: sessionStorage.getItem("token"),
            act: sessionStorage.getItem("user_account"),
          },
          { responseType: "blob" }
        )
        .then((response) => {
          let blob = new Blob([response.data], { type: "application/pdf" });
          let reader = new FileReader();
          let file_name = sessionStorage.getItem("group_id") + "期中報告.pdf";
          if (response.data.size===0) {
            this.$message.warning("尚未上傳期中報告");
          } else if (window.navigator.msSaveOrOpenBlob) {
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
    preview_file() {
      const path = import.meta.env.VITE_API + "get_file";
      axios
        .post(
          path,
          {
            group_id: sessionStorage.getItem("group_id"),
            type: "interm_report",
            token: sessionStorage.getItem("token"),
            act: sessionStorage.getItem("user_account"),
          },
          { responseType: "blob" }
        )
        .then((response) => {
          if (response.data.size != 0) {
            const binarydata = [];
            binarydata.push(response.data);
            let blob = new Blob(binarydata, { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);
            window.open(url,'期中報告預覽');
          } else {
            this.$message.warning("尚未上傳期中報告");
          }
        });
    },
    remove() {
      this.param = new FormData();
    },
    upload_file(file) {
      this.file = file;
      if (file.size / 1024 / 1024 < 5) {
        this.param.append("group_id", sessionStorage.getItem("group_id"));
        this.param.append("file", this.file.raw);
        this.param.append("file_name", this.file.name);
        this.param.append("file_size", this.file.size / 1024);
        this.param.append("token", sessionStorage.getItem("token"));
        this.param.append("act", sessionStorage.getItem("user_account"));
      } else {
        this.$message.warning("文件大小不得超過5MB");
      }
    },
    exceed() {
      this.$message.warning("只能上傳一個檔案");
    },
    submit_file() {
      // let config = {
      //     headers: {
      //         'Content-Type': 'multipart/form-data'
      //     }
      // }
      const path = import.meta.env.VITE_API + "upload_file";
      axios.post(path, this.param).then((response) => {
        if (response.data.res === true) {
          this.$message.success("上傳成功");
        }
        else if(response.data.res === false){
          this.$message.error("已過繳交期限")
        } 
        else {
          this.$message.warning("上傳失敗");
        }
      });
    },
  },
  mounted() {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.backToLastPage, false);
    }
  },
  destroyed() {
    window.removeEventListener("popstate", this.backToLastPage, false);
  },
};
</script>

<style lang="scss" scoped>
@media screen {
  .lastpage-bt {
    display: none;
  }
  .title {
    font-size: 35px;
    font-weight: 900;
  }
}
@media screen and (max-width: 480px) {
  .title {
    font-size: 30px;
    font-weight: 900;
    color: black;
  }
  .sm-bt {
    position: relative;
    width: 25%;
    margin-left: 20%;
    margin-top: 2%;
  }
  .bt {
    position: relative;
    margin-left: 5%;
    margin-top: 5%;
  }
  .lastpage-bt {
    display: block;
    position: absolute;
    font-size: 10px;
    top: 2.5%;
    left: 0%;
    width: 15%;
    height: 7%;
    background-color: aliceblue;
    color: black;
  }
}
</style>
