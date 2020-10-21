// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import 'bootstrap'

import veeValidate from 'vee-validate'
import zhTW from 'vee-validate/dist/locale/zh_TW'
import VueI18n from 'vue-i18n';

import App from './App'
import router from './router'
import './bus';
import currency from './filters/currency';


axios.defaults.withCredentials = true;
Vue.config.productionTip = false
Vue.use(VueAxios, axios);


Vue.component('Loading',Loading);

// Vue.filter('自訂名稱',注入的名稱)
Vue.filter('currency',currency)

// 驗證 轉中文語系
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'zhTW'
});
Vue.use(veeValidate, {
  i18n,
  dictionary: {
    zhTW
  }
});

/* eslint-disable no-new */
new Vue({
  i18n,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  // console.log(to, from, next);
  if(to.meta.requiresAuth){

      const api =`${process.env.APIPATH}/api/user/check`;
      // const vm = this;
      axios.post(api).then((response) => {
      // console.log(response.data)
      // vm.$router.push("/");
        if(response.data.success){
          next();
        }
        else{
          next({
            path:'/login',
          })
        }
      })
  }
  else{
    next();
  }

})
