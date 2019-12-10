import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/pages/Index';
import Detail from '@/components/pages/Detail';
import Login from '@/components/pages/Login';
import Dashboard from '@/components/Dashboard';
import Products from '@/components/pages/Products';
import Orders from '@/components/pages/Orders';
import Coupon from '@/components/pages/Coupon';
import Checkout from '@/components/pages/Checkout';
import Pay from '@/components/pages/Pay';
import ProductList from '@/components/pages/ProductList';
import Contact from '@/components/pages/Contact';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/',
    },
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path:'/productlist',
      name: 'ProductList',
      component: ProductList
    },
    {
      path:'/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/detail/:productId',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/checkout',
      name: 'Chekout',
      component: Checkout
    },
    {
      path: '/pay/:orderId',
      name: Pay,
      component: Pay
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'products',
          name: 'Products',
          component: Products,          
          meta: { requiresAuth: true },
        },
        {
          path: 'orders',
          name: 'Orders',
          component: Orders,          
          meta: { requiresAuth: true },
        },
        { 
          path: 'coupon',
          name: 'Coupon',
          component: Coupon,          
          meta: { requiresAuth: true },
        },
      ]
    },
  ]
})
