<template>
  <el-container>
    <el-header class="title">專題競賽報名</el-header>
    <button class="lastpage-bt" @click="backToLastPage">上一頁</button>
    <el-main>
      <div v-if="status === null || status === 'reject'">
        <div class="select">
          第一優先報名之組別<br />
          <div>* 主辦單位得依參賽隊伍之數量決定各隊伍之所屬競賽組別</div>
          <select class="selection" v-model="option1">
            <option value="0">請選擇第一優先報名之組別</option>
            <option value="計算機工程組(甲組)">計算機工程組 (甲組)</option>
            <option value="通訊系統與電波工程組(乙丙組)">
              通訊系統與電波工程組 (乙丙組)
            </option>
            <option value="積體電路與系統組(丁組)">
              積體電路與系統組 (丁組)
            </option>
          </select>
        </div>
        <div class="select">
          第二優先報名之組別<br />
          <div>
            *請勿選擇與第一優先相同，若選擇相同且有需要調整參賽隊伍時將優先被調動至其他組。
          </div>
          <select class="selection" v-model="option2">
            <option value="0">請選擇第二優先報名之組別</option>
            <option
              v-if="
                option1 === '通訊系統與電波工程組(乙丙組)' ||
                option1 === '積體電路與系統組(丁組)'
              "
              value="計算機工程組(甲組)"
            >
              計算機工程組 (甲組)
            </option>
            <option
              v-if="
                option1 === '計算機工程組(甲組)' ||
                option1 === '積體電路與系統組(丁組)'
              "
              value="通訊系統與電波工程組(乙丙組)"
            >
              通訊系統與電波工程組 (乙丙組)
            </option>
            <option
              v-if="
                option1 === '計算機工程組(甲組)' ||
                option1 === '通訊系統與電波工程組(乙丙組)'
              "
              value="積體電路與系統組(丁組)"
            >
              積體電路與系統組 (丁組)
            </option>
          </select>
        </div>
        <div class="select">
          <div>展示影片網址</div>
          <div>
            *請填答YouTube網址，請先與組員測試確認可以正常觀看影片，若無法觀看則將影響評分。
          </div>
          <el-input
            class="input-box"
            type="text"
            placeholder="YouTube連結"
            v-model="YT_link"
          />
        </div>
        <div class="select">
          <div>專題競賽題目</div>
          <div>*請填答欲報名之題目。</div>
          <el-input
            class="input-box"
            type="text"
            placeholder="專題競賽題目"
            v-model="competitionTopics"
          />
        </div>
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
          class="upload-box"
        >
          <div class="el-upload__text">
            請先將檔案拖到此處，或<em>點選上傳</em>
          </div>
          <div class="el-upload__tip" slot="tip">
            只能上傳pdf檔案，一次只能上傳一個檔案
          </div>
        </el-upload>
        <el-button class="submit-bt" type="success" @click="submit"
          >上傳</el-button
        >
      </div>
      <div v-else-if="status == 'accept' || status == 'waiting'" class="word">
        <li class="li-word">第一優先報名之組別:{{ this.detail.option1 }}</li>
        <li class="li-word">第二優先報名之組別:{{ this.detail.option2 }}</li>
        <li class="li-word">
          YouTube連結:<a v-bind:href="this.detail.YT_link" target="_blank"
            >連結點我</a
          >
        </li>
        <li class="li-word">
          專題競賽題目:{{ this.detail.competition_topics }}
        </li>
        <li class="li-word">
          報名狀態:<span v-if="status === 'accept'">申請通過</span
          ><span v-else-if="status === 'waiting'">待教授簽核中</span>
        </li>
        <el-button class="btn" type="success" @click="get_file"
          >下載專題競賽報告</el-button
        ><br />
        <el-button class="btn" type="success" @click="preview_file"
          >預覽專題競賽報告</el-button
        ><br />
        <el-button class="btn" type="danger" @click="cancel_reg"
          >取消專題競賽報名</el-button
        >
      </div>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      option1: 0,
      option2: 0,
      YT_link: "",
      status: "pass",
      detail: {},
      competitionTopics: "",
      param: new FormData(),
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
            type: "competition_report",
            token: sessionStorage.getItem("token"),
            act: sessionStorage.getItem("user_account"),
          },
          { responseType: "blob" }
        )
        .then((response) => {
          let blob = new Blob([response.data], { type: "application/pdf" });
          let reader = new FileReader();
          let file_name =
            sessionStorage.getItem("group_id") + "專題競賽報告.pdf";
          if (response.data.size===0) {
            this.$message.warning("尚未上傳專題競賽報告");
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
            type: "competition_report",
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
            window.open(url);
          } else {
            this.$message.warning("尚未上傳專題競賽報告");
          }
        });
    },
    remove() {
      this.param = new FormData();
    },
    upload_file(file) {
      this.file = file;
      if (file.size / 1024 / 1024 < 10) {
        this.param.append("group_id", sessionStorage.getItem("group_id"));
        this.param.append("file", this.file.raw);
        this.param.append("file_size", this.file.size / 1024);
        this.param.append("option1", this.option1);
        this.param.append("option2", this.option2);
        this.param.append("YT_link", this.YT_link);
        this.param.append("competition_topics", this.competitionTopics);
        this.param.append("token", sessionStorage.getItem("token"));
        this.param.append("act", sessionStorage.getItem("user_account"));
      } else {
        this.$message.warning("檔案大小不得超過10MB");
      }
    },
    exceed() {
      this.$message.warning("只能上傳一個檔案");
    },
    submit() {
      const path = import.meta.env.VITE_API + "competition_reg";
      axios.post(path, this.param).then((response) => {
        if (response.data.res != "") {
          this.$message.success("上傳成功");
          this.check();
        }
      });
    },
    cancel_reg() {
      const path = import.meta.env.VITE_API + "cancel_reg";
      axios
        .post(path, {
          group_id: sessionStorage.getItem("group_id"),
          token: sessionStorage.getItem("token"),
          act: sessionStorage.getItem("user_account"),
        })
        .then((response) => {
          if (response.data.res == true) {
            this.$message.success("已取消報名");
            this.check();
          }
        });
    },
    check() {
      const path = import.meta.env.VITE_API + "get_competition_status";
      axios
        .post(path, {
          group_id: sessionStorage.getItem("group_id"),
          token: sessionStorage.getItem("token"),
          act: sessionStorage.getItem("user_account"),
        })
        .then((response) => {
          if (response.data.res) {
            this.status = response.data.res.status;
            this.detail = response.data.res;
          } else {
            this.status = null;
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
  created() {
    this.check();
  },
};
</script>

<style lang="scss" scoped>
@media screen {
  .lastpage-bt {
    display: none;
  }
  .selection {
    position: relative;
    left: 0%;
    border-radius: 20px;
    height: 30px;
    margin-top: 15px;
    z-index: 999;
    text-align: center;
  }

  .title {
    font-size: 35px;
    font-weight: 900;
  }

  .select {
    position: relative;
    border-radius: 20px;
    width: 70%;
    height: 120px;
    left: 15%;
    background-color: white;
    font-size: 15px;
    margin-bottom: 50px;
    color: black;
  }

  .upload-box {
    position: relative;
    width: 85%;
    left: 10%;
    margin-bottom: 50px;
  }

  .submit-bt {
    position: relative;
    bottom: 20px;
  }

  .input-box {
    position: absolute;
    width: 40%;
    left: 30%;
    margin-top: 10px;
    text-align: center;
  }
  .btn {
    position: relative;
    margin-top: 20px;
    left: 20%;
  }
  .word {
    font-size: large;
    font-weight: 900;
    text-align: left;
    margin-left: 30%;
  }
}
@media screen and (max-width: 480px) {
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
  .selection {
    position: relative;
    left: 0%;
    border-radius: 20px;
    height: 20%;
    width: 80%;
    margin-top: 15px;
    z-index: 999;
    text-align: center;
  }

  .title {
    font-size: 30px;
    font-weight: 900;
    color: black;
  }

  .select {
    position: relative;
    border-radius: 20px;
    width: 90%;
    height: 50%;
    left: 5%;
    background-color: white;
    font-size: 15px;
    margin-bottom: 50px;
  }

  .upload-box {
    position: relative;
    width: 85%;
    left: 10%;
    margin-bottom: 50px;
  }

  .submit-bt {
    position: relative;
    bottom: 20px;
  }

  .input-box {
    position: relative;
    width: 80%;
    left: 0%;
    justify-content: center;
    margin-top: 10px;
    text-align: center;
  }
  .btn {
    position: relative;
    margin-top: 20px;
    left: -5%;
  }
  .word {
    font-size: large;
    font-weight: 900;
  }
  .li-word {
    position: relative;
    left: -40%;
    width: 150%;
  }
}
</style>
