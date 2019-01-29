<template>
  <div>
    <div class="container sticky-top" >
      <Header></Header>
    </div>
    <Alert/>
    <router-view >
    </router-view>

    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/frontPage/Header.vue';
import Footer from '@/components/frontPage/Footer.vue';
import Alert from '@/components/backPage/AlertMessage.vue';


export default {
  name:'layout',
  components:{
    Header,
    Footer,
    Alert,
  },
};
</script>
