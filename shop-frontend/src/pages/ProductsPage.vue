<template>
    <h1>Products</h1>
    <ProductsList :products="products" />
</template>

<script>
// eslint-disable-next-line no-unused-vars
import axios from 'axios';
import ProductsList from '../components/ProductsList.vue'

export default {
    name: "ProductsPage",
    data() {
        return {
            products: [],
        }
    },
    components: {
        ProductsList,
    },
    async created() {
        const res = await axios.get('/api/products');
        const products = res.data;
        this.products = products;
    },
}
</script>