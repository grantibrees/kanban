<template>
  <div class="comments">
    <div class="row">
      <div @click="switchShow" v-show="toggleComment">
        <div class="col-12">
          <div class="row">
            <h5>{{commentBody}}</h5>
          </div>

          <div class="row">
            <p>By: {{commentData.creatorEmail}}</p>
          </div>
        </div>
      </div>
      <button @click="deleteComment" type="button" class="btn btn-outline-danger">X</button>

      <div v-show="toggleForm" class="form-group">
        <form @submit.prevent="editComment">
          <input type="text" class="form-control" v-model="commentBody" />

          <button @click="switchShow" type="submit" class="btn btn-success">save</button>
        </form>
      </div>
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
  props: ["commentData", "taskId", "listId"],
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
      this.$store.dispatch("editComment", payload);
    },
    deleteComment() {
      let payload = {
        taskId: this.taskId,
        commentId: this.commentData._id,
        listId: this.listId,
      };
      this.$store.dispatch("deleteComment", payload);
    },
  },
  components: {},
};
</script>

<style scoped>
</style>