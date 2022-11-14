<template>
    <el-timeline class="timeline">
                <el-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp" :type="activity.type" 
                :color="activity.colar" :size="activity.size">
                    {{ activity.content }}
                </el-timeline-item>
    </el-timeline>
</template>

<script>
    export default {
        data(){
            return{
                activities: [
                {
                    content: 'Event start',
                    timestamp: '2018-04-15',
                    colar:'#0bbd87',
                    type:'primary',
                    size:'large'
                },
                {
                    content: 'Event start',
                    timestamp: '2018-04-15',
                    colar:'#0bbd87',
                    type:'primary',
                    size:'large'
                },
                {
                    content: 'Event start',
                    timestamp: '2018-04-15',
                    colar:'#0bbd87',
                    type:'primary',
                    size:'large'
                },
            ]
            }
        }
        
    }
</script>

<style lang="scss" scoped>
::v-deep .el-timeline-item__tail {
    position: absolute;
    left: 4px;
    height: 100%;
    border-left: 2px solid rgba(10, 1, 18, 0.2);
}
.timeline {
    position: absolute;
    left:40%;
}
</style>