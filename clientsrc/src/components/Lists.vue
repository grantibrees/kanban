<template>
  <div class="lists col-4">
    <h3>{{listData.title}}</h3>
    <!-- <tasks v-for="task in tasks" :taskData="task" :key="task.id" /> -->
  </div>
</template>


<script>
import tasks from "../components/Tasks";
export default {
  name: "lists",
  data() {
    return {};
  },
  props: ["listData"],
  computed: {
    lists() {
      return this.$store.state.lists;
    },
  },
  methods: {},
  components: {
    tasks,
  },
};
</script>


<style scoped>
</style>