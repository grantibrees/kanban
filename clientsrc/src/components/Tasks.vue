<template>
  <div class="tasks border border-black">
    <div data-toggle="modal" :data-target="'#task-' + taskData.listId">
    <h1>{{taskData.title}}</h1>
    </div>
<QuickModal :id="'task-' + taskData.listId" :key="'key-' + taskData.listId">

</QuickModal>

    <p>comments: {{taskData.comments.length}}</p>
  </div>
</template>


<script>
import QuickModal from "../components/QuickModal"
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

  components: {QuickModal},
};
</script>


<style scoped>
</style>