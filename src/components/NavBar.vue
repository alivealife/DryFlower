<template>
  <div>
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light bg-white">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <router-link class="navbar-brand mr-0" href="#" to="/">
          <h1 class="mb-0 main-icon"><img class="" src="../assets/images/Dry Flower-logo/vector/default-monochrome.svg" alt="Dry Flower"></h1>
        </router-link>
        <!-- 用 order 來把登入放在右邊 -->
        <a href="#" class="text-dark h4 order-md-1" @click.prevent="signinCheck"><i class="fas fa-user-cog"></i></a>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item" :class="{'active': pathCheck == '/'}">
              <router-link class="nav-link" href="#" to="/">首頁 </router-link>
            </li>
            <li class="nav-item" :class="{'active': pathCheck == '/productlist'}">
              <router-link class="nav-link" href="#" to="/productlist">商品列表</router-link>
            </li>
            <li class="nav-item" :class="{'active': pathCheck == '/contact'}">
              <router-link class="nav-link" href="#" to="/contact">聯絡我們</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      // 驗證有沒有登入，有登入就直接進 Dashboard，沒有就進 Login
      signinCheck() {
        const vm = this;
        const api = `${process.env.APIPATH}/api/user/check`;
        this.$http.post(api).then((response) => {
          if (response.data.success) {
            vm.$router.push('/admin/products');
          } else {
            vm.$router.push('/Login');
          }
        });
      },
    },
    computed: {
      pathCheck() {
        return this.$route.path;
      }
    }
  }

</script>
