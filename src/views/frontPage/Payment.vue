<template>
  <div>
    <div class="container container_mb">
      <div v-if="order === null" >
        <div class="alert alert-warning" role="alert">
          <h2 class="text-center">找不到訂單</h2>
          <div class="text-center my-2">
            <router-link  to="/checkpayment" style="font-size:1.2rem">回訂單查詢</router-link>
          </div>
        </div>
      </div>
      <form @submit.prevent = "payOrder" v-else>
        <div class=" row justify-content-center">
          <div class="check_order_width col-md-8 ">
            <div class=" p-3 text-center check_list_title">訂單內容</div>
            <div class=" my-3 p-3">
              <table class="table text-dark">
                <thead>
                  <th>品名</th>
                  <th>數量</th>
                  <th>單價</th>
                </thead>
                <tbody>
                  <tr v-for="item in order.products" :key="item.id" >
                    <td class="align-middle">{{ item.product.title }}</td>
                    <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                    <td class="align-middle text-right">{{ item.final_total }} </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr class="check_order_total"  v-if="coupon">
                    <td class="text-danger" style="font-size:1rem">已加入折扣:<br> {{ coupon }}</td>
                    <td class="text-right" >總計</td>
                    <td class="text-right">{{ order.total }} 元</td>
                  </tr>
                  <tr class="check_order_total" v-if="!coupon">
                    <td colspan="2" class="text-right" >總計</td>
                    <td class="text-right">{{ order.total }} 元</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div class="check_order_width col-md-8 ">
            <div class=" p-3 text-center check_list_title">付款內容</div>
            <div class=" my-3 p-3">
                <table class="table text-dark ">
                  <tbody>
                    <tr>
                      <th>Email</th>
                      <td>{{ order.user.email }}</td>
                    </tr>
                    <tr>
                      <th>姓名</th>
                      <td>{{ order.user.name }}</td>
                    </tr>
                    <tr>
                      <th>收件人電話</th>
                      <td>{{ order.user.tel }}</td>
                    </tr>
                    <tr>
                      <th>收件人地址</th>
                      <td>{{ order.user.address }}</td>
                    </tr>
                    <tr>
                      <th>付款狀態</th>
                      <td>
                        <span v-if="!order.is_paid" class="text-danger">尚未付款</span>
                        <span v-else class="text-success">付款完成</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
            </div>

          </div>
          <div class="text-center col-12" v-if="order.is_paid === false">
            <button class="btn btn-danger mb-3">確認付款去</button>
          </div>

        </div>

      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orderId: '',
      order: {
        user: {},
        products: [],
      },
      coupon: [],
      order_item: {},
      is_loading: false,
    };
  },
  methods: {
    getOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`;
      vm.is_loading = true;
      this.$http.get(api).then((response) => {
        vm.order = response.data.order;
        vm.products = vm.order.products;
        vm.order.total = Math.round((vm.order.total * 10) / 10);
        Object.keys(vm.products).forEach((item) => {
          vm.products[item].final_total = Math.round((vm.products[item].final_total * 10) / 10);
          if (vm.products[item].coupon) {
            vm.coupon = vm.products[item].coupon.title;
          } else {
            vm.coupon = null;
          }
        });
        vm.is_loading = false;
      });
    },
    payOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`;
      vm.is_loading = true;
      this.$http.post(api).then((response) => {
        // console.log(response);
        if (response.data.success) {
          vm.getOrder();
          vm.$router.push('/checksuccess');
        }
        vm.is_loading = false;
      });
    },
  },
  created() {
    this.orderId = this.$route.params.orderId;
    // console.log(this.orderId);
    this.getOrder();
  },
};
</script>
