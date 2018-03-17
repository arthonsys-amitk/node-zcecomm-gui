<template>
<div>
<custom-form divnoclass="divnoclass" :datamodel="datamodel" :datafields="datafields" submitbtnlabel="Submit" v-on:formsubmit="formsubmited">
</custom-form>
  <div class="col-sm-12 text-center">
    <router-link to="/forgotpassword" class="text-color">Forgot Password?</router-link>
  </div>
</div>
</template>
<script>
let tableDefUrl = "/forms/forgotpassword.json", // Where to find the fields configuration of form.
resetKeyUrlDetails = {
    "url" : "/API/user/passwordReset/",
    "method" :"POST"
  };
  // Load re-usable custom-form component and provide it the data and form definition.
  // TODO: catch save event and save the information.
module.exports = {
  data: function () {
    return {
      datacount: 0,
      datamodel: {"email" : ''},
      datafields : []
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
    });
  },
  methods : {
    formsubmited : function (formdata) {
      fetchData(apiServer+resetKeyUrlDetails.url, resetKeyUrlDetails.method, formdata, function (responseData) {
        window.errorLogs.push("Successful, Please check your email for further instructions.");
      });
    }
  }
}
</script>
