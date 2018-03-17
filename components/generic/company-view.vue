<!--template for loading company dropdown-->
<template>
    <ul class="nav navbar-nav navbar-right" v-if="companydata.length && (userInfo.role == 'admin' || userInfo.role == 'superuser')">
        <!--used to showcross icon will be sow if comapy selected for removing the company dselection-->
        <li v-if="companyID" class="pull-right pointer"><a v-on:click="removeSelection()"><i
                title="Remove Company Selection" class="fa fa-times"></i></a></li>
        <!--used to show company list-->
        <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
               aria-haspopup="true" aria-expanded="false">
                <span id="companySelected" v-bind:class="{ selected: companyID }">{{companyName ? companyName : 'Select Company'}}</span> <span
                    class="caret" v-bind:class="{ selected: companyID }"></span></a>
            <ul class="dropdown-menu">
                <li class="btn-transparent" v-for="data in companydata">
                    <button class="btn-transparent zen-btn" v-on:click="changeAccountId(data)">{{data.name}}</button>
                </li>
            </ul>
        </li>
    </ul>
</template>
<script>
    // Define from where to fetch the list of all companies.
    let dataUrlDetails = {
        "search": {
            "itemName": "childAccounts",
            "url": "/API/account/search",
            "method": "POST",
            "query": [
                {
                    "name": "accountParentID",
                    "source": "userInfo",
                    "param": "accountID"
                }
            ]
        },
        "view" : {
            "itemName" : "childAccounts",
            "url" : "/API/account/",
            "method" :"GET"
        },
    };
    module.exports = {
        data: function () {
            return {
                companydata: [],
                companyID: '',
                companyName:''
            };
        },
        methods: {
            //method to set selected company id and company name in sessionStorage
            changeAccountId: function (data) {
                let self = this;
                let router = this.$router;
                self.companyID = data._id;
                self.companyName = data.name;
                //update session storage if company changed
                sessionStorage.setItem('companyID', self.companyID);
                sessionStorage.setItem('companyName', data.name);
                router.push("/");
            },
            //method to remove selected company id and company name in sessionStorage
            removeSelection: function () {
                let self = this;
                let router = this.$router;
                self.companyID = '';
                self.companyName = '';
                //remove session storage if company changed
                sessionStorage.removeItem('companyID');
                sessionStorage.removeItem('companyName');
                router.push("/");
            }
        },
        mounted: function () {
            let self = this;
            let searchObj = {};
            //get list of companies based on role, for admin role child compnies will be listed and for superuser all te companies is listed in dropdown
            if (userInfo && userInfo.role && (userInfo.role == 'admin' || userInfo.role == 'superuser')) {
                self.companyID = sessionStorage.getItem('companyID');
                self.companyName = sessionStorage.getItem('companyName');
                searchObj = getValue(dataUrlDetails.search.query);
                //check for superuser as need to show all companies to superuser
                if (userInfo.role == 'superuser') {
                    searchObj = {}
                }
                //get child company of current logged in user with role admin
                // in case of superuser all the company will be listed as searchobj is empty in case of superuser
                fetchData(apiServer + dataUrlDetails.search.url, dataUrlDetails.search.method, searchObj, function (responseData) {
                    self.companydata = responseData;
                    //get company of current logged in user with role admin if child companies exists
                    if(userInfo.role == 'admin' && self.companydata.length){
                    fetchData(apiServer+dataUrlDetails.view.url+userInfo.accountID, dataUrlDetails.view.method,"" , function (responseData) {
                        self.companydata.unshift(responseData);
                    });
                    }
                });
            }
        }
    }
</script>
<style>
    .selected {
        color: orange;
    }
</style>