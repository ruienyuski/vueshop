<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div style="height: 150px; background-size: cover; background-position: center"
            :style="{backgroundImage: `url(${item.imageUrl})`}">
          </div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!item.price">{{ item.origin_price }}</div>
              <del class="h6" v-if="item.price">{{ item.origin_price }}</del>
              <div class="h5" v-if="item.price">{{ item.price }}</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button type="button" class="btn btn-outline-secondary btn-sm"
            @click="getProduct(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem == item.id"></i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto"
            @click="addtoCart(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem == item.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>

    <Pagination :pages="pagination" @emitpage="getProducts"></Pagination>

    <div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.image" class="img-fluid" alt="">
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">{{ product.description }}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
              <div class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</div>
              <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
            </div>
            <select name="" v-model="product.num"  class="form-control mt-3">
              <option :value="num" v-for="num in 10" :key="num">選購{{num}}{{product.unit}}</option>
            </select>
          </div>
          <div class="modal-footer">
           <div class="text-muted text-nowrap mr-3">
             小計 <strong>{{ product.num * product.price }}</strong>元
           </div>
           <button
           class="btn btn-primary"
           type="button"
           @click="addtoCart(product.id,product.num)">
           加到購物車
           </button>
          </div>
        </div>
      </div>
    </div>

    <table class="table my-4">
      <thead>
        <th></th>
        <th>品名</th>
        <th width="120">數量/單位</th>
        <th width="120">單價/元</th>
      </thead>
      <tbody>
        <tr v-for="item in cart.carts" :key="item.id" >
          <td class="align-middle text-center">
            <a href="#" @click="removeCartItem(item.id)">
              <i class="fas fa-trash-alt"></i>
            </a>
          </td>
          <td class="align-middle">
            <div>{{item.product.title}}</div>
            <div class="text-success" v-if="item.coupon">已套用優惠卷</div>
          </td>
          <td class="align-middle">{{item.qty}} / {{item.product.unit}}</td>
          <td class="text-right align-middle">
            <div  v-if="item.final_total !== item.total">
              <div class="SalePrice">{{item.final_total}}</div>
              <div class="Price">{{item.total}}</div>
            </div>
            <div v-if="cart.final_total == cart.total">{{item.total}}</div>
          </td>
        </tr>
        <tr >
          <td colspan="3" class="text-right align-middle">總計</td>
          <td class="text-right align-middle">{{cart.total}}</td>
        </tr>
        <tr v-if="cart.final_total !== cart.total">
          <td colspan="3" class="text-right align-middle">折扣價</td>
          <td class="text-success text-right align-middle">{{cart.final_total}}</td>
        </tr>
      </tbody>
    </table>

    <div class="input-group mb-3">
      <input
      type="text"
      class="form-control"
      v-model="coupon_code"
      placeholder="請輸入優惠碼"
      aria-label="cost_number"
      aria-describedby="button-addon2">
      <div class="input-group-append">
        <button
        class="btn btn-outline-secondary"
        type="button"
        id="button-addon2"
        @click="addCouponCode">
        套用優惠碼
        </button>
      </div>
    </div>

    <div class="my-5 row justify-content-center">
      <form class="col-6" @submit.prevent="createOrder">
        <div class="form-group">
          <div class="label_text">Email</div>
          <label for="OrderEmail"></label>
          <input
            type="email"
            class="form-control"
            id="OrderEmail"
            name="email"
            placeholder="請輸入Email"
            v-model="form.user.email"
            v-validate="'required|email'"
          />
          <span class="text-danger" v-if="errors.has('email')">
            {{ errors.first('email') }}
          </span>
        </div>
        <div class="form-group">
          <div class="label_text">收件人姓名</div>
          <label for="OrderName"></label>
          <input
            type="text"
            class="form-control"
            :class="{'is-invalid':errors.has('name')}"
            id="OrderName"
            name="name"
            placeholder="請輸入姓名"
            v-model="form.user.name"
            v-validate= "'required'"
          />
          <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span>
        </div>
        <div class="form-group">
          <div class="label_text">收件人電話</div>
          <label for="OrderTel"></label>
          <input
            type="number"
            class="form-control"
            :class="{'is-invalid':errors.has('tel')}"
            id="OrderTel"
            name="tel"
            placeholder="請輸入電話"
            v-model="form.user.tel"
            v-validate= "'required'"
          />
          <span class="text-danger" v-if="errors.has('tel')">電話必須輸入</span>
        </div>
        <div class="form-group">
          <div class="label_text">收件人地址</div>
          <label for="Orderaddress"></label>
          <input
            type="text"
            class="form-control"
            :class="{'is-invalid':errors.has('address')}"
            id="OrderAddress"
            name="address"
            placeholder="請輸入地址"
            v-model="form.user.address"
            v-validate= "'required'"
          />
          <span class="text-danger" v-if="errors.has('name')">地址必須輸入</span>
        </div>
        <div class="form-group">
          <div class="label_text">留言</div>
          <label for="OrderTextarea"></label>
          <textarea
          class="form-control"
          id="OrderTextarea"
          rows="3"
          v-model="form.message">
          </textarea>
        </div>
        <div class="text-right">
          <button type="submit" class="btn btn-danger ">送出訂單</button>
        </div>
      </form>
    </div>

  </div>
</template>
<style>
  .SalePrice {
    color:red;
  }
  .Price {
    text-decoration-line: line-through;
  }

</style>

<script>
import $ from 'jquery';
import Pagination from '@/components/backPage/Pagination.vue';

export default {

  data() {
    return {
      products: [],
      final_total: [],
      product: {},
      pagination: {},
      cart: {},
      status: {
        loadingItem: '',
      },
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      isLoading: false,
      coupon_code: '',
    };
  },
  components: {
    Pagination,
  },
  methods: {
    getProducts(page = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
        vm.isLoading = false;
      });
    },
    getProduct(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      vm.status.loadingItem = id;
      this.$http.get(api).then((response) => {
        vm.product = response.data.product;
        $('#productModal').modal('show');
        vm.status.loadingItem = '';
      });
    },
    addtoCart(id, qty = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const cart = {
        product_id: id,
        qty,
      };
      vm.status.loadingItem = id;
      this.$http.post(api, { data: cart }).then(() => {
        vm.status.loadingItem = '';
        vm.getCart();
        $('#productModal').modal('hide');
      });
    },
    getCart() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.cart = response.data.data;
        // const cartItem = {};
        vm.cartItem = vm.cart.carts;
        vm.cart.final_total = Math.round((vm.cart.final_total * 10) / 10);
        vm.cartItem.forEach((item) => {
          // eslint-disable-next-line
          item.final_total = Math.round((item.final_total * 10) / 10);
        });
        vm.isLoading = false;
      });
    },
    removeCartItem(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      vm.isLoading = true;
      this.$http.delete(api).then(() => {
        vm.getCart();
        vm.isLoading = false;
      });
    },
    addCouponCode() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      const coupon = {
        code: vm.coupon_code,
      };
      vm.isLoading = true;
      const api2 = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      this.$http.get(api2).then((response) => {
        // console.log(response.data.data.carts)
        const Coupon = response.data.data;

        if (Coupon.final_total !== Coupon.total) {
          this.$bus.$emit('messageItem:push', '已經套用優惠卷!', 'danger');
          vm.getCart();
          vm.isLoading = false;
        } else {
          this.$http.post(api, { data: coupon }).then(() => {
            vm.getCart();
            vm.isLoading = false;
          });
        }
      });
    },
    createOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      const order = vm.form;
      vm.isLoading = true;
      this.$validator.validate().then((result) => {
        if (result) {
          this.$http.post(api, { data: order }).then((response) => {
            // console.log('訂單已建立',response);
            if (response.data.success) {
              vm.$router.push(`/admin/customer_checkout/${response.data.orderId}`);
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
    this.getProducts();
    this.getCart();
  },
};
</script>
