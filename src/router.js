import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/backPage/Dashboard.vue';
import Products from '@/views/backPage/Products.vue';
import Orders from '@/views/backPage/Orders.vue';
import CustomerOrders from '@/views/backPage/CustomerOrders.vue';
import Coupons from '@/views/backPage/Coupons.vue';
import CustomerCheckout from '@/views/backPage/CustomerCheckout.vue';
import ProductList from '@/views/frontPage/ProductList.vue';
import ProductDetail from '@/views/frontPage/ProductDetail.vue';
import Layout from '@/components/frontPage/Layout.vue';
import Cart from '@/views/frontPage/Cart.vue';
import CheckOrder from '@/views/frontPage/CheckOrder.vue';
import Payment from '@/views/frontPage/Payment.vue';
import CheckPayment from '@/views/frontPage/CheckPayment.vue';
import CheckSuccess from '@/views/frontPage/CheckSuccess.vue';
import Login from '@/views/frontPage/Login.vue';

Vue.use(Router);

export default new Router({
  // linkActiveClass:'active',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '*',
      redirect: '/',
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          name: 'index',
          component: () => import('@/views/frontPage/Index.vue'),
        },
        {
          path: '/cart',
          name: 'cart',
          component: Cart,
        },
        {
          path: '/checkorder',
          name: 'CheckOrder',
          component: CheckOrder,
        },
        {
          path: '/payment/:orderId',
          name: 'Payment',
          component: Payment,
        },
        {
          path: '/checksuccess',
          name: 'CheckSuccess',
          component: CheckSuccess,
        },
        {
          path: '/checkpayment',
          name: 'CheckPayment',
          component: CheckPayment,
        },
        {
          path: '/product',
          name: 'ProductList',
          component: ProductList,
        },
        {
          path: '/product/:id',
          name: 'ProductDetail',
          component: ProductDetail,
        },
        {
          path: '/login',
          name: 'Login',
          component: Login,
        },
      ],
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
          meta: { requiresAuth: true },
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
      ],
    },
  ],
});
