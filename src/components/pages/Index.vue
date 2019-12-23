<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <header>
      <NavBar />
    </header>
    <div class="container">
      <!-- 幻燈片 -->
      <div class="text-main text-bold w-100 mb-1 text-truncate font-weight-bolder" @mouseover="stop" @mouseout="lang">
        {{scrollMsg}}
      </div>
      <div id="carouselExampleFade" class="carousel slide carousel-fade carousel-zindex" data-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="../../assets/images/camila-cordeiro-736F6KL7l4U-unsplash.jpg" class="d-block w-100">
            <div class="carousel-caption d-none d-md-block caption-position text-left font-italic">
              <h5 class="h2">來自我們的真心</h5>
              <p class="h3">所有的商品都是最高品質</p>
            </div>
          </div>
          <div class="carousel-item">
            <img src="../../assets/images/kseniya-petukhova-qJy61YwqQB8-unsplash.jpg" class="d-block w-100">
            <div class="carousel-caption d-none d-md-block text-white-50 font-weight-bold">
              <h5 class="h1">Longer but not forever</h5>
            </div>
          </div>
          <div class="carousel-item">
            <img src="../../assets/images/sharon-mccutcheon-cFufeCC4y8U-unsplash.jpg" class="d-block w-100">
            <div class="carousel-caption d-none d-md-block font-weight-bolder">
              <h5 class="h2">真心獻給您</h5>
              <p class="h3">點綴人生中最重要的時刻</p>
            </div>
          </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
      <div class="hot-sale mt-4 d-flex align-items-end">
        <h3 class="text-main mb-0"><i class="fab fa-hotjar"></i> 熱銷商品</h3>
        <router-link href="#" to="/productlist" class="ml-3 text-sub font-italic text-decoration-none">看更多...
        </router-link>
      </div>
      <!-- 商品 -->
      <div class="row mt-4">
        <div class="col-md-4 mb-4 card-position" v-for="item in randomProducts" :key="item.id">
          <div class="card border-0 shadow-sm" @click.prevent="getProductID(item.id)">
            <a href="#">
              <div style="height: 300px; background-size: cover; background-position: center;"
                :style="{backgroundImage: `url(${item.imageUrl})`}">
              </div>
            </a>
            <div class="card-body">
              <span class="badge badge-sub float-right ml-2 text-white">
                {{ item.category }}
              </span>
              <h5 class="card-title">
                <a href="#" class="text-main">
                  {{ item.title }}
                </a>
              </h5>
              <p class="card-text">
                {{ item.content }}
              </p>
            </div>
            <div class="card-footer d-flex bg-white border-0">
              <div class="d-flex flex-column">
                <!-- 如果只有原價就顯示上面這條 -->
                <div class="h5" v-if="!item.price">原價 {{ item.origin_price }} 元</div>
                <!-- 如果同時有原價跟售價就顯示下面兩條 -->
                <!-- 0、''、nan 都算 false -->
                <del class="h6 text-secondary" v-if="item.price">原價 {{ item.origin_price }} 元</del>
                <div class="h5 text-sub" v-if="item.price">現在只要 {{ item.price }} 元</div>
              </div>
            </div>
          </div>
          <button type="button" class="btn btn-outline-third ml-auto card-cart" @click="addtoCart(item.id)">
            <i class="fas fa-spinner fa-spin" v-if="item.id === status.loadingItem"></i>
            <i class="fas fa-shopping-cart" v-else></i>
          </button>
          <div class="heart-position">
            <button type="button" class="btn text-danger" @click.prevent="removeLove(item)" v-if="changeLove(item)">
              <i class="fas fa-heart fa-2x"></i>
            </button>
            <button type="button" class="btn text-danger" @click.prevent="addLove(item)" v-else>
              <i class="far fa-heart fa-2x"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    <ShoppingCart :cart-data="cartItem" :loading-img="status" @opencart="getCart(1)" @removecart="removeCartItem">
    </ShoppingCart>
    <FavoriteList :favorite-data="favorite" :loading-img="status" @openfavorite="openFavoriteList(1)" @removefavorite="removeLove"
    @favoriteToCart="addtoCart"></FavoriteList>
  </div>
</template>

<script>
  import NavBar from "../NavBar";
  import Footer from "../Footer";
  import ShoppingCart from '../ShoppingCart'
  import FavoriteList from "../FavoriteList"
  import $ from "jquery";


  export default {
    name: 'Index',
    components: {
      NavBar,
      Footer,
      ShoppingCart,
      FavoriteList
    },
    data() {
      return {
        // 儲存所有產品
        products: [],
        randomProducts: [],
        // 儲存單一產品
        product: {},
        // 儲存購物車資料
        cartItem: [],
        // 儲存我的最愛資料
        favorite: [],
        // 加入購物車符號切換
        status: {
          loadingItem: '',
        },
        isLoading: false,
        scrollMsg: "特惠活動： 歡慶開幕，只要在 2020/11/20 前，於結帳時輸入折扣碼 costdown 就可獲得優惠價格。 最新消息：找不到您喜歡的商品嗎？請點選聯絡我們說明您的需求。 ",
        intervalId: null, //data 定義一個定時器id   
        sliceIndex: '',
      }
    },
    methods: {
      // 所有商品列表
      getProducts() {
        const vm = this;
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`
        // vm.isLoading = true;
        this.$http.get(api).then((response) => {
          // 只有啟用產品會顯示
          response.data.products.forEach(item => {
            if (item.is_enabled === 1) {
              vm.products.push(item);
            }
          });
          vm.randomProducts = vm.getRandomProducts(vm.products, 3);
        });
      },
      // 取得隨機商品
      getRandomProducts(arr, count) {
        let shuffled = arr.slice(0),
          i = arr.length,
          min = i - count,
          temp, index;
        while (i-- > min) {
          index = Math.floor((i + 1) * Math.random());
          temp = shuffled[index];
          shuffled[index] = shuffled[i];
          shuffled[i] = temp;
        }
        return shuffled.slice(min);
      },
      // 點擊產品後引導到個別產品頁
      getProductID(id) {
        const vm = this;
        vm.$router.push(`/detail/${id}`);
      },
      // 取得購物車內容
      getCart(open) {
        const vm = this;
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
        if (open == 1) {
          $('.cart-dropdown').toggleClass('show');
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
          if (!e.target.closest('.cart-dropdown') && $('.cart-dropdown').hasClass('show')) {
            $('.cart-dropdown').removeClass('show');
          }
        });
      },
      // 加入購物車
      addtoCart(id, qty = 1) {
        const vm = this;
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
        vm.isLoading = true;
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
          vm.isLoading = false;
          vm.getCart();
        });
      },
      // 刪除購物車內容
      removeCartItem(id) {
        const vm = this;
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`
        vm.status.loadingItem = id;
        vm.isLoading = true;
        this.$http.delete(api).then((response) => {
          vm.status.loadingItem = '';
          vm.isLoading = false;
          // 刪除後重新取得列表
          vm.getCart();
        });
      },
      // 跑馬燈用
      lang() {
        const vm = this;
        if (vm.intervalId != null) return;
        vm.intervalId = setInterval(() => {
          //得到第一個字元
          let start = vm.scrollMsg.substring(0, 1)
          //得到最後一個字元
          let end = vm.scrollMsg.substring(1)
          //後面與前面字元連接
          vm.scrollMsg = end + start
        }, 100)
      },
      //停止計時器     
      stop() {
        const vm = this;
        clearInterval(vm.intervalId)
        //當我清除定時器之後，重新讓intervalId為null
        vm.intervalId = null;
      },
      // 取得最愛列表
      getfavorite() {
        const vm = this;
        vm.favorite = JSON.parse(localStorage.getItem('savefavorite')) || [];
      },
      // 加入最愛
      addLove(item) {
        const vm = this;
        if (!vm.favorite.includes(item)) {
          vm.favorite.push(item);
          // vm.stared 存進 localStorage
          localStorage.setItem('savefavorite', JSON.stringify(vm.favorite));
        }
      },
      // 更改愛心標誌判斷
      changeLove(item) {
        const vm = this;
        return vm.favorite.some(el => {
          const result = item.id === el.id;
          return result;
        });
      },
      // 移除最愛
      removeLove(favoriteItem) {
        var vm = this;
        // 重新定位要刪除的 index
        vm.favorite.forEach(function (item, key) {
          if (favoriteItem.id === item.id) {
            vm.sliceIndex = key
          }
        })
        vm.favorite.splice(vm.sliceIndex, 1);
        // vm.stared 存進 localStorage
        localStorage.setItem('savefavorite', JSON.stringify(vm.favorite));
      },
      // 開啟最愛列表
      openFavoriteList(open) {
        if (open == 1) {
          $('.favorite-dropdown').toggleClass('show');
        }
      },
      // 點擊最愛列表以外的地方就關閉選單
      toggleFavorite() {
        $(document).on('click', function (e) {
          // 如果點擊到的地方的父元素沒有 .cart-dropdown 而且 .cart-dropdown 有 .show 時
          // 就把 .cart-dropdown 的 .show 移除
          if (!e.target.closest('.favorite-dropdown') && $('.favorite-dropdown').hasClass('show')) {
            $('.favorite-dropdown').removeClass('show');
          }
        });
      },
    },
    created() {
      this.getProducts();
      this.getCart();
      this.lang();
      this.getfavorite();
    },
    mounted() {
      this.toggleCart();
      this.toggleFavorite();
    },
  }

</script>
