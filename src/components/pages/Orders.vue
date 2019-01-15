<template>
  <div>
    <table class="table mt-4">
      <thead>
        <th width="100" >購買時間</th>
        <th width="">訂單編號</th>
        <th width="">客戶姓名</th>
        <th width="">Email</th>
        <th width="">購買款項</th>
        <th width="100">應付金額</th>
        <th width="100">是否付款</th>
        <th width="" >編輯</th>
      </thead>
      <tbody>
        <tr v-for="(item,key) in sortData" :key="key" 
        v-if="orders.length"
        :class = "{'text-secondary': !item.is_paid}"
        >
          <td>{{ item.create_at | date }}</td>
          <td>{{ item.id }}</td>
          <td>{{ item.user.name }}</td>
          <td>{{ item.user.email }}</td>
          <td >
            <ul class="list-unstyled">
              <li v-for="(product,i) in item.products" :key="i">
                <span>{{ product.product.title}}</span>
                <span class="ml-2"> 數量: {{ product.qty}} </span>
                <span>{{ product.product.unit }}</span>
              </li>
            </ul>
          </td>
          <td class="text-right">{{ item.total | currency }}</td>
          <td>
            <span  class="text-success"
             v-if="item.is_paid" 
             >已付款</span>
            <span v-else>未付款</span>
          </td>
          <td>
            <button 
            class="btn btn-outline-primary btn-sm" @click="openModal(false,item)">編輯</button>
          </td>          
        </tr>
      </tbody>
    </table>

    <Pagination :pages="pagination" @emitpage="getOrders"></Pagination>



    <!-- 編輯Modal -->
    <div class="modal fade" id="orderModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" roleexample="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">客戶名稱:{{ tempOrder.user.name}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">

              <div class="col-lg-12">
                <form action="" class="form-row">
                  <div class="col-md-12 mb-4 h5">購買項目</div>                 
                  <div class="col-md-6 mb-3" v-for = "item in tempOrder.products" :key="item.id">
                    <label for="CategoryInput" >{{item.product.title}}</label>
                    <input type="text" 
                    class="form-control" 
                    id="CategoryInput"
                    v-model="item.qty" 
                    placeholder="請輸入數量">
                  </div>
                  <div class="col-md-12 row mb-4" v-if="coupon">
                    <label for="staticCoupon" class="col-sm-3  col-form-label" >已加入的折扣活動</label>
                    <div class="col-sm-9" >
                      <input type="text" readonly class="form-control-plaintext text-danger" id="staticCoupon"  v-model="coupon">
                    </div>
                  </div> 
                  <div class="col-md-12 h5 row mb-4">
                    <label for="staticTotal" class="col-sm-3  col-form-label">應付金額(元)</label>
                    <div class="col-sm-3">
                      <input type="text" readonly class="form-control-plaintext text-danger" id="staticTotal" :value="tempOrder.total">
                    </div>
                  </div>                
                  <div class="col-md-12 mb-4 h5">收件人資訊</div>
                  <div class="col-md-6 mb-3">
                    <label for="UserNameInput" >姓名</label>
                    <input type="text" 
                    class="form-control" 
                    id="UserNameInput"
                    v-model="tempOrder.user.name" >
                  </div>                  
                  <div class="col-md-6 mb-3">
                    <label for="UserAddressInput" >地址</label>
                    <input type="text" 
                    class="form-control" 
                    id="UserAddressInput"
                    v-model="tempOrder.user.address" >
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="UserTelInput" >電話</label>
                    <input type="text" 
                    class="form-control" 
                    id="UserTelInput"
                    v-model="tempOrder.user.tel" >
                  </div> 
                  <div class="col-md-6 mb-3">
                    <label for="UserEmailInput" >email</label>
                    <input type="text" 
                    class="form-control" 
                    id="UserEmailInput"
                    v-model="tempOrder.user.email" >
                  </div>                 
                  <div class="col-md-12 mb-3">
                    <label for="MessageInput" >客戶留言</label>
                    <textarea 
                    class="form-control" 
                    id="MessageInput"
                    v-model="tempOrder.message" >
                    </textarea>
                  </div>                                                        
                  <div class="custom-control custom-checkbox">
                    <input type="checkbox" 
                    class="custom-control-input" 
                    id="is_paid"
                    v-model="tempOrder.is_paid"
 
                    >
                    <label class="custom-control-label" for="is_paid">是否付款</label>
                  </div>                                                                                                                                
                </form>
              </div>

            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateOrder">確認</button>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import $ from 'jquery';
import Pagination from '../Pagination';
  export default {
    name:'Order',
    data() {
      return {
        orders:{},
        pagination:{},
        tempOrder: {
          user:{},
        },
        products:{},
        coupon:[],
        is_loading:false,
        reverse:false,
      }
    },
    components:{
      Pagination,
    },
    methods: {
      getOrders(page = 1) {
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`;
        const vm = this;
        vm.is_loading = true;
        console.log(api)
        this.$http.get(api).then((response) => {
          vm.orders = response.data.orders;
          vm.pagination = response.data.pagination;
          vm.is_loading = false;
          console.log(response.data );
        });
      },

      openModal(index,item) {
        let vm = this;
        let products = {};
        let coupon = [];
        vm.tempOrder = Object.assign({}, item);
        // console.log(vm.tempOrder)
        Object.keys(vm.tempOrder.products).forEach((item) => {
          products = vm.tempOrder.products[item];          
            // console.log(products.coupon.title);
          if(products.coupon) {
            vm.coupon = products.coupon.title;
          } else {
            vm.coupon = null;
          }
          
          })
         
        $('#orderModal').modal('show');        
      },


      updateOrder() {
        const vm = this;
        let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/order/${vm.tempOrder.id}`;
        console.log(api)
        this.$http.put(api,{ data:vm.tempOrder }).then((response) => {
          console.log(response);
          if (response.data.success) {
            $('#orderModal').modal('hide');
            vm.getOrders();
            console.log('更新訂單成功');
          } else {
            $('#orderModal').modal('hide');
            vm.getOrders();
            console.log('更新訂單失敗');           
          }
          });        
      },

    },
    computed: {
      sortData(){
        const vm = this;
        let newOrder = [];
        if(vm.orders.length) {
          newOrder = vm.orders.sort((a,b) => {
            const a_is_Paid = a.is_paid ? 1 : 0;
            const b_is_Paid = b.is_paid ? 1 : 0;
            return b_is_Paid - a_is_Paid;
          })            
        }
        return newOrder;
      },


    },
    created() {
      this.getOrders();


    }
  };
</script>