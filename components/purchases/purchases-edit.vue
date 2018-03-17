<template>
<div>
  <div class="col-sm-3 col-md-2">
      <!--render sidebar component which show sidebar links-->
      <purchases-sidebar-view-component></purchases-sidebar-view-component>
  </div>
  <div class="col-sm-9 col-md-10">
    <h3 class="company-title">Add/Edit Purchase</h3>
    <hr>
    <div id="update-customer-check-container">
    <input type="checkbox" id="update-customer-check" name="update-customer-check"> <b>Update Customer Only</b>
    </div>
    <div>
      <custom-form v-on:formsubmit="savepurchase" :datamodel="datamodel" :datafields="datafields" :productlist="productlist" v-if="defloaded && dataloaded" :ispurchase="true">    
      </custom-form>
      
    </div>
  </div>
</div>
</template>
<script>
let tableDefUrl = "/forms/purchases.json"; // Where to find the fields configuration of form.

/* Configuration of the API to use, for fetching the information. Later when save functionality is also implemented
    This will also contain information of the API endpoint required to save the information.*/
let dataUrlDetails = {
  "view" : {
    "itemName" : "childPurchase",
    "url" : "/API/purchase/",
    "method" :"GET"
  },
  "edit" : {
    "url" : "/API/purchase/",
    "method" :"PUT"
  },
  "create" : {
    "url" : "/API/purchase/",
    "method" :"POST"
    },
 "createTest" : {
  "url" : "/API/purchase/test",
  "method" :"POST"
  },
  "search" : {
    "itemName" : "childProducts",
    "url" : "/API/product/search",
    "method" :"POST"
  },
  "updateCustomerInfo" : {
    "url" : "/API/purchase/customer",
    "method" :"PUT"
  },
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
    userCardData:{},
    productlist:[]
    };
  },
  components : {
  'custom-form' : httpVueLoader('/components/generic/custom-form.vue'),
  'purchases-sidebar-view-component': httpVueLoader('/components/purchases/purchases-sidebar.vue')
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

           self.datamodel={firstName:'',lastName:'',email:'',street1:'',city:'',state:'',postalCode:'',country:'',test:false,ccNum:'',ccExpMonth:'',ccExpYear:'',ccCVC:'',updateCustomerOnly:false,sendCustomerEmail:false,paymentType:'',cart:[]};
          //  self.datafields=[{key:"firstName",type:"input",required:true,templateOptions:{label:"First Name"}},{key:"lastName",type:"input",templateOptions:{label:"Last Name"}},{key:"email",type:"input",templateOptions:{label:"Email"}},{key:"street1",type:"input",templateOptions:{label:"Street"}},{key:"city",type:"input",templateOptions:{label:"City"}},{key:"state",type:"input",templateOptions:{label:"State"}},{key:"postalCode",type:"input",templateOptions:{label:"Postal Code"}},{key:"country",type:"input",templateOptions:{label:"Country"}},{key:"test",type:"list","options":[""],templateOptions:{label:"Run as test card",onClick:function($viewValue,$modalValue,scope){if(self.datamodel.test==false){self.datamodel.ccNum='4242424242424242';self.datamodel.ccCVC='4T59';self.datamodel.test=true;}else{self.datamodel.ccNum=self.userCardData.ccNum;self.datamodel.ccCVC=self.userCardData.ccCVC;self.datamodel.test=false;}}}},{key:"ccNum",type:"input",templateOptions:{label:"Credit Card Number"}},{key:"ccExpMonth",type:"input",templateOptions:{label:"Credit Card Expire Month"}},{key:"ccExpYear",type:"input",templateOptions:{label:"Credit Card Expire Year"}},{key:"ccCVC",type:"input",templateOptions:{label:"Credit Card Cvc code"}},{key:"productID",type:"select","options":[],templateOptions:{label:"Product Name"}},{key:"quantity",type:"input",templateOptions:{label:"Quantity"}},{key:"productKey",type:"input",templateOptions:{label:"Product Key"}},{key:"updateCustomer",type:"list","options":[""],templateOptions:{visibility:false,label:"Update Customer Information Only",onClick:function($viewValue,$modalValue,scope){self.datamodel.updateCustomerOnly=!self.datamodel.updateCustomerOnly}}}];
                   self.datafields=[{key:"firstName",type:"input",required:true,templateOptions:{label:"First Name"}},
                   {key:"lastName",type:"input",templateOptions:{label:"Last Name"}},{key:"email",type:"input",
                   templateOptions:{label:"Email"}},{key:"street1",type:"input",templateOptions:{label:"Street"}},
                   {key:"city",type:"input",templateOptions:{label:"City"}},{key:"state",type:"input",templateOptions:
                   {label:"State"}},{key:"postalCode",type:"input",templateOptions:{label:"Postal Code"}},
                   {key:"country",type:"input",templateOptions:{label:"Country"}},{key:"paymentType",type:"select",
                   "options":[{label:"Credit Card",value:"cc",templateOptions:{selected:"selected"}},{label:"Beta Tester",
                   value:"tester"},{label:"Complimentary 1 Year",value:"comp1"},{label:"Complimentary 5 Years",value:"comp5"}],templateOptions:{label:"Select payment type"}},
                   {key:"test",type:"list","options":[""],templateOptions:{label:"Run as test card",onClick:function($viewValue,$modalValue,scope){if(self.datamodel.test==false){self.datamodel.ccNum='4242424242424242';self.datamodel.ccCVC='4T59';self.datamodel.test=true;}else{self.datamodel.ccNum=self.userCardData.ccNum;self.datamodel.ccCVC=self.userCardData.ccCVC;self.datamodel.test=false;}}}},
                   {key:"ccNum",type:"input",templateOptions:{label:"Credit Card Number"}},{key:"ccExpMonth",type:"input",templateOptions:{label:"Credit Card Expire Month"}},{key:"ccExpYear",type:"input",templateOptions:{label:"Credit Card Expire Year"}},{key:"ccCVC",type:"input",templateOptions:{label:"Credit Card Cvc code"}},
                   {key:"sendCustomerEmail",type:"list","options":[""],templateOptions:{label:"Send Customer Email",onClick:function($viewValue,$modalValue,scope){self.dataModel.sendCustomerEmail=!self.dataModel.sendCustomerEmail;}}}];

         let productIndex=-1;
         for(let i=0;i<self.datafields.length;i++) {
           if(self.datafields[i].key=='productID') {
             productIndex=i;
           }
         }
              
      // fetchData(tableDefUrl, "GET", {}, function (responseData) {
      //   let productIndex=-1;
   
      //    for(let i=0;i<responseData.length;i++) {
      //      if(responseData[i].key=='productID') {
      //        productIndex=i;
      //      }
      //    }
          fetchData(apiServer+dataUrlDetails.search.url, dataUrlDetails.search.method,"", function (productList) {
          //get company of current logged in user with role admin if child companies exists
            let productOptions=[];

            // self.productlist=productList;

            console.log("Product List Anix");
            console.log(self.productlist);
            
            for(let i=0; i < productList.length; i++) {
             var productModel={
            "productID": productList[i]._id,
            "quantity": 0,
            "activations": 0,
            "productKey": self.productlist.productKey,
            "productKeyExpiration":self.productlist.productKeyExpiration,
            "transactionID": self.productlist.transactionID,
            "productName": productList[i].name,
            "isSelected":false,
            
            }

              self.productlist.push(productModel);
              // productOptions.push({label : productList[i].name, "value" : productList[i]._id});
              // self.productList.push({label : productList[i].name, "value" : productList[i]._id})
              
            }
            // self.datafields[productIndex].options=productOptions;
          });



          //  self.datamodel={firstName:'',lastName:'',email:'',street1:'',city:'',state:'',postalCode:'',country:'',test:false,ccNum:'',ccExpMonth:'',ccExpYear:'',ccCVC:'',productName:'',quantity:'',productKey:'',productID:''};
          //  self.datafields=[{key:"firstName",type:"input",required:true,templateOptions:{label:"First Name"}},{key:"lastName",type:"input",templateOptions:{label:"Last Name"}},{key:"email",type:"input",templateOptions:{label:"Email"}},{key:"street1",type:"input",templateOptions:{label:"Street"}},{key:"city",type:"input",templateOptions:{label:"City"}},{key:"state",type:"input",templateOptions:{label:"State"}},{key:"postalCode",type:"input",templateOptions:{label:"Postal Code"}},{key:"country",type:"input",templateOptions:{label:"Country"}},{key:"test",type:"list","options":[""],templateOptions:{label:"Run as test card",onClick:function($viewValue,$modalValue,scope){if(self.datamodel.test==false){self.datamodel.ccNum='4242424242424242';self.datamodel.ccCVC='4T59';self.datamodel.test=true;}else{self.datamodel.ccNum=self.userCardData.ccNum;self.datamodel.ccCVC=self.userCardData.ccCVC;self.datamodel.test=false;}}}},{key:"ccNum",type:"input",templateOptions:{label:"Credit Card Number"}},{key:"ccExpMonth",type:"input",templateOptions:{label:"Credit Card Expire Month"}},{key:"ccExpYear",type:"input",templateOptions:{label:"Credit Card Expire Year"}},{key:"ccCVC",type:"input",templateOptions:{label:"Credit Card Cvc code"}},{key:"productName",type:"select","options":[],templateOptions:{label:"Product Name"}},{key:"quantity",type:"input",templateOptions:{label:"Quantity"}},{key:"productKey",type:"input",templateOptions:{label:"Product Key"}}];
        
          //  self.datafields=responseData;
          
          // self.datafields=responseData;
        // self.datafields=responseData;
        //   let userCardData={
        //       ccNum:self.datamodel.ccNum,
        //       ccCvc:self.datamodel.ccCVC
        //   };

        // self.datamodel={firstName:'',lastName:'',email:'',street1:'',city:'',state:'',postalCode:'',country:'',test:false,ccNum:'',ccExpMonth:'',ccExpYear:'',ccCVC:'',productName:'',quantity:'',productKey:'',productID:''};
        // self.datafields=[{key:"firstName",type:"input",required:true,templateOptions:{label:"First Name"}},{key:"lastName",type:"input",templateOptions:{label:"Last Name"}},{key:"email",type:"input",templateOptions:{label:"Email"}},{key:"street1",type:"input",templateOptions:{label:"Street"}},{key:"city",type:"input",templateOptions:{label:"City"}},{key:"state",type:"input",templateOptions:{label:"State"}},{key:"postalCode",type:"input",templateOptions:{label:"Postal Code"}},{key:"country",type:"input",templateOptions:{label:"Country"}},{key:"test",type:"list","options":[""],templateOptions:{label:"Run as test card",onClick:function($viewValue,$modalValue,scope){if(self.datamodel.test==false){self.datamodel.ccNum='4242424242424242';self.datamodel.ccCVC='4T59';self.datamodel.test=true;}else{self.datamodel.ccNum=self.userCardData.ccNum;self.datamodel.ccCVC=self.userCardData.ccCVC;self.datamodel.test=false;}}}},{key:"ccNum",type:"input",templateOptions:{label:"Credit Card Number"}},{key:"ccExpMonth",type:"input",templateOptions:{label:"Credit Card Expire Month"}},{key:"ccExpYear",type:"input",templateOptions:{label:"Credit Card Expire Year"}},{key:"ccCVC",type:"input",templateOptions:{label:"Credit Card Cvc code"}},{key:"productName",type:"select","options":[],templateOptions:{label:"Product Name"}},{key:"quantity",type:"input",templateOptions:{label:"Quantity"}},{key:"productKey",type:"input",templateOptions:{label:"Product Key"}}];
        self.defloaded=true;
      // });
      if(this.$route.params.purchaseID != 'new'){
        console.log("ID");
        console.log(this.$route.params.purchaseID);
        fetchData(apiServer+dataUrlDetails.view.url+this.$route.params.purchaseID, dataUrlDetails.view.method,"" , function (responseData) {
          self.datamodel=responseData;
          // self.productlist=self.datamodel.cart;
          
            for(let i=0; i < self.datamodel.cart.length; i++) {
              for(let j=0;j<self.productlist.length;j++){
                if(self.datamodel.cart[i].productID==self.productlist[j].productID){
                  self.productlist[j].quantity=self.datamodel.cart[i].quantity;
                  self.productlist[j].activations=self.datamodel.cart[i].quantity;
                  self.productlist[j].productKeyExpiration=self.datamodel.cart[i].productKeyExpiration;
                   self.productlist[j].productKey=self.datamodel.cart[i].productKey;
                  self.productlist[j].transactionID=self.datamodel.cart[i].transactionID;
                  self.productlist[j].isSelected=true;
                }
              } 
            }

          self.userCardData={
              ccNum:self.datamodel.ccNum,
              ccCVC:self.datamodel.ccCVC
          }
          self.dataloaded=true;
        });
      }else{
          // self.datamodel={};
          
          self.userCardData={
              ccNum:'',
              ccCVC:''
          }

          document.getElementById("update-customer-check-container").style.visibility = "hidden"; 
          self.dataloaded=true;
      }
    },
    savepurchase : function (purchaseObj) {

      let cart=[];
      for(let i=0; i <this.productlist.length; i++) {
        if(this.productlist[i].isSelected){
          delete this.productlist[i]['isSelected'];
          cart.push(this.productlist[i]);
        }   
      }

      purchaseObj.cart=cart;

      let router = this.$router, self = this;
      let productInfo = [];
      if(purchaseObj._id) {

        var checkedVal=document.getElementById("update-customer-check").checked;
        if(checkedVal){
           delete purchaseObj['ccNum'];
           delete purchaseObj['ccExpMonth'];
           delete purchaseObj['ccExpYear'];
           delete purchaseObj['ccCVC'];
           fetchData(apiServer+dataUrlDetails.updateCustomerInfo.url, dataUrlDetails.updateCustomerInfo.method, purchaseObj , function (responseData) {
             router.push("/purchases");
           });

        }else{

           fetchData(apiServer+dataUrlDetails.edit.url, dataUrlDetails.edit.method, purchaseObj , function (responseData) {
            router.push("/purchases");
           });
        }
      }else if(purchaseObj.test.length == 1){
        fetchData(apiServer+dataUrlDetails.createTest.url, dataUrlDetails.createTest.method, purchaseObj , function (responseData) {
          router.push("/purchases");
        });
      }
       else {
        fetchData(apiServer+dataUrlDetails.create.url, dataUrlDetails.create.method, purchaseObj , function (responseData) {
          router.push("/purchases");
        });
      }
    }
   
  }
}
</script>
