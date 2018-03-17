<template>
<div>
  <div class="col-sm-3 col-md-2">
      <!--render sidebar component which show sidebar links-->
      <products-sidebar-view-component></products-sidebar-view-component>
  </div>
  <div class="col-sm-9 col-md-10">
    <h3 class="company-title">Add/Edit Product</h3>
    <hr>
    <div>
      <custom-form v-on:formsubmit="saveproduct" :datamodel="datamodel" :datafields="datafields" v-if="defloaded && dataloaded">
      </custom-form>
    </div>
  </div>
</div>
</template>
<script>
let tableDefUrl = "/forms/products.json"; // Where to find the fields configuration of form.

/* Configuration of the API to use, for fetching the information. Later when save functionality is also implemented
    This will also contain information of the API endpoint required to save the information.*/
let dataUrlDetails = {
  "view" : {
    "itemName" : "childUsers",
    "url" : "/API/product/",
    "method" :"GET"
  },
  "edit" : {
    "url" : "/API/product/",
    "method" :"PUT"
  },
  "create" : {
    "url" : "/API/product/",
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
    };
  },
  components : {
  'custom-form' : httpVueLoader('/components/generic/custom-form.vue'),
  'products-sidebar-view-component': httpVueLoader('/components/products/products-sidebar.vue')
  },
  //Fetch the form configuration as well as existing data for the account to be edited.
  // Then set the flags for the form to be rendered

  mounted : function () {
    this.loadForm();
  },
  watch : {
    $route : function() {
      if(this.$route.params.productID=='new') {
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

      if(this.$route.params.productID != 'new'){
        fetchData(apiServer+dataUrlDetails.view.url+this.$route.params.productID, dataUrlDetails.view.method,"" , function (responseData) {
          self.datamodel=responseData;
          self.dataloaded=true;
        });
      }else{
          self.datamodel={};
          self.dataloaded=true;
      }
    },
    saveproduct : function (productObj) {
      let router = this.$router, self = this;
      let productInfo = [];

      if(productObj._id) {
        fetchData(apiServer+dataUrlDetails.edit.url, dataUrlDetails.edit.method, productObj , function (responseData) {
          router.push("/products");
        });
      } else {
        fetchData(apiServer+dataUrlDetails.create.url, dataUrlDetails.create.method, productObj , function (responseData) {
          router.push("/products");
        });
      }
    }
  }
}
</script>
