<template>
<div>
  <div class="col-sm-3 col-md-2">
      <!--render sidebar component which show sidebar links-->
      <users-sidebar-view-component></users-sidebar-view-component>
  </div>
  <div class="col-sm-9 col-md-10">
    <h3 class="company-title">Add/Edit User</h3>
    <hr>
    <div>
      <custom-form v-on:formsubmit="saveuser" :datamodel="datamodel" :datafields="datafields" v-if="defloaded && dataloaded">
      </custom-form>
    </div>
  </div>
</div>
</template>
<script>
let tableDefUrl = "/forms/users.json"; // Where to find the fields configuration of form.

/* Configuration of the API to use, for fetching the information. Later when save functionality is also implemented
    This will also contain information of the API endpoint required to save the information.*/
let dataUrlDetails = {
  "view" : {
    "itemName" : "childUsers",
    "url" : "/API/user/",
    "method" :"GET"
  },
  "edit" : {
    "url" : "/API/user/",
    "method" :"PUT"
  },
  "create" : {
    "url" : "/API/user/",
    "method" :"POST"
    }
};
  // Load re-usable custom-form component and provide it the data and form definition.
  // TODO: catch save event and save the information.
module.exports = {
  data: function () {
    return {
    datacount: 0,
    datamodel: {},
    datafields : [],
    defloaded : false,
    dataloaded : false,
    oldpassword : ""
    };
  },
  components : {
  'custom-form' : httpVueLoader('/components/generic/custom-form.vue'),
  'users-sidebar-view-component': httpVueLoader('/components/users/users-sidebar.vue')
  },
  //Fetch the form configuration as well as existing data for the account to be edited.
  // Then set the flags for the form to be rendered

  mounted : function () {
    this.loadForm();
  },
  watch : {
    $route : function() {
      if(this.$route.params.userID=='new') {
        this.dataloaded=false;
        this.datamodel={};
        this.dataloaded=true;
      } else {
        this.loadForm();
      }
    }
  },
  methods : {
    loadForm : function () {
      var self = this;
      let tblData = [];
      let searchObj = {};

      fetchData(tableDefUrl, "GET", {}, function (responseData) {
        self.datafields=responseData;
        self.defloaded=true;
      });

      if(this.$route.params.userID != 'new'){
        fetchData(apiServer+dataUrlDetails.view.url+this.$route.params.userID, dataUrlDetails.view.method,"" , function (responseData) {
          self.oldpassword=responseData.password;
          responseData.password="";
          self.datamodel=responseData;
          self.dataloaded=true;
        });
      }else{
          self.datamodel={};
          self.dataloaded=true;
      }
    },
    saveuser : function (userObj) {
      let router = this.$router, self = this;
      let userInfo = [];

      if(userObj.passwordnew.length){
        if(userObj.passwordnew!=userObj.passwordCn) {
          window.errorLogs.push({"priority": "danger", "title" : "Users" , "message": "Passwords do not match."});
          return false;
        }
        userObj.password=userObj.passwordnew;
      } else {
        userObj.password=this.oldpassword;
      }
        userObj.passwordnew="";
        userObj.passwordCn="";
      if(userObj._id) {
        fetchData(apiServer+dataUrlDetails.edit.url, dataUrlDetails.edit.method, userObj , function (responseData) {
          router.push("/users");
        });
      } else {
        fetchData(apiServer+dataUrlDetails.create.url, dataUrlDetails.create.method, userObj , function (responseData) {
          router.push("/users");
        });
      }
    }
  }
}
</script>
