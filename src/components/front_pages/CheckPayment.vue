<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container container_mb">
      <div class="row justify-content-center">

        <div class="col-lg-6 col-12 order_width">
          <div class="card text-center order_bg">
            <div class="card-head">訂單查詢</div>
            <div class="card-body">

              <div class="form-group">
                <label for="OrderNumInput">訂單編號</label>
                <input type="text" class="form-control" id="OrderNumInput" placeholder="請輸入訂單編號" v-model="orderId">
              </div>
            </div>

            <div class="cart-footer check_btn_bg " >
              <button class="btn" type="submit"  @click="nextStep">送出</button>
            </div> 

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
  data(){
    return{
      orderId:'',
      isLoading:false,

    }
  },
  methods:{

      nextStep(){
        const vm = this;
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`;
        vm.is_loading = true;
        this.$http.get(api).then((response) => {
          console.log(response);
            if(response.data.success) {
             vm.$router.push(`/payment/${vm.orderId}`)
            }
            vm.is_loading = false;
          });        

      },
    


  },
  created(){
    this.orderId = this.$route.params.orderId;
    // this.nextStep();
  }
}
</script>
