// First of all, lets load the router configuration.
const router = new VueRouter({
  routes : [
    {
      path: "/",
      component: "main-view-component"
    },
    {
      path: "/login",
      component: "login-component"
    },
    {
      path: "/login",
      component: "login-form"
    },
    {
      path: "/forgotpassword",
      component: "forgot-password"
    },
    {
      path: "/resetPassword/:resetKey",
      component: "reset-password"
    },
    {
      path: "/users",
      component: "users-view-component"
    },
    {
      path: "/users/:userID",
      component: "users-edit-component"
    },
    {
        path: "/feedback",
        component: "feedback-view-component"
    },
    {
      path: "/products",
        component: "products-view-component"
    },
    {
        path: "/products/:productID",
        component: "products-edit-component"
    },
    {
      path: "/purchases",
        component: "purchases-view-component"
    },
     {
      path: "/purchases/:purchaseID",
        component: "purchases-edit-component"
    },
      //Default route,, when none of the above matches:

    {
      path: "*",
      component: "not-found-component"
    }
  ]
});
router.beforeEach((to, from, next) => {
  if(!window.loggedin && to.path!='/resetPassword' && to.path!='/login' && to.path!='/forgotpassword')
  {
    next({path: "/login"});
  } else {
    next(true);
  }
});
//Now lets launch the Vue APP.
const app = new Vue({
  router,
  data : {
    currentView : "account-view-component",
    loggedin : window.loggedin
  },
  components: {
              'admin-component': httpVueLoader('/components/generic/admin.vue'),
              'nologin-component': httpVueLoader('/components/generic/nologin-view.vue')
          },
  created : function () {
    if(loadSession()) {
      this.loggedin=window.loggedin=true;
      this.$router.push("/");
    } else {
      //we want password reset link to land directly, even if user is not autherized.
      if(this.$route.path.indexOf("resetPassword")==-1) {
        this.$router.push("/login");
      }
    }
    return true;
  }
}).$mount('#app');
