<template>
    <div style="text-align: center">
        <h3>商品列表</h3>
    </div>
    <!-- <div style="width:30%; margin: auto;">
        <Search></Search>
    </div> -->
    <div>
        <table v-if="products" class="table table-hover">
            <thead>
                <tr style="font-size: x-large; font-weight: bold;">
                    <td>商品編號</td>
                    <td>商品名稱</td>
                    <td>藝人</td>
                    <td>庫存</td>
                    <td>狀態</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product.productNo" :value="product.productNo" style="font-size: large;">
                    <td>{{ product.productNo }}</td>
                    <td>
                        <RouterLink :to="{path:'/product/detailBack', query: { id: product.productNo }}" style="color: #336699;">
                            {{ product.productName }}</RouterLink>
                    </td>
                    <td>{{ product.artistType }}</td>
                    <td>{{ product.stock }}</td>
                    <td v-show="product.productStatus===1">上架中</td>
                    <td v-show="product.productStatus===0">已下架</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
    
<script setup>
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import axios from '@/plugins/axios.js';
    import Search from '@/components/Search.vue';
    import Paginate from 'vuejs-paginate-next';

    const products = ref(null);
    const router= useRouter();
    const prodStatus = ref();

    onMounted(function(){
        callFind();
    })
    function callFind(){
        axios.get("/products/findAll").then(function(response){
			console.log("response", response.data);
            products.value = response.data;
            

        }).catch(function(error){
            console.log("callFind error", error);
        })
    }
    
</script>
    
<style>
    td{
        padding: 2px;
        border: 1px solid gray;
        /* text-align: center; */
    }
</style>