import Vue from 'vue'
import Router from 'vue-router'

import dashBoard from '@/components/dashBoard'
import Login from '@/components/pages/Login'

import products from '@/components/pages/products'
import orders from '@/components/pages/orders'
import customerOrder from '@/components/pages/customerOrder'
import customerCheckout from '@/components/pages/customerCheckout'
import coupon from '@/components/pages/coupon'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'*',
      redirect:'login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/admin',
      name: 'dashBoard',
      component: dashBoard,
      children:[
        {
          path:'products',
          name:'products',
          component: products,
          meta: { requiresAuth: true },
        },
        {
          path:'orders',
          name:'orders',
          component: orders,
          meta: { requiresAuth: true },
        },
        {
          path:'coupon',
          name:'coupon',
          component: coupon,
          meta: { requiresAuth: true },
        }
      ]
    },
    {
      path: '/',
      name: 'CdashBoard',
      component: dashBoard,
      children:[
        {
          path:'customerOrder',
          name:'customerOrder',
          component: customerOrder,
        },
        {
          path:'customer_checkout/:orderId',
          name:'customerCheckout',
          component: customerCheckout,
        },
      ]
    }
  ]
})
