<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container container_mb">
      <div class="row justify-content-between">
        <div class="col-lg-8 col-12 cart_width">
          <div class="p-3 text-center cart_title">您的購物車</div>

          <div class="cart_list" v-for="item in cart.carts" :key="item.id">
            <div class="row m-0 justify-content-between mt-4">
              <router-link
                :to="{name:'ProductDetail',params:{id:item.product.id}}"
                class="col-lg-2 col-md-4 col-4 align-self-center cart_product_img bg-cover"
                :style="{backgroundImage: `url(${item.product.imageUrl})`}"
              ></router-link>
              <div class="col-lg-6 col-md-5 col-6 row justify-content-center">
                <div class="col-lg-7 col-md-7 col-12 align-self-center cart_product_item">
                  <div class="product_title">{{item.product.title}}</div>
                  <div>NT$ {{item.product.price}}</div>
                  <div class="text-success" v-if="item.coupon">已套用優惠卷</div>
                </div>
                <div class="col-lg-5 col-md-5 col-12 align-self-center cart_product_number">
                  <div class="product_price">{{item.qty}} / {{item.product.unit}}</div>
                </div>
              </div>
              <div
                class="col-lg-2 col-md-2 align-self-center product_price"
              >NT$ {{item.final_total}}</div>
              <a
                href="#"
                class="col-lg-1 col-md-1 col-2 align-self-center"
                @click="removeCartItem(item.id)"
              >
                <i class="material-icons cart_delete_icon">delete_outline</i>
              </a>
            </div>
            <hr>
            <div class="row justify-content-between">
              <div class="col-4 mobile_product_price">{{item.qty}} / {{item.product.unit}}</div>
              <div class="col-4 align-self-center mobile_product_price">
                NT$ {{item.final_total}}
              </div>
            </div>

            <hr class="mobile">
          </div>

          <div class="mt-3 mx-0 row justify-content-center">
            <div class="input-group mb-3 col-lg-12 col-10 px-0" v-if="cart.total !== 0">
              <input
                type="text"
                class="form-control"
                v-model="coupon_code"
                placeholder="請輸入優惠碼"
                aria-label="cost_number"
                aria-describedby="button-addon2"
              >
              <div class="input-group-append">
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  id="button-addon"
                  @click="addCouponCode"
                >套用優惠碼</button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-12 order_width">
          <div class="card text-center order_bg">
            <div class="card-head">訂單摘要</div>
            <div class="card-body">
              <table class="table table-borderless">
                <tr class="row justify-content-between">
                  <td>小計</td>
                  <td>NT$ {{cart.total}}</td>
                </tr>
                <tr class="row justify-content-between mb-2">
                  <td>
                    <div v-if="coupon_code" class="text-left">已加入優惠卷:
                      <br>
                      {{coupon_title}}
                    </div>
                  </td>
                  <td>
                    <div v-if="coupon_code" class="text-left">優惠卷碼:
                      <br>
                      {{coupon_code}}
                    </div>
                  </td>
                </tr>
                <tr
                  class="row justify-content-between order_total order_sale"
                  v-if="cart.final_total === cart.total"
                >
                  <td>總計</td>
                  <td>NT$ {{cart.total}}</td>
                </tr>
                <tr
                  class="row justify-content-between order_total order_sale"
                  v-if="cart.final_total !== cart.total"
                >
                  <td>優惠價</td>
                  <td>NT$ {{cart.final_total}}</td>
                </tr>
              </table>
            </div>

            <button
              class="btn cart-footer check_btn_bg border-0 rounded-0"
              v-if="cart.total !== 0"
              @click="nextStep"
            >結帳</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
</style>
<script>
export default {
  data() {
    return {
      cart: {},
      coupon_code: '',
      coupon_title: '',
      isLoading: false,
    };
  },
  methods: {
    getCart() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/cart`;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.cart = response.data.data;
        // console.log(vm.cart)
        // let cart_item = {};
        vm.cart_item = vm.cart.carts;
        // console.log(vm.cart)
        vm.cart.final_total = Math.round((vm.cart.final_total * 10) / 10);
        vm.cart_item.forEach((item) => {
          // eslint-disable-next-line
          item.final_total = Math.round((item.final_total * 10) / 10);
          // console.log(item.coupon)
          if (!item.coupon) {
            vm.coupon_code = null;
            vm.coupon_title = null;
          } else {
            vm.coupon_code = item.coupon.code;
            vm.coupon_title = item.coupon.title;
          }
        });
      });
      vm.isLoading = false;
    },
    nextStep() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/cart`;
      // const carts = [];
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        // console.log(response.data.data.carts);
        vm.carts = response.data.data.carts;
        vm.isLoading = false;
        vm.$router.push('/checkorder/');
      });
    },
    removeCartItem(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/cart/${id}`;
      vm.isLoading = true;
      this.$http.delete(api).then(() => {
        this.$bus.$emit('message:push');
        vm.getCart();
        vm.isLoading = false;
      });
    },

    addCouponCode() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/coupon`;
      const coupon = {
        code: vm.coupon_code,
      };
      vm.isLoading = true;
      const api2 = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/cart`;

      this.$http.get(api2).then((response) => {
        let Coupons = {};
        Coupons = response.data.data;
        vm.isLoading = false;
        if (Coupons.final_total !== Coupons.total) {
          this.$bus.$emit('messageItem:push', '已經套用優惠卷!', 'danger');
          vm.getCart();
        } else {
          this.$http.post(api, { data: coupon }).then(() => {
            vm.getCart();
          });
        }
      });
    },
  },
  created() {
    this.getCart();
  },
};
</script>
