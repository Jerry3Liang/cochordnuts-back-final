<template>
    <div style="text-align: center">
        <h3>商品列表</h3>
    </div>
    
    <div style="width:30%; margin: auto;">
        <input type="text" class="form-control" v-model="productName" placeholder="商品名稱" aria-label="Recipient's username" aria-describedby="button-addon2" @input="doSearch"
            style="margin: 5%;">
    </div>
    <div>
        <table class="table table-hover">
            <thead>
                <tr style="font-size: x-large; font-weight: bold;">
                    <td style="width: 15%;">商品編號</td>
                    <td style="width: 50%;">商品名稱</td>
                    <td style="width: 15%;">藝人</td>
                    <td style="width: 10%;">庫存</td>
                    <td style="width: 10%;">狀態</td>
                </tr>
            </thead>
            <tbody v-show="products != null">
                <tr v-for="product in products" :key="product.productNo" :value="product.productNo" style="font-size: large;">
                    <td style="width: 15%;">{{ product.productNo }}</td>
                    <td style="width: 50%;">
                        <RouterLink :to="{path:'/product/detailBack', query: { id: product.productNo }}" style="color: #336699;">
                            {{ product.productName }}</RouterLink>
                    </td>
                    <td style="width: 15%;">{{ product.artistType }}</td>
                    <td style="width: 10%;">{{ product.stock }}</td>
                    <td style="width: 10%;" v-show="product.productStatus===1">上架中</td>
                    <td style="width: 10%;" v-show="product.productStatus===0">已下架</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
    
<script setup>
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import axios from '@/plugins/axios.js';
    import Paginate from 'vuejs-paginate-next';

    const products = ref(null);
    const router= useRouter();
    const prodStatus = ref();
    const productName = ref(null);


    onMounted(function(){
        callFind();
    })
    function callFind(){
        axios.get("/products/findAll").then(function(response){
			console.log("response", response.data);
            products.value = response.data;
            

        }).catch(function(error){
            console.log("callFind error", error);
            products.value = null;
        })
    }

    function doSearch(){

        let data = {
            "productName" : productName.value,
            "rows" : 15,
        }

        axios.post(`/products/search`, data).then(function(response){
            console.log("response=", response);
            products.value = response.data;

        }).catch(function(error){
            console.log("error=", error);
            products.value = null;
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