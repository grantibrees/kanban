<template>
  <div class="home">
    <h1>This is your home page.</h1>
    <button
      type="button"
      class="btn btn-primary btn-lg"
      data-toggle="modal"
      data-target="#one"
    >Modal 1</button>
    <QuickModal id="one" :key="1">
      <div slot="title">work?</div>
      <div slot="body">please?</div>
    </QuickModal>
  </div>
</template>


<script>
import QuickModal from "../components/QuickModal";

export default {
  name: "home",
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: { QuickModal },
};
</script>


<style scoped>
</style>