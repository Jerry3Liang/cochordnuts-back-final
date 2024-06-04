<template>
    <!-- <h3>DetailBack</h3> -->
    <h3>商品詳細頁面</h3>
    <div v-if="product">
        <ProductInfoBack :productObj="product"></ProductInfoBack>
    </div>
</template>
    
<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import ProductInfoBack from '@/components/ProductInfoBack.vue';
    
    import axios from '@/plugins/axios.js';
    import Swal from "sweetalert2";
    import axiosApi from "@/plugins/axios.js";
    

    const route = useRoute();
    const id = ref(route.query.id);
    
    
    const product = ref(null);
    onMounted(function(){
        callFindById(id);
    })


    function callFindById(id){
        axios.get(`/products/detail/${id.value}`).then(function(response){
            product.value = response.data;
            console.log("response=",response.data);
        }).catch(function(error){
            console.log("error=",error);
        })
    }


</script>
    
<style>
    
</style>