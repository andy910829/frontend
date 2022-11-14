<template>
    <div class="body">
        <div class="headertype">
            <pageheader />
            <div>伺服器時間:{{this.time_text}}</div>
        </div>
        <group v-if="status === 'group'" @havegroup="status='ingroup'" @findgroup="status='findgroup'" />
        <ingroup v-else-if="status === 'ingroup'" />
        <professor v-else-if="status === 'professor'" />
        <judge v-else-if="status === 'judge'" />
        <admin v-else-if="status === 'admin'" />
        <findgroup v-else-if="status === 'findgroup'" />
    </div>
</template>

<script>
import group from "../student_components/group.vue"
import ingroup from "../student_components/ingroup.vue"
import professor from "../professor_components/professor.vue"
import admin from "../admin_components/admin.vue"
import judge from "../judge_components/judge.vue"
import pageheader from "../components/header.vue"
import findgroup from "../student_components/findgroup.vue"
import axios from "axios"

export default {
    data() {
        return {
            status: "",
            gap: "",
            time: ""
        }
    },
    components: {
        group,
        ingroup,
        professor,
        admin,
        judge,
        pageheader,
        findgroup
    },
    methods: {
        check() {
            if (!sessionStorage.getItem("user_account")) {
                this.$router.push("/")
            }
        },
        check_identity() {
            switch (sessionStorage.getItem('user_type')) {
                case "student": {
                    if (sessionStorage.getItem("user_identity") != "") {
                        this.status = "ingroup"
                        break;
                    }
                    else {
                        this.status = "group"
                        break;
                    }
                }
                case "professor": {
                    this.status = "professor"
                    break;
                }
                case "admin": {
                    this.status = "admin"
                    break;
                }
                case "judge": {
                    this.status = "judge"
                    break;
                }
            }
        },
        get_new_time() {
            this.time = Date.now()
            let vm = this;
            setTimeout(vm.get_new_time, 1000)
        }
    },
    // sockets: {
    //     connect: function () {
    //         console.log("連接成功")
    //     },
    //     time_recive: function (data) {
    //         this.gap = data - Date.now()
    //         let vm = this;
    //         setTimeout(vm.get_new_time, 1000)
    //     }
    // },
    mounted(){
        const path=import.meta.env.VITE_API+'get_server_time'
        axios.get(path).then(
            response=>{
            this.gap = response.data.res - Date.now()
            let vm = this;
            setTimeout(vm.get_new_time, 1000)
            }
        )
    },
    created() {
        this.check()
        this.check_identity()
    },
    computed: {
        time_text() {
            const date = new Date(this.time + this.gap);
            const year = String(date.getFullYear());
            const month = String((date.getMonth()+1<10?"0":"")+(date.getMonth()+1));
            const day = String((date.getDate()<10?'0':'') + date.getDate());
            const hour = String((date.getHours()<10?'0':'') + date.getHours());
            const minute = String((date.getMinutes()<10?'0':'') + date.getMinutes());
            const second = String((date.getSeconds()<10?'0':'') + date.getSeconds());
            return `${year}/${month}/${day} ${hour}:${minute}:${second}`
        }
    }
}
</script>

<style lang="scss" scoped>
.headertype {
    z-index: 999;
    width: 100%;
    height: 10%;
    background: rgba(255, 255, 255, 0.5);
    position: absolute;
}

.body {
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("../assets/bg.png");
    background-repeat: no-repeat;
    background-size: cover;
}
</style>