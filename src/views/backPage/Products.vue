<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right">
      <button class="mt-3 btn btn-primary"
      @click="openModal(true)"
      data-toggle="modal"
      data-target="#productModal">建立新的產品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <th width="150">分類</th>
        <th>產品名稱</th>
        <th width="100">原價</th>
        <th width="100">售價</th>
        <th width="100">是否啟用</th>
        <th width="120">編輯</th>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">
            {{ item.origin_price | currency }}
          </td>
          <td class="text-right">
            {{ item.price | currency }}
          </td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button
            class="btn btn-outline-primary btn-sm" @click="openModal(false,item)">編輯</button>
            <button
            class="btn btn-outline-primary btn-sm" @click="delModal(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination :pages="pagination" @emitpage="getProducts"></Pagination>


    <!-- 編輯Modal -->
    <div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true">
      <div class="modal-dialog modal-lg" roleexample="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ tempProduct.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-lg-4">
                <form action="">
                  <div class="form-group">
                    <div class="label_text">輸入內頁圖片網址</div>
                    <label for="imgControlInput"></label>
                    <input type="text"
                    class="form-control"
                    id="imgControlInput"
                    v-model = "tempProduct.image"
                    placeholder="請輸入圖片連結">
                  </div>
                  <div class="form-group">
                    <div class="label_text">或上傳內頁圖片</div>
                    <label for="uploadimgFormControlFile"></label>
                    <i class="fas fa-cog fa-spin" v-if="status.fileUploading"></i>
                    <input type="file" class="form-control-file"
                    id="uploadimgFormControlFile"
                    ref="files" @change="uploadFile"
                    >
                  </div>
                  <img
                    img=""
                    class="img-fluid"
                    :src="tempProduct.image"
                    alt="">
                  <div class="form-group mt-3">
                    <div class="label_text">輸入縮圖圖片網址</div>
                    <label for="img2ControlInput"></label>
                    <input type="text"
                    class="form-control"
                    id="img2ControlInput"
                    v-model = "tempProduct.imageUrl"
                    placeholder="請輸入圖片連結">
                  </div>
                  <div class="form-group">
                    <div class="label_text">或上傳縮圖圖片</div>
                    <label for="uploadimgForm2ControlFile"></label>
                    <i class="fas fa-cog fa-spin" v-if="status.fileUploading"></i>
                    <input type="file" class="form-control-file"
                    id="uploadimg2FormControlFile"
                    ref="files" @change="uploadFile"
                    >
                  </div>
                  <img
                    img=""
                    class="img-fluid"
                    :src="tempProduct.imageUrl"
                    alt="">
                </form>
              </div>
              <div class="col-lg-8">
                <form action="" class="form-row">
                  <div class="col-md-12 mb-3">
                    <label for="titleInput">標題</label>
                    <input type="text"
                      class="form-control"
                      id="titleInput"
                      v-model="tempProduct.title"
                      placeholder="請輸入標題">
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="CategoryInput">分類</label>
                    <input type="text"
                    class="form-control"
                    id="CategoryInput"
                    v-model="tempProduct.category"
                    placeholder="請輸入分類">
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="unitInput">單位</label>
                    <input type="text"
                    class="form-control"
                    id="unitInput"
                    v-model="tempProduct.unit"
                    placeholder="請輸入單位">
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="priceInput">原價</label>
                    <input type="text"
                    class="form-control"
                    id="originpriceInput"
                    v-model="tempProduct.origin_price"
                    placeholder="請輸入原價">
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="priceInput">售價</label>
                    <input type="text"
                    class="form-control"
                    id="salepriceInput"
                    v-model="tempProduct.price"
                    placeholder="請輸入售價">
                  </div>
                  <div class="col-md-12 mb-3">
                    <label for="TextareaInput">產品描述</label>
                    <textarea
                    class="form-control"
                    id="TextareaInput"
                    rows="3"
                    v-model="tempProduct.description"
                    placeholder="請輸入產品描述">
                    </textarea>
                  </div>
                  <div class="col-md-12 mb-3">
                    <label for="TextareaInput">說明內容</label>
                    <textarea
                    class="form-control"
                    id="TextareaInput"
                    rows="3"
                    v-model="tempProduct.content"
                    placeholder="請輸入說明內容">
                    </textarea>
                  </div>
                  <div class="custom-control custom-checkbox">
                    <input type="checkbox"
                    class="custom-control-input"
                    id="is_enabled"
                    v-model="tempProduct.is_enabled"
                    :true-value="1"
                    :false-value="0"
                    >
                    <label class="custom-control-label" for="is_enabled">是否啟用</label>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>
    <!--刪除Modal -->
    <div class="modal fade" tabindex="-1" role="dialog" id="deleteModal" >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" >{{ tempProduct.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>資料是否確認要刪除?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" @click="deleteItem">確認刪除</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import $ from 'jquery';
import Pagination from '@/components/backPage/Pagination.vue';

export default {

  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false,
      status: {
        fileUploading: false,
      },
    };
  },
  components: {
    Pagination,
  },
  methods: {

    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.isLoading = false;
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
      });
    },


    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
      } else {
        this.tempProduct = Object.assign({}, item);
        this.isNew = false;
      }
      $('#productModal').modal('show');
    },
    delModal(item) {
      this.tempProduct = item;
      $('#deleteModal').modal('show');
    },
    deleteItem() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
      this.$http.delete(api).then(() => {
        $('#deleteModal').modal('hide');
        vm.getProducts();
      });
    },
    updateProduct() {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`;
      let httpMethod = 'post';
      const vm = this;
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        httpMethod = 'put';
      }
      this.$http[httpMethod](api, { data: vm.tempProduct }).then((response) => {
        $('#productModal').modal('hide');
        if (response.data.success) {
          $('#productModal').modal('hide');
          vm.getProducts();
        }
        // if (response.data.success) {
        //   $('#productModal').modal('hide');
        //   vm.getProducts();
        //   console.log('更新商品成功');
        // } else {
        //   $('#productModal').modal('hide');
        //   vm.getProducts();
        //   console.log('更新商品失敗');
        // }
        // vm.products = response.data.products;
      });
    },
    uploadFile() {
      const uploadedFile = this.$refs.files.files[0];
      const vm = this;
      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile);
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`;
      vm.status.fileUploading = true;
      this.$http.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response) => {
        vm.status.fileUploading = false;
        if (response.data.success) {
          // vm.tempProduct.imageUrl = response.data.imageUrl;
          // console.log(vm.tempProduct);
          vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl);
        } else {
          this.$bus.$emit('messsage:push', response.data, 'danger');
        }
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
