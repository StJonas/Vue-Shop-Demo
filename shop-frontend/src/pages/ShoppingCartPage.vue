<template>
    <h1>My Shopping Cart</h1>

    <div v-if="cartItems.length > 0">
        <ShoppingCartList :cartItems="cartItems"/>
        <button class="checkout-button">continue to checkout</button>
    </div>
    <div v-if="cartItems.length === 0">
        <p>cart is empty</p>
    </div>

    
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { cartItems } from '../temp-data'
import ShoppingCartList from '@/components/ShoppingCartList.vue'

export default{
    name: "ShoppingCart", 
    components: {
        ShoppingCartList,
    },
    data(){
        return{
            cartItems,
        }
    },
}
</script>