<!--template for main viewing area-->
<template>
    <div>
        <div class="col-sm-3 col-md-2">
            <!--render sidebar component which show sidebar links-->
            <sidebar-view-component></sidebar-view-component>
            <modal-component v-if="showmodal" :modaltype="modaltype" modalid="demomodal" :displaytitle="modaltitle" :displaytext="modaltext" :formdef="modalformdef" :formdata="modalformdata"
            v-on:formsubmit="formsubmit" v-on:accepted="accepted" v-on:rejected="rejected" v-on:closed="closed"></modal-component>
        </div>
        <div class="col-sm-9 col-md-10 padding-top-20 padding-left-0">
            <div class="row padding-left-15">
                <div class="col-sm-2 margin-bottom-20">
                    <!--<router-link> is the component for enabling user navigation in a router-enabled app. It renders as an <a> tag with correct href by default -->
                    <router-link to="/">
                        <div class="dashboard">
                            <div class="containing-table">
                                <div class="centre-align">
                                    <i class="fa fa-user fa-2x" aria-hidden="true"></i><br>My Dashboard
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
                <div class="col-sm-2">
                    <!--<router-link> is the component for enabling user navigation in a router-enabled app. It renders as an <a> tag with correct href by default -->
                    <router-link to="/users">
                        <div class="user">
                            <div class="containing-table">
                                <div class="centre-align">
                                    <i class="fa fa-user fa-2x" aria-hidden="true"></i><br>Users
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
                <div class="col-sm-2">
                    <!--<router-link> is the component for enabling user navigation in a router-enabled app. It renders as an <a> tag with correct href by default -->
                    <router-link to="/reports">
                        <div class="reports">
                            <div class="containing-table">
                                <div class="centre-align">
                                    <i class="fa fa-bar-chart fa-2x"
                                       aria-hidden="true"></i><br>Reports
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
                <div class="col-sm-2">
                    <!--<router-link> is the component for enabling user navigation in a router-enabled app. It renders as an <a> tag with correct href by default -->
                    <router-link to="/products">
                        <div class="widgets">
                            <div class="containing-table">
                                <div class="centre-align">
                                    <i class="fa fa-list fa-2x" aria-hidden="true"></i><br>Products
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
                <div class="col-sm-2">
                    <!--<router-link> is the component for enabling user navigation in a router-enabled app. It renders as an <a> tag with correct href by default -->
                    <router-link to="/">
                        <div class="company">
                            <div class="containing-table">
                                <div class="centre-align">
                                    <i class="fa fa-user fa-2x" aria-hidden="true"></i><br>Purchases
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
            <div class="row padding-left-15">
                <div class="col-sm-6 margin-bottom-10">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <h3 class="panel-title">To do list</h3>
                        </div>
                        <ul class="list-group">
                            <li class="list-group-item">Cras justo odio</li>
                            <li class="list-group-item">Dapibus ac facilisis in</li>
                            <li class="list-group-item">Morbi leo risus</li>
                            <li class="list-group-item">Porta ac consectetur ac</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="row padding-left-15">
                <div class="col-sm-6 margin-bottom-10">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <h3 class="panel-title">Modal Demo</h3>
                        </div>
                        <ul class="list-group">
                            <li class="list-group-item" v-on:click="modalform">Modal Form <b>{{formmessage}}</b></li>
                            <li class="list-group-item" v-on:click.prevent.stop="modalconfirm()">Modal Confirm Box <b>{{confirmresponse}}</b></li>
                            <li class="list-group-item" v-on:click="modalinfo">Modal Info Box<b></b></li>
                        </ul>
                    </div>
                    Last close event at: <b>{{infoclosemessage}}</b>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    //load the sidebar component which will show the sidebar section
    module.exports = {
        data: function () {
            return {
              showmodal : false,
              modaltitle: "",
              modaltext : "",
              modaltype : "",
              modalformdef : [],
              modalformdata : {},
              confirmresponse : "",
              formmessage : "",
              infoclosemessage : ""
            };
        },
        components: {
            'modal-component': httpVueLoader('/components/generic/modal.vue'),
            'sidebar-view-component': httpVueLoader('/components/dashboard/sidebar-view.vue')
        },
        mounted: function () {
        },
        methods : {
          modalform : function () {
            this.modaltype = "form";
            this.modaltitle = "Demo Form Modal";
            this.modaltext = "This is a demo form modal. what you input is not saved, but showcased in previous screen. If you click close button. Closed event is generated.";
            this.modalformdata={"message" : ""};
            this.modalformdef=[{"key": "message","type": "input","required" : true,"templateOptions" : {"label" : "Message"}}];
            this.showmodal = true;
          },
          modalconfirm : function () {
            this.modaltype = "confirm";
            this.modaltitle = "Demo Confirm Modal";
            this.modaltext = "This is demo modal confirm box, Press Yes/No and you will see what you pressed at the same place where you clcked to open this mdoal. Notice that there is no close button here.";
            this.showmodal = true;
          },
          modalinfo : function () {
            this.modaltype = "info";
            this.modaltitle = "Demo Info Modal";
            this.modaltext = "This is demo modal info box. You can only view a message here. The event of closing the box is passed back.";
            this.showmodal = true;
          },
          formsubmit : function (formobj) {
            this.formmessage = formobj.message;
            this.showmodal=false;
          },
          accepted : function () {
            this.confirmresponse="You pressed Yes in last confirm box.";
            this.showmodal=false;
          },
          rejected : function () {
            this.confirmresponse="You pressed No in last confirm box.";
            this.showmodal=false;
          },
          closed : function () {
            let d= new Date();
            this.infoclosemessage=d.toISOString();
            this.showmodal=false;
          }
        }
    }
</script>
