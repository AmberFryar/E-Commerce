<template>
    <section id="productCard" v-for="product in products" :key="product.productId" @click="detailView(product)">
        <div class="productSku"> {{ product.productSku }} </div>
        <div class="price"> {{ product.price }} </div>
        <div class="productName" :products="products" > {{ product.name }} </div>
        <div class="description"> {{ product.description }} </div>
        <div class="imageName"> <img :src="`../img/${product.imageName}`"> </div>
        <font-awesome-icon class="cart" icon="fa-solid fa-cart-plus" title="Add To Cart" @click="addToCart(product)"
            :key="product.productId" />
            <!-- public\img\Product-YET-001.jpg -->
    </section>
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
            console.log("clicked add to cart icon");
            CartService.addCartItem(product.productId)
                .then((response) => {
                    window.alert("Added to Cart");
                })
                .catch(error => {
                    window.alert(error, "Unable to add item to cart");
                })
        },
    }

}
</script>
<style>
#productCard {
    display: grid;
    border-style: solid;
    border-width: thin;
    border-color: #c7c76852;
    padding: 10px;
    margin: 20px;
    align-items: center;
    justify-content: center;
    grid-template-columns: 1fr, 1fr;
    grid-template-areas:
        "sku         price"
        "name        name"
        "description description"
        "image       image"
        "  .         cart"
}


#productCard:hover {
    background: #070727;
    box-shadow: 0px 0px 70px rgb(223, 223, 27);
    border-radius: 5%;
}

#productCard:hover .description {
    color: rgb(201, 122, 122);
}

.productSku {
    grid-area: sku;
    color: rgba(240, 107, 107, 0.308);
}

.price {
    grid-area: price;
    color: rgb(226, 100, 100);
}

.productName {
    grid-area: name;
    color: rgb(214, 126, 126);
    font-size: larger;
}

.description {
    grid-area: description;
    color: #070727;
    font-style: italic;
    margin-left: 30%;
}

.productImage {
    display: grid;
    grid-area: image;
}

.cart {
    grid-area: cart;
    /* margin-left: 85%;
    margin-top: 10px; */
    color: rgb(236, 133, 133);
}

font-awesome-icon {
    color: #070727
}
</style>