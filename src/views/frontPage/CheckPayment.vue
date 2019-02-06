<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container container_mb">
      <div class="row justify-content-center">

        <div class="col-lg-6 col-12 order_width">
          <div class="card order_bg">
            <div class="card-head text-center">訂單查詢</div>
            <div class="card-body mb-3">

              <div class="form-group ">
                <label for="OrderNumInput"></label>
                <input
                type="text"
                class="form-control"
                id="OrderNumInput"
                placeholder="請輸入訂單編號"
                v-model="orderId">
              </div>
            </div>

            <button
            class="btn cart-footer check_btn_bg border-0 rounded-0"
            type="submit"
            @click="nextStep">
            送出
            </button>

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
      orderId: '',
      isLoading: false,
    };
  },
  methods: {

    nextStep() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`;
      vm.is_loading = true;
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          vm.$router.push(`/payment/${vm.orderId}`);
        }
        vm.is_loading = false;
      });
    },
  },
  created() {
    this.orderId = this.$route.params.orderId;
    // this.nextStep();
  },
};
</script>
