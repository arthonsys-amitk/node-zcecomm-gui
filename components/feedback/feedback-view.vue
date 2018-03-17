<template>
<div class="container">
  <custom-table v-on:deleterow="deleteRow" v-on:searchserver="dataSearch" entityname="feedback" :buttons="buttonsallowed" :tabledata="tabledata" :tabledef="tabledef" :datacount="datacount" v-if="defloaded && dataloaded">
  </custom-table>
</div>
</template>
<script>

//Define the URL from where to get the configuration of datatable.
let tableDefUrl = "/datatables/feedback.json";
// Define from where to fetch the list of accounts.

let dataUrlDetails = {
  "search" : {
    "itemName" : "feedbacks",
    "url" : "/API/feedback/search",
    "method" :"POST"
  },
  "delete" : {
    "url" : "/API/feedback",
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
    dataloaded : false,
    buttonsallowed : {"delete" : true}
    };
  },
  // Load re-usable table component.
  components : {
  'custom-table' : httpVueLoader('/components/generic/custom-table.vue')
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
    fetchData(apiServer+dataUrlDetails.search.url, dataUrlDetails.search.method, "", function (responseData) {
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
    }
  }
}
</script>
