<template>
  <div>
    <div class="container p-0 container_mb">
      <div class="header bg-cover header2_mobile header2" style="background-image:url(/static/images/check_01.jpg)">
        <div class="flex-column align-items-center align-self-center">
          <!-- <div class="progress progress_color2 my-5">
            <div class="step in done done_color2"></div>
            <div class="step in done done_color2"></div>
            <div class="step in done done_color2"></div>
          </div> -->
          <div class="text-center">
              <img src="/static/images/logo_img/lg-payok.svg" alt="" class="img-fluid fin_text">
            </div>
          <div class="success_btn_bg mt-5 desktop">
            <router-link to="/product">繼續逛逛</router-link>
          </div>

        </div>

        <!-- <table class="table table-borderless">
          <tr>
            <td>

            </td>
          </tr>
          <tr>

          </tr>
          <tr class="desktop">
            <td class="text-center">

            </td>
          </tr>
        </table> -->
      </div>

      <div class="mobile_success_btn_bg">
        繼續逛逛
      </div>
    </div>    
  </div>
</template>
<script>
export default {
  
}
</script>