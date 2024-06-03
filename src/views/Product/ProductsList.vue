<template>
    <div style="text-align: center">
        <h1>商品列表</h1>
    </div>
    
    <div style="width:30%; margin: auto;">
        <input type="text" class="form-control" v-model="productName" placeholder="商品名稱" aria-label="Recipient's username" aria-describedby="button-addon2" @input="doSearch"
            style="margin: 5%; float: left;">
    </div>
    <button class="btn btn-light" style="margin-top: 1.5%" @click="sorting">產品編號排序↑↓</button>
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
    <Paginate class="justify-content-center"
                :first-last-button="true"
                first-button-text="&lt;&lt;"
                last-button-text="&gt;&gt;"
                prev-text="&lt;"
                next-text="&gt;"
                :page-count="pages"
                :initial-page="initial"
                :click-handler="callFind"
                ></Paginate>
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

    const pages = ref(100);
    const initial = ref(1);
    const start = ref(0);
    const rows = ref(15);
    const total = ref(0);
    const direction = ref(true);

    onMounted(function(){
        callFind();
    })
    function callFind(page){
        if(page){
            start.value = (page -1) * rows.value;
            initial.value = page;
        } else {
            start.value = 0;
        }
        let data = {
            "start" : start.value,
            "rows" : rows.value,
            "direction" : direction.value,
            "order" : "productNo",
        }
        axios.post(`/products/search`, data).then(function(response){
			console.log("response", response.data);
            products.value = response.data;
            

        }).catch(function(error){
            console.log("callFind error", error);
            products.value = null;
        })

        axios.post("/products/searchCount", data).then(function(response){
			console.log("count=", response.data);
            total.value = response.data
            pages.value = Math.ceil(response.data / rows.value);
            // lastPageRows.value = response.data % rows.value;
        }).catch(function(error){
            console.log("searchCount", error);
        })


    }

    function doSearch(page){

        if(page){
            start.value = (page -1) * rows.value;
            initial.value = page;
        } else {
            start.value = 0;
        }

        let data = {
            "productName" : productName.value,
            "rows" : rows.value,
            "direction" : direction.value,
            "order" : "productNo",
            "start" : start.value,
        }

        axios.post(`/products/search`, data).then(function(response){
            console.log("response=", response);
            products.value = response.data;

        }).catch(function(error){
            console.log("error=", error);
            products.value = null;
        })

        axios.post("/products/searchCount", data).then(function(response){
			console.log("count=", response.data);
            total.value = response.data
            pages.value = Math.ceil(response.data / rows.value);
            // lastPageRows.value = response.data % rows.value;
        }).catch(function(error){
            console.log("searchCount", error);
        })


    }

    function sorting(){
        if(direction.value == true){
            direction.value = false
        } else if(direction.value == false) {
            direction.value = true
        }
        console.log(direction.value);
        doSearch();
    }
    
</script>
    
<style>
    td{
        padding: 2px;
        border: 1px solid gray;
        /* text-align: center; */
    }
</style>