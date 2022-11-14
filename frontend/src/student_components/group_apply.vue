<template>
    <el-container>
        <el-header class="title">申請加入名單</el-header>
        <el-main>
            <li v-for="apply in apply_list" class="apply-list">
                申請人:{{apply}} 
                <el-button type="success" @click="ans='accept', ans_apply(apply)">允許</el-button>
                <el-button type="danger" @click="ans='reject', ans_apply(apply)" >拒絕</el-button>
            </li>
        </el-main>
    </el-container>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            apply_list: [],
            asn:""
        }
    },
    methods: {
        get_apply() {
            const path = import.meta.env.VITE_API+'find_apply'
            axios.post(path, { group_id: sessionStorage.getItem("group_id"), type: "get_apply" }).then(
                response => {
                    this.apply_list = response.data.res
                }
            )
        },
        ans_apply(apply){
            const path = import.meta.env.VITE_API+'find_apply'
            console.log(this.ans, apply)
            axios.post(path, { group_id: sessionStorage.getItem("group_id"), type: this.ans, student_id: apply}).then(
                response => {
                    if (response.data.res === true){
                        let position = this.apply_list.indexOf(apply)
                        this.apply_list.splice(position,1)
                        this.$message.success('已接受申請')
                    }
                    else if (response.data.res === 'false'){
                        let position = this.apply_list.indexOf(apply)
                        this.apply_list.splice(position,1)
                        this.$message.warning('已拒絕申請')
                    }
                }
            )
        },
        
    },
    created() {
        this.get_apply()
    }

}
</script>

<style lang="scss" scoped>
.apply-list {
    margin-bottom: 10px;
}

.title {
    font-size: 35px;
    font-weight: 900;
}
</style>