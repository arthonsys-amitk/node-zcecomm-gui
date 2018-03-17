<template>
<div>
  <div class="col-sm-3 col-md-2">
      <!--render sidebar component which show sidebar links-->
      <purchases-sidebar-view-component></purchases-sidebar-view-component>
  </div>
  <div class="col-sm-9 col-md-10">
    <div class="row">
      <div class="col-sm-9">
          <h3 class="col-sm-9">Purchase Listing</h3>
      </div>
      <div class="col-sm-3">
          <button class="margin-top-10 btn-primary pull-right padding-10" title="New"
      @click="newRow()">Add new purchase</button>
      </div>
    </div>
     <hr>


    <div class="search-container" >
    <search-view class="comp" :searchtypes="searchtypes"  :defaulttype="defaultsearchtype" :searchvalue="searchvalue" v-on:searchpurchase="dataSearch">
    </search-view >
    </div>
    <div class="col-sm-offset-3 col-sm-6">
        <user-message></user-message>
    </div>

    <custom-table-purchase v-on:deleterow="deleteRow" v-on:cancelrow="cancelRow" v-on:cancelproduct="cancelRow" v-on:searchserver="dataSearch" entityname="user" :tabledata="tabledata" :tabledef="tabledef" :datacount="datacount" v-if="defloaded && dataloaded" >
    </custom-table-purchase>
    

  </div>
</div>
</template>

<style>

.search-container{
  width: 100%;
  margin-bottom: 8px;
  
}

.comp{
    
    padding:4px;
    margin:4px;
    display: inline-block;
    
    
}

</style>

<script>



//Define the URL from where to get the configuration of datatable.
let tableDefUrl = "/datatables/purchases.json";
let searchTypesUrl = "/datatables/purchase-search.json";
// Define from where to fetch the list of accounts.

let dataUrlDetails = {
  "search" : {
    "url" : "/API/purchase/search",
    "method" :"POST"
  },
  "delete" : {
    "url" : "/API/purchase",
    "method" :"DELETE",
  },
  "cancel" : {
    "url" : "/API/purchase/cancelSubscription",
    "method" :"POST",
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
    purchasedItems:[],
    searchtypes:[],
    defaultsearchtype:{},
    searchvalue:""
    };
  },
  // Load re-usable table component.
  components : {
  'custom-table-purchase' : httpVueLoader('/components/generic/custom-table-purchase.vue'),
  'purchases-sidebar-view-component': httpVueLoader('/components/purchases/purchases-sidebar.vue'),
   'search-view': httpVueLoader('/components/generic/search-view.vue'),
  },
  // Fetch the table configuration as well as existing data for the accounts to be listed.
  // Then set the flags for the table to be rendered

  mounted : function () {
    var self = this;
    let tblData = [];

    fetchData(tableDefUrl, "GET", {}, function (responseData) {
      self.tabledef=responseData;
      console.log("TableDef");
      console.log(self.tabledef);
      self.defloaded=true;
    });


    fetchData(searchTypesUrl, "GET", {}, function (responseData) {
      self.searchtypes=responseData;
      self.defaultsearchtype=self.searchtypes[0].value;
      self.defloaded=true;
    });

    fetchData(apiServer+dataUrlDetails.search.url, dataUrlDetails.search.method,"", function (responseData) {   
      
      let purchaseBean={firstName:'',lastName:'',email:'',street1:'',city:'',state:'',postalCode:'',country:'',test:false,ccNum:'',ccExpMonth:'',ccExpYear:'',ccCVC:'',productName:'',quantity:'',productKey:'',productID:'',updateCustomerOnly:false,sendCustomerEmail:false,paymentType:'',cart:[]};
      
      
       let purchaseItems=[];
            for(let i=0; i < responseData.length; i++) {
              var purchaseModel={
                _id:responseData[i]._id,
                firstName:responseData[i].firstName,
                lastName:responseData[i].lastName,
                email:responseData[i].email,
                street1:responseData[i].street1,
                city:responseData[i].city,
                state:responseData[i].state,
                postalCode:responseData[i].postalCode,
                country:responseData[i].country,
                test:responseData[i].test,
                ccNum:responseData[i].ccNum,
                ccExpMonth:responseData[i].ccExpMonth,
                ccExpYear:responseData[i].ccExpYear,
                ccCVC:responseData[i].ccCVC,
                updateCustomerOnly:responseData[i].updateCustomerOnly,
                sendCustomerEmail:responseData[i].sendCustomerEmail,
                paymentType:responseData[i].paymentType,
                cart:responseData[i].cart,
              }


               self.purchasedItems.push(purchaseModel);
              // purchaseItems.push(purchaseModel);
            }

         console.log("Purchase code");   
         console.log(self.purchasedItems); 
         self.tabledata=self.purchasedItems;
        //  console.log("Table Data");   
        //  console.log(purchaseItems);   
        //  self.tabledata=responseData;
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
    dataSearch : function (searchtype,value,sort) {
    var self = this;
    self.dataloaded=false; // We set this to false, since we are going to reload the data.
    let data={};
    data[searchtype.value]=value;
      fetchData(apiServer+dataUrlDetails.search.url, dataUrlDetails.search.method, data, function (responseData) {
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
    cancelRow : function (id) {
      var self = this;
      self.dataloaded=false; // We set this to false, since we are going to reload the data.
      //Lets cancel the subscription
      fetchData(apiServer+dataUrlDetails.cancel.url, dataUrlDetails.cancel.method, {"transactionID" : id}, function (delResponse) {
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
