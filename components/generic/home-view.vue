<template>
    <div>
        <!--functional component that renders the matched component for the given path. -->
        <router-view></router-view>
    </div>
</template>
<script>
    // load all the parent components here based on the routes
    // main-view-component for showing main viewwing area
    // account-edit and accounts-view-component is for showing account page
    // not-found-component is for showing on 404 page when no routes matches
    // accounts-setting-component is for edit search config
    module.exports = {
        data: function () {
            return {
                greeting: "hello"
            };
        },
        components: {
            'main-view-component': httpVueLoader('/components/dashboard/main-view.vue'),
            'users-view-component' : httpVueLoader('/components/users/users-view.vue'),
            'users-edit-component' : httpVueLoader('/components/users/users-edit.vue'),
            'feedback-view-component': httpVueLoader('/components/feedback/feedback-view.vue'),
            'products-view-component': httpVueLoader('/components/products/products-view.vue'),
            'products-edit-component': httpVueLoader('/components/products/products-edit.vue'),
            'purchases-view-component': httpVueLoader('/components/purchases/purchases-view.vue'),
            'purchases-edit-component': httpVueLoader('/components/purchases/purchases-edit.vue'),
            'not-found-component': httpVueLoader('/components/generic/404.vue')
        },
        mounted: function () {
        }
    }
</script>
