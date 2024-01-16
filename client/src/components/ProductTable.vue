<template>
    <table id="productTable">
        <th>SKU</th>
        <th>Product Name</th>
        <th>Price</th>
        <tr v-for="product in products" :key="product.productId">
            <td>{{ product.productSku }}</td>
            <td :products="products" @click="detailView(product)"> {{ product.name }}</td>
            <td>{{ product.price }}</td>
            <font-awesome-icon class="cart" icon="fa-solid fa-cart-plus" title="Add To Cart" @click="addToCart(product)"
                :key="product.productId" />
        </tr>
    </table>
</template>

<script>
import CartService from '../services/CartService.js';
export default {
    props: {
        products: [],
    },
    methods: {
        detailView(product) {
            this.$router.push({ name: 'details', params: { productId: product.productId } });
        },
        addToCart(product) {
            CartService.addCartItem(product.productId)
                .then((response) => {
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
    }
};
</script>
<style> #productTable {
     width: 75%;
     text-align: center;

 }
</style>
