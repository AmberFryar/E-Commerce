<!-- TODO: This component doesn't feed the data to the ProductDetailsView. Unsure why.
<template>
   <section id="productDetails" :product="product" :key="product.productId">
    <div class="productSku">{{ product.productSku }} </div>
    <div class="price"> {{ priceFormatter }} </div>
    <div class="name">{{ product.name }} </div>
    <div class="description"> {{ product.description }} </div>
    <div class="imageName"> <img :src="`../img/${product.imageName}`"> </div>
    <div class="cart" :id="product.productId"> </div>
  </section> 
</template>
  
<script>
import ProductService from '../services/ProductService';

export default {
  data() {
    return {
    product: {
      type: Object,
    }
    }
  },
  computed: {
   
    priceFormatter() {
      let price = Intl.NumberFormat(`en-US`, {
        currency: `USD`,
        style: "currency",
      }).format(this.product.price);
      return price;
    }
  },
  methods:{
  imagePath() {
    let image = `../img/${this.product.imageName}`
    return image;
  }, 
},
};
</script>
  
<style scoped>

</style>
  -->