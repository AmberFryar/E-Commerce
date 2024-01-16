<template>
  <section id="heading-line">
    <h1 v-if="isLoading">
      <loading-spinner id="spinner" v-bind:spin="isLoading" />
    </h1>
    <div id="welcomeMsg" v-show=!isLoggedIn>
      <h1>Welcome!</h1> You may browse anonymously as much as you wish,
      but you must
      <router-link :to="{ name: 'login' }">Login</router-link> to add
      items to your shopping cart.
    </div>
  </section>
  <section id="products">
    <h1> Products </h1>
    <SearchBar v-on:searchValueChange="filterList" v-bind:delay="900" />
    </section>
    <div class="Icon">
      <div id="tableView" v-if="!cardView">
        <font-awesome-icon class="viewIcon" :class="{ 'view-icon': true, active: !cardView }" @click="cardView = true"
          icon="fa-solid fa-grip" title="View tiles" />
        <ProductTable v-show="!cardView" :products="products" />
      </div>
      <div id="tileView" v-if="cardView">
        <font-awesome-icon class="viewIcon" :class="{ 'view-icon': true, active: cardView }" @click="cardView = false"
          icon="fa-solid fa-table" title="View table" />
        <ProductCard v-show="!cardView" :products="products" />
      </div>
    </div>
  
</template>

<script>
import LoadingSpinner from "../components/LoadingSpinner.vue";
import ProductCard from "../components/ProductCard.vue";
import ProductTable from "../components/ProductTable.vue";
import ProductService from "../services/ProductService";
import SearchBar from "../components/SearchBar.vue";

// <!--  TODO: Do I need to mapGetters instead of data() for products? -->

export default {
  components: {
    LoadingSpinner,
    ProductCard,
    ProductTable,
    SearchBar,
  },
  data() {
    return {
      products: [],
      filter: "",
      isLoading: true,
      cardView: true,
      viewIcon: true,
    };
  },

  computed: {
    isLoggedIn() {
      return this.$store.state.token.length > 0;
    },
  },

  methods: {
    filterList(searchValue) {
      this.filter = searchValue;
      this.getProducts();
    },
    getProducts() {
      ProductService.searchProducts(this.filter)
        .then((response) => {
          this.products = response.data;
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          window.alert(`ERROR: ${error}`)
        })
    },

  },

  created() {
    this.getProducts();
  },
  // <!-- TODO- Log shows product.data in promise result but not displaying. mapGetters? -->
  // created() {
  //   console.log('products view created');
  //   this.$store.dispatch("FETCH_PRODUCTS");
  // }
};
</script>

<style>
#tileView {
  display: flex;
  flex-wrap: wrap;
}

#spinner {
  color: green;
}

.viewIcon:hover {
  color: crimson
}

#products {

  display: inline-flex;
  justify-content: space-between;
}
</style>