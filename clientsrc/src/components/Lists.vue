<template>
  <div
    class="lists minw border border-black my-4 mx-2 px-0"
    dropzone="zone"
    @dragover.prevent
    @drop.prevent="moveTask()"
  >
    <h3 class="bg-success mx-0 px-2 text-nowrap">
      {{listData.title}}
      <button
        class="btn btn-outline-primary btn-sm"
        @click="showTaskForm = !showTaskForm"
      >+</button>
      <button class="btn btn-outline-danger btn-sm" @click="deleteList">-</button>
    </h3>
    <div v-if="showTaskForm">
      <div class="form-group">
        <form @submit.prevent="addTask">
          <input type="text" v-model="titleData" class="form-control" placeholder="Add Task..." />
        </form>
      </div>
    </div>
    <tasks
      v-for="task in tasksData"
      :taskData="task"
      :key="task.id"
      @dragstart="reorderTask(task)"
    />
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

    tempTask() {
      return this.$store.state.tempTask;
    },
  },

  methods: {
    addTask() {
      let payload = {
        title: this.titleData,
        listId: this.listData.id,
      };
      this.$store.dispatch("addTask", payload);
      this.titleData = "";
      this.showTaskForm = !this.showTaskForm;
    },

    moveTask() {
      let moveData = {
        newListId: this.listData.id,
        oldListId: this.tempTask.oldList.id,
        taskToMove: this.tempTask.task,
      };

      this.$store.dispatch("moveTask", moveData);
    },

    reorderTask(task) {
      console.log(task);
      this.$store.dispatch("setTaskToMove", {
        task: task,
        oldList: this.listData,
      });
    },
    deleteList() {
      let payload = {
        boardId: this.listData.boardId,
        listId: this.listData._id,
      };
      this.$store.dispatch("deleteList", payload);
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