<template>
  <div>
    <div class="container container_mb">
      <div class="row justify-content-center">
        <div class="col-lg-6 col-12 pay_width">
          <form @submit.prevent="createOrder">
            <div class="card text-center check_bg">
              <div class="card-head row justify-content-between">
                <div class="check_step_title col-lg-3 col-5">運送</div>
                <!-- <div class="col-lg-6 col-6 align-self-center">
                  <div class="progress">
                    <div class="step in"></div>
                    <div class="step"></div>
                    <div class="step"></div>
                  </div>
                </div>-->
              </div>

              <div class="card-body">
                <div class="form-row">
                  <div class="form-group col-lg-12 col-12">
                    <label for="name">姓名</label>
                    <input
                      type="text"
                      v-model="form.user.name"
                      v-validate="'required'"
                      class="form-control form-control-lg"
                      :class="{'is-invalid':errors.has('name')}"
                      name="name"
                      id="name"
                      placeholder="王小明"
                    >
                    <span class="text-warning" v-if="errors.has('name')">姓名必須填入</span>
                  </div>

                  <div class="form-group col-lg-12 col-12">
                    <label for="phone">電話</label>
                    <input
                      type="tel"
                      v-model="form.user.tel"
                      class="form-control form-control-lg"
                      :class="{'is-invalid':errors.has('tel')}"
                      id="phone"
                      name="tel"
                      placeholder="0912-345-678"
                      v-validate="'required'"
                    >
                    <span class="text-warning" v-if="errors.has('tel')">電話必須輸入</span>
                  </div>

                  <div class="form-group col-lg-12 col-12">
                    <label for="email">電子郵件信箱</label>
                    <input
                      type="email"
                      v-model="form.user.email"
                      v-validate="'required|email'"
                      class="form-control form-control-lg"
                      name="email"
                      id="email"
                      placeholder="example@email.com"
                      required
                    >
                    <span
                      class="text-warning"
                      v-if="errors.has('email')"
                    >{{ errors.first('email') }}</span>
                  </div>

                  <div class="form-group col-lg-12 col-12">
                    <label for="address">地址</label>
                    <input
                      type="text"
                      v-model="form.user.address"
                      class="form-control form-control-lg"
                      :class="{'is-invalid':errors.has('address')}"
                      id="address"
                      name="address"
                      placeholder="xx 市 xx 區 xx 路 xx 號"
                      v-validate="'required'"
                    >
                    <span class="text-warning" v-if="errors.has('address')">地址必須輸入</span>
                  </div>

                  <div class="form-group col-lg-12 col-12">
                    <label for="InputTextarea">留言</label>
                    <textarea
                      class="form-control"
                      v-model="form.message"
                      id="InputTextarea"
                      rows="3"
                    ></textarea>
                  </div>
                </div>
              </div>

              <button class="btn cart-footer check_btn_bg border-0 rounded-0"
              type="submit">
              下一步
              </button>
            </div>
          </form>
        </div>

        <div class="col-lg-4 col-12 align-items-start desktop">
          <div class="check_order_width">
            <div class="p-3 text-center check_list_title">訂單摘要</div>
            <table class="table table-borderless">
              <tr>
                <td class="text-left">小計</td>
                <td class="text-right">NT$ {{cart.total}}</td>
              </tr>
              <tr class="mb-2 check_order_total" v-if="cart.final_total === cart.total">
                <td class="text-left">總計</td>
                <td class="text-right">NT$ {{cart.total}}</td>
              </tr>
              <tr class="check_order_total" v-if="cart.final_total !== cart.total">
                <td class="text-left">優惠價</td>
                <td class="text-right">NT$ {{cart.final_total}}</td>
              </tr>
            </table>
          </div>
          <div class="check_order_width">
            <div class="p-3 text-center check_list_title">購物清單</div>
            <div class="my-3" v-for="item in cart.carts" :key="item.id">
              <div class="row justify-content-around" >
                <div
                  class="col-lg-7 col-5 align-self-center p-0 check_product_img bg-cover"
                  :style="{backgroundImage: `url(${item.product.imageUrl})`}"
                ></div>
                <div class="col-lg-5 col-7 row p-0 justify-content-center">
                  <div class="col-lg-12 col-12 align-self-center check_product_item">
                    <div>{{item.product.title}} ({{item.qty}})</div>
                    <div class="product_price">NT$ {{item.final_total}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cart: {},
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  methods: {
    getCart() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/cart`;
      this.$http.get(api).then((response) => {
        vm.cart = response.data.data;
        // const cartItem = {};
        vm.cartItem = vm.cart.carts;
        vm.cart.final_total = Math.round((vm.cart.final_total * 10) / 10);
        vm.cartItem.forEach((item) => {
          // eslint-disable-next-line
          item.final_total = Math.round((item.final_total * 10) / 10);
        });
      });
    },
    createOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/order`;
      const order = vm.form;
      vm.isLoading = true;
      this.$validator.validate().then((result) => {
        if (result) {
          this.$http.post(api, { data: order }).then((response) => {
            // console.log('訂單已建立',response);
            if (response.data.success) {
              this.$bus.$emit('message:push');
              vm.$router.push(`/payment/${response.data.orderId}`);
            }
            vm.isLoading = false;
          });
        }
        // else {
        //   console.log('欄位不完整')
        // }
      });
    },
  },
  created() {
    this.getCart();
  },
};
</script>
