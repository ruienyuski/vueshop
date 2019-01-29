<template>
  <span class="badge badge-pill badge-danger" v-if="cartNum!== 0 ">{{cartNum}}</span>
</template>
<script>
export default {
  name: 'AddCart',
  data() {
    return {
      cartNum: null,
      message: [],
    };
  },
  methods: {
    // eslint-disable-next-line
    getCartNum(message) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/cart`;
      const cartNum = null;
      this.$http.get(api).then((response) => {
        vm.cartNum = response.data.data.carts.length;
        vm.message.push({ cartNum });
      });
    },
  },
  created() {
    const vm = this;
    this.getCartNum();
    vm.$bus.$on('message:push', (cartNum) => {
      vm.getCartNum(cartNum);
    });
  },
};
</script>
