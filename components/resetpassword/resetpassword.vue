<template>
<div>
<custom-form v-if="defloaded" divnoclass="divnoclass" :datamodel="datamodel" :datafields="datafields" submitbtnlabel="Update" v-on:formsubmit="formsubmited">
</custom-form>
</div>
</template>
<script>
let tableDefUrl = "/forms/form.json", // Where to find the fields configuration of form.
passwordResetUrl = {
    "url" : "/API/user/updateForgotPassword",
    "method" :"PUT",
};
  // Load re-usable custom-form component and provide it the data and form definition.
  // TODO: catch save event and save the information.
module.exports = {
  data: function () {
    return {
      datacount : 0,
      datamodel : {resetKey : "", password : "", confirmpassword: ""},
      datafields : [],
      defloaded : false
    };
  },
  components : {
  'custom-form' : httpVueLoader('/components/generic/custom-form.vue')
  },
  mounted : function () {
    var self = this;
    let tblData = [];
    fetchData(tableDefUrl, "GET", {}, function (responseData) {
      self.datafields=responseData;
      self.defloaded=true;
    });
  },
  methods : {
    formsubmited : function (formdata) {
      if(formdata.password!=formdata.confirmpassword) {
        window.errorLogs.push({"stauts" : "error", "message" : "Passwords do not match."});
        return false;
      }
      formdata.resetKey=this.$route.params.resetKey;
      fetchData(apiServer+passwordResetUrl.url, passwordResetUrl.method, formdata, function (responseData) {
        if(responseData==1){
          window.errorLogs.push({"status" : "success", "message" : "Password changed successfully"});
        }
        else {
          window.errorLogs.push({"status" : "error", "message" : "Invalid reset key."});
        }
      });
    }
  }
}
</script>
