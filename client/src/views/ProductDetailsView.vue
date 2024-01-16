
<template>
  <section class="viewHeader">
    <button @click="addToCart">
      <font-awesome-icon class="cart" icon="fa-solid fa-cart-plus" title="Add To Cart" @click="addToCart"
        :key="product.productId" /> Add to Cart
    </button>
  </section>

  <section id="productDetails" :product="product" :key="product.productId">
    <div class="productSku">{{ product.productSku }} </div>
    <div class="price"> {{ priceFormatter }} </div>
    <h1 class="name">{{ product.name }} </h1>
    <div class="description"> {{ product.description }} </div>
    <div class="imageName"> <img :src="`../img/${product.imageName}`"> </div>
    <div class="cart" :id="product.productId"> </div>
  </section>
</template>

<script>
import ProductService from '../services/ProductService.js';
import CartService from '../services/CartService';

export default {
  data() {
    return {
      product: {}
    }
  },
  mounted() {
    console.log(this.$route.params.productId)
  },
  computed: {

    priceFormatter() {
      let price = Intl.NumberFormat(`en-US`, {
        currency: `USD`,
        style: "currency",
      }).format(this.product.price);
      return price;
    },
  
  },
  methods: {

    addToCart() {
      CartService.addCartItem(this.$route.params.productId)
        .then((response) => {
          console.log("clicked add to cart");
          
          window.alert("Added to Cart");
        })
        .catch(error => {
          console.log("catch error")
          if (error.status === 401) {
            window.alert("Please Log in. Error 401- unauthorized")
          } else {
            window.alert(error, "Unable to add item to cart");
          }
        })
    },
    getProductDetails() {
      ProductService.productById(this.$route.params.productId)
        .then(response => {
          console.log("get product details");
          this.product = response.data;
          this.isLoading = false;

        })
        .catch((error) => {
          window.alert(error)
        })
    },

  },
  created() {
    this.getProductDetails();

  }
};
</script>

<style scoped>
#productDetails {
  text-align: center;
  margin-top: 15px;
}

.name {
  font-size: x-large;
}

font-awesome-icon#cart {
  color: rgb(30, 102, 136);
}

.viewHeader {
  justify-content: end;
  margin-right: 4%;
}
</style>

    
   