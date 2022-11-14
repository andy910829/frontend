<template>
    <div class="title">小組資訊</div>
    <div class="display-groupinfo">小組ID:{{group_info.group_id}}</div>
    <div class="display-groupinfo">小組組長:{{group_info.leader}}</div>
    <li v-for="n in count" class="display-groupinfo">小組組員:{{group_info.member_id[n-1]}}--{{group_info.member[n-1]}}</li>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            group_info: {},
            count: 0,
        }
    },
    methods: {
        get_group_info() {
            const path = import.meta.env.VITE_API+'group_info'
            axios.get(path, { params: { "group_id": sessionStorage.getItem("group_id") } })
                .then(
                    response => {
                        this.group_info = response.data.group_info
                        this.count = response.data.group_info.member.length
                    }
                )
        }
    },
    created() {
        this.get_group_info()
    }
}

</script>

<style scoped>
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
    left:25%;
    background-color: aliceblue;
}
</style>