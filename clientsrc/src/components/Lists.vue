<template>
  <div class="lists minw border border-black my-4 mx-2 px-0">
    <h3 class="bg-success mx-0 px-2 text-nowrap">
      {{listData.title}}
      <button
        class="btn btn-outline-primary btn-sm"
        @click="showTaskForm = !showTaskForm"
      >+</button>
    </h3>
    <div v-if="showTaskForm">
      <div class="form-group">
        <form @submit.prevent="addTask">
          <input type="text" v-model="titleData" class="form-control" placeholder="Add Task..." />
        </form>
      </div>
    </div>
    <tasks v-for="task in tasksData" :taskData="task" :key="task.id" />
  </div>
</template>


<script>
import tasks from "../components/Tasks";
export default {
  name: "lists",
  data() {
    return {
      showTaskForm: false,
      titleData: "",
    };
  },
  props: ["listData"],
  mounted() {
    this.$store.dispatch("getTasks", this.listData.id);
  },
  computed: {
    lists() {
      return this.$store.state.lists;
    },
    tasksData() {
      return this.$store.state.tasks[this.listData.id];
    },
  },

  methods: {
    addTask() {
      debugger;
      let payload = {
        title: this.titleData,
        listId: this.listData.id,
      };
      this.$store.dispatch("addTask", payload);
      this.titleData = "";
    },
  },
  components: {
    tasks,
  },
};
</script>


<style scoped>
.minw {
  min-width: 20rem;
}
</style>