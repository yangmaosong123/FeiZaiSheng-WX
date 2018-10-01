import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import CompanyDetails from '@/components/company-details/Index'
import GoodsList from '@/components/goods/GoogsIndex'
import GoodsDetails from '@/components/goods/GoodsDetails'
import InfoList from '@/components/info-list/InfoIndex'
import InfoDetails from '@/components/info-list/InfoDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/company-details',
      name: 'CompanyDetails',
      component: CompanyDetails
    },
    {
      path: '/goods-list',
      name: 'GoodsList',
      component: GoodsList
    },

    {
      path: '/goods-details',
      name: 'GoodsDetails',
      component: GoodsDetails
    },

    {
      path: '/info-list',
      name: 'InfoList',
      component: InfoList
    },

    {
      path: '/info-details',
      name: 'InfoDetails',
      component: InfoDetails
    },
    

    
  ]
})
