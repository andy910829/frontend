<template>
  <div>
    <h2>專題競賽申請</h2>
    <button class="lastpage-bt" @click="backToLastPage">上一頁</button>
    <div v-for="GroupInfo in GroupList" :key="GroupInfo.group_id">
      <div class="card">
        <li class="word">
        小組ID:{{ GroupInfo.group_id }}
      </li>
      <li class="word">
        組長:{{ GroupInfo.leader.student_id + " " }}{{ GroupInfo.leader.name }}
      </li>
      <li v-for="member in GroupInfo.member" class="word">
        組員:{{ member.student_id + " " }}{{ member.name }}
      </li>
      <li class="word">
        YouTube連結:<a v-bind:href="GroupInfo.competition.YT_link" target="_blank"
          >連結點我</a
        >
      </li>
      <li class="word">專題競賽題目:{{ GroupInfo.competition.competition_topics }}</li>
        <el-button type="primary" @click="get_file(GroupInfo)" class="download-bt"
          >下載專題競賽報告</el-button
        >
        <el-button
          type="primary"
          @click="preview_file(GroupInfo)"
          class="download-bt"
        >
          預覽專題競賽報告
        </el-button>
        <br />
        <el-button type="success" class="ck-bt" @click="this.ansStatus='accept',ansCompetitonStatus(GroupInfo)">接受</el-button>
        <el-button type="danger" class="ck-bt" @click="this.ansStatus='reject',ansCompetitonStatus(GroupInfo)">拒絕</el-button>
      </div>
      <br />
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      GroupList: [],
      ansStatus:''
    };
  },
  methods: {
    backToLastPage() {
      this.$emit("backToLastPage");
    },
    ansCompetitonStatus(groupInfo){
        const path = import.meta.env.VITE_API + "ans_competiton_status";
        axios.post(path,{group_id:groupInfo.group_id,status:this.ansStatus,pro_name:groupInfo.advisor}).then(
            response=>{
                if (response.data.res === 'accept'){
                    this.$message.success('已接受申請')
                }
                else if (response.data.res === 'reject'){
                    this.$message.warning('已拒絕申請')
                }
                this.GroupList=[]
            }
        )
    },
    GetGroupInfo() {
      const path = import.meta.env.VITE_API + "GetGroupInfo_Pro";
      axios
        .post(path, { pro_name: sessionStorage.getItem("name") })
        .then((response) => {
          for (const count in response.data.res) {
            if (response.data.res[count].competition.status === "waiting") {
              this.GroupList.push(response.data.res[count]);
            }
          }
        });
    },
    preview_file(group) {
      const path = import.meta.env.VITE_API + "get_file";
      axios
        .post(
          path,
          { group_id: group.group_id, type: "competition_report" },
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
    get_file(group) {
      const path = import.meta.env.VITE_API + "get_file";
      axios
        .post(
          path,
          { group_id: group.group_id, type: "competition_report" },
          { responseType: "blob" }
        )
        .then((response) => {
          let blob = new Blob([response.data], { type: "application/pdf" });
          let reader = new FileReader();
          let file_name =
            group.group_id + "專題競賽報告.pdf";
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
  }
};
</script>

<style lang="scss" scoped>
@media screen {
  .lastpage-bt{
    display: none;
  }
  .word {
    font-size: large;
    font-weight: 500;
    text-align: left;
    margin-left: 25%;
  }
  .card {
    position: relative;
    margin-top: 5%;
    border-radius: 20px;
    left: 26.5%;
    width: 40%;
    background-color: aliceblue;
    font-size: medium;
    font-weight: 500;
  }
  .download-bt {
    position: relative;
    margin-top: 2%;
  }
  .ck-bt {
    position: relative;
    margin-top: 2%;
  }
}
@media screen and (max-width: 480px) {
  .word {
    position: relative;
    font-size: medium;
    font-weight: 500;
    margin-left: 5%;
  }
  .card {
    position: relative;
    margin-top: 5%;
    left: 5%;
    width: 70%;
    background-color: aliceblue;
    font-size: medium;
    font-weight: 500;
  }
  .download-bt {
    display: none;
  }
  .ck-bt {
    position: relative;
    margin-top: 2%;
  }
  .lastpage-bt{
    display: block;
    position: absolute;
    font-size: 5px;
    top:2.5%;
    left:0%;
    width:15%;
    height:7%;
  }
}
</style>
