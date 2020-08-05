<template>
  <div class="comments col-12">
    <h5>By: {{commentData.creatorEmail}}</h5>
    <p>{{commentData.body}}</p>
  </div>
</template>


<script>
export default {
  name: "comments",
  data() {
    return {};
  },
  props: ["commentData"],
  computed: {},
  methods: {},
  components: {},
};
</script>

<style scoped>
</style>