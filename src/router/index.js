import Vue from 'vue';
import Router from 'vue-router';
import Signout from '@/components/Signout';
import Dashboard from '@/components/Dashboard';
import Products from '@/components/pages/Products';
import Orders from '@/components/pages/Orders';
import CustomerOrders from '@/components/pages/CustomerOrders';
import Coupons from '@/components/pages/Coupons';
import CustomerCheckout from '@/components/pages/CustomerCheckout';



import ProductList from '@/components/front_pages/ProductList';
import ProductDetail from '@/components/front_pages/ProductDetail';
import Layout from '@/components/front_pages/Layout';
import index from '@/components/front_pages/index';
import Cart from '@/components/front_pages/Cart';
import CheckOrder from '@/components/front_pages/CheckOrder';
import Payment from '@/components/front_pages/Payment';
import CheckPayment from '@/components/front_pages/CheckPayment';
import CheckSuccess from '@/components/front_pages/CheckSuccess';
import Login from '@/components/front_pages/Login';

Vue.use(Router)

export default new Router({
  // linkActiveClass:'active',
    linkExactActiveClass:'active',
  routes: [
    {
      path: '*',
      redirect: '/',
    },
    {
      path: '/',
      component:Layout,
      children:[
        {
          path:'',
          name:'index',
          component:index,
        },
        {
          path:'/cart',
          name:'cart',
          component:Cart,
        },
        {
          path:'/checkorder',
          name:'CheckOrder',
          component:CheckOrder,
        },
        {
          path:'/payment/:orderId',
          name:'Payment',
          component:Payment,
        },
        {
          path:'/checksuccess',
          name:'CheckSuccess',
          component:CheckSuccess,
        },
        {
          path:'/checkpayment',
          name:'CheckPayment',
          component:CheckPayment,
        },                   
        {
          path:'/product',
          name:'ProductList',
          component:ProductList,
        },
        {
          path:'/product/:id',
          name:'ProductDetail',
          component:ProductDetail,
        },
        {
          path:'/login',
          name:'Login',
          component:Login,
        },

      ]
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'products',
          name: 'products',
          component: Products,
          meta: { requiresAuth: true },
        },
        {
          path: 'orders',
          name: 'orders',
          component: Orders,
          meta: {requiresAuth: true },
        },
        {
          path: 'customer_order',
          name: 'customerOrder',
          component: CustomerOrders,
        },
        {
          path: 'customer_checkout/:orderId',
          name: 'CustomerCheckout',
          component: CustomerCheckout,
        },        
        {
          path: 'coupons',
          name: 'coupons',
          component: Coupons,
         
        },       

        
      ]
    },


    
  ],
});
