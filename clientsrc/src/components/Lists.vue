<template>
  <div class="lists minw border border-black my-4 mx-2 px-0">
    <h3 class="bg-success mx-0 px-2 text-nowrap ">{{listData.title}}</h3>
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
.minw{
  min-width: 20rem;
}
</style>