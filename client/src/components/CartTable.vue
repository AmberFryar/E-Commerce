<template>
    <section class="viewHeader">
        <h1>Shopping Cart</h1>
        <button @click="emptyCart">
            <font-awesome-icon icon="fa-solid fa-trash-can" title="Clear Cart"  /> Clear Cart</button>
    </section>
    <section id="cartTable">
        <table id="cartItemsTable">
            <tr>
                <th>Qty</th>
                <th>Product</th>
                <th>Price</th>
                <th>Amount</th>
            </tr>
            <tr v-for="product in products.items" :key="product.productId">
                <td> {{ product.quantity }}</td>
                <td>{{ product.product.name }}</td>
                <td>{{ '$'+product.product.price }}</td>
                <td>{{ '$'+qtyPrice(product) }}</td>
                <td>
                    <font-awesome-icon icon="fa-solid fa-xmark" title="Remove Item" @click="deleteItem(product)" :product="product.product"/>
                </td>
            </tr>
        </table>
        
        <table id="cartTotalsTable">
        <hr>
            <tr class="topRow" >
                <td>&nbsp;</td>
                <th>Subtotal</th>
                <td>&nbsp;</td>
                <td>{{ '$'+products.itemSubtotal }}</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <th>Tax</th>
                <td>&nbsp;</td>
                <td>{{ '$'+products.tax }}</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <th>Total</th>
                <td>&nbsp;</td>
                <td>{{'$'+products.total }}</td>
            </tr>
        </table>
    </section>
</template>

<script>
import CartService from '../services/CartService';

export default {
    props: {
        products: {
            type: Object
        },
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
    methods: {
        qtyPrice(product) {
            return product.quantity * product.product.price;
        },
        deleteItem(product) {
            console.log(product);
            CartService.removeCartItem(product.cartItemId) 
                .then(response => {
                   window.alert("Item Removed From Cart");
                   window.location.reload();
                })
                .catch((error) => {
                    window.alert(`Error: ${error}`)
                })
        },
        emptyCart() {
            console.log("clear Cart");
            CartService.clearCart()
                .then(response => {
                    window.alert("Cart Cleared");
                    window.location.reload();
                })
                .catch((error) => {
                    window.alert(`Error: ${error}`)
                })
        }
       
    }
};
</script>

<style scoped>
.viewHeader {
margin-left: 4%;
}

#cartItemsTable {
    display: table;
    width: 75%;
    text-align: center;
}

#cartTotalsTable {
    display: table;
    margin-left: 36%;
    width: 30%;
    text-align: right;
}

hr {
    border: 1px solid rgb(30, 102, 136);
    text-align: left;
    width: 2350%
}
.cartTable {
    margin-top: 15px;
}

h1 {
    font-size: x-large;
}
td {
    color:rgb(115, 161, 182)
}

</style>