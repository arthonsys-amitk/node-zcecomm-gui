<template>
  <div class="btn-group btn-group-sm">
    <!--used font awesome icon for edit and delete-->
    <button  v-if="xprops.showbuttons.edit && !this.row.editblock" class="btn btn-primary" title="Edit"
      @click="editRow()"><i class="fa fa-edit"></i></button>
    <button v-if="xprops.showbuttons.delete && !this.row.delblock" class="btn btn-danger" title="Delete"
      @click="delClicked()"><i class="fa fa-trash"></i></button>
    <button v-if="xprops.showbuttons.cancel && !this.row.cancelblock" class="btn btn-default this.row.cancelblock" title="Cancel"
      @click="cancelClicked()"><i class="fa fa-remove"></i></button>
  </div>
</template>
<script>
module.exports = {
  props: ['row', 'xprops'],
  methods: {
      // methods for edit record and delete record
    editRow () {
      this.$router.push(this.$route.path+"/"+this.row._id);
    },
    delClicked () {
      this.xprops.eventbus.$emit('deleterow',this.row._id);
    },
    cancelClicked () {
      this.xprops.eventbus.$emit("cancelrow",this.row._id);
    }
  }
}
</script>
