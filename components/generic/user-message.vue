<template>
  <div style="width:100%">
    <div v-for="msg in userMessages" class="alert alert-dismissible" :class="msg.class" role="alert">
    <button type="button" class="close" data-dismiss="alert">
      <span aria-hidden="true">&times;</span>
      <span class="sr-only">Close</span>
    </button>
    <span>{{msg.title}}</span>: <span v-html="msg.message"></span>
    </div>
  </div>
</template>
<script>
module.exports = {
  props: ['timeout'], // We are expecting the caller to sent timeout, but not required.
  data: function () {
    return {
      errorLogs : errorLogs,
      userMessages : []
    }
  },
  watch : {
    errorLogs : function(val) { //Watching the errorLogs function
      // Either we use the timeout provided as props, or we use the one defined in config.
      // We define messages object, which we will use to club multiple messages.
      var timeout = this.timeout || toasterTimeout, self=this,
      messages = {"danger" : {"message" : "", "title" : "", "class":""}, "warning" : {"message" : "", "title" : "", "class":""}, "success" : {"message" : "", "title" : "", "class":""}};
      //If length if change is 0 we do nothing, since we are the once who actually reduced it it 0, its not getting cleaned up anywhere else.
      if(val.length===0) {
        return;
      }
      // If there is only 1 message, we display simple toaster.
      if(val.length==1){
        let msg = val.shift();
        this.userMessages.push({"message" : msg.message, "title": msg.title, "class": "alert-"+msg.priority});
      } else {
      //If there are multiple messages, we club them based on prioriy.
        while(val.length) {
          let msg=val.shift();
          messages[msg.priority].message+="<li>"+msg.message+"</li>";
          messages[msg.priority].title=msg.title;
          messages[msg.priority].class="alert-"+msg.priority;
        }

        //We check all priorities if we have any message for that priority, we show those messages as bullet items.
        if(messages.danger.message.length > 0) {
          messages.danger.message="<ul>"+messages.danger.message+"</ul>";
          this.userMessages.push(messages.danger);
        }
        if(messages.warning.message.length > 0) {
          messages.warning.message="<ul>"+messages.warning.message+"</ul>";
          this.userMessages.push(messages.warning);
        }
        if(messages.success.message.length > 0) {
          messages.success.message="<ul>"+messages.success.message+"</ul>";
          this.userMessages.push(messages.success);
        }
      }
      setTimeout(function () { self.userMessages.shift();} , parseInt(timeout));
    }
  }
}
</script>
