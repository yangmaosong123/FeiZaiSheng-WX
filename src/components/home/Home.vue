<template>
<div> 
    <logo/>
    
    <info/>
    
    <sys-info/>    
    
    <company-list/>
</div>
</template>

<script>
import Search from './Search'
import Logo from './Logo'
import Info from './Info'
import SysInfo from './SysInfo'
import CompanyList from './CompanyList'
export default {
    name: 'Home',
    components:{
        "search":Search,
        "logo":Logo,
        "info":Info,
        "sys-info":SysInfo,
        "company-list":CompanyList
    },
    data() {
        return {}
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bk{
    width: 100px;
    height: 200px;    
}
</style>
