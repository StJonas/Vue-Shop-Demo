<template>
    <div class="product-container" v-for="product in cartItems" :key="product.id">
        <img class="product-image" :src="product.imageUrl" />
        <div class="details-wrap">
            <h3>{{ product.name }}</h3>
            <p>{{ product.price }}</p>
        </div>
        <button @click="$emit('remove-from-cart', product.id)" class="remove-button">remove</button>
    </div>
</template>

<script>
export default {
    name: "ShoppingCartList",
    props: ['cartItems'],
}
</script>