<template>
<div class="div">
    <mt-search v-model="value" placeholder="搜索" class="search">
    </mt-search>
</div>
</template>

<script>
export default {
    name: 'Search',
    data() {
        return {
            value:"",
        }
    }
}
</script>

<style scoped>
.div{    
    height: 50px;
}

</style>

<style>
.mint-searchbar-inner{
 border-radius: 20px;
 height: 26px;
 padding-left:5px ;
}
.mint-searchbar{
 background:#f1f1f1;    
}
</style>
