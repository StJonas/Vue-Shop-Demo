<template>
    <div v-if="product">
        <div class="img-wrap">
            <img :src="product.imageUrl" />
        </div>
        <div class="product-details">
            <h3 class="product-name">{{ product.name }}</h3>
            <h2 class="price">{{ product.price }}</h2>
            <button @click="addToCart" class="add-to-cart" v-if="!itemIsInCart">add to cart</button>
            <button class="grey-button" v-if="!itemIsInCart">item is already in cart</button>
        </div>
    </div>
    <div v-else>
        <NotFoundPage />
    </div>
</template>

<script>
import axios from 'axios';
import NotFoundPage from './NotFoundPage.vue'

export default {
    name: "ProductDetailPage",
    data() {
        return {
            product: {},
            cartItems: [],
        }
    },
    computed: {
        itemIsInCart() {
            return this.cartItems.some(item => item.id === this.$route.params.productId);
        }
    },
    methods: {
        async addToCart() {
            await axios.post('/api/users/123/cart', { id: this.$route.params.id });
            alert('successfully added item to cart!');
        }
    },
    components: {
        NotFoundPage
    },
    async created() {
        const res = await axios.get('/api/products/${this.$route.params.productId}');
        const product = res.data;
        this.product = product;

        const cartRes = await axois.get('/api/users/123/cart');
        const cartItems = cartRes.data;
        this.cartItems = cartItems;
    }
}
</script>