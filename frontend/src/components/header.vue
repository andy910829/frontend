<template>
    <el-container>
        <el-button class="signout-bt" @click="sign_out" >登出</el-button>
    </el-container>
</template>
    
<script>

export default {
    methods:{
        sign_out(){
            sessionStorage.clear()
            this.$router.push("/")
        }
    }
}

</script>
      
<style scoped>
.signout-bt {
    background: #ffffff;
    top:25%;
    right:20px;
    position: absolute;
}
</style>
      
    