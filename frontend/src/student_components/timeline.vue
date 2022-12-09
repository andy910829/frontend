<template>
  <el-timeline class="timeline">
    <el-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      :timestamp="activity.timestamp"
      :type="activity.type"
      :color="activity.colar"
      :size="activity.size"
    >
      {{ activity.content }}
    </el-timeline-item>
  </el-timeline>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      activities: [],
    };
  },
  methods: {
    getTimeLine() {
      const path = import.meta.env.VITE_API + "get_timeline";
      axios.get(path).then((response) => {
        this.activities = response.data.res;
      });
    },
  },
  mounted() {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL); 
      window.addEventListener("popstate", this.backToLastPage, false);
    }
  },
  destroyed() {
    window.removeEventListener("popstate", this.goBack, false);
  },
  created() {
    this.getTimeLine();
  },
};
</script>

<style lang="scss" scoped>
@media screen {
  :deep() .el-timeline-item__tail {
    position: absolute;
    left: 4px;
    height: 100%;
    border-left: 2px solid rgba(10, 1, 18, 0.2);
  }
  .timeline {
    position: absolute;
    left: 40%;
  }
}
@media screen and (max-width: 480px) {
}
</style>
