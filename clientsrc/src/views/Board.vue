<template>
  <div class="board container-fluid">
    <div class="m-5">
      <h1 v-if="board.title">{{board.title}}</h1>
      <h1 v-else>Loading...</h1>
    </div>
    <div class="mt-5">
      <button
        type="button"
        class="btn btn-primary btn-lg"
        data-toggle="modal"
        data-target="#one"
      >Modal 1</button>
    </div>
    <div class="row">
      <div class="d-flex overflow-page">
        <Lists v-for="list in listsData" :listData="list" :key="list.id" />
      </div>
    </div>
    <div>
      <quickModal id="one" :key="1">
        <form slot="body" @submit.prevent="addList">
          <div class="form-group">
            <label for>Title</label>
            <input v-model="title" type="text" class="form-control" placeholder />
            <button class="btn btn-sm btn-outline-success">submit</button>
          </div>
        </form>
      </quickModal>
    </div>
  </div>
</template>

<script>
import quickModal from "../components/QuickModal";
import Lists from "../components/Lists";
export default {
  name: "board",
  data() {
    return {
      title: "",
    };
  },
  mounted() {
    console.log(this.$route.params.boardId);
    this.$store.dispatch("getActiveBoard", this.$route.params.boardId);
    this.$store.dispatch("getLists");
  },
  methods: {
    addList() {
      $("#one").modal("hide");
      this.$store.dispatch("addList", {
        title: this.title,
        boardId: this.$route.params.boardId,
      });
      this.title = "";
    },
  },
  computed: {
    board() {
      return this.$store.state.activeBoard;
    },
    listsData() {
      return this.$store.state.lists;
    },
  },
  components: { quickModal, Lists },
  props: ["boardId"],
};
</script>

