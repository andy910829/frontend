<template>
    <el-container>
        <el-aside class="function-list">
            <div class="title">小組資訊</div>
            <div class="display-groupinfo">小組ID:{{group_info.group_id}}</div>
            <div class="display-groupinfo">小組組長:{{group_info.leader}}</div>
            <li v-for="n in count" class="display-groupinfo">小組組員:{{group_info.member_id[n-1]}}--{{group_info.member[n-1]}}</li>
        </el-aside>
        <el-main class="main-display">
            <timeline/>
        </el-main>
    </el-container>
</template>

<script>
import axios from 'axios';
import timeline from "../student_components/timeline.vue"

export default {
    data() {
        return {
            group_info:{},
            count:0,
        }
    },
    components:{
        timeline
    },
    methods:{
        get_group_info(){
            const path=import.meta.env.VITE_API+'group_info'
            axios.get(path,{params:{"group_id":sessionStorage.getItem("group_id")}})
            .then(
                response =>{
                    this.group_info=response.data.group_info
                    this.count = response.data.group_info.member.length
                }
            )
        }
    },
    created(){
        this.get_group_info()
    }
}
</script>

<style scoped>
.title {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    height: 10%;
    font-size: 35px;
    font-weight: 800;
    background: rgba(255, 255, 255, 1);
}

.main-display {
    position: absolute;
    top: 10%;
    left: 20%;
    width: 80%;
    height: 90%;
    background: rgb(255,255,255,0.7);
}

.function-list {
    position: absolute;
    width: 20%;
    height: 90%;
    top: 10%;
    background: rgba(255, 255, 255, 0.5);
}

.display-groupinfo{
    display: flex;
    position: relative;
    top: 80px;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    font-size: large;
    font-weight: 500;
    height:50px;
    width:100%;
    background-color: aliceblue;
}
</style>