<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <header>
      <NavBar />
    </header>
    <div class="container">
      <div class="banner">
        <img src="../../assets/images/obv-_design-nf0aL7WgiiU-unsplash (1).jpg" alt="" class="img-fluid">
        <h5 class="text-white banner-text font-weight-bolder font-italic">總能找到最適合您的</h5>
      </div>
      <div class="row mt-3">
        <div class="col-md-3 text-center pt-4">
          <div class="input-group mb-4 border rounded-pill p-1">
            <input type="search" placeholder="搜尋..." aria-describedby="button-addon3"
              class="form-control bg-none border-0 focus-none" v-model="filterText">
            <div class="input-group-append border-0">
              <button id="button-addon3" type="button" class="btn btn-link text-main"><i
                  class="fa fa-search"></i></button>
            </div>
          </div>
          <div class="list-group" id="list-tab" role="tablist">
            <a class="list-group-item list-group-item-action active" id="list-all-list" data-toggle="list"
              href="#list-all" role="tab" aria-controls="all">所有商品</a>
            <a class="list-group-item list-group-item-action" id="list-flower-list" data-toggle="list"
              href="#list-flower" role="tab" aria-controls="flower" @click="getSort('花')">花</a>
            <a class="list-group-item list-group-item-action" id="list-bouquet-list" data-toggle="list"
              href="#list-bouquet" role="tab" aria-controls="bouquet" @click="getSort('花束')">花束</a>
            <a class="list-group-item list-group-item-action" id="list-flowerpot-list" data-toggle="list"
              href="#list-flowerpot" role="tab" aria-controls="flowerpot" @click="getSort('花盆')">花盆</a>
            <a class="list-group-item list-group-item-action" id="list-cactus-list" data-toggle="list"
              href="#list-cactus" role="tab" aria-controls="cactus" @click="getSort('盆栽')">盆栽</a>
          </div>
        </div>
        <div class="col-md-9">
          <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="list-all" role="tabpanel" aria-labelledby="list-all-list">
              <div class="row mt-4">
                <div class="col-md-4 mb-4 card-position" v-for="item in filterArrayALL" :key="item.id">
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
                    <a href="#" class="btn text-danger" @click.prevent="removeLove(item)" v-if="changeLove(item)">
                      <i class="fas fa-heart fa-2x"></i>
                    </a>
                    <a href="#" class="btn text-danger" @click.prevent="addLove(item)" v-else>
                      <i class="far fa-heart fa-2x"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="list-flower" role="tabpanel" aria-labelledby="list-flower-list">
              <div class="row mt-4">
                <div class="col-md-4 mb-4 card-position" v-for="item in filterArraySort" :key="item.id">
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
                    <a href="#" class="btn text-danger" @click.prevent="removeLove(item)" v-if="changeLove(item)">
                      <i class="fas fa-heart fa-2x"></i>
                    </a>
                    <a href="#" class="btn text-danger" @click.prevent="addLove(item)" v-else>
                      <i class="far fa-heart fa-2x"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="list-bouquet" role="tabpanel" aria-labelledby="list-bouquet-list">
              <div class="row mt-4">
                <div class="col-md-4 mb-4 card-position" v-for="item in filterArraySort" :key="item.id">
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
                    <a href="#" class="btn text-danger" @click.prevent="removeLove(item)" v-if="changeLove(item)">
                      <i class="fas fa-heart fa-2x"></i>
                    </a>
                    <a href="#" class="btn text-danger" @click.prevent="addLove(item)" v-else>
                      <i class="far fa-heart fa-2x"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="list-flowerpot" role="tabpanel" aria-labelledby="list-flowerpot-list">
              <div class="row mt-4">
                <div class="col-md-4 mb-4 card-position" v-for="item in filterArraySort" :key="item.id">
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
                    <a href="#" class="btn text-danger" @click.prevent="removeLove(item)" v-if="changeLove(item)">
                      <i class="fas fa-heart fa-2x"></i>
                    </a>
                    <a href="#" class="btn text-danger" @click.prevent="addLove(item)" v-else>
                      <i class="far fa-heart fa-2x"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="list-cactus" role="tabpanel" aria-labelledby="list-cactus-list">
              <div class="row mt-4">
                <div class="col-md-4 mb-4 card-position" v-for="item in filterArraySort" :key="item.id">
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
                    <a href="#" class="btn text-danger" @click.prevent="removeLove(item)" v-if="changeLove(item)">
                      <i class="fas fa-heart fa-2x"></i>
                    </a>
                    <a href="#" class="btn text-danger" @click.prevent="addLove(item)" v-else>
                      <i class="far fa-heart fa-2x"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    <ShoppingCart :cart-data="cartItem" :loading-img="status" @opencart="getCart(1)" @removecart="removeCartItem">
    </ShoppingCart>
    <FavoriteList :favorite-data="favorite" :loading-img="status" @openfavorite="openFavoriteList(1)"
      @removefavorite="removeLove" @favoriteToCart="addtoCart"></FavoriteList>
  </div>
</template>

<script>
  import NavBar from "../NavBar";
  import Footer from "../Footer";
  import ShoppingCart from '../ShoppingCart';
  import FavoriteList from "../FavoriteList";
  import $ from "jquery";


  export default {
    name: 'Productlist',
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
        sortProduct: [],
        // 儲存購物車資料
        cartItem: [],
        // 儲存我的最愛資料
        favorite: [],
        status: {
          loadingItem: '',
        },
        isLoading: false,
        filterText: '',
        sliceIndex: '',
      }
    },
    methods: {
      // 所有商品列表
      getProducts() {
        const vm = this;
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`
        vm.isLoading = true;
        this.$http.get(api).then((response) => {
          // 只有啟用產品會顯示
          response.data.products.forEach(item => {
            if (item.is_enabled === 1) {
              vm.products.push(item);
            }
            vm.isLoading = false;
          });
        });
      },
      // 點擊產品後引導到個別產品頁
      getProductID(id) {
        const vm = this;
        vm.$router.push(`/detail/${id}`);
      },
      getSort(tag) {
        const vm = this;
        vm.sortProduct = vm.products.filter(function (item, index) {
          if (item.category === tag) {
            return true;
          }
        })
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
          if (!e.target.closest('.cart-dropdown') && $('.cart-dropdown').hasClass('show')) {
            $('.cart-dropdown').removeClass('show');
          }
          // if (e.target.id != 'cart-id') {
          //   $(".cart-menu").toggleClass('show');
          // }
        });
      },
      // 加入購物車
      addtoCart(id, qty = 1) {
        const vm = this;
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
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
          vm.isLoading = false;
          // 加入購物車後取回購物車的內容
          vm.getCart();
        });
      },
      // 刪除購物車內容
      removeCartItem(id) {
        const vm = this;
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`
        vm.isLoading = true;
        vm.status.loadingItem = id;
        this.$http.delete(api).then((response) => {
          vm.status.loadingItem = '';
          vm.isLoading = false;
          // 刪除後重新取得列表
          vm.getCart();
        });
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
    computed: {
      filterArrayALL() {
        const vm = this;
        // 第二個 return 後面的條件如果成立 (item.name 等於 vm.filterText)
        // 那就會回傳 arrayData 裡面 "單個物件" 給第一個 return 讓它回傳給 filterArray
        return vm.products.filter(function (item) {
          return item.title.match(vm.filterText);
        })
      },
      filterArraySort() {
        const vm = this;
        // 第二個 return 後面的條件如果成立 (item.name 等於 vm.filterText)
        // 那就會回傳 arrayData 裡面 "單個物件" 給第一個 return 讓它回傳給 filterArray
        return vm.sortProduct.filter(function (item) {
          return item.title.match(vm.filterText);
        })
      },
    },
    created() {
      this.getProducts();
      this.getCart();
      this.getfavorite();
    },
    mounted() {
      this.toggleCart();
      this.toggleFavorite();
    }
  }

</script>
