<template>
  <el-container>
    <el-button class="signout-bt" @click="sign_out">登出</el-button>
  </el-container>
</template>

<script>
export default {
  methods: {
    sign_out() {
      this.$emit("signOut");
      sessionStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
@media screen {
  .signout-bt {
    background: #ffffff;
    top: 25%;
    right: 20px;
    position: absolute;
    z-index: 999;
  }
}
@media screen and (max-width: 480px) {
  .signout-bt {
    background: #ffffff;
    top: 10%;
    right: 2%;
    position: absolute;
    z-index: 999;
  }
}
</style>
