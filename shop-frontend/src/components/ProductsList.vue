<template>
    <div class="grid-wrap">
        <div 
        class="product-item"
        v-for="product in products"
        :key="product.id"
        >
            <img :src="product.imageName" />
            <h3 class="product-name">{{ product.name }}</h3>
            <h2 class="product-name">{{ product.price }}</h2>
            <router-link :to="'/products/'+product.id">
                <button>View Details</button>
            </router-link>
        </div>
    </div>
</template>

<script>
import { products } from '../temp-data'

export default{
    name: "ProductsList", 
    props: ['products'],
}
</script>