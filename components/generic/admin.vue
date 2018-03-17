<template>
    <div class="container-fluid">
    <div style="position:fixed;top:0;right:10px;color:white;z-index:1031;font-size:12px">Logged in as <span style="color:orange">{{userObj.email}}</span></div>
        <!--load nav component which renders the links in header-->
        <section class="row header">
          <nav-view-component></nav-view-component>
        </section>
        <section class="row">
          <!--home component renders the main viewing area like sidebar and main area-->
          <home-view-component></home-view-component>
        </section>
        <section class="row">
          <!--home component renders the main viewing area like sidebar and main area-->
          <footer-component></footer-component>
        </section>
    </div>
</template>
<script>
    // Load nav component here because we need it on every page except from login page and home component which depends on other components
    module.exports = {
        data: function () {
            return {
              userObj : window.userInfo
            };
        },
        components: {
            'nav-view-component': httpVueLoader('/components/generic/nav-view.vue'),
            'home-view-component': httpVueLoader('/components/generic/home-view.vue'),
            'footer-component': httpVueLoader('/components/generic/footer.vue')
        },
        mounted: function () {
            var self = this;
        }
    }
</script>
