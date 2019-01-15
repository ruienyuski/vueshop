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
import Header from '../front_pages/Header';
import Footer from '../front_pages/Footer';
import Alert from '../AlertMessage';


export default {
  name:'layout',
  components:{
      Header,
      Footer,
      Alert,
  },
  
 }
</script>