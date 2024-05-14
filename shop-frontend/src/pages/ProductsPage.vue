<template>
    <h1>Products</h1>
    <ProductsList :products="products"/>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { products } from '../temp-data'
import ProductsList from '../components/ProductsList.vue'

export default{
    name: "ProductsPage", 
    data(){
        return{
            products,
        }
    },
    components: {
        ProductsList,
    }
}
</script>