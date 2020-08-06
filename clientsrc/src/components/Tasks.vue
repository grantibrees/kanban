<template>
  <div class="tasks border border-black" @dragstart="moveTask()">
    <div data-toggle="modal" :data-target="'#task-' + taskData.listId">
      <h1>{{taskData.title}}</h1>
    </div>
    <p>comments: {{taskData.comments.length}}</p>

    <QuickModal :id="'task-' + taskData.listId" :key="'key-' + taskData.listId">
      <div slot="title">{{taskData.title}}</div>

      <div slot="taskDescription">
        <div v-if="showDescriptForm == false">
          <div class="row">
            <div>
              <div class="col-12">
                <div class="row">
                  <div @click="switchShow" v-show="taskData.body " v class="col-10">{{taskBody}}</div>
                  <div
                    @click="switchShow"
                    v-show="!taskData.body "
                    class="col-10"
                  >Please insert a description...</div>
                  <div class="col-2">
                    <button
                      class="btn btn-outline-primary btn-sm"
                      @click="showDescriptForm = !showDescriptForm"
                    >Edit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div v-if="taskData.body">
            <div v-if="showDescriptForm">
              <div class="form-group">
                <form @submit.prevent="putTaskDescription">
                  <input type="text" class="form-control" v-model="taskBody" />
                  <button @click="switchShow" type="submit" class="btn btn-success">save</button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div slot="taskBody">
          <div class="form-group">
            <div class="row">
              <div class="col-12">
                <label for>Add a Comment</label>
              </div>
              <div class="col-10">
                <input
                  slot="inputForm"
                  v-model="commentBody"
                  type="text"
                  class="form-control"
                  placeholder
                />
              </div>
              <div class="col-2">
                <button slot="inputButton" class="btn btn-sm btn-outline-success">submit</button>
              </div>
            </div>
          </div>
        </div>
        <div slot="commentsDisplay" class="row">
          <Comments v-for="comment in taskData.comments" :commentData="comment" :key="comment._id" />
        </div>
      </div>
    </QuickModal>
  </div>
</template>


<script>
import QuickModal from "../components/QuickModal";
import Comments from "../components/Comments";
export default {
  name: "tasks",
  data() {
    return {
      showDescriptForm: false,
      showDescription: true,
      commentBody: "",
      taskBody: this.taskData.body,
    };
  },
  props: ["taskData"],
  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
  },

  methods: {
    putTaskDescription() {
      let payload = {
        body: this.taskBody,
        taskId: this.taskData.id,
      };
      this.$store.dispatch("editTaskDescription", payload);
    },
    switchShow() {
      this.showDescription = !this.showDescription;
      this.showDescriptForm = !this.showDescriptForm;
    },
    moveTask() {
      this.$emit("dragstart");
    }
  },

  components: { QuickModal, Comments },
};
</script>


<style scoped>
</style>