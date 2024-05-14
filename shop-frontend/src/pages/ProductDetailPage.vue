<template>
    <div v-if="product">
        <div class="img-wrap">
            <img :src="product.imageName" />
        </div>
        <div class="product-details">
            <h3 class="product-name">{{ product.name }}</h3>
            <h2 class="price">{{ product.price }}</h2>
            <button class="add-to-cart">add to cart</button>
        </div>
    </div>
    <div v-else>
        <NotFoundPage />
    </div>
</template>

<script>
import { products } from '../temp-data'
import NotFoundPage from './NotFoundPage.vue'

export default{
    name: "ProductDetailPage", 
    data(){
        return{
            product: products.find(product => product.id === this.$route.params.productId),
        }
    },
    components: {
        NotFoundPage
    },
}
</script>