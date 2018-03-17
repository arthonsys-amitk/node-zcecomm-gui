<template>
 <div>
  <user-message></user-message>
  <datatable v-bind="$data">  
   </datatable>
  
   <modal-component v-if="askconfirmation" v-on:accepted="delConfirmed" v-on:rejected="delRejected" modaltype="confirm" modalid="deleteconfirmation" :displaytitle="displaytitle" :displaytext="displaytext"></modal-component>
   <modal-component v-if="askcancelconfirmation" v-on:accepted="cancelConfirmed" v-on:rejected="cancelRejected" modaltype="confirm" modalid="cancelconfirmation" :displaytitle="canceldisplaytitle" :displaytext="canceldisplaytext"></modal-component>
  
</div>
</template>

<style>
.product{
  background-color:#E57373;
  padding-left:10%;
  padding-right: 2px;
  padding-top: 2px;
  padding-bottom: 2px;
  
}
.row-purchase{
  height: 50px;
  background-color:#EEEEEE;
  padding:10px;
  font-weight:600;
}
</style>
<script>

// Load custom table header component to implement filter for configured columns.
module.exports = {
components : {
'modal-component' : httpVueLoader('/components/generic/modal.vue'),
'filter-th' : httpVueLoader('/components/generic/filter-th.vue'),
'user-message' : httpVueLoader('/components/generic/user-message.vue'),
'opts' : httpVueLoader('/components/generic/opts.vue'),
'opts-cancel' : httpVueLoader('/components/generic/opts-cancel.vue')
},
props: ['tabledata', 'tabledef', 'datacount', 'entityname', 'buttons', 'showheadersettings'],
data: function () {
  return {
    columns: this.tabledef.slice(),
    data: this.tabledata.slice(),
    total: this.datacount,
    query: {},
    serverSearch : false,
    userObj : window.userInfo,
    pagesize : window.pageSize,
    askconfirmation : false, // Status whether we want to display confirmation box or not.
    askcancelconfirmation : false, // Status whether we want to display confirmation box or not.
    displaytitle : "Delete Confirmation.", // Title for confirm box.
    canceldisplaytitle : "Cancel Confirmation.", // Title for confirm box.
    delid : "", // ID user has requested to delete.
    producttransactionid:"",
    askproductcancelconfirmation : false,
    displaytext : "Are you sure you want to delete this "+this.entityname+"?", // Text we display for confirmation.
    canceldisplaytext : "Are you sure you want to cancel this "+this.entityname+"?",
    cancelproductdisplaytext : "Are you sure you want to cancel this product?", // Text we display for confirmation.
    HeaderSettings : this.showheadersettings || false, //Whether we can to allow user to select he columns they want to see.
    xprops : {
      showbuttons : this.buttons || {"edit": true, "delete" : true,"cancel":true}, //We can control if we don't want to display any specific action button for whole table.
      eventbus: new Vue()
    },
    xcancelprops : {
      showbuttons : this.buttons || {"cancel":true}, //We can control if we don't want to display any specific action button for whole table.
      eventbus: new Vue()
    }
  }
},
  created () {
    let self = this;
      this.columns=this.columns.concat([{ "title": "Action", "tdComp": "opts" , "visible" : true, "tdClass" : "actionbuttons"}]);
     
    //Monitor deleterow event sent by child.

   
    this.xprops.eventbus.$on("deleterow", function (id) {
        self.delid=id; // We set the ID which the user clicked deleted for, will be used if confirmed deletion.
        self.askconfirmation=true; // Yes, now we want to display confirmation box.
      });
    this.xprops.eventbus.$on("cancelrow", function (id) {
        self.delid=id; // We set the ID which the user clicked deleted for, will be used if confirmed deletion.
        self.askcancelconfirmation=true; // Yes, now we want to display confirmation box.
      });

      this.xcancelprops.eventbus.$on("cancelproduct", function (id) {
        self.producttransactionid=id; // We set the ID which the user clicked deleted for, will be used if confirmed deletion.
        self.askproductcancelconfirmation=true; // Yes, now we want to display confirmation box.
      });
  },
  watch: {
    query: { // We are watching whenever the query changes, we will have to filter and/or sort data and re-render table.
      handler () {
        this.handleQueryChange()
      },
      deep: true
    }
  },
  methods : {
  //Actual implementation of filtration and sorting of data.
    handleQueryChange () {
      let matchedRows = this.tabledata.slice(), query=this.query;
      let dataFields = this.tabledef.map(a => a.field);
      /*
        Here we check if we have all the data loaded in the app (if data size is less then pagesize).
        If not, then we will have to request server for filtration and/or sort.
        The searchServer flag keeps information if there was filtration/sorting performed by server earlier.
        Since, after filtration by server there may not be enough data to fill complete pagesize. So,
        all requests after it shall go to the server.
      */
      if(this.tabledata.length >= this.pagesize || this.serverSearch) {
        this.serverSearch = false;
        let search = {}, sort = {}, count=0;
        // Loop through all the fields, if any of them is part of query, add it to search pattern for server.
        dataFields.forEach(field => {
        // Are we supposed to sort on current field? if yes then add the information to sort object for server.
        if(field == query.sort) {
          this.serverSearch = true;
            sort[field] = ((query.order=='desc')?-1:1);
            count++;
          }
          if(!query.hasOwnProperty(field)) {
            return false;
          }
          switch (typeof(query[field])) {
            case 'string':
              this.serverSearch = true;
              search[field] = query[field];
              count++;
            break;
            default:
              // nothing to do
            break;
          }
        });
        if(count > 0)
          this.$emit('searchserver', search, sort);
        return false;
      }
      // Loop through all the fields, if any of them is part of query, apply filter.
      dataFields.forEach(field => {
        if(!query.hasOwnProperty(field)) {
          return false;
        }
        switch (typeof(query[field])) {
        case 'array':
          matchedRows = matchedRows.filter(row => query[field].includes(row[field]))
          break;
        case 'string':
          matchedRows = matchedRows.filter(row => row[field].toLowerCase().includes(query[field].toLowerCase()))
          break
        default:
          // nothing to do
          break;
      }
      });
      /* Are we supposed to sort? If so then this is where we do that.
          This method also handles scenarios if the value for any row is null and/or boolean.
          For us all sorts are string sorts. */
      if (query.sort) {
        matchedRows.sort(function(a, b) {
          let rs =0;
          if(a[query.sort] == null ) a[query.sort]="";
          if(b[query.sort] == null ) b[query.sort]="";
          if(typeof(b[query.sort]) == 'boolean' || typeof(a[query.sort]) == 'boolean')
          {
            a[query.sort]=a[query.sort].toString();
            b[query.sort]=b[query.sort].toString();
          }
          if(query.order =='asc') {
            rs = a[query.sort].localeCompare(b[query.sort]);
          } else {
            rs = b[query.sort].localeCompare(a[query.sort]);
          }
          return rs;
        });
      }
      // Update the data set after filtration for re-rendering of the view.
      this.data = matchedRows;
      this.total = matchedRows.length;
    },
    delConfirmed () { // Delete was confirmed by confirm modal.
      //Close the modal and Tell parent to actually delete the item
      this.askconfirmation=false;
      this.$emit('deleterow',this.delid);
    },
    delRejected () { // Delete was rejected by confirm modal.
      //We simply remove the dialog if rejected and do nothing else.
      this.askconfirmation=false;
    },
    cancelConfirmed () { // Delete was confirmed by confirm modal.
      //Close the modal and Tell parent to actually delete the item
      this.askcancelconfirmation=false;
      this.$emit('cancelrow',this.delid);
    },
    cancelRejected () { // Delete was rejected by confirm modal.
      //We simply remove the dialog if rejected and do nothing else.
      this.askcancelconfirmation=false;
    },
     cancelProductConfirmed () { // Delete was confirmed by confirm modal.
      //Close the modal and Tell parent to actually delete the item
      this.askproductcancelconfirmation=false;
      this.$emit('cancelproduct',this.producttransactionid);
    },
    cancelProductionRejected () { // Delete was rejected by confirm modal.
      //We simply remove the dialog if rejected and do nothing else.
      this.askproductcancelconfirmation=false;
    },
  }
}
</script>
