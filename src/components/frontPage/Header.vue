<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-white py-4">
      <button
        class="navbar-toggler hamger"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="material-icons">dehaze</i>
      </button>
      <router-link class="navbar-brand Logo" to="/">Sweetaste</router-link>
      <div class="top mobile" @click="top">top</div>
      <router-link class="mobile ipad" to="/cart">
        <button class="btn btn-sm btn-cart">
          <i class="material-icons mobile ipad">shopping_cart</i>
          <AddCart></AddCart>
        </button>
      </router-link>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto menu">
          <li class="nav-item">
            <router-link class="nav-link" to="/">首頁</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/product">甜點</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/checkpayment">訂單查詢</router-link>
          </li>
          <li class="nav-item desktop">
            <router-link class="nav-link" to="/login">後台登入</router-link>
          </li>
        </ul>
      </div>
      <router-link class="desktop mt-4" to="/cart">
        <button class="btn btn-sm btn-cart">
          <i class="material-icons">shopping_cart</i>
          <AddCart></AddCart>
        </button>
      </router-link>
    </nav>
  </div>
</template>
<style>
.btn-cart {
  background-color: transparent;
  position: relative;
}
</style>
<script>
import $ from 'jquery';
import AddCart from '@/components/frontPage/AddCart.vue';

export default {
  components: {
    AddCart,
  },
  methods: {
    top() {
      $('html,body').animate(
      // eslint-disable-next-line
        {scrollTop: 0},700);
    },
  },
};
</script>
