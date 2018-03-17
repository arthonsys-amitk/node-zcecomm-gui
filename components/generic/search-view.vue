<template>
<div>
    <div>
      <div class="dropdown search-box">
        <select id="selectSearchType" style="padding:4px;">
             <option v-for="searchType in searchtypes" v-bind:key="searchType.value">{{searchType.label}}</option>
        </select>
     </div> 

       <input type="text" class="search-box" name="search" v-model="searchvalue" placeholder="Search..">
       <button class="btn btn-primary" name="search" v-on:click="searchpurchase">
            <span class="glyphicon glyphicon-search"></span>
    </div>
</div>    
</template>
<style>
   
.dropdown-filter{
    position: relative;
}

.search-view{
    position: relative;
}



.search-box{
    
    padding:4px;
    margin:4px;
    display: inline-block;
    
    
}
</style>    
<script>


module.exports = {
  props: ['searchtypes', 'defaulttype','searchvalue'],
  data: function () {
    return {
      searchtypes : this.searchtypes,
      defaulttype: this.defaultvalue,
      searchvalue:this.searchvalue
    }
  },
  methods:{
    searchpurchase () {
        var e = document.getElementById("selectSearchType");
        var selectedIndex = e.selectedIndex;
        var selectedValue=this.searchtypes[selectedIndex];
        console.log("surgent here");
        console.log(selectedIndex);
        console.log(selectedValue);
      this.$emit('searchpurchase',selectedValue,this.searchvalue,"");
    }
  }
}   
      
   
</script>
