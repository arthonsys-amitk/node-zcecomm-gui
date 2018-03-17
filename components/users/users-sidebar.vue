<template>
    <div>
        <div class="col-sm-3 col-md-2 bg-light sidebar theme">
            <nav>
                <!--bootstrap vertical nav pills is used to show the links-->
                <!--<router-link> is the component for enabling user navigation in a router-enabled app. It renders as an <a> tag with correct href by default -->
                <ul class="nav nav-pills nav-stacked">
                    <!--hr used for top border of 1 px-->
                    <hr class="margin-top-5 margin-bottom-5">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/users" v-bind:class="{active: users}" >User Listing</router-link>
                    </li>
                    <!--hr used for top border of 1 px-->
                    <li class="nav-item">
                        <router-link class="nav-link" to="/users/new" v-bind:class="{active: newuser}">Add new user</router-link>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>
<script>
    module.exports = {
        data: function () {
            return {
                newuser: false,
                users: false
            };
        },
        // Set the flags for active link according to the page open
        mounted: function () {
            let self = this;
            if(this.$route.path == '/users'){
                self.users = true
            }
            if(this.$route.path == '/users/new'){
                self.newuser = true
            }
        }
    }
</script>
