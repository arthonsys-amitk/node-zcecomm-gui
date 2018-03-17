<template>
<div >
<modal-component v-if="displayfeedbackmodal" modaltype="form" modalid="feedbackmodal" :displaytitle="displaytitle" :displaytext="displaytext" :formdef="formdef" :formdata="formdata"
v-on:formsubmit="formsubmit" v-on:closed="closed"></modal-component>
	<footer>
		<div class="col-sm-12 text-center footer theme">
	  <div style="margin-top:10px">
	    	<span>© zenColor™ Corporation, 2017 - All rights reserved |
	      <a href="" v-on:click.prevent.stop="addFeedback">Feedback</a> |
	       <a href="">Privacy Policy</a> |
	       <a href="">Terms of Use</a> |
	       <a href="">FAQ</a> |
	       <a href="">Legal Notices</a>  |
	          zenColor Corporation, 2980 McFarlane Road, Coconut Grove, FL 33133 Toll Free: +1.888.936.6303</span>
	  </div>
	  </div>
	</footer>
</div>
</template>
<script>
let formDefUrl = "/forms/feedback.json"; // Where to find the fields configuration of form.
  module.exports = {
	components : {
	'modal-component': httpVueLoader('/components/generic/modal.vue')
	},
    data : function () {
      return {
        displayfeedbackmodal : false,
        modaltype : "info",
        displaytitle : "",
        displaytext : "",
        formdef : [],
        formdata : {}
      };
    },
    methods : {
		//Method to allow clicking on feedback link to allow adding feedback.
      addFeedback : function () {
        var self = this;
        this.modaltype="form";
        this.displaytitle="Feedback";
        this.displaytext="Please let us know what you think about zenColor Administration interface.";
        this.displayfeedbackmodal=true;
        this.formdata = {"feedbackType" : "", "feedback" : ""};
        fetchData(formDefUrl, "GET", {}, function (responseData) {
          self.formdef=responseData;
          self.displayfeedbackmodal=true;
        });
      },
			//What we do when feedback form is submitted.
      formsubmit : function (feedObj) {
        //Submit the form.
        this.displayfeedbackmodal=false;
				feedObj.userID=getValue({"source" : "userInfo", "param" : "_id"});
				fetchData(apiServer+"/API/feedback", "POST", feedObj , function (responseData) {
					if(responseData.hasOwnProperty('userID') && responseData.userID==feedObj.userID) {
						errorLogs.push({"title" : "feedback", "priority" : "success" , "message" : "Thanks for the feedback"});
					}
	      });
      },
			//When modal is closed we remove the component. So it starts fresh if opened again.
			closed : function () {
        //Close the modal.
        this.displayfeedbackmodal=false;
      }
    }
  }
</script>
