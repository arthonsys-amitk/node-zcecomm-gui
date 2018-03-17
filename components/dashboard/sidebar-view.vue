<!--template for sidebar contains sidebar link this should be visible in some screens like reporting -->
<template>
    <div class="col-sm-3 col-md-2 bg-light sidebar theme">
        <nav>
            <!--bootstrap vertical nav pills is used to show the links-->
            <!--<router-link> is the component for enabling user navigation in a router-enabled app. It renders as an <a> tag with correct href by default -->
            <ul class="nav nav-pills nav-stacked">
                <!--hr used for top border of 1 px-->
                <hr class="margin-top-5 margin-bottom-5">
                <li class="nav-item">
                    <router-link class="nav-link" to="/">My Reports</router-link>
                </li>
                <!--hr used for top border of 1 px-->
                <hr class="margin-top-5 margin-bottom-5">
                <li class="nav-item">
                    <router-link class="nav-link" to="/">Report1</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/">Report2</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/">Report3</router-link>
                </li>
            </ul>
            <ul class="nav nav-pills nav-stacked">
                <!--hr used for top border of 1 px-->
                <hr class="margin-top-5 margin-bottom-5">
                <li class="nav-item">
                    <router-link class="nav-link" to="/">Default Reports</router-link>
                </li>
                <hr class="margin-top-5 margin-bottom-5">
                <li class="nav-item">
                    <router-link class="nav-link" to="/">Report1</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/">Report2</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/">Report3</router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>
