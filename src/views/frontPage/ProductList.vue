<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-12 col-12 mb-3">
          <ul class="list-group product_list">
            <li class="list-group-item list-style active">甜點類別</li>
            <li class="list-group-item list-style" :class="{select:visibility == 'all'}">
              <a href="#" @click.prevent="visibility = 'all'" style="display:block;">全部商品</a>
            </li>
            <li
              class="list-group-item list-style"
              v-for="(item,key) in filterCategory"
              :key="key"
              :class="{select:visibility == item}"
            >
              <a href="#" @click.prevent="visibility = item" style="display:block;">{{item}}</a>
            </li>
          </ul>
        </div>
        <div class="col-lg-9 col-md-12 mb-5">
          <div class="row product mb-4">
            <div
              class="col-lg-4 col-md-6 col-12 mb-3"
              v-for="(item,key) in filterData[currentpage]"
              :key="key"
            >
              <div class="product_sale_item">
                <div class="card card_size">
                  <div class="relative">
                    <!-- <span class="product_today">本日精選</span> -->
                    <!-- <span class="product_like">
                      <i class="material-icons text-danger">
                        favorite_border
                      </i>
                    </span>-->
                  </div>
                  <router-link :to="{name:'ProductDetail',params:{id:item.id}}">
                    <div
                      class="bg-cover product_card_img"
                      :style="`background-image: url(${item.image})`"
                    ></div>
                  </router-link>
                  <div class="card-body p-0">
                    <div class="row product_card_product_txt">
                      <div
                        class="col-lg-7 p-3 align-self-center product_product_border text-center"
                      >
                        <router-link
                        :to="{name:'ProductDetail',
                        params:{id:item.id}}">
                        {{item.title}}
                        </router-link>
                      </div>
                      <div class="col-lg-5 text_bold p-3 text-center">
                        <router-link :to="{name:'ProductDetail',params:{id:item.id}}">
                          <span
                            style="text-decoration:line-through; font-size:0.8rem;"
                          >原價:{{item.origin_price}}</span>
                          <br>
                          <span class="text-danger">特價{{item.price}}</span>
                        </router-link>
                      </div>
                    </div>
                  </div>
                  <button
                    class="btn card-footer card_footer_bg d-flex py-3 px-0 justify-content-between"
                  >
                    <div class="col-lg col-6" @click="addtoCard(item.id)">
                      加入購物車
                      <i class="fas fa-spinner fa-spin" v-if="status.loadingItem == item.id"></i>
                    </div>
                    <div class="col-lg-5 col-6">
                      <router-link
                      :to="{name:'ProductDetail',
                      params:{id:item.id}}">
                      查看更多
                      </router-link>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <nav aria-label="Page navigation">
            <ul class="pagination justify-content-end pagination-lg product_page">
              <li class="page-item">
                <a class="page-link" href="#" @click.prevent="currentpage = 0" tabindex="-1">
                  <i class="material-icons">arrow_left</i>
                </a>
              </li>

              <li
                class="page-item"
                v-for="page in filterData.length"
                :key="page"
                :class="{'active': currentpage === page - 1}"
              >
                <a class="page-link" @click.prevent="currentpage = page - 1" href="#">{{page}}</a>
              </li>

              <li class="page-item">
                <a
                  class="page-link"
                  href="#"
                  @click.prevent="currentpage = (filterData.length % 6) - 1"
                >
                  <i class="material-icons">arrow_right</i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'Productlist',
  data() {
    return {
      products: [],
      cart: {},
      category: [],
      currentpage: 0,
      has_pre: false,
      has_next: false,
      pagenum: [],
      visibility: '',
      status: {
        loadingItem: '',
      },
    };
  },
  methods: {
    getProducts() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/products/all`;
      this.$http.get(api).then((response) => {
        vm.products = response.data.products;
      });
    },

    addtoCard(id, qty = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/cart`;
      const cart = {
        product_id: id,
        qty,
      };
      vm.status.loadingItem = id;
      this.$http.post(api, { data: cart }).then(() => {
        vm.status.loadingItem = '';
        this.$bus.$emit('message:push');
      });
    },
  },

  computed: {
    filterData() {
      const vm = this;
      const newData = [];
      let items = [];
      items = vm.products;
      const categoryItem = [];
      items.forEach((item) => {
        if (vm.visibility === item.category) {
          categoryItem.push(item);
        } else if (vm.visibility === 'all' || vm.visibility === '') {
          categoryItem.push(item);
        }
      });
      categoryItem.forEach((item, i) => {
        if (i % 6 === 0) {
          newData.push([]);
        }
        // eslint-disable-next-line
        const pagenum = parseInt(i / 6);
        newData[pagenum].push(item);
      });
      return newData;
    },

    filterCategory() {
      const vm = this;
      const list = [];
      let items = [];
      items = vm.products;
      // eslint-disable-next-line
      items.filter((item, i) => {
        list.push(item.category);
      });
      // eslint-disable-next-line
      let category = list.filter((item, i, arr) => {
        return arr.indexOf(item) === i;
      }); // filter category norepeat
      return category;
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
