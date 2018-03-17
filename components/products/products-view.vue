<template>
<div>
  <div class="col-sm-3 col-md-2">
      <!--render sidebar component which show sidebar links-->
      <products-sidebar-view-component></products-sidebar-view-component>
  </div>
  <div class="col-sm-9 col-md-10">
    <div class="row">
      <div class="col-sm-9">
          <h3 class="col-sm-9">Product Listing</h3>
      </div>
      <div class="col-sm-3">
          <button class="margin-top-10 btn-primary pull-right padding-10" title="New"
      @click="newRow()">Add new product</button>
      </div>
    </div>
     <hr>
    <div class="col-sm-offset-3 col-sm-6">
        <user-message></user-message>
    </div>

    <custom-table v-on:deleterow="deleteRow" v-on:searchserver="dataSearch" entityname="user" :tabledata="tabledata" :tabledef="tabledef" :datacount="datacount" v-if="defloaded && dataloaded">
    </custom-table>
  </div>
</div>
</template>
<script>

//Define the URL from where to get the configuration of datatable.
let tableDefUrl = "/datatables/products.json";
// Define from where to fetch the list of accounts.

let dataUrlDetails = {
  "search" : {
    "itemName" : "childProducts",
    "url" : "/API/product/search",
    "method" :"POST"
  },
  "delete" : {
    "url" : "/API/product",
    "method" :"DELETE",
  }
};
module.exports = {
// Pass the data for table rendering.
  data: function () {
    return {
    datacount: 0,
    tabledef: [],
    tabledata : [],
    defloaded : false,
    dataloaded : false
    };
  },
  // Load re-usable table component.
  components : {
  'custom-table' : httpVueLoader('/components/generic/custom-table.vue'),
  'products-sidebar-view-component': httpVueLoader('/components/products/products-sidebar.vue')
  },
  // Fetch the table configuration as well as existing data for the accounts to be listed.
  // Then set the flags for the table to be rendered

  mounted : function () {
    var self = this;
    let tblData = [];
    fetchData(tableDefUrl, "GET", {}, function (responseData) {
      self.tabledef=responseData;
      self.defloaded=true;
    });

    fetchData(apiServer+dataUrlDetails.search.url, dataUrlDetails.search.method,"", function (responseData) {     
      for(let i=0;i<responseData.length;i++) {
        responseData[i].cancelblock=true;
      }  
      self.tabledata=responseData;
      self.datacount=responseData.length;
      self.dataloaded=true;
    });
  },
  methods : {
    dataSearch : function (search,sort) {
    var self = this;
    self.dataloaded=false; // We set this to false, since we are going to reload the data.
    //Lets perform the search now
      fetchData(apiServer+dataUrlDetails.search.url, dataUrlDetails.search.method, search, function (responseData) {
        self.tabledata=responseData;
        self.datacount=responseData.length;
        self.dataloaded=true;
      });
    },
    deleteRow : function (id) {
      var self = this;
      self.dataloaded=false; // We set this to false, since we are going to reload the data.
      //Lets delete the row
      fetchData(apiServer+dataUrlDetails.delete.url, dataUrlDetails.delete.method, {"_id" : id}, function (delResponse) {
        //Lets refresh the table now
        fetchData(apiServer+dataUrlDetails.search.url, dataUrlDetails.search.method, "", function (responseData) {
          self.tabledata=responseData;
          self.datacount=responseData.length;
          self.dataloaded=true;
        });
      });
    },
    newRow : function() {
      this.$router.push(this.$route.path+"/new");
    }
  }
}
</script>
