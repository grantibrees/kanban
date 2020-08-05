<template>
  <div class="QuickModal">
    <div
      class="modal fade"
      :id="id"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="container-fluid" name="lists">
              <div class="row">
                <div class="col-11">
                  <slot name="title"></slot>
                </div>
                <div class="col-1">
                  <button type="button" class="close" data-dismiss="modal">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>
              <div class="row">
                <slot name="listBody"></slot>
                <slot name="taskDescription"></slot>
                <slot name="taskBody"></slot>
                <slot class="commentsDisplay"></slot>
                <slot name="commentsForm"></slot>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "QuickModal",
  data() {
    return {};
  },
  props: ["id"],
  computed: {},
  methods: {},
  components: {},
};
</script>


<style scoped>
</style>
