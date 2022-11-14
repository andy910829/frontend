<template>
    <el-container>
        <el-aside class="function-list">
            <div class="title">功能列表</div>
            <button class="function-bt" @click="status = 'group_info'">小組資訊</button>
            <button class="function-bt" @click="status ='group_apply'">加入申請</button>
            <button class="function-bt" @click="status = 'interim_report'">繳交期中報告</button>
            <button class="function-bt" @click="status = 'competition_reg'">報名專題競賽</button>
            <button class="function-bt" @click="status = 'timeline'">時程表</button>
        </el-aside>
        <el-main class="main-display">
            <group_apply v-if="status === 'group_apply'"/>
            <interim_report v-else-if="status === 'interim_report'"/>
            <competition_reg v-else-if="status === 'competition_reg'"/>
            <group_info v-if="status === 'group_info'"/>
            <timeline v-if="status === 'timeline'"/>
        </el-main>
    </el-container>
</template>

<script>
import group_apply from "../student_components/group_apply.vue"
import interim_report from "./interm_report.vue"
import competition_reg from "../student_components/competition_reg.vue"
import group_info from "../student_components/group_info.vue"
import timeline from "../student_components/timeline.vue"

export default {
data(){
    return{
        status:""
    }
},
 components:{
    group_apply,
    interim_report,
    competition_reg,
    group_info,
    timeline
 }
}
</script>

<style scoped>
.title {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width:100%;
    height:10%;
    font-size: 35px;
    font-weight: 800;
    background: rgba(255, 255, 255, 1);
}

.function-bt {
    position: relative;
    margin-bottom: 10px;
    top: 100px;
    width: 100%;
    font-size: large;
}
.main-display{
    position: absolute;
    top:10%;
    left:20%;
    width:80%;
    height:90%;
    background:  rgba(255, 255, 255, 0.7);
}
.function-list {
    position: absolute;
    width:20%;
    height: 90%;
    top: 10%;
    background: rgba(255, 255, 255, 0.5);
}
</style>