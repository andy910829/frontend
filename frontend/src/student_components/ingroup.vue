<template>
    <group_leader v-if="status === 'group_leader'"/>
    <group_member v-else-if="status === 'group_member'"/>
</template>

<script>
import group_leader from "../student_components/group_leader.vue"
import group_member from "../student_components/group_member.vue"

export default {
    data() {
        return {
            status: ""
        }
    },
    components:{
        group_leader,
        group_member
    },
    methods:{
        check_identity(){
            switch (sessionStorage.getItem("user_identity")){
                case "group_leader":{
                    this.status = "group_leader"
                    break;
                }
                case "group_member":{
                    this.status = "group_member"
                    break;
                }
            }

        }
    },
    created(){
        this.check_identity()
    }
}
</script>

<style lang="scss" scoped>

</style>