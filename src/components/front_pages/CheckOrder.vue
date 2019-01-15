<template>
  <div>
    <div class="container container_mb">
      <div class="row justify-content-center">
        <div class="col-lg-6 col-12 pay_width">
          <form @submit.prevent="createOrder">          
            <div class="card text-center check_bg ">
              <div class="card-head row justify-content-between">
                <div class="checktitle col-lg-3 col-5">運送</div>
                <!-- <div class="col-lg-6 col-6 align-self-center">
                  <div class="progress">
                    <div class="step in"></div>
                    <div class="step"></div>
                    <div class="step"></div>
                  </div>
                </div> -->

              </div>

              <div class="card-body">
              
                  <div class="form-row">
                    
                    <div class="form-group col-lg-12 col-12">
                      <div class="col-lg-6 col-12  label">姓名</div>
                      <label for="name"></label>
                      <input type="name" 
                      v-model="form.user.name" 
                      v-validate="'required'" 
                      class="form-control form-control-lg"
                      :class="{'is-invalid':errors.has('name')}"
                      name="name" 
                      id="name" 
                      placeholder="王小明">
                      <span class="text-warning" v-if="errors.has('name')">姓名必須填入</span>
                    </div>
                    
                    <div class="col-12  label">電話</div>
                    <div class="form-group col-lg-12 col-12">
                      <label for="phone"></label>
                      <input type="number" 
                      v-model="form.user.tel" 
                      class="form-control form-control-lg"
                      :class="{'is-invalid':errors.has('tel')}" 
                      id="phone"
                      name="tel" 
                      placeholder="0912-345-678"
                      v-validate= "'required'">
                      <span class="text-warning" v-if="errors.has('tel')">電話必須輸入</span>
                    </div>
                    <div class="col-12  label">電子郵件信箱</div>
                    <div class="form-group col-lg-12 col-12">
                      <label for="email"></label>
                      <input type="email" 
                      v-model="form.user.email" 
                      v-validate="'required|email'"
                      class="form-control form-control-lg" 
                      name="email"
                      id="email" 
                      placeholder="example@email.com" required>
                    <span class="text-warning" v-if="errors.has('email')">{{ errors.first('email') }}</span>
                    </div>                 
                    <div class="col-12  label">地址</div>                   
                    <div class="form-group col-lg-12 col-12">
                      <input type=" text" 
                      v-model="form.user.address" 
                      class="form-control form-control-lg"
                      :class="{'is-invalid':errors.has('address')}" 
                      id="address"
                      name="address" 
                      placeholder="xx 市 xx 區 xx 路 xx 號"
                      v-validate= "'required'">
                      <span class="text-warning" v-if="errors.has('address')">地址必須輸入</span>
                    </div>
                    <div class="col-12  label">留言</div>
                    <div class="form-group col-lg-12 col-12">
                      <textarea class="form-control" v-model="form.message" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>                  
                  </div>

                

              </div>
              <div class="cart-footer check_btn_bg mt-5 ">
                <button class="btn" type="submit">下一步</button>
              </div>
              
            </div>
          </form>
        </div>
        <div class="col-lg-4 col-12 align-items-start desktop">
          <div class="check_order_width col">
            <div class="col-lg-12  p-3 text-center check_title">訂單摘要</div>
            <div class="col-lg-12">
              <table class="table table-borderless">
                <tr class="row justify-content-between">
                  <td>小計</td>
                  <td>NT$ {{cart.total}}</td>
                </tr>
                <tr class="row justify-content-between mb-2  check_order_total"  v-if="cart.final_total === cart.total">
                  <td>總計</td>
                  <td>NT$ {{cart.total}}</td>
                </tr>
                <tr class="row justify-content-between check_order_total" v-if="cart.final_total !== cart.total">
                  <td>優惠價</td>
                  <td>NT$ {{cart.final_total}}</td>
                </tr>

              </table>
            </div>
          </div>
          <div class="check_order_width col">
            <div class="col-lg-12  p-3 text-center check_title">購物清單</div>
            <div class="col-lg-12 my-3"  v-for="item in cart.carts" :key="item.id" v-if="cart.carts">
              <div class="col-lg-12">
                <div class="row justify-content-around">
                  <div class="col-lg-6 col-5 align-self-center p-0 check_product_img bg-cover" :style="{backgroundImage: `url(${item.product.imageUrl})`}">
                  </div>
                  <div class="col-lg-6 col-7 row p-0 justify-content-center">
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
  </div>
</template>
<script>
export default {
  data(){
    return{
      cart:{},
      form:{
          user:{
            name:'',            
            email:'',
            tel:'',
            address:'',            
          },
          message:'',
        },      
    }
  },
  methods:{
      getCart() {
        const vm = this;
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;

        this.$http.get(api).then((response) =>{
          vm.cart = response.data.data;
          // console.log(vm.cart)
          let cart_item = {};
          vm.cart_item = vm.cart.carts;
          // console.log(vm.cart)
          vm.cart.final_total = Math.round((vm.cart.final_total * 10 ) / 10);   
          vm.cart_item.forEach((item,index) => {
          item.final_total = Math.round((item.final_total * 10 ) / 10);
        
          })        

        });
        
      },   
      createOrder() {
        const vm = this;
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
        const order = vm.form;
        vm.isLoading = true;

        this.$validator.validate().then((result) => {
          if (result) {
            this.$http.post(api,{data:order}).then((response) =>{
              console.log('訂單已建立',response);
              if(response.data.success) {
              this.$bus.$emit('message:push');
              vm.$router.push(`/payment/${response.data.orderId}`)
              }

              vm.isLoading = false;
            });            
          } else {
            console.log('欄位不完整')
          }
        });      

      },    
  },
  created(){
    this.getCart();
  }
}
</script>