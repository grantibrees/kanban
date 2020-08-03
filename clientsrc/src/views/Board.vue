<template>
  <div class="board">
    <h1 v-if="board.title">{{board.title}}</h1>
    <h1 v-else>Loading...</h1>
    <button
      type="button"
      class="btn btn-primary btn-lg"
      data-toggle="modal"
      data-target="#one"
    >Launch</button>
    <quickModal id="one" :key="1">
      <div slot="title">Edit your comment</div>
      <form slot="body">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Enter Comment" />
          <button type="submit" class="btn btn-sm btn-block btn-info">Post Edited Comment</button>
        </div>
      </form>
    </quickModal>
    <div class="row">
      <Lists v-for="list in Lists" :listData="list" :key="list.id" />
    </div>Add List
  </div>
</template>

<script>
import quickModal from "../components/quickModal";
import Lists from "../components/Lists";
export default {
  name: "board",
  data() {
    return {};
  },
  mounted() {
    console.log(this.$route.params.boardId);
    this.$store.dispatch("getActiveBoard", this.$route.params.boardId);
  },
  methods: {},
  computed: {
    board() {
      //FIXME This does not work on page reload because the activeBoard is empty in the store
      return this.$store.state.activeBoard;
    },
    components: {
      Lists,
      quickModal,
    },
  },
  props: ["boardId"],
};
</script>

