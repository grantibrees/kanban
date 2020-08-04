<template>
  <div class="tasks">
    <h1>{{taskData.title}}</h1>
    <p>comments: {{taskData.comments.length}}</p>
  </div>
</template>


<script>
export default {
  name: "tasks",
  data() {
    return {};
  },
  props: ["taskData"],
  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
  },
  methods: {},
  components: {},
};
</script>


<style scoped>
</style>