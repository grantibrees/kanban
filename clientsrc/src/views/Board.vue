<template>
  <div class="board">
    <div>
      <h1 v-if="board.title">{{board.title}}</h1>
      <h1 v-else>Loading...</h1>
    </div>
    <div>
      <button
        type="button"
        class="btn btn-primary btn-lg"
        data-toggle="modal"
        data-target="#one"
      >Modal 1</button>
    </div>
    <div class="row">
      <Lists v-for="list in Lists" :listData="list" :key="list.id" />
    </div>
    <div>
      <quickModal id="one" :key="1">
        <div slot="title">Fixed?</div>
        <div slot="body">did i do it?</div>
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
  },
  components: { quickModal, Lists },
  props: ["boardId"],
};
</script>

