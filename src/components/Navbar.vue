<template>
  <div>


    <nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Sweetaste 後台管理</a>
        <ul class="navbar-nav ml-auto px-3">
          <li class="nav-item ">
            <router-link class="nav-link" href="#" to="/">前台首頁</router-link>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="#" @click.prevent="signout">登出</a>
          </li>
        </ul>

    </nav>

  </div>
</template>

<script>
  export default {
    name:'Navbar',
    methods:  {
      signout() {
        const api = `${process.env.APIPATH}/logout`;
        const vm = this;
        this.$http.post(api).then((response) =>{
          console.log(response.data);
          if(response.data.success) {
            vm.$router.push('/login');
          }
        })
      }
    },
  }
</script>