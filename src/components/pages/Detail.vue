<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <header>
      <NavBar />
    </header>
    <div class="container py-3">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <div class="row">
            <div class="col-md-6 text-center">
              <img :src="product.imageUrl" class="img-detail img-thumbnail" alt="">
            </div>
            <div class="col-md-6">
              <h2 class="text-main">{{ product.title }}</h2>
              <blockquote class="blockquote mt-3">
                <p class="mb-0">{{ product.content }}</p>
                <footer class="blockquote-footer text-right">{{ product.description }}</footer>
              </blockquote>
              <div class="d-flex justify-content-between align-items-baseline">
                <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
                <del class="h6 text-secondary" v-if="product.price">原價 {{ product.origin_price }} 元</del>
                <div class="h4 text-sub" v-if="product.price">現在只要 {{ product.price }} 元</div>
              </div>
              <select name="" class="form-control mt-3" v-model="product.num">
                <option :value="num" v-for="num in 10" :key="num">
                  選購 {{num}} {{product.unit}}
                </option>
              </select>
              <button type="button" class="btn btn-outline-third mt-3 d-flex ml-auto align-items-center"
              @click="addtoCart(product.id, product.num)">
                <i class="fas fa-spinner fa-spin fa-fw" v-if="product.id === status.loadingItem"></i>
                <i class="fas fa-shopping-cart fa-fw" v-else></i>  加入購物車</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    <ShoppingCart :cart-data="cartItem" :loading-img="status" @opencart="getCart(1)" @removecart="removeCartItem"></ShoppingCart>
  </div>
</template>

<script>
  import NavBar from "../NavBar";
  import Footer from "../Footer";
  import ShoppingCart from '../ShoppingCart'
  import $ from "jquery";

  export default {
    data() {
      return {
        productId: '',
        product: {},
        // 儲存購物車資料
        cartItem: [],
        isLoading: false,
        status: {
          loadingItem: '',
        },
      }
    },
    components: {
      NavBar,
      Footer,
      ShoppingCart,
    },
    methods: {
      getProduct(id) {
        const vm = this;
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
        vm.isLoading = true;
        this.$http.get(api).then((response) => {
          // 讓下拉式選單預設為 1
          response.data.product.num = 1;
          vm.product = response.data.product;
          vm.isLoading = false;
        });
      },
      // 加入購物車   讓 qty = 1，如果函式傳進來沒有帶入 qty 會預設 1
      addtoCart(id, qty = 1) {
        const vm = this;
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
        // 將點擊商品 ID 存入 loadingItem 
        vm.status.loadingItem = id;
        const cart = {
          product_id: id,
          // 只寫 qty 的話會把數量直接帶進來
          qty,
        };
        // 注意資料結構是{data: 購物車內容}
        this.$http.post(api, {
          data: cart
        }).then((response) => {
          // Modal 打開之後將 loadingItem 變回空值
          vm.status.loadingItem = '';
          // 加入購物車後取回購物車的內容
          vm.getCart();
        });
      },
      // 取得購物車內容
      getCart(open) {
        const vm = this;
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
        if (open == 1) {
          $('.cart-dropdown').toggleClass('show');;
        }
        this.$http.get(api).then((response) => {
          vm.cartItem = response.data.data;
        });
      },
      // 點擊 dropmenu 以外的地方就關閉選單
      toggleCart() {
        $(document).on('click', function (e) {  
          // 如果點擊到的地方的父元素沒有 .cart-dropdown 而且 .cart-dropdown 有 .show 時
          // 就把 .cart-dropdown 的 .show 移除
          if(!e.target.closest('.cart-dropdown') && $('.cart-dropdown').hasClass('show')){
            $('.cart-dropdown').removeClass('show');
          }       
          // if (e.target.id != 'cart-id') {
          //   $(".cart-menu").toggleClass('show');
          // }
        });
      },
      // 刪除購物車內容
      removeCartItem(id) {
        const vm = this;
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`
        vm.status.loadingItem = id;
        this.$http.delete(api).then((response) => {
          vm.status.loadingItem = '';
          // 刪除後重新取得列表
          vm.getCart();
        });
      },
    },
    created() {
      // 取得產品 ID
      // orderId 對應的是 index.js 設定的路由，要相同才能抓到
      this.productId = this.$route.params.productId;
      this.getProduct(this.productId);
      this.getCart();
    },
    mounted() {
      // 點擊任意處關閉購物車視窗
      this.toggleCart();
    }
  }

</script>
