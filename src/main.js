// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import MintUI from 'mint-ui'  
import 'mint-ui/lib/style.css'
import axios from 'axios'
import {
  findConfigItem,
  loadProvince,
  dateToStr,
  loadDictionary,
  dateToStrMinue,
  makeAddr,
  dictionaryToFilter,
  checkImgType, checkLogin, checkAddr
} from './util/util.js'


axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false
Vue.use(MintUI)
axios.defaults.baseURL = 'http://134.175.0.94/wf';
Vue.prototype.findConfigItem = findConfigItem;
Vue.prototype.loadProvince = loadProvince;
Vue.prototype.dateToStr = dateToStr;
Vue.prototype.loadDictionary = loadDictionary;
Vue.prototype.dateToStrMinue = dateToStrMinue;
Vue.prototype.makeAddr = makeAddr;
Vue.prototype.dictionaryToFilter = dictionaryToFilter;
Vue.prototype.checkImgType = checkImgType;
Vue.prototype.checkLogin = checkLogin;
Vue.prototype.checkAddr = checkAddr;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created(){
    this.loadDictionary("gsxz,sshy,zycp,cxsj,hsly,hszl,hslb,unit");
  },
})
