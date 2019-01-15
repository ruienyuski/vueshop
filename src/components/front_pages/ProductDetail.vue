<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <section>
        <div class="container">
            <nav aria-label="breadcrumb" role="navigation">
                <ol class="breadcrumb bg-transparent pl-0"> 
                    <li class="breadcrumb-item">
                        <router-link  to="/">Home</router-link>
                    </li>
                    <li class="breadcrumb-item" >
                        <router-link to="/product">全部商品</router-link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">{{product.title}}</li>
                </ol>
            </nav>
            <div class="row">
                <div class="col-md-4 mb-4">
                    <div>
                        <h1 class="h2">{{product.title}}</h1>
                        <div class="row justify-content-end align-items-end">
                            <span class="text-muted col-lg-4 col-md-12 col-12"><del>售價 ${{product.origin_price}}</del></span>
                            <div class="h4 ml-auto mb-0 text-danger col-lg-8 col-md-12 col-12">
                                <small>特價 </small>
                                <strong>NT${{product.price}}</strong>
                            </div>
                        </div>
                        <hr> 購買數量:
                        <div class="input-group my-3">
                            <select  v-model="product.num" class="form-control mr-1">
                                <option :value="num" v-for="num in 10" :key="num">選購{{num}}{{product.unit}}</option>
                            </select>
                            <button class="btn btn-primary" type="button"  @click="addtoCart(product.id,product.num)">
                                加到購物車
                                <i class="fas fa-spinner fa-spin" v-if="status.loadingItem == product.id"></i>
                            </button>
                        </div>
                    </div>

                </div>

                <div class="col-md-8">

                    <img class="img-fluid mb-5" :src="product.imageUrl" alt="">
                    <h3>{{product.description}}</h3>
                    <p>{{product.content}}</p>

                </div>
            </div>
        </div>
    </section>

  </div>
</template>

<script>
import $ from 'jquery';
export default {
  name: 'Productdetail',
  data () {
    return {
        id: '',
        cart:{},
        product:{},
        status:{
          loadingItem:'',
        },  
        isLoading: false,      
    }
  },
  methods: {
      getItem(id) {
        const vm = this;
        id = this.$route.params.id;    
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
        this.$http.get(api).then((response) => {
            vm.product = response.data.product;
            });        
      },
      addtoCart(id,qty = 1) {
        const vm = this;
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
        const cart = {
          product_id : id,
          qty
        };
        vm.status.loadingItem = id;
        this.$http.post(api,{data:cart}).then((response) =>{
          console.log(response);
          vm.status.loadingItem = '';
          this.$bus.$emit('message:push');
        });  
      },                  
  },
  created() {
      this.getItem();
  } 
}
</script>