<template>
  <div>
    <div class="container container_mb">
      <div class="row justify-content-center">
        <div class="col-lg-5 login_width">
          <form @submit.prevent="signIn">
            <div class="card text-center login_bg">
              <div class="card-body">
                <h5 class="card-title">後台登入</h5>
                <!-- <div class="mobile mobile_social_btn_bg mb-5">
                  <div class="btn-group  social_btn">
                    <button type="button" class="btn mx-1 btn_bg">
                      <img
                      src="@/assets/static/images/logo_img/ic-facebook-logotype.svg"
                      alt=""
                      class="social_icon">

                    </button>
                    <button type="button" class="btn mx-1 btn_bg">
                      <img
                      src="@/assets/static/images/logo_img/ic-google.svg"
                      alt=""
                      class="social_icon">

                    </button>
                    <button type="button" class="btn mx-1 btn_bg">
                      <img
                      src="@/assets/static/images/logo_img/ic-yahoo.svg"
                      alt=""
                      class="social_icon">

                    </button>
                  </div>
                </div> -->
                <div class="form-row justify-content-center">
                  <div class="form-group col-lg-11 col-10 mb-0">
                    <div class="relative input_icon">
                      <label for="email"></label>
                      <input
                        type="email"
                        class="form-control form-control-lg"
                        id="email"
                        v-model="user.username"
                        placeholder="請輸入email"
                        required
                      >
                      <i class="material-icons">person</i>
                    </div>
                  </div>
                  <div class="form-group col-lg-11 col-10 mb-0">
                    <div class="relative input_icon">
                      <label for="password"></label>
                      <input
                        type="password"
                        class="form-control form-control-lg"
                        id="password"
                        v-model="user.password"
                        placeholder="請輸入密碼"
                        required
                      >
                      <i class="material-icons">vpn_key</i>
                    </div>
                  </div>
                </div>
              </div>

              <button
              class="btn card-footer login_btn_bg border-0 rounded-0"
              type="submit">登入帳號</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    signIn() {
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`;
      const vm = this;
      this.$http.post(api, vm.user).then((response) => {
        // console.log(response.data);
        if (response.data.success) {
          vm.$router.push('/admin/customer_order');
        }
      });
    },
  },
};
</script>
