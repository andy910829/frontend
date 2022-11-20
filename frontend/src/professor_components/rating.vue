<template>
    <el-button @click="back" class="back-bt">返回上一頁</el-button>
    <div>
        {{'小組ID: '+group.group_id}}<br/>
        {{'組長: '+group.leader.student_id+" " +group.leader.name}}
        <div v-for="member in group.member">
        {{'組員: '+member.student_id+" "+member.name}}
        </div>
    </div>
</template>

<script>
    export default {
        props:['groupinfo'],
        data(){
            return{
                group:this.groupinfo
            }
        },
        methods:{
            back(){
                this.$emit('back')
            }
        }
    }
</script>

<style lang="scss" scoped>
.back-bt{
    position:absolute;
    left:10px;
    border-radius: 20px;
}

</style>