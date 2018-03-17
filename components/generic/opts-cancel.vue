<template>
  <div class="btn-group btn-group-sm">
    <!--used font awesome icon for edit and delete-->
    <button v-if="xprops.showbuttons.cancel && !this.row.cancelblock" class="btn btn-default this.row.cancelblock" title="Cancel"
      @click="cancelClicked()"><i class="fa fa-remove"></i></button>
  </div>
</template>
<script>
module.exports = {
  props: ['row', 'xprops'],
  methods: {
      // methods for edit record and delete record
    cancelClicked () {
      this.xprops.eventbus.$emit("cancelproduct",this.row.transactionID);
    }
  }
}
</script>
