<template>
  <div class="tasks">
    <h1>hello</h1>
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