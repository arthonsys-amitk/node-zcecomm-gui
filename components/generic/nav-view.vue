<!--template for nav header links -->
<template>
<div>
        <nav class="col-sm-12 navbar navbar-fixed-top navbar-inverse theme padding-top-5 padding-bottom-5">
            <div>
                <div class="logo col-sm-2">
                    <a href="#" class="" style="padding-left: 18px">
                        <img class="img-fluid" style="width: 50px;" src="images/Logo_PNG.png"></a>
                </div>
                <!-- Toggle button used for mobile screen all nav links will come in dropdown type in mobile-->
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                            data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                </div>
                <div class="collapse navbar-collapse padding-left-0" id="bs-example-navbar-collapse-1">
                    <!--It contains the links -->
                    <ul class="nav navbar-nav">
                        <!--<router-link> is the component for enabling user navigation in a router-enabled app. It renders as an <a> tag with correct href by default -->
                        <li>
                            <router-link to="/">Home</router-link>
                        </li>
                        <li>
                            <router-link to="/products">Products</router-link>
                        </li>
                        <li>
                            <router-link to="/purchases">Purchases</router-link>
                        </li>
                        <li>
                            <router-link to="/reports">Reports</router-link>
                        </li>
                        <li>
                            <router-link to="/users">Users</router-link>
                        </li>
                        <li>
                            <a href="/" class="router-link-active" v-on:click.stop.prevent="userLogout">Logout</a>
                        </li>
                    </ul>
                    <!--load company component-->
                    <company-view-component></company-view-component>
                </div><!-- /.navbar-collapse -->
            </div><!-- /.container-fluid -->
        </nav>
</div>
</template>
<script>
    // Load nav component here because we need it on every page except from login page and home component which depends on other components
    module.exports = {
        data: function () {
            return {
              userRole : getValue({"source" : "userInfo", "param" : "role"})
            };
        },
        components: {
          'company-view-component': httpVueLoader('/components/generic/company-view.vue')
        },
        methods : {
          userLogout : function () {
            clearSession();
          }
        }
    }
</script>
