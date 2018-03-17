<template>
<div :class="divclass">
<user-message></user-message>
  <form v-on:submit.prevent="handlesubmit">
    <formly-form :form="forminfo" :model="datamodel" :fields="datafields"></formly-form>
    <span v-for="file in filefields">
      <label>Select Product Image</label>
      <input type='file' :name="file" v-on:change="fileselected"/>
    </span>
    <div class="col-sm-12 text-center margin-15">
      <input type="button" v-if="ispurchase" class="btn btn-primary" style="margin:10px;" name="addProductsToCart" value="Add Products To Cart" data-toggle="modal" data-target="#myModal"><br>
      <button type="submit" class="btn btn-fill btn-primary btn-wd">{{submitlabel}}</button>
      <button type="reset" v-if="cancelBehaviour=='back'" v-on:click.prevent="canceledit" class="btn btn-fill btn-default btn-wd">Cancel</button>
      <button type="reset" v-if="cancelBehaviour=='reset'" class="btn btn-fill btn-default btn-wd">Cancel</button>
      <button type="reset" v-if="cancelBehaviour=='event'" v-on:click.prevent="cancelevent" class="btn btn-fill btn-default btn-wd">Cancel</button>
    </div>
  </form>

   <!-- Modal -->
  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Products</h4>
        </div>
        <div class="modal-body">

        <table class="table">
          <tr>
            <td>Name</td>
            <td>Quantity</td>
            <td>Product Key</td>
            <td>Add or Remove</td>
          </tr>

          <tr v-for="product in productlist" :key="product.productID">
            <td>{{product.productName}}</td>
            <td><input class="modal-text-field" type="number" min="0" max="10" v-model="product.quantity"></td>
            <td><input class="modal-text-field-product-key"  type="text" v-model="product.productKey"></td>
            <td><button class="btn btn-primary" type="button" v-on:click="onAddToCart(product)">
               <span  v-if="product.isSelected" class="glyphicon glyphicon-remove-circle"></span> 
               <span   v-else class="glyphicon glyphicon-shopping-cart"></span>
               </button></td>
          </tr>  

        </table>

        <!-- <div class="container-fluid"> 
          <div class="row">
               <div class="col-sm-3 add-cart-components"><h5>Name</h5></div>
              <div class="col-sm-3 add-cart-components"><h5>Quantity</h5></div>
              <div class="col-sm-3 add-cart-components"><h5>Add or Remove</h5></div>
              <div class="col-sm-3 add-cart-components"><h5>Add or Remove</h5></div>
          </div> 
          <div class="row" style="margin:20px;" v-for="product in productlist" :key="product.productID">
               <div class="col-sm-3 add-cart-components">{{product.productName}}</div>
               <div class="col-sm-3 add-cart-components modal-text-field"><input type="text" v-model="product.quantity"></div>
               <div class="col-sm-3 add-cart-components modal-text-field"><input type="text" v-model="product.quantity"></div>
               <button class="col-sm-3 add-cart-components btn btn-primary" type="button" v-on:click="onAddToCart(product)">
               <span  v-if="product.isSelected" class="glyphicon glyphicon-remove-circle"></span> 
               <span   v-else class="glyphicon glyphicon-shopping-cart"></span>
               </button>       
          </div>
      </div> -->
        </div>
          
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
      
    </div>
  </div>
   
</div>
</template>



<style>
.add-cart-components{
  margin: 2px;
  padding: 5px;
}

.modal-text-field{
width: 50px;
}

.modal-text-field-product-key{
width: 100px;
}
.modal-popup{
  width: 100%;
  height: 100%;
}
</style>

<script>

// Export the data for formly library. Currently only form display with existing information that is available.
// TODO: submit form event to be generated.
module.exports = {
  props: ['datamodel', 'datafields', 'submitbtnlabel', 'cancelbehaviour', 'divnoclass', 'filefields','productlist','ispurchase'],
  components : {
  'user-message' : httpVueLoader('/components/generic/user-message.vue'),
  'filter-th' : httpVueLoader('/components/generic/filter-th.vue'),
  'modal-component' : httpVueLoader('/components/generic/modal.vue'),
  },
  data: function () {
    let submitBtnLabel = this.submitbtnlabel, cancelBehaviour=this.cancelbehaviour;
    if(typeof(submitBtnLabel) =='undefined'){
      submitBtnLabel='Submit';
    }
    if(typeof(cancelBehaviour) =='undefined'){
      cancelBehaviour="back";
    }

    return {
      forminfo : {},
      datamodel: this.datamodel,
      datafields: this.datafields,
      filefields : this.filefields || [],
      selectedFiles : {},
      divclass : (this.divnoclass && this.divnoclass=="divnoclass")?"":"col-sm-offset-3 col-sm-6",
      cancelBehaviour : cancelBehaviour,
      submitlabel : submitBtnLabel,
      showModal:false,
      productlist:this.productlist,
      ispurchase:this.ispurchase,
      purchasecount:0
    }
  },
   mounted : function () {
   
           
  },
  methods : {
    fileselected : function(event) {
      if(event.target.multiple) {
        this.selectedFiles[event.target.name] = event.target.files;
      } else {
        this.selectedFiles[event.target.name] = event.target.files[0];
      }
    },
    handlesubmit : function () {
      this.datamodel=Object.assign( this.datamodel, this.selectedFiles);
      this.$emit('formsubmit', this.datamodel);
    },
    canceledit : function () {
      this.$router.go(-1);
    },
    cancelevent : function () {
      this.$emit('cancelevent');
    },
    loadProducts:function(){
      console.log("here");
      fetchData(apiServer+dataUrlDetails.search.url, dataUrlDetails.search.method,"", function (productList) {
          //get company of current logged in user with role admin if child companies exists
           this.productList=productList;
            
          });

    },
    onAddToCart:function(product){
      if(this.purchasecount>=6 && product.isSelected){
        product.quantity=0;
        alert("You can add at most 6 products.");
        return;
      }
      if(product.quantity>0){
         product.isSelected=!product.isSelected;
         if(product.isSelected){
            this.purchasecount++;
            console.log("Purchase Count Add");
            console.log(this.purchasecount);
          }else{
            if(this.purchasecount!=0){
               this.purchasecount--;
               console.log("Purchase Count Sub");
               console.log(this.purchasecount);
             }
          }
     }else{
       alert("Please enter quantity");
     }
    }
    
  }
}
  </script>
