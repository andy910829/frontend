<template>
  <div class="title">小組資訊</div>
  <button class="lastpage-bt" @click="backToLastPage">上一頁</button>
  <div class="card">
    <div class="word">小組ID:{{ group_info.group_id }}</div>
    <div class="word">
      組長:{{ group_info.leader.student_id + " " }}{{ group_info.leader.name }}
    </div>
    <div v-for="member in group_info.member" class="word">
      組員:{{ member.student_id + " " }}{{ member.name }}
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      group_info: {},
      count: 0,
    };
  },
  methods: {
    backToLastPage() {
      this.$emit("backToLastPage");
    },
    get_group_info() {
      const path = import.meta.env.VITE_API + "group_info";
      axios
        .get(path, { params: { group_id: sessionStorage.getItem("group_id") } })
        .then((response) => {
          this.group_info = response.data.group_info;
          this.count = response.data.group_info.member.length;
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
    window.removeEventListener("popstate", this.goBack, false);
  },
  created() {
    this.get_group_info();
  },
};
</script>

<style scoped>
@media screen {
  .word {
    position: relative;
    left: 30%;
  }
  .lastpage-bt {
    display: none;
  }
  .card {
    position: relative;
    margin-top: 5%;
    border-radius: 20px;
    left: 27.5%;
    width: 40%;
    background-color: aliceblue;
    font-size: medium;
    font-weight: 500;
    text-align: left;
  }
  .title {
    font-size: 35px;
    font-weight: 900;
  }

  .display-groupinfo {
    display: flex;
    position: relative;
    top: 30px;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    font-size: large;
    font-weight: 500;
    height: 50px;
    width: 50%;
    left: 25%;
    background-color: aliceblue;
  }
}
@media screen and (max-width: 480px) {
  .word {
    position: relative;
    left: 10%;
  }
  .lastpage-bt {
    display: block;
    position: absolute;
    font-size: 10px;
    top: 2.5%;
    left: 0%;
    width: 15%;
    height: 7%;
  }
  .title {
    font-size: 35px;
    font-weight: 500;
  }

  .card {
    position: relative;
    margin-top: 10%;
    border-radius: 20px;
    left: 15%;
    width: 55%;
    background-color: aliceblue;
    font-size: medium;
    font-weight: 500;
    text-align: left;
  }
}
</style>
