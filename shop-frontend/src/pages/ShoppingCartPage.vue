<template>
    <h1>My Shopping Cart</h1>

    <div v-if="cartItems.length > 0">
        <ShoppingCartList @remove-from-cart="removeFromCart($event)" :cartItems="cartItems" />
        <button class="checkout-button">continue to checkout</button>
    </div>
    <div v-if="cartItems.length === 0">
        <p>cart is empty</p>
    </div>


</template>

<script>
// eslint-disable-next-line no-unused-vars
import axios from 'axios';
import ShoppingCartList from '@/components/ShoppingCartList.vue'

export default {
    name: "ShoppingCart",
    components: {
        ShoppingCartList,
    },
    data() {
        return {
            cartItems: [],
        }
    },
    methods: {
        removeFromCart(productId) {
            const res = await axios.delete(`/api/users/123/cart/${productId}`);
            const updatedCart = res.data;
            this.cartItems = updatedCart;
        },
    },
    async created() {
        const res = await axios.get('/api/users/123/cart');
        const cartItems = res.data;
        this.cartItems = cartItems;
    },
}
</script>