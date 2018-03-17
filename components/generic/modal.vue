<template>
  <div class="modal fade" tabindex="-1" role="dialog" :id="modalid">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button v-if="modaltype!='confirm'" v-on:click="closed" type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">{{displaytitle}}</h4>
        </div>
        <div class="modal-body">
          <p>{{displaytext}}</p>
          <br/><div v-if="modaltype=='form'">
          <custom-form divnoclass="divnoclass" v-on:cancelevent="cancelevent" v-on:formsubmit="formsubmit" :datamodel="formdata" :datafields="formdef" cancelBehaviour="event">
          </custom-form>
          </div>
        </div>
        <div class="modal-footer">
          <div v-if="modaltype=='confirm'">
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="accepted()">Yes</button>
            <button type="button" class="btn btn-default" data-dismiss="modal" @click="rejected()">No</button>
          </div>
          <div v-if="modaltype=='info'">
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="closed()">Ok</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
    module.exports = {
        props : [ 'modalid','modaltype', 'displaytitle','displaytext', 'formdef', 'formdata' ],
        data: function () {
            return {
              modalid : this.modalid,
              modaltype : this.modaltype || "info",
              displaytitle: this.displaytitle || "",
              displaytext: this.displaytext || "",
              formdef : (this.formdef || []).slice() ,
              formdata : this.formdata || {}
            };
        },
        components: {
        'custom-form' : httpVueLoader('/components/generic/custom-form.vue') // We may be using this modal for form.
        },
        mounted: function () {
          $('#'+this.modalid).modal({show: true, backdrop: "static",keyboard : false}); //Show the modal as soon as it is ready to be shown.
        },
        methods : {
          accepted : function() {
            this.$emit('accepted'); //Emit accepted event if yes is click. Only applicable for confirm type modal
          },
          rejected : function() {
            this.$emit('rejected'); //Emit rejected event if yes is click. Only applicable for confirm type modal
          },
          formsubmit : function (formmodel) {
            this.$emit('formsubmit', formmodel); // Emit event that the form was submitted. Only applicable for form modal.
            $('#'+this.modalid).modal('hide'); // Now hide the box
          },
          closed : function () {
            this.$emit('closed'); // Emit closed event whenever it was closed using X button. Applicable for all modal types.
          },
          cancelevent : function () {
            $('#'+this.modalid).modal('hide'); //Hide modal on cancel event
            this.$emit('closed'); //And we send closed event.
          }
        }
    }
</script>
