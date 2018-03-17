<!--template for login page-->
<template>
    <div class="login">
        <div class="">
            <div class="content">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-12 padding-20">
                            <h4 class="white"></h4>
                        </div>
                        <!--use offset to show login form in center of the screen-->
                        <div class="card card-hidden padding-20 col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3 padding-top-20">
                          <p class="padding-20 text-center"><img style="width: 80px;" src="images/Logo_PNG.png"></p>
                          <user-message></user-message>
                          <router-view></router-view>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
module.exports = {
  data: function () {
    return {
    }
  },
  components : {
    'user-message' : httpVueLoader('/components/generic/user-message.vue'),
    'login-form' : httpVueLoader('/components/login/login.vue'),
    'forgot-password' : httpVueLoader('/components/forgotpassword/forgotpassword.vue'),
    'reset-password' : httpVueLoader('/components/resetpassword/resetpassword.vue')
  }
}
</script>
