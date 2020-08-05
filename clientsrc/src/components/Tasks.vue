<template>
  <div class="tasks border border-black">
    <div data-toggle="modal" :data-target="'#task-' + taskData.listId">
      <h1>{{taskData.title}}</h1>
    </div>
    <p>comments: {{taskData.comments.length}}</p>

    <QuickModal :id="'task-' + taskData.listId" :key="'key-' + taskData.listId">
      <div slot="title">{{taskData.title}}</div>

      <div slot="taskDescription">

        <div class="row">
        <div v-if="taskData.body.length > 1">
          <div class="col-12">
            <div class="row">
              <div class="col-10">
          {{taskdata.body}}
          </div>
          <div class="col-2">
<button class="btn btn-outline-primary btn-sm" @click="showDescriptForm = !showDescriptForm"
      >Edit</button>
          </div>
          </div>
          </div>
          </div>
        </div>

        <div class="row">
        <div v-if="taskData.body.length < 1">
          <button
        class="btn btn-outline-primary btn-sm"
        @click="showDescriptForm = !showDescriptForm"
      >+</button>
    <div v-if="showDescriptForm">
      <div class="form-group">
        <form @submit.prevent="putTaskDescription">
          <input type="text" v-model="titleData" class="form-control" placeholder="Add Task..." />
        </form>
      </div>
    </div></div></div>

      <div slot="taskBody">

          <div class="form-group">
            <div class="row">
              <div class="col-12">
                <label for>Task Name</label>
              </div>
              <div class="col-10">
                <input
                  slot="inputForm"
                  v-model="title"
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
    </QuickModal>
  </div>
</template>


<script>
import QuickModal from "../components/QuickModal";
export default {
  name: "tasks",
  data() {
    return {
      showDescriptForm: false
      
    };
  },
  props: ["taskData"],
  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
  },

  methods: {},

  components: { QuickModal },
};
</script>


<style scoped>
</style>