<template>
  <div class="comments col-12">
    <h5>By: {{commentData.creatorEmail}}</h5>
    <div @click="switchShow" v-show="toggleComment">
      <p>{{commentBody}}</p>
      <button @click="deleteComment" class="btn btn-danger">delete</button>
    </div>
    <div v-show="toggleForm" class="form-group">
      <form @submit.prevent="editComment">
        <input type="text" class="form-control" v-model="commentBody" />

        <button @click="switchShow" type="submit" class="btn btn-success">save</button>
      </form>
    </div>
  </div>
</template>


<script>
export default {
  name: "comments",
  data() {
    return {
      toggleComment: true,
      toggleForm: false,
      commentBody: this.commentData.body,
    };
  },
  props: ["commentData", "taskId"],
  computed: {},
  methods: {
    switchShow() {
      this.toggleComment = !this.toggleComment;
      this.toggleForm = !this.toggleForm;
    },
    editComment() {
      let payload = {
        commentId: this.commentData._id,
        body: this.commentBody,
        taskId: this.taskId,
      };
      debugger;
      this.$store.dispatch("editComment", payload);
    },
    deleteComment() {
      payload = {
        taskId: this.taskId,
        commentId: this.commentData,
      };
    },
  },
  components: {},
};
</script>

<style scoped>
</style>