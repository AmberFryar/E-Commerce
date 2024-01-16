<template>
    <section id="cartTable">
        <CartTable :products="products" />
    </section>
</template>

<script>
import CartTable from '../components/CartTable.vue';
import CartService from '../services/CartService.js'

export default {
    components: { CartTable },
    data() {
        return {
            products: {},
            isLoading: true
        }
    },
    methods: {
        getCart() {
            CartService.listCartItems()
                .then(response => {
                    this.products = response.data;
                    this.isLoading = false;
                })
                .catch((error) => {
                    window.alert(`Error: ${error}`)
                })
        },
    },

    created() {
        this.getCart();
    }
};
</script>

<style scoped>

</style>