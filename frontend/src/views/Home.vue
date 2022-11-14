<template>
  <div class="body">
    <login v-if="status === 'login'" @register="status = 'register'" @forgetpd="status = 'forgetpd'"/>
    <register v-else-if="status === 'register'" @already_signup="status = 'login'" @verification="status = 'verification'"/>
    <forgetpd v-else-if="status === 'forgetpd'" @forgetpd_verify="status = 'verification'" @verify_false="status='login'"/>
    <verification v-else-if="status === 'verification'"  @create_verification_succeeded="status = 'login'" @reset_verification_succeeded="status = 'resetpd'"/>
    <resetpd v-else-if="status === 'resetpd'" @reset_succeeded="status = 'login'"/>
  </div>
</template>

<script>
  import login from "../components/login.vue"
  import register from "../components/register.vue"
  import forgetpd from "../components/forgetpd.vue"
  import verification from "../components/verification_code.vue"
  import resetpd from "../components/resetpd.vue"

  export default {
    data(){
      return{
        status:"login"
      }
    },
    components:{
      login,
      register,
      forgetpd,
      verification,
      resetpd,
    }
  }
</script>

<style lang="scss" scoped>
.body{
  display:flex;
  width:100%;
  top: 0;
	left: 0;
	right: 0;
	bottom: 0;
  position: absolute;
  background-image: url("../assets/bg.png");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>